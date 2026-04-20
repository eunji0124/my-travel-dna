import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { plannerData, type Place } from "../data/plannerData";

declare global {
  interface Window {
    kakao: {
      maps: {
        load: (callback: () => void) => void;
        Map: new (container: HTMLElement, options: object) => KakaoMapInstance;
        LatLng: new (lat: number, lng: number) => object;
        LatLngBounds: new () => KakaoLatLngBounds;
        CustomOverlay: new (options: object) => object;
        Polyline: new (options: object) => KakaoPolyline;
      };
    };
  }
}

interface KakaoMapInstance {
  setCenter: (latlng: object) => void;
  setLevel: (level: number) => void;
  panTo: (latlng: object) => void;
  setBounds: (bounds: object) => void;
}

interface KakaoLatLngBounds {
  extend: (latlng: object) => void;
}

interface KakaoPolyline {
  setMap: (map: KakaoMapInstance) => void;
}

// ✅ 토스트 훅
function useToast(duration = 2500) {
  const [message, setMessage] = useState<string | null>(null);
  const show = (msg: string) => {
    setMessage(msg);
    setTimeout(() => setMessage(null), duration);
  };
  return { message, show };
}

// ✅ 클립보드 복사 훅
function useCopyToClipboard() {
  const [copied, setCopied] = useState(false);
  const copy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      console.error("클립보드 복사 실패");
    }
  };
  return { copied, copy };
}

