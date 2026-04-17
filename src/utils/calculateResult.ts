type Answer = {
  axis: string;
  value: string;
};

export function calculateResult(answers: Answer[]) {
  const result: Record<string, string[]> = {};

  answers.forEach(({ axis, value }) => {
    if (!result[axis]) result[axis] = [];
    result[axis].push(value);
  });

  // 각 축에서 가장 많이 나온 값 선택
  const finalResult: Record<string, string> = {};

  Object.keys(result).forEach((axis) => {
    const counts: Record<string, number> = {};

    result[axis].forEach((v) => {
      counts[v] = (counts[v] || 0) + 1;
    });

    finalResult[axis] = Object.keys(counts).reduce((a, b) =>
      counts[a] > counts[b] ? a : b
    );
  });

  return finalResult;
}
