import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      height: "100vh",
      padding: "20px",
      textAlign: "center",
      backgroundColor: "#f9f9f9"
    }}>
      {/* 귀여운 아이콘이나 일러스트가 들어갈 자리 */}
      <div style={{ fontSize: "64px", marginBottom: "20px" }}>✈️</div>
      
      <h1 style={{ fontSize: "2.5rem", fontWeight: "bold", marginBottom: "10px", color: "#333" }}>
        My Travel DNA
      </h1>
      <p style={{ fontSize: "1.1rem", color: "#666", marginBottom: "40px", lineHeight: "1.6" }}>
        뻔한 여행지 추천은 그만!<br />
        나의 행동 패턴으로 분석하는 '여행 자아' 찾기
      </p>

      <button 
        onClick={() => navigate("/survey")}
        style={{
          padding: "18px 40px",
          fontSize: "1.2rem",
          fontWeight: "bold",
          color: "#fff",
          backgroundColor: "#4A90E2",
          border: "none",
          borderRadius: "50px",
          cursor: "pointer",
          boxShadow: "0 4px 15px rgba(74, 144, 226, 0.3)",
          transition: "transform 0.2s"
        }}
        onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.05)"}
        onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
      >
        테스트 시작하기
      </button>
    </div>
  );
}