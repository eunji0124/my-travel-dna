export interface Place {
  name: string;
  description: string;
  lat: number;
  lng: number;
  address: string;
}

export const plannerData: Record<string, Place[]> = {
  "roe-deer": [
    { name: "제주 올레길 7코스", description: "해안 절경을 따라 걷는 노루들을 위한 최고의 트래킹 코스", lat: 33.24, lng: 126.55, address: "제주 서귀포시" },
    { name: "인제 자작나무 숲", description: "하얀 나무 사이로 쭉 뻗은 길을 따라 즐기는 숲길 산책", lat: 37.91, lng: 128.27, address: "강원 인제군" }
  ],
  "otter": [
    { name: "양양 서피비치", description: "에너지 넘치는 서핑과 힙한 해변 문화를 동시에!", lat: 38.02, lng: 128.71, address: "강원 양양군" },
    { name: "단양 패러글라이딩", description: "하늘 위에서 느끼는 짜릿한 액티비티의 정수", lat: 36.98, lng: 128.39, address: "충북 단양군" }
  ],
  "squirrel": [
    { name: "전주 한옥마을", description: "비빔밥부터 길거리 음식까지, 미식가 다람쥐들의 성지", lat: 35.81, lng: 127.15, address: "전북 전주시" },
    { name: "부산 해운대 시장", description: "곰장어와 싱싱한 해산물이 가득한 맛집 탐방", lat: 35.16, lng: 129.16, address: "부산 해운대구" }
  ],
  "sloth": [
    { name: "담양 죽녹원", description: "대나무 숲 사이 정자에서 즐기는 느긋한 휴식", lat: 35.32, lng: 127.00, address: "전남 담양군" },
    { name: "남해 사천 풀빌라", description: "바다를 보며 아무것도 하지 않을 자유", lat: 34.83, lng: 128.11, address: "경남 남해군" }
  ],
  "border-collie": [
    { name: "서울 경복궁 & 서촌", description: "역사와 문화가 공존하는 곳에서 즐기는 계획적인 도심 투어", lat: 37.57, lng: 126.97, address: "서울 종로구" },
    { name: "수원 화성 행궁", description: "완벽하게 보존된 성곽길을 따라 걷는 스마트한 산책", lat: 37.28, lng: 127.01, address: "경기 수원시" }
  ],
  "cat": [
    { name: "서울 을지로 골목", description: "좁은 골목 속 숨겨진 힙한 카페와 갤러리 탐험", lat: 37.56, lng: 126.99, address: "서울 중구" },
    { name: "통영 동피랑 마을", description: "골목 구석구석 그려진 벽화를 따라 즐기는 즉흥 여행", lat: 34.84, lng: 128.42, address: "경남 통영시" }
  ],
  "retriever": [
    { name: "가평 아침고요수목원", description: "가족, 친구들과 함께 도란도란 걷기 좋은 다정한 정원", lat: 37.74, lng: 127.35, address: "경기 가평군" },
    { name: "강릉 안목해변 커피거리", description: "바다 향기와 커피 한 잔, 사람들과의 즐거운 수다", lat: 37.77, lng: 128.94, address: "강원 강릉시" }
  ],
  "peacock": [
    { name: "포항 호미곶 & 구룡포", description: "상생의 손과 동백꽃 필 무렵 촬영지에서 남기는 인생샷", lat: 36.07, lng: 129.56, address: "경북 포항시" },
    { name: "담양 메타세쿼이아길", description: "초록빛 터널 아래서 찍는 화보 같은 사진 스팟", lat: 35.32, lng: 127.02, address: "전남 담양군" }
  ]
};