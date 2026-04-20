export interface Place {
  order: number;
  name: string;
  description: string;
  lat: number;
  lng: number;
  address: string;
  transport?: string;
  duration?: string;
}

export interface Course {
  region: string;
  title: string;
  places: Place[];
}

export const plannerData: Record<string, Course[]> = {
  "roe-deer": [
    {
      region: "제주",
      title: "서귀포 해안 & 숲길 힐링 코스",
      places: [
        { order: 1, name: "제주 올레길 7코스", description: "해안 절경을 따라 걷는 최고의 트래킹 코스", lat: 33.2402, lng: 126.5512, address: "제주 서귀포시", transport: "차량", duration: "25분" },
        { order: 2, name: "서귀포 치유의 숲", description: "편백나무 사이로 쏟아지는 햇살 산책", lat: 33.2921, lng: 126.5401, address: "제주 서귀포시", transport: "차량", duration: "20분" },
        { order: 3, name: "원앙폭포", description: "에메랄드빛 폭포 아래서 시원한 마무리", lat: 33.3033, lng: 126.5812, address: "제주 서귀포시" }
      ]
    },
    {
      region: "인제",
      title: "강원도 순백의 자작나무 숲 코스",
      places: [
        { order: 1, name: "속삭이는 자작나무 숲", description: "하얀 나무 사이로 쭉 뻗은 길을 따라 즐기는 산책", lat: 37.8917, lng: 128.2067, address: "강원 인제군", transport: "차량", duration: "30분" },
        { order: 2, name: "필례약수터", description: "울창한 숲속에서 즐기는 시원한 약수 한 모금", lat: 38.0121, lng: 128.3121, address: "강원 인제군", transport: "차량", duration: "20분" },
        { order: 3, name: "백담사", description: "계곡물 소리를 들으며 걷는 고즈넉한 사찰길", lat: 38.1277, lng: 128.3027, address: "강원 인제군" }
      ]
    }
  ],
  "otter": [
    {
      region: "양양",
      title: "서핑과 바다가 만나는 에너제틱 코스",
      places: [
        { order: 1, name: "양양 서피비치", description: "에너지 넘치는 서핑과 힙한 해변 문화", lat: 38.0622, lng: 128.6432, address: "강원 양양군", transport: "도보", duration: "10분" },
        { order: 2, name: "하조대 전망대", description: "탁 트인 동해 뷰를 즐기는 짧은 트래킹", lat: 38.0587, lng: 128.6376, address: "강원 양양군", transport: "차량", duration: "15분" },
        { order: 3, name: "낙산사", description: "바다 위 절벽 사찰에서 느끼는 웅장함", lat: 38.1248, lng: 128.6394, address: "강원 양양군" }
      ]
    },
    {
      region: "단양",
      title: "하늘과 강에서 즐기는 스릴 코스",
      places: [
        { order: 1, name: "단양 패러글라이딩", description: "하늘 위에서 느끼는 짜릿한 액티비티의 정수", lat: 36.9852, lng: 128.3912, address: "충북 단양군", transport: "차량", duration: "20분" },
        { order: 2, name: "만천하 스카이워크", description: "남한강 절벽 위를 걷는 듯한 아찔한 경험", lat: 36.9812, lng: 128.3512, address: "충북 단양군", transport: "차량", duration: "15분" },
        { order: 3, name: "도담삼봉", description: "강 위에 떠 있는 세 개의 봉우리 산책", lat: 36.9992, lng: 128.3682, address: "충북 단양군" }
      ]
    }
  ],
  "squirrel": [
    {
      region: "전주",
      title: "한옥마을 먹거리 정복 코스",
      places: [
        { order: 1, name: "전주 한옥마을", description: "미식가 다람쥐들을 위한 길거리 음식 성지", lat: 35.8147, lng: 127.1526, address: "전북 전주시", transport: "도보", duration: "10분" },
        { order: 2, name: "전주 남부시장 청년몰", description: "힙한 감성의 먹거리와 소품샵 탐방", lat: 35.8115, lng: 127.1485, address: "전북 전주시", transport: "차량", duration: "15분" },
        { order: 3, name: "전주 막걸리 골목", description: "푸짐한 안주와 함께 여행의 맛있는 마무리", lat: 35.8055, lng: 127.1115, address: "전북 전주시" }
      ]
    },
    {
      region: "부산",
      title: "해운대 시장 & 로컬 맛집 코스",
      places: [
        { order: 1, name: "해운대 전통시장", description: "곰장어와 싱싱한 해산물이 가득한 맛집 탐방", lat: 35.1611, lng: 129.1612, address: "부산 해운대구", transport: "도보", duration: "15분" },
        { order: 2, name: "청사포 다릿돌전망대", description: "바다 위를 걸으며 즐기는 조개구이의 맛", lat: 35.1612, lng: 129.1912, address: "부산 해운대구", transport: "차량", duration: "20분" },
        { order: 3, name: "흰여울문화마을", description: "바다 조망 카페 거리에서 즐기는 디저트", lat: 35.0782, lng: 129.0452, address: "부산 영도구" }
      ]
    }
  ],
  "sloth": [
    {
      region: "담양",
      title: "대나무 숲 정자 힐링 코스",
      places: [
        { order: 1, name: "담양 죽녹원", description: "대나무 숲 사이 정자에서 즐기는 느긋한 휴식", lat: 35.3262, lng: 127.0042, address: "전남 담양군", transport: "도보", duration: "15분" },
        { order: 2, name: "관방제림", description: "강변 고목들 사이를 천천히 산책하는 시간", lat: 35.3211, lng: 127.0082, address: "전남 담양군", transport: "차량", duration: "10분" },
        { order: 3, name: "메타세쿼이아길", description: "높은 나무 터널 아래서 즐기는 힐링", lat: 35.3232, lng: 127.0242, address: "전남 담양군" }
      ]
    },
    {
      region: "남해",
      title: "바다를 보며 아무것도 안 하는 코스",
      places: [
        { order: 1, name: "남해 독일마을", description: "이국적인 풍경 속에 앉아 바다 멍 때리기", lat: 34.7854, lng: 127.9568, address: "경남 남해군", transport: "차량", duration: "20분" },
        { order: 2, name: "다랭이마을", description: "계단식 논과 바다가 어우러진 느린 산책", lat: 34.7252, lng: 127.8921, address: "경남 남해군", transport: "차량", duration: "15분" },
        { order: 3, name: "보리암", description: "남해 바다가 한눈에 보이는 절벽 위 여유", lat: 34.7512, lng: 127.9312, address: "경남 남해군" }
      ]
    }
  ],
  "border-collie": [
    {
      region: "서울",
      title: "종로 역사 & 미술관 루트",
      places: [
        { order: 1, name: "경복궁", description: "역사와 문화가 공존하는 계획적인 도심 투어", lat: 37.5796, lng: 126.9770, address: "서울 종로구", transport: "도보", duration: "15분" },
        { order: 2, name: "국립현대미술관 서울", description: "현대 미술의 정수를 계획적으로 관람하기", lat: 37.5801, lng: 126.9805, address: "서울 종로구", transport: "도보", duration: "10분" },
        { order: 3, name: "북촌 한옥마을", description: "정갈한 한옥 골목을 따라 즐기는 산책", lat: 37.5826, lng: 126.9836, address: "서울 종로구" }
      ]
    },
    {
      region: "수원",
      title: "수원 화성 완벽 성곽 탐방",
      places: [
        { order: 1, name: "수원 화성 행궁", description: "완벽하게 보존된 성곽길을 따라 걷는 스마트한 산책", lat: 37.2812, lng: 127.0112, address: "경기 수원시", transport: "도보", duration: "20분" },
        { order: 2, name: "방화수류정", description: "성곽 아래 연못이 보이는 아름다운 정자 관람", lat: 37.2892, lng: 127.0152, address: "경기 수원시", transport: "도보", duration: "15분" },
        { order: 3, name: "수원 팔달문 시장", description: "계획적인 동선으로 즐기는 전통 시장 투어", lat: 37.2772, lng: 127.0172, address: "경기 수원시" }
      ]
    }
  ],
  "cat": [
    {
      region: "서울",
      title: "을지로 힙플레이스 골목 탐험",
      places: [
        { order: 1, name: "을지로 셔터갤러리", description: "좁은 골목 속 숨겨진 카페와 갤러리 탐험", lat: 37.5661, lng: 126.9912, address: "서울 중구", transport: "도보", duration: "15분" },
        { order: 2, name: "세운상가 대림상가", description: "빈티지한 감성과 현대적인 공간의 만남", lat: 37.5668, lng: 126.9951, address: "서울 중구", transport: "도보", duration: "20분" },
        { order: 3, name: "동대문 디자인 플라자(DDP)", description: "정해진 길 없이 즐기는 야경 산책", lat: 37.5665, lng: 127.0092, address: "서울 중구" }
      ]
    },
    {
      region: "통영",
      title: "통영 동피랑 벽화마을 투어",
      places: [
        { order: 1, name: "동피랑 벽화마을", description: "골목 구석구석 그려진 벽화를 따라 즐기는 즉흥 여행", lat: 34.8452, lng: 128.4252, address: "경남 통영시", transport: "도보", duration: "15분" },
        { order: 2, name: "강구안 문화마당", description: "항구의 활기찬 분위기와 로컬 시장 탐방", lat: 34.8412, lng: 128.4231, address: "경남 통영시", transport: "차량", duration: "10분" },
        { order: 3, name: "남망산 조각공원", description: "예술 작품과 바다가 어우러진 언덕 탐험", lat: 34.8432, lng: 128.4312, address: "경남 통영시" }
      ]
    }
  ],
  "retriever": [
    {
      region: "가평",
      title: "아침고요수목원 & 레일바이크 코스",
      places: [
        { order: 1, name: "아침고요수목원", description: "함께 도란도란 걷기 좋은 다정한 정원", lat: 37.7438, lng: 127.3524, address: "경기 가평군", transport: "차량", duration: "20분" },
        { order: 2, name: "가평 레일바이크", description: "함께 발을 맞추며 풍경을 감상하는 즐거운 시간", lat: 37.8335, lng: 127.5105, address: "경기 가평군", transport: "차량", duration: "15분" },
        { order: 3, name: "남이섬", description: "배를 타고 들어가 즐기는 우리들만의 힐링", lat: 37.7912, lng: 127.5255, address: "강원 춘천시" }
      ]
    },
    {
      region: "강릉",
      title: "안목해변 커피거리 & 바다산책",
      places: [
        { order: 1, name: "안목해변 커피거리", description: "바다 향기와 커피 한 잔, 즐거운 수다 시간", lat: 37.7712, lng: 128.9482, address: "강원 강릉시", transport: "도보", duration: "20분" },
        { order: 2, name: "강문해변", description: "다양한 포토존에서 함께 남기는 추억 사진", lat: 37.7952, lng: 128.9182, address: "강원 강릉시", transport: "차량", duration: "10분" },
        { order: 3, name: "오죽헌", description: "역사적인 공간을 함께 거닐며 배우는 시간", lat: 37.7792, lng: 128.8801, address: "강원 강릉시" }
      ]
    }
  ],
  "peacock": [
    {
      region: "포항",
      title: "스페이스워크 & 인생샷 코스",
      places: [
        { order: 1, name: "호미곶 해맞이 광장", description: "상생의 손 앞에서 남기는 압도적인 인생샷", lat: 36.0768, lng: 129.5682, address: "경북 포항시", transport: "차량", duration: "30분" },
        { order: 2, name: "구룡포 일본인 가옥거리", description: "드라마 촬영지에서 찍는 화보 같은 스팟", lat: 35.9902, lng: 129.5601, address: "경북 포항시", transport: "차량", duration: "20분" },
        { order: 3, name: "포항 스페이스워크", description: "하늘 위를 걷는 듯한 구름다리 배경의 특별한 경험", lat: 36.0632, lng: 129.3831, address: "경북 포항시" }
      ]
    },
    {
      region: "담양",
      title: "메타세쿼이아 화보 투어",
      places: [
        { order: 1, name: "메타세쿼이아길", description: "초록빛 터널 아래서 찍는 화보 같은 사진 스팟", lat: 35.3232, lng: 127.0242, address: "전남 담양군", transport: "도보", duration: "10분" },
        { order: 2, name: "메타프로방스", description: "유럽풍 마을 배경으로 즐기는 화려한 사진 촬영", lat: 35.3252, lng: 127.0282, address: "전남 담양군", transport: "차량", duration: "15분" },
        { order: 3, name: "소쇄원", description: "조선 시대 정원의 미학을 담은 고풍스러운 배경", lat: 35.2109, lng: 126.9636, address: "전남 담양군" }
      ]
    }
  ]
};