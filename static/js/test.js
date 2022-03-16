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

let selectedListStr = "";
function select(selectOpt){
  selectedListStr += selectOpt;
  switch(selectedListStr.length){
    default:
      changeQnA(selectedListStr.length);
      break;
    // 결과페이지 출력
    case 4:
      location.href = "/test_output?"+ selectedListStr;
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

   test_output_save(selectedListStr)
  sessionStorage.setItem('preferenceResult', selectedListStr)
}


function test_output_save(type){
   if(sessionStorage.getItem('id')) {
        let userID = sessionStorage.getItem('id')
        $.ajax({
        type: 'POST',
        url: '/test_output',
        data: {
          'type_give': type,
          'userID_give': userID
        },
        success: function (response) {
          //alert(response['msg'])
        }
    });
   } else {
     //alert('로그인하시면 저장도 가능해요!')
   }
   
}