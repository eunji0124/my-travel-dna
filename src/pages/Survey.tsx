import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { questions } from "../data/questions";

type Answer = {
  axis: string;
  value: string;
};

export default function Survey() {
  const navigate = useNavigate();

  // 현재 질문 인덱스
  const [currentIndex, setCurrentIndex] = useState(0);

  // 사용자 답변 저장
  const [answers, setAnswers] = useState<Answer[]>([]);

  const currentQuestion = questions[currentIndex];

  const progressPercent = ((currentIndex + 1) / questions.length) * 100;

  const handleAnswer = (answer: Answer) => {
    const newAnswers = [...answers, answer];
    setAnswers(newAnswers);

    if (currentIndex + 1 < questions.length) {
      setCurrentIndex(currentIndex + 1);
    } else {
      navigate("/result", { state: { answers: newAnswers } });
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "500px", margin: "0 auto" }}>
      {/* 🚀 상단 게이지 바 */}
      <div style={{ 
        width: "100%", 
        height: "8px", 
        backgroundColor: "#eee", 
        borderRadius: "10px", 
        marginBottom: "30px",
        overflow: "hidden" // 안쪽 바가 튀어나가지 않게
      }}>
        <div style={{ 
          width: `${progressPercent}%`, 
          height: "100%", 
          backgroundColor: "#4A90E2", // 은지님의 포인트 컬러로 변경 가능
          transition: "width 0.3s ease-in-out", // 부드러운 애니메이션
          borderRadius: "10px"
        }} />
      </div>

      {/* 현재 단계 표시 */}
      <p style={{ color: "#888", fontSize: "14px" }}>
        Q {currentIndex + 1} / {questions.length}
      </p>

      <h2>{currentQuestion.question}</h2>

      <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginTop: "30px" }}>
        {currentQuestion.options.map((option, idx) => (
          <button
            key={idx}
            onClick={() => handleAnswer({ axis: option.axis, value: option.value })}
            style={{
              padding: "16px",
              borderRadius: "12px",
              border: "1px solid #ddd",
              backgroundColor: "#fff",
              cursor: "pointer",
              textAlign: "left",
              fontSize: "16px",
              transition: "all 0.2s"
            }}
            // 마우스 호버 효과를 주고 싶다면 별도의 CSS나 inline 이벤트를 활용하세요!
          >
            {option.text}
          </button>
        ))}
      </div>
    </div>
  );
}
