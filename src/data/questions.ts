export const questions = [
  // [Activity 축]
  {
    id: 1,
    question: "드디어 여행지 도착! 짐을 풀자마자 당신의 첫 마디는?",
    options: [
      { text: "짐만 두고 바로 나가자! 1분 1초가 아까워.", axis: "activity", value: "active" },
      { text: "일단 좀 누워야지... 침대랑 물아일체 시간.", axis: "activity", value: "calm" },
    ],
  },
  {
    id: 2,
    question: "여행 중 우연히 발견한 가파른 언덕 위 전망대, 가볼까?",
    options: [
      { text: "올라가면 분명 멋질 거야! 당장 고.", axis: "activity", value: "active" },
      { text: "밑에서 봐도 충분히 예쁜데? 굳이...?", axis: "activity", value: "calm" },
    ],
  },
  // [Planning 축]
  {
    id: 3,
    question: "여행을 떠나기 전, 당신의 지도 앱 상태는?",
    options: [
      { text: "맛집, 카페, 동선별로 핀이 빽빽하게 꽂혀 있다.", axis: "planning", value: "plan" },
      { text: "비어 있다. 현지인한테 물어보는 게 묘미지!", axis: "planning", value: "free" },
    ],
  },
  {
    id: 4,
    question: "가려던 유명 맛집이 갑자기 임시 휴업! 당신의 반응은?",
    options: [
      { text: "당황하지 않고 미리 준비한 '플랜 B' 맛집으로 간다.", axis: "planning", value: "plan" },
      { text: "오히려 좋아! 옆집 메뉴가 맛있어 보이는데? 그냥 가보자.", axis: "planning", value: "free" },
    ],
  },
  // [Focus 축 - 먹거리/사진/사람/탐험]
  {
    id: 5,
    question: "이번 여행에서 딱 하나의 사진만 남길 수 있다면?",
    options: [
      { text: "내가 주인공! 배경과 착장이 완벽한 '인생샷'.", axis: "focus", value: "photo" },
      { text: "현장감 가득! 방금 먹은 미친 비주얼의 '음식 사진'.", axis: "focus", value: "food" },
    ],
  },
  {
    id: 6,
    question: "길을 걷다 분위기 좋은 로컬 펍을 발견했다면?",
    options: [
      { text: "옆자리 사람들에게 말을 걸며 친구가 된다.", axis: "focus", value: "social" },
      { text: "창가 자리에 앉아 조용히 동네 분위기를 만끽한다.", axis: "focus", value: "explore" },
    ],
  },
  {
    id: 7,
    question: "여행 테마를 정한다면 당신의 선택은?",
    options: [
      { text: "유명한 곳은 다 가봐야지! 랜드마크 도장 깨기.", axis: "focus", value: "photo" },
      { text: "남들이 모르는 골목 구석구석을 걷는 보물찾기.", axis: "focus", value: "explore" },
    ],
  },
  {
    id: 8,
    question: "기다리고 기다리던 저녁 시간! 당신의 선택은?",
    options: [
      { text: "줄이 길어도 상관없어! 평점 높은 검증된 맛집.", axis: "focus", value: "food" },
      { text: "사람들 북적이는 핫플레이스! 생각만해도 신나!", axis: "focus", value: "social" },
    ],
  },
  {
    id: 9,
    question: "기념품 샵에 들어갔을 때 당신의 눈길을 사로잡는 것은?",
    options: [
      { text: "그 지역의 특징이 잘 담긴 독특하고 낯선 물건.", axis: "focus", value: "explore" },
      { text: "예쁘게 포장된 것! 사진 찍으면 잘 나올 것 같은 소품.", axis: "focus", value: "photo" },
    ],
  }
];