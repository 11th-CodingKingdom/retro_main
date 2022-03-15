// 질문, 답변 배열
let qnaArr = [
  {
    "Q":"노래를 들을 때<br/>제일 먼저 들리는 건?",
    "A":"멜로디부터 바로 들리던데?",
    "B":"작사가와 영접하여 가사를 이해하려 한다"
  },
  {
    "Q":"처음 만나는 사람과<br/> 노래방에 갔을 때",
    "A":"쑥스럽지만 스타트는 내가 끊는다..!!",
    "B":"조금 있다가 불러야지…"
  },
  {
    "Q":"나의<br/> 에너지 충전 방식은?",
    "A":"밖에서 친구를 만나거나 운동을 한다",
    "B":"집순이도 바빠! 집에서 푹 쉰다"
  },
  {
    "Q":"내 인생음악을<br/> 친구에게 추천할 때",
    "A":"\"난 2절 도입부가 너무 좋더라!\"<br/> 꽂힌 파트에 대해 이야기 한다",
    "B":"\"너무 좋아\"<br/> 전체적인 느낌에 대해 이야기 한다"
  },
];

// 타입 이름, 설명 테이블
let typeTable = {
  "visual": {
    name: "비쥬얼 타입",
    img: "../static/images/NOTE_IMG/retro_NOTE_3.png",
    desc: "노래실력에 걸맞는 비쥬얼 = 만족도200%"
  },
  "sensitive": {
    name: "감성 타입",
    img: "../static/images/NOTE_IMG/retro_NOTE_4.png",
    desc: "꿀 음색 + 감성 촉촉한 팝 & 발라드"
  },
  "groove": {
    name: "그루브 타입",
    img: "../static/images/NOTE_IMG/retro_NOTE_5.png",
    desc: "나의 혈관에도 그루브와 소울이 흐르지!"
  },
  "unique": {
    name: "유니크 타입",
    img: "../static/images/NOTE_IMG/retro_NOTE_6.png",
    desc: "끝까지 나만 알고싶은 소중한 아티스트"
  }
}