export default function Planner() {
  const location = useLocation();
  const navigate = useNavigate();
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<KakaoMapInstance | null>(null);
  const isMapReady = useRef(false);

  const character = location.state?.character;
  // ✅ 코스 2개 유지: 지역 선택 버튼 복원
  const [selectedCourseIdx, setSelectedCourseIdx] = useState(0);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  const { copied, copy } = useCopyToClipboard();
  const toast = useToast();

  const courses = character ? plannerData[character.id] : [];
  const currentCourse = courses[selectedCourseIdx];
  const currentPlaces: Place[] = currentCourse?.places || [];

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (!character || !mapRef.current || !window.kakao || currentPlaces.length === 0) return;
    isMapReady.current = false;

    window.kakao.maps.load(() => {
      const container = mapRef.current;
      if (!container) return;

      const map = new window.kakao.maps.Map(container, {
        center: new window.kakao.maps.LatLng(currentPlaces[0].lat, currentPlaces[0].lng),
        level: 5,
      });
      mapInstance.current = map;

      const linePath: object[] = [];
      const bounds = new window.kakao.maps.LatLngBounds();

      currentPlaces.forEach((place) => {
        const point = new window.kakao.maps.LatLng(place.lat, place.lng);
        linePath.push(point);

        new window.kakao.maps.CustomOverlay({
          position: point,
          content: `
            <div style="
              background-color: ${character.color};
              color: white;
              width: 26px; height: 26px;
              border-radius: 50%;
              display: flex; align-items: center; justify-content: center;
              font-size: 12px; font-weight: bold;
              box-shadow: 0 2px 6px rgba(0,0,0,0.3);
              border: 2px solid white;
            ">${place.order}</div>
          `,
          map,
          yAnchor: 0.5,
        });

        bounds.extend(point);
      });

      new window.kakao.maps.Polyline({
        path: linePath,
        strokeWeight: 5,
        strokeColor: character.color,
        strokeOpacity: 0.7,
        strokeStyle: "solid",
      }).setMap(map);

      map.setBounds(bounds);
      isMapReady.current = true;
    });
  }, [character, selectedCourseIdx, currentPlaces]);

  const handleCourseChange = (idx: number) => {
    setSelectedCourseIdx(idx);
    isMapReady.current = false;
  };

  // ✅ 카카오맵 내보내기 - 경유지 포함 길찾기
  const handleExportToKakaoMap = () => {
    if (currentPlaces.length === 0) return;
    if (currentPlaces.length === 1) {
      const p = currentPlaces[0];
      window.open(`https://map.kakao.com/link/map/${encodeURIComponent(p.name)},${p.lat},${p.lng}`, "_blank");
      return;
    }
    const segments = currentPlaces
      .map((p) => `${encodeURIComponent(p.name)},${p.lat},${p.lng}`)
      .join("/");
    window.open(`https://map.kakao.com/link/by/car/${segments}`, "_blank");
  };

  // ✅ 코스 복사 + 토스트 안내
  const handleCopyCourse = async () => {
    const text = [
      `${character.emoji} ${character.name} 추천 코스`,
      `📍 ${currentCourse?.title}`,
      "",
      ...currentPlaces.map(
        (p, i) =>
          `${p.order}. ${p.name}\n   ${p.address}\n   ${p.description}` +
          (i < currentPlaces.length - 1 && p.transport
            ? `\n   → ${p.transport}로 ${p.duration} 이동`
            : "")
      ),
    ].join("\n");

    await copy(text);
    toast.show("📋 복사됐어요! 카카오톡이나 메모장에 붙여넣기 해보세요 😊");
  };

  if (!character) return <div style={{ padding: "100px", textAlign: "center" }}>잘못된 접근입니다.</div>;

  const sidebarStyle: React.CSSProperties = isMobile
    ? {
        position: "fixed",
        bottom: 0, left: 0, right: 0,
        height: isSidebarOpen ? "72vh" : "80px",
        backgroundColor: "#fff",
        borderRadius: "20px 20px 0 0",
        boxShadow: "0 -4px 20px rgba(0,0,0,0.15)",
        zIndex: 100,
        overflowY: isSidebarOpen ? "auto" : "hidden",
        transition: "height 0.35s cubic-bezier(0.4, 0, 0.2, 1)",
        padding: "0 20px 40px",
      }
    : {
        width: "380px",
        padding: "30px 20px",
        overflowY: "auto",
        borderRight: "1px solid #eee",
        backgroundColor: "#fff",
        zIndex: 10,
        flexShrink: 0,
      };

  return (
    <div style={{ display: "flex", height: "100vh", width: "100vw", overflow: "hidden", flexDirection: isMobile ? "column" : "row" }}>

      {/* 지도 */}
      <div ref={mapRef} style={{ flex: 1, height: "100vh" }} />

      {/* 사이드바 */}
      <div style={sidebarStyle}>

        {/* 모바일: 핸들 탭 */}
        {isMobile && (
          <div onClick={() => setIsSidebarOpen((prev) => !prev)} style={{ cursor: "pointer", paddingTop: "12px", paddingBottom: "8px" }}>
            <div style={{ width: "40px", height: "4px", backgroundColor: "#ddd", borderRadius: "4px", margin: "0 auto 10px" }} />
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <span style={{ fontWeight: "bold", fontSize: "15px" }}>
                {character.emoji} {currentCourse?.region} 코스 보기
              </span>
              <span style={{ fontSize: "18px", color: "#aaa" }}>{isSidebarOpen ? "▼" : "▲"}</span>
            </div>
          </div>
        )}

        {/* 데스크탑: 뒤로가기 + 타이틀 */}
        {!isMobile && (
          <>
            <button onClick={() => navigate(-1)} style={{ marginBottom: "20px", cursor: "pointer", border: "none", background: "none", color: "#999" }}>
              ← 뒤로가기
            </button>
            <h2 style={{ fontSize: "22px", marginBottom: "12px" }}>
              {character.emoji} {character.name} 코스
            </h2>
          </>
        )}

        {/* ✅ 코스 선택 버튼 (2개 지역) */}
        <div style={{ display: "flex", gap: "8px", marginBottom: "12px", flexWrap: "wrap" }}>
          {courses.map((course, idx) => (
            <button
              key={idx}
              onClick={() => handleCourseChange(idx)}
              style={{
                padding: "8px 16px",
                borderRadius: "20px",
                border: `1.5px solid ${selectedCourseIdx === idx ? character.color : "#eee"}`,
                backgroundColor: selectedCourseIdx === idx ? character.color : "#fff",
                color: selectedCourseIdx === idx ? "#fff" : "#666",
                cursor: "pointer",
                fontWeight: "bold",
                fontSize: "14px",
                transition: "all 0.2s",
              }}
            >
              {course.region}
            </button>
          ))}
        </div>

        <p style={{ color: "#444", fontWeight: "bold", fontSize: "15px", marginBottom: "20px" }}>
          "{currentCourse?.title}"
        </p>

        {/* ✅ 장소 카드 - 클릭 없이 정보 표시만 */}
        <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "24px" }}>
          {currentPlaces.map((place, idx) => (
            <div key={idx}>
              {/* 카드: cursor/onClick 제거 → 순수 정보 표시 */}
              <div
                style={{
                  padding: "16px",
                  borderRadius: "16px",
                  backgroundColor: "#f8f9fa",
                  border: `2px solid transparent`,
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "6px" }}>
                  <span style={{
                    backgroundColor: character.color, color: "#fff",
                    width: "20px", height: "20px", borderRadius: "50%",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: "12px", flexShrink: 0,
                  }}>
                    {place.order}
                  </span>
                  <h3 style={{ fontSize: "16px", color: "#333", margin: 0 }}>
                    {place.name}
                  </h3>
                </div>
                <p style={{ fontSize: "13px", color: "#999", marginBottom: "6px", marginLeft: "28px" }}>{place.address}</p>
                <p style={{ fontSize: "14px", color: "#666", lineHeight: "1.5", marginLeft: "28px" }}>{place.description}</p>
              </div>

              {idx < currentPlaces.length - 1 && place.transport && (
                <div style={{
                  padding: "8px 12px",
                  borderLeft: `2px dashed ${character.color}`,
                  marginLeft: "30px",
                  marginTop: "4px",
                  marginBottom: "4px",
                }}>
                  <span style={{ fontSize: "12px", color: character.color, fontWeight: "bold" }}>
                    {place.transport}로 {place.duration} 이동
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* 버튼 영역 */}
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <button
            onClick={handleExportToKakaoMap}
            style={{
              width: "100%", padding: "14px", borderRadius: "14px",
              border: "none", backgroundColor: character.color,
              color: "#fff", fontSize: "15px", fontWeight: "bold",
              cursor: "pointer", display: "flex", alignItems: "center",
              justifyContent: "center", gap: "8px",
            }}
          >
            🗺️ 카카오맵에서 길찾기
          </button>

          <button
            onClick={handleCopyCourse}
            style={{
              width: "100%", padding: "14px", borderRadius: "14px",
              border: `1.5px solid ${character.color}`,
              backgroundColor: copied ? character.color : "#fff",
              color: copied ? "#fff" : character.color,
              fontSize: "15px", fontWeight: "bold",
              cursor: "pointer", display: "flex", alignItems: "center",
              justifyContent: "center", gap: "8px",
              transition: "all 0.3s",
            }}
          >
            {copied ? "✅ 복사 완료!" : "📋 코스 정보 복사하기"}
          </button>
        </div>

        {/* 모바일 뒤로가기 */}
        {isMobile && isSidebarOpen && (
          <button
            onClick={() => navigate(-1)}
            style={{ marginTop: "16px", width: "100%", padding: "12px", border: "1px solid #eee", borderRadius: "12px", background: "none", color: "#999", cursor: "pointer" }}
          >
            ← 뒤로가기
          </button>
        )}
      </div>

      {/* ✅ 토스트 팝업 */}
      {toast.message && (
        <div style={{
          position: "fixed",
          bottom: isMobile ? "88px" : "32px",
          left: "50%",
          transform: "translateX(-50%)",
          backgroundColor: "#222",
          color: "#fff",
          padding: "14px 22px",
          borderRadius: "40px",
          fontSize: "14px",
          fontWeight: "500",
          whiteSpace: "nowrap",
          boxShadow: "0 8px 24px rgba(0,0,0,0.2)",
          zIndex: 999,
          animation: "fadeInUp 0.3s ease",
        }}>
          {toast.message}
        </div>
      )}

      {/* 토스트 애니메이션 */}
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateX(-50%) translateY(12px); }
          to   { opacity: 1; transform: translateX(-50%) translateY(0); }
        }
      `}</style>
    </div>
  );
}