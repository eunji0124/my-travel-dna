import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { plannerData } from "../data/plannerData";

// 1. 타입 정의
declare global {
  interface Window {
    /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
    kakao: any;
  }
}

export default function Planner() {
  const location = useLocation();
  const navigate = useNavigate();
  
  // 2. 참조(Ref) 관리
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<any>(null);

  // 3. 상태(State) 관리
  const character = location.state?.character;
  const places = character ? plannerData[character.id] : [];
  // 현재 선택된 장소의 인덱스 (기본값 0: 첫 번째 장소)
  const [activeIndex, setActiveIndex] = useState(0);

  // 4. 지도 초기화 로직
  useEffect(() => {
    // 필수 데이터나 카카오 객체가 없으면 중단
    if (!character || !mapRef.current || !window.kakao || places.length === 0) return;

    window.kakao.maps.load(() => {
      const container = mapRef.current;
      if (!container) return;

      // 초기 중심점은 첫 번째 장소로 설정
      const options = {
        center: new window.kakao.maps.LatLng(places[0].lat, places[0].lng),
        level: 8, // 조금 더 상세히 보이도록 레벨 조정
      };

      const map = new window.kakao.maps.Map(container, options);
      mapInstance.current = map;

      const bounds = new window.kakao.maps.LatLngBounds();

      // 마커 뿌리기
      places.forEach((place) => {
        const markerPosition = new window.kakao.maps.LatLng(place.lat, place.lng);
        const marker = new window.kakao.maps.Marker({
          position: markerPosition,
        });
        marker.setMap(map);
        bounds.extend(markerPosition);
      });

      // 장소가 여러 개일 경우 모든 마커가 보이도록 영역 재설정
      if (places.length > 1) {
        map.setBounds(bounds);
      }
    });
  }, [character, places]);

  // 5. 리스트 아이템 클릭 핸들러
  const handlePlaceClick = (lat: number, lng: number, index: number) => {
    if (!mapInstance.current) return;

    // 활성화 상태 변경
    setActiveIndex(index);

    // 지도 이동 및 확대
    const moveLatLon = new window.kakao.maps.LatLng(lat, lng);
    mapInstance.current.panTo(moveLatLon);
    mapInstance.current.setLevel(5); // 클릭 시 해당 장소를 자세히 보기 위해 확대
  };

  // 잘못된 접근 처리
  if (!character) {
    return (
      <div style={{ padding: "100px 20px", textAlign: "center" }}>
        <p>캐릭터 정보를 찾을 수 없습니다.</p>
        <button onClick={() => navigate("/")} style={{ marginTop: "20px", padding: "10px 20px" }}>홈으로 돌아가기</button>
      </div>
    );
  }

  return (
    <div style={{ display: "flex", height: "100vh", width: "100vw", overflow: "hidden" }}>
      
      {/* 🟢 왼쪽: 추천 코스 리스트 사이드바 */}
      <div style={{ 
        width: "380px", 
        padding: "30px 20px", 
        overflowY: "auto", 
        borderRight: "1px solid #eee", 
        backgroundColor: "#fff",
        zIndex: 10 // 지도보다 위에 오도록
      }}>
        <button 
          onClick={() => navigate(-1)} 
          style={{ marginBottom: "20px", cursor: "pointer", border: "none", background: "none", color: "#999", fontSize: "14px", display: "flex", alignItems: "center", gap: "5px" }}
        >
          ← 뒤로가기
        </button>
        
        <div style={{ marginBottom: "30px" }}>
          <h2 style={{ fontSize: "24px", marginBottom: "8px" }}>
            <span style={{ marginRight: "8px" }}>{character.emoji}</span>
            {character.name} 코스
          </h2>
          <p style={{ color: "#666", fontSize: "14px", lineHeight: "1.5" }}>
            은지님의 여행 DNA에 꼭 맞는<br />추천 장소들을 모아봤어요.
          </p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {places.map((place, idx) => {
            const isActive = activeIndex === idx; // 현재 이 아이템이 활성화되었는지 확인
            
            return (
              <div 
                key={idx} 
                onClick={() => handlePlaceClick(place.lat, place.lng, idx)}
                style={{ 
                  padding: "20px", 
                  borderRadius: "16px", 
                  cursor: "pointer",
                  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)", // 부드러운 애니메이션
                  backgroundColor: isActive ? "#fff" : "#f8f9fa",
                  border: isActive ? `2px solid ${character.color}` : "2px solid transparent",
                  boxShadow: isActive ? "0 8px 20px rgba(0,0,0,0.1)" : "none",
                  transform: isActive ? "translateY(-4px)" : "none",
                }}
              >
                <h3 style={{ 
                  fontSize: "17px", 
                  marginBottom: "6px", 
                  color: isActive ? character.color : "#333",
                  fontWeight: "bold" 
                }}>
                  {place.name}
                </h3>
                <p style={{ fontSize: "13px", color: "#999", marginBottom: "10px" }}>{place.address}</p>
                <p style={{ 
                  fontSize: "14px", 
                  color: isActive ? "#444" : "#777", 
                  lineHeight: "1.6",
                  wordBreak: "keep-all"
                }}>
                  {place.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* 🔵 오른쪽: 카카오 지도 영역 */}
      <div 
        ref={mapRef} 
        style={{ 
          flex: 1, 
          height: "100vh", 
          backgroundColor: "#f0f0f0" 
        }} 
      />
    </div>
  );
}