// 결과 테이블
let resultTable = {
  "aaaa": {
    type: typeTable.unique,
    youtube: `<iframe width="400" height="220" src="https://www.youtube.com/embed/2Au_na-wtlQ" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`,
    song: "김완선 - 삐에로는 우릴 보고 웃지",
    desc: ""
  },
  "abaa": {
    type: typeTable.unique,
    youtube: `<iframe width="400" height="220" src="https://www.youtube.com/embed/2wyk6mnm1FA" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`,
    song: "소방차 - 어젯밤 이야기",
    desc: ""
  },
  "aaba": {
    type: typeTable.groove,
    youtube: `<iframe width="400" height="220" src="https://www.youtube.com/embed/n2AsXQtK8aA" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`,
    song: "김건모 - 잘못된 만남",
    desc: ""
  },
  "aaab": {
    type: typeTable.visual,
    youtube: `<iframe width="400" height="220" src="https://www.youtube.com/embed/mbg1Cn6Ua9U" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`,
    song: "소녀시대 - 다시 만난 세계",
    desc: ""
  },
  "baaa": {
    type: typeTable.sensitive,
    youtube: `<iframe width="400" height="220" src="https://www.youtube.com/embed/F_w3jpFiiEw" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`,
    song: "김범수 - 보고싶다",
    desc: ""
  },
  "abba": {
    type: typeTable.groove,
    youtube: `<iframe width="560" height="220" src="https://www.youtube.com/embed/dYIT_jeUBKg" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`,
    song: "프리스타일 - Y",
    desc: ""
  },
  "aabb": {
    type: typeTable.visual,
    youtube: `<iframe width="400" height="220" src="https://www.youtube.com/embed/-ikYiWp0H5g" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`,
    song: "원더걸스 - Tell Me",
    desc: ""
  },
  "bbaa": {
    type: typeTable.sensitive,
    youtube: `<iframe width="400" height="220" src="https://www.youtube.com/embed/PhBi_fZkj98" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`,
    song: "SG워너비 - 살다가",
    desc: ""
  },
  "baba": {
    type: typeTable.unique,
    youtube: `<iframe width="400" height="220" src="https://www.youtube.com/embed/WtAuSC3lk14" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`,
    song: "빅뱅 - 하루하루",
    desc: ""
  },
  "abab": {
    type: typeTable.visual,
    youtube: `<iframe width="400" height="220" src="https://www.youtube.com/embed/qxSUfjioFg8" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`,
    song: "2PM - HEARTBEAT",
    desc: ""
  },
  "baab": {
    type: typeTable.visual,
    youtube: `<iframe width="400" height="220" src="https://www.youtube.com/embed/uUnDOnj8vfM" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`,
    song: "젝스키스 - 커플",
    desc: ""
  },
  "bbba": {
    type: typeTable.groove,
    youtube: `<iframe width="400" height="220" src="https://www.youtube.com/embed/q8hdSF60U0A" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`,
    song: "Justin Bieber - Baby",
    desc: ""
  },
  "babb": {
    type: typeTable.sensitive,
    youtube: `<iframe width="400" height="220" src="https://www.youtube.com/embed/yrJ7CVeiFvo" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`,
    song: "Beyonce - Halo",
    desc: ""
  },
  "bbab": {
    type: typeTable.sensitive,
    youtube: `<iframe width="400" height="220" src="https://www.youtube.com/embed/-sVo6NWwK_o" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`,
    song: "브라운 아이즈 - 벌써 일년",
    desc: ""
  },
  "abbb": {
    type: typeTable.sensitive,
    youtube: `<iframe width="400" height="220" src="https://www.youtube.com/embed/-4I06d3a3H8" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`,
    song: "백지영 - 사랑 안해",
    desc: ""
  },
  "bbbb": {
    type: typeTable.groove,
    youtube: `<iframe width="400" height="220" src="https://www.youtube.com/embed/sHqLlyBlmQI" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`,
    song: "에픽하이 - Fly",
    desc: ""
  }
}
let selectedListStr = "";
function select(selectOpt){
  selectedListStr += selectOpt;
  switch(selectedListStr.length){
    default:
      changeQnA(selectedListStr.length);
      break;
    // 결과페이지 출력
    case 4:
      location.href = "test_output.html?"+ selectedListStr;
  }
}

function changeQnA(qnaIndex){
  let qna = qnaArr[qnaIndex];
  //테스트 문항 번호 변경
  let test_num = document.getElementById("test_num");
  let q_num = qnaIndex+1;
  test_num.innerHTML="Q"+q_num;
  
  //테스트 질문 변경
  let test_q = document.getElementById("test_q");
  test_q.innerHTML= qna.Q;

  //테스트 답변 변경
  let test_a = document.getElementById("test_a");
  // 4번문항 문장 길이 예외처리
  if(qnaIndex===3){
    let element_a = document.getElementById("test_a");
    let element_b = document.getElementById("test_b");
    element_a.style.height = '66px';
    element_a.style.lineHeight='30px';
    element_b.style.height = '66px';
    element_b.style.lineHeight='30px';
  }

  test_a.innerHTML=qna.A;
  let test_b = document.getElementById("test_b");
  test_b.innerHTML=qna.B;
}

function changeOutput(selectedListStr){
  let result = resultTable[selectedListStr];
  let test_output = document.getElementById("test_output");
  console.log(test_output.children);
  // 타입 이름 변경
  test_output.children[1].innerHTML = result.type.name;
  // 타입 이미지 변경
  document.getElementById("test_output_img").src = result.type.img;
  // 타입 설명 변경
  test_output.children[3].innerHTML = result.type.desc;

  //유튜브 비디오 변경
  test_output.children[4].innerHTML = result.youtube;
  //가수-노래 텍스트 변경
  test_output.children[6].innerHTML = result.song;
}