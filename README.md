# RE:TRO | 그때 그 시절, 당신의 음악
![image](https://user-images.githubusercontent.com/56349582/160143139-a79ea4cc-e035-4485-9496-0dca20500ee8.png)
<br/>

## 목차
- [프로젝트 소개](##프로젝트-소개)
- [개발 기간](##개발-기간)
- [개발 인원](##개발-인원)
- [웹사이트 링크](##웹사이트-링크)
- [웹사이트 구현 영상](##웹사이트-구현-영상)
- [페이지 소개](##페이지-소개)
- [기술 스택](##기술-스택)
- [개발 문서](##개발-문서)
<br/>

## 프로젝트 소개
1980년대부터 2010년대까지, 그때 그 시절 우리의 음악을 들을 수 있는 레트로 뮤직 웹사이트
<br/>
<br/>

## 개발 기간
2022.03.02 ~ 2022.03.17
<br/>
<br/>

## 개발 인원

### FE
- 김소정
- 성다연
- 임세민
- 지수빈

### BE
- [김광윤](https://github.com/Kwangdol9063)
- [김동우](https://github.com/kimphysicsman)
<br/>

## 웹사이트 링크
[https://retro-music.co.kr/](https://retro-music.co.kr/)
<br/>

## 웹사이트 구현 영상
[https://youtu.be/6pckrogx6go](https://youtu.be/6pckrogx6go)
<br/>
<br/>

## 페이지 소개

### 페이지별 공통 기능

- 상단 헤더
    - 메인페이지, 음악성향테스트, 마이페이지, RE:TRO 소개페이지로 이동할 수 있습니다.
    - 로그인, 회원가입 페이지로 이동 가능하고 로그인 시 로그아웃, 마이페이지 이동 버튼이 활성화 됩니다.
    - 노래 검색 창에 검색어를 입력하여 해당 제목, 가수가 포함된 노래를 조회할 수 있습니다.
- 하단 플레이어 바
    - 페이지 내 재생버튼 클릭시 해당 노래를 재생합니다.
    - 노래를 재생하면 재생/일시정지 버튼이 활성화 됩니다.
    - 로그인 중이라면 재생 중인 노래의 좋아요 버튼이 반영되고 클릭하여 좋아요 선택/취소가 가능합니다.
- 하단 푸터


### 메인페이지
- 상단 배너
    - 팝업 닫기 버튼으로 부드럽게 사라지게 할 수 있습니다.
- RE:TRO 차트 조회
    - RE:TRO 차트에서 시대별 1~6위의 노래들을 볼 수 있습니다.
    - 시대별(1980~2010) 버튼을 클릭하여 차트의 년도를 변경할 수 있습니다.
    - 앨범 이미지 우측상단의 재생버튼을 클릭하여 해당 노래를 하단 플레이어바를 통해 재생할 수 있습니다.
    - 노래 제목을 클릭하여 RE:TRO 차트 페이지로 이동할 수 있습니다.
- 각종 페이지 이동 기능
    - 성향 테스트 페이지로 이동 가능합니다.
    - 레트로 모음집 : 년도별(1980~2010, 전체곡) 버튼을 클릭하여 RE:TRO 모음집 페이지에서 클릭한 연도를 반영하여 이동 가능합니다.
    - 이문세, 이선희 모음집 추천 플레이리스트 페이지로 이동 가능합니다.
    - Developer’s Pick 추천플레이리스트 페이지로 이동 가능합니다.
    - 마이페이지로 이동 가능합니다.
    
    
### 로그인 / 회원가입 페이지
- 로그인 페이지
    - 아이디와 패스워드를 올바르게 입력하면 로그인이 가능합니다.
    - 존재하지 않는 아이디와 올바르지 않은 패스워드 입력 시 안내 팝업창을 띄웁니다.
    - 회원가입 페이지로 이동 가능합니다.
- 회원가입 페이지
    - 회원정보(이름, 이메일, 아이디, 패스워드)를 입력할 수 있습니다.
    - 이미 등록된 이름과 이메일은 중복으로 입력할 수 없습니다.
    - 회원 정보 설정
        - 이메일: xxxx@xxxx.xxx 형식 확인
        - 아이디: 영어와 숫자만 사용 가능
        - 패스워드: 10자 이상 제한
        - 패스워드 재확인(일치 여부)  가능
        

### 마이페이지
- 회원정보
    - 이름, 이메일 등 간단한 회원정보를 조회합니다.
    - 회원탈퇴 버튼을 클릭하면 확인 팝업 창이 뜨고 탈퇴가 가능합니다.
    - 회원탈퇴 시 유저정보, 좋아요, 성향테스트 정보는 모두 삭제됩니다.
- 성향 테스트 결과 확인
    - 나의 성향테스트 결과를 확인하고 추천음악을 들을 수 있습니다.
    - 성향 테스트를 하지않았다면 성향 테스트 페이지로 이동할 수 있습니다.
- MY 플레이리스트
    - 좋아요 누른 노래를 시대별로 조회할 수 있습니다.
    - 해당 노래의 듣기 버튼을 통해 하단 플레이어바로 재생할 수 있습니다.
    - 좋아요버튼을 통해 좋아요 취소하고 플레이리스트에서 삭제 가능합니다.
    

### RE:TRO 차트 페이지
- 시대별(1980~2010) 1위부터 100위까지의 노래 정보(앨범 이미지, 앨범 타이틀, 노래제목, 아티스트명) 조회합니다.
- 해당 노래의 듣기 버튼을 통해 하단 플레이어바로 재생할 수 있습니다.
- 좋아요버튼을 통해 좋아요 선택/취소 가능합니다.
- 좋아요버튼을 클릭한 노래가 하단 플레이어바에서 재생중이라면 하단 플레이어바의 좋아요버튼이 업데이트 됩니다.
- 하단 플레이어바에서 재생중인 노래의 좋아요버튼을 누르면 RE:TRO차트에서 해당 노래의 좋아요버튼이 업데이트 됩니다.

### RE:TRO 모음집 페이지
- 년도별(1980~2019) 200곡의 노래 정보(앨범 이미지, 앨범 타이틀, 노래제목, 아티스트명) 조회합니다.
- 전체곡은 랜덤한 노래 400곡의 노래 정보(앨범 이미지, 앨범 타이틀, 노래제목, 아티스트명) 조회합니다.
- 해당 노래의 듣기 버튼을 통해 하단 플레이어바로 재생할 수 있습니다.
- 좋아요버튼을 통해 좋아요 선택/취소 가능합니다.
- 좋아요버튼을 클릭한 노래가 하단 플레이어바에서 재생중이라면 하단 플레이어바의 좋아요버튼이 업데이트 됩니다.
- 하단 플레이어바에서 재생중인 노래의 좋아요버튼을 누르면 RE:TRO 모음집에서 해당 노래의 좋아요버튼이 업데이트 됩니다.

### 노래 검색 결과 페이지
- 제목, 아티스트 명으로 노래를 검색하고 노래 정보(앨범 이미지, 앨범 타이틀, 노래제목, 아티스트명) 조회합니다.
    - ex) “사랑” 검색 시 “사랑”이 포함된 모든 곡 나열
    - ex) “아이유” 검색 시 아티스트 “아이유”가 부른 노래 및 피처링에 참여한 모든 곡 나열
- 해당 노래의 듣기 버튼을 통해 하단 플레이어바로 재생할 수 있습니다.
- 좋아요버튼을 통해 좋아요 선택/취소 가능합니다.
- 좋아요버튼을 클릭한 노래가 하단 플레이어바에서 재생중이라면 하단 플레이어바의 좋아요버튼이 업데이트 됩니다.
- 하단 플레이어바에서 재생중인 노래의 좋아요버튼을 누르면 검색 결과 페이지에서 해당 노래의 좋아요버튼이 업데이트 됩니다.

### 추천 플레이리스트 페이지
- 추천 가수(이문세, 이선희)의 노래들로만 이루어진 플레이리스트(노래 리스트)를 조회합니다.
- Developer’s Pick, 6가지의 주제별 노래들로 이루어진 플레이리스트(노래 리스트)를 조회합니다.
- 해당 노래의 듣기 버튼을 통해 하단 플레이어바로 재생할 수 있습니다.
- 좋아요버튼을 통해 좋아요 선택/취소 가능합니다.
- 좋아요버튼을 클릭한 노래가 하단 플레이어바에서 재생중이라면 하단 플레이어바의 좋아요버튼이 업데이트 됩니다.
- 하단 플레이어바에서 재생중인 노래의 좋아요버튼을 누르면 검색 결과 페이지에서 해당 노래의 좋아요버튼이 업데이트 됩니다.

### 성향 테스트 페이지
- 인트로 페이지에서 공유하기 버튼을 클릭하여 해당 페이지 url을 클립보드에 복사합니다. (meta 태그, Open Graph 사용)
- 2선택지 질문 총 4가지로 16가지 결과에서 결과 타입은 4가지로 보여줍니다.
    - 비주얼 타입: 노래 실력 + 비주얼 = 만족도 200%
    - 감성 타입: 꿀 음색 + 감성 촉촉한 팝 & 발라드
    - 그루브 타입: 나의 혈관에도 그루부와 소울이 흐르지!
    - 유니크 타입: 끝까지 나만 알고 싶은 소중한 아티스트
- 테스트 결과에 따른 추천 음악은 16가지로 추천해줍니다.
- 성향 테스트 결과를 회원 정보에 반영하여 마이페이지에 접속시 보여줍니다.

### 소개 페이지
- 전체 웹사이트 이용 방법을 설명하는 페이지입니다.
<br/>

## 기술 스택

### FE
- HTML5 / CSS3 / Javascript ES6+
- jQuery / Ajax

### BE

- Python(flask)
- mongoDB
<br/>

## 개발 문서
- [페이지 설계, 페이지 기획, API 설계, DB 설계 등 개발 문서](https://www.notion.so/RE-TRO-15d5dadcf1924e36bba7888977c379e2)
