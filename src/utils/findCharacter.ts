import { characters } from "../data/characters";
import type { UserAnswer, Character } from "../types/survey";

export function getBestMatchCharacter(userAnswers: UserAnswer[]): Character {
  // 1. 각 캐릭터별로 점수를 매깁니다.
  const scoredCharacters = characters.map((char) => {
    let score = 0;

    // 사용자가 선택한 모든 답변을 순회하며 캐릭터의 성향과 일치하는지 확인
    userAnswers.forEach((answer) => {
      // 캐릭터가 가진 해당 축의 값과 사용자의 답변 값이 같으면 1점 추가
      if (char.match[answer.axis] === answer.value) {
        score++;
      }
    });

    return { ...char, score };
  });

  // 2. 가장 높은 점수를 찾습니다.
  const maxScore = Math.max(...scoredCharacters.map((c) => c.score));

  // 3. 최고 점수를 가진 캐릭터들만 모읍니다. (동점자 처리용)
  const winners = scoredCharacters.filter((c) => c.score === maxScore);

  // 4. 당첨! (동점자가 있다면 첫 번째 캐릭터 반환)
  return winners[0];
}