import { useEffect, useRef } from "react"; // useRef, useEffect 추가
import { useLocation, useNavigate } from "react-router-dom";
import { plannerData } from "../data/plannerData";

// TypeScript 환경에서 kakao 객체를 인식시키기 위한 선언
declare global {
  interface Window {
    /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
    kakao: any; 
  }
}

export default function Planner() {
  const location = useLocation();
  const navigate = useNavigate();
  const mapRef = useRef<HTMLDivElement>(null); // 1. 지도를 담을 도화지(DOM) 참조 생성

  const character = location.state?.character;
  const places = character ? plannerData[character.id] : [];

  useEffect(() => {
    // kakao 객체가 있는지 먼저 확인
    if (!character || !mapRef.current || !window.kakao) return;

    // 💡 autoload=false를 썼을 때 사용하는 안전한 로드 방식
    window.kakao.maps.load(() => {
      const container = mapRef.current;
      
      // 만약 container가 사라졌다면 종료 (안전장치)
      if (!container) return;

      const options = {
        center: new window.kakao.maps.LatLng(places[0].lat, places[0].lng),
        level: 9,
      };

      const map = new window.kakao.maps.Map(container, options);
      const bounds = new window.kakao.maps.LatLngBounds();

      places.forEach((place) => {
        const markerPosition = new window.kakao.maps.LatLng(place.lat, place.lng);
        const marker = new window.kakao.maps.Marker({
          position: markerPosition,
        });
        marker.setMap(map);
        bounds.extend(markerPosition);
      });

      if (places.length > 1) {
        map.setBounds(bounds);
      }
    });
  }, [character, places]);

  if (!character) {
    return <div style={{ padding: "50px", textAlign: "center" }}>잘못된 접근입니다.</div>;
  }

  return (
    <div style={{ display: "flex", height: "100vh", overflow: "hidden" }}>
      {/* 🟢 왼쪽: 장소 리스트 영역 (기존 유지) */}
      <div style={{ width: "350px", padding: "20px", overflowY: "auto", borderRight: "1px solid #eee", backgroundColor: "#fff" }}>
        <button onClick={() => navigate(-1)} style={{ marginBottom: "20px", cursor: "pointer", border: "none", background: "none", color: "#888" }}>← 뒤로가기</button>
        <h2 style={{ marginBottom: "5px" }}>{character.emoji} {character.name} 코스</h2>
        <p style={{ color: "#666", fontSize: "14px", marginBottom: "30px" }}>당신의 DNA에 딱 맞는 추천 장소예요.</p>
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          {places.map((place, idx) => (
            <div key={idx} style={{ padding: "15px", borderRadius: "12px", backgroundColor: "#f9f9f9", borderLeft: `5px solid ${character.color}` }}>
              <h3 style={{ fontSize: "16px", marginBottom: "5px" }}>{place.name}</h3>
              <p style={{ fontSize: "13px", color: "#888", marginBottom: "8px" }}>{place.address}</p>
              <p style={{ fontSize: "14px", color: "#444", lineHeight: "1.4" }}>{place.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 🔵 오른쪽: 지도 영역 (useRef 연결) */}
      <div 
        ref={mapRef} 
        style={{ 
          flex: 1, 
          height: "100vh", // 부모인 flex container의 높이를 꽉 채우도록 명시
          backgroundColor: "#e5e5e5" 
        }} 
      />
    </div>
  );
}