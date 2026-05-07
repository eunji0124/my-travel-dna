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
      {/* 상단 게이지 바 */}
      <div style={{ 
        width: "100%", 
        height: "8px", 
        backgroundColor: "#eee", 
        borderRadius: "10px", 
        marginBottom: "30px",
        overflow: "hidden"
      }}>
        <div style={{ 
          width: `${progressPercent}%`, 
          height: "100%", 
          backgroundColor: "#4A90E2",
          transition: "width 0.3s ease-in-out",
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
          >
            {option.text}
          </button>
        ))}
      </div>
    </div>
  );
}
