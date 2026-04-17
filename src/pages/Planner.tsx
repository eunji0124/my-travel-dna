import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { plannerData } from "../data/plannerData";

declare global {
  interface Window {
    /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
    kakao: any;
  }
}

export default function Planner() {
  const location = useLocation();
  const navigate = useNavigate();
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<any>(null);

  const character = location.state?.character;
  const places = character ? plannerData[character.id] : [];
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (!character || !mapRef.current || !window.kakao || places.length === 0) return;

    window.kakao.maps.load(() => {
      const container = mapRef.current;
      if (!container) return;

      // 1. 처음부터 첫 번째 장소를 중심으로 설정 (전체 범위를 잡는 setBounds 제거)
      const options = {
        center: new window.kakao.maps.LatLng(places[0].lat, places[0].lng),
        level: 5, // 첫 번째 장소가 바로 잘 보이도록 적절한 확대 레벨 설정
      };

      const map = new window.kakao.maps.Map(container, options);
      mapInstance.current = map;

      // 2. 모든 마커를 미리 생성해서 지도에 올려둠 (이동 시 바로 보이게)
      places.forEach((place) => {
        const markerPosition = new window.kakao.maps.LatLng(place.lat, place.lng);
        const marker = new window.kakao.maps.Marker({
          position: markerPosition,
          clickable: true
        });
        marker.setMap(map);
      });
      
      // 첫 로드 시 지도가 잘 그려지도록 relayout 호출 (네트워크 환경 대비)
      map.relayout();
    });
  }, [character, places]);

  const handlePlaceClick = (lat: number, lng: number, index: number) => {
    // 3. 지도 객체가 확실히 있을 때만 실행
    if (!mapInstance.current) return;

    setActiveIndex(index);

    const moveLatLon = new window.kakao.maps.LatLng(lat, lng);
    
    // 4. 이동 전 지도가 깨지지 않도록 강제 재배치 후 부드럽게 이동
    mapInstance.current.relayout(); 
    mapInstance.current.setCenter(moveLatLon); // panTo 대신 setCenter로 확실하게 좌표 고정 후
    mapInstance.current.setLevel(5); // 레벨 재조정
  };

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
      <div style={{ 
        width: "380px", 
        padding: "30px 20px", 
        overflowY: "auto", 
        borderRight: "1px solid #eee", 
        backgroundColor: "#fff",
        zIndex: 10 
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
            은지님의 여행 DNA에 꼭 맞는 추천 장소들을 모아봤어요.
          </p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {places.map((place, idx) => {
            const isActive = activeIndex === idx;
            return (
              <div 
                key={idx} 
                onClick={() => handlePlaceClick(place.lat, place.lng, idx)}
                style={{ 
                  padding: "20px", 
                  borderRadius: "16px", 
                  cursor: "pointer",
                  transition: "all 0.3s ease",
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