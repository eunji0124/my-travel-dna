import { useLocation, useNavigate } from "react-router-dom";
import { getBestMatchCharacter } from "../utils/findCharacter";

export default function Result() {
  const location = useLocation();
  const navigate = useNavigate();
  const answers = location.state?.answers || [];
  const character = getBestMatchCharacter(answers);

  if (!character) {
    return (
      <div style={{ textAlign: "center", padding: "50px" }}>
        <p>결과를 찾을 수 없어요. 😢</p>
        <button onClick={() => navigate("/")}>홈으로 가기</button>
      </div>
    );
  }

  return (
    <div style={{
      maxWidth: "500px",
      margin: "0 auto",
      padding: "40px 20px",
      textAlign: "center",
      minHeight: "100vh"
    }}>
      <h2 style={{ fontSize: "1.2rem", color: "#888", marginBottom: "10px" }}>나의 여행 DNA는?</h2>
      
      {/* 캐릭터 카드 섹션 */}
      <div style={{
        backgroundColor: "#fff",
        borderRadius: "24px",
        padding: "40px 20px",
        boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
        borderTop: `10px solid ${character.color}` // 캐릭터 고유색 포인트
      }}>
        <div style={{marginBottom: "20px" }}>
          <img 
            src={`/images/${character.id}.png`} 
            alt={character.name}
            style={{ 
              width: "100%", 
              maxWidth: "250px", 
              height: "auto",
              borderRadius: "15px" 
            }}
            // 이미지가 없을 경우를 대비해 에러 처리를 하면 더 전문적입니다.
            onError={(e) => {
              e.currentTarget.style.display = 'none'; // 이미지가 없으면 숨기고
              e.currentTarget.nextElementSibling?.setAttribute('style', 'display: block; font-size: 80px;'); // 이모지를 보여줌
            }}
          />
          <div style={{ display: "none" }}>{character.emoji}</div>
        </div>
        
        <h1 style={{ fontSize: "2rem", color: character.color, marginBottom: "10px" }}>
          {character.name}
        </h1>
        
        <p style={{ fontSize: "1.1rem", color: "#444", fontWeight: "500", marginBottom: "25px" }}>
          "{character.description}"
        </p>

        {/* 성향 요약 (Traits) */}
        <div style={{
          display: "flex",
          justifyContent: "space-around",
          backgroundColor: "#f8f9fa",
          padding: "15px",
          borderRadius: "15px",
          marginBottom: "30px"
        }}>
          <div>
            <div style={{ fontSize: "12px", color: "#999" }}>활동성</div>
            <div style={{ fontWeight: "bold" }}>{character.match.activity === 'active' ? '에너지' : '여유'}</div>
          </div>
          <div>
            <div style={{ fontSize: "12px", color: "#999" }}>계획</div>
            <div style={{ fontWeight: "bold" }}>{character.match.planning === 'plan' ? '완벽' : '즉흥'}</div>
          </div>
          <div>
            <div style={{ fontSize: "12px", color: "#999" }}>관심사</div>
            <div style={{ fontWeight: "bold" }}>{character.match.focus}</div>
          </div>
        </div>
      </div>

      {/* 하단 버튼들 */}
      <div style={{ marginTop: "30px", display: "flex", flexDirection: "column", gap: "10px" }}>
        <button 
          onClick={() => navigate("/planner", { state: { character } })} // 다음 단계인 플래너로 유도
          style={{
            padding: "16px",
            borderRadius: "12px",
            border: "none",
            backgroundColor: "#333",
            color: "#fff",
            fontWeight: "bold",
            cursor: "pointer"
          }}
        >
          {character.name} 맞춤 코스 보러가기
        </button>
        
        <button 
          onClick={() => navigate("/")}
          style={{
            padding: "16px",
            borderRadius: "12px",
            border: "1px solid #ddd",
            backgroundColor: "transparent",
            color: "#888",
            cursor: "pointer"
          }}
        >
          테스트 다시하기
        </button>
      </div>
    </div>
  );
}