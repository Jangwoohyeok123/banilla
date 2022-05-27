const toDoForm = document.getElementById("todo-form");
const toDoInput = document.querySelector("#todo-form input");
const toDoList = document.getElementById("todo-list");
const TODOS_KEY = "todos";
const savedToDos = localStorage.getItem(TODOS_KEY);
let toDos = []; // localStorage에 데이터를 넣을 경우 string 으로 파싱되기 때문에, toDos라는 배열을 만들어 쉽게 관리하기 위함
// localStorage에는 array를 저장할 수 없다.
// localStorage는 오직 txt의 형태로 저장된다. rough하게 string으로 이해하자.
// 이 배열선언이 존재하기 때문에 새로고침을 할 경우 자꾸 배열이 초기화 되는 현상이 생기는 것이다.
// 헷갈리는 부분! 해결 = 새로고침을 하고 todoPush를 하지 않을 경우에는 localStorage에 정보가 있었는데 누르면 다 사라졌는데 배열은
// 초기화 됐지만 아직 localStorage안에 value 값은 초기화 되지 않았기 때문이다. 즉, 저장장소가 다르다.

if (savedToDos !== null) {
  const parsedToDos = JSON.parse(savedToDos); // localStorage에 저장된 JOSN 파일이 string 배열의 형태로 반환되고 그 값이 상수에 저장됨
  toDos = parsedToDos; // 새로고침시 문제를 해결하기 위해 null 이 아닐 경우 새로고침을 해도 배열안에 localStorage의 값을 복사하여 채워넣는다.
  parsedToDos.forEach(paintToDo);
  // item을 function의 매개변수로 이해하고 그 매개변수에 foreach 문을 돌며 순차적인 element가 들어간다고 생각해라
  // => 이후는 function이 body 부분으로 이해하자!
  // 이러한 형태를 화살표 함수라고 칭한다.
  // 속도문제도 없고 그냥 똑같은데 형태만 다르다.
}

toDoForm.addEventListener("submit", handleToDoSubmit); // 1

function handleToDoSubmit(event) {
  // 2 실행
  event.preventDefault(); // submit이 일어날 경우 새로고침을 막는다.
  const newTodo = toDoInput.value; // 들어온 값을 const 화 시키고
  toDoInput.value = ""; // 다시 input.value를 초기화 시킴
  const newToDoObj = {
    // 들어온 값을 개체화 시키고 localStorage에 개체를 저장함
    text: newTodo,
    id: Date.now(),
  };
  toDos.push(newToDoObj); // push 함수는 원본에 들어가기 때문에 새로운 객체가 새로 생기는 상황이 아님
  paintToDo(newToDoObj); // 들어온 값을 처리하기 위해서 함수에 newToDo값을 보냄
  saveToDos();
}

function paintToDo(newTodo) {
  // 3번
  // handleToDoSumbit 이 사용하게 될 함수
  const li = document.createElement("li"); // javaScript 에서 요소를 추가할 방법이 생김
  li.id = newTodo.id; // html id를 생성하고 date.now 값을 집어넣음
  const span = document.createElement("span"); // paint 작업을 하기위해서 두 가지의 element를 만듦
  const button = document.createElement("button");
  span.innerText = newTodo.text; // span 안에 input 받은 값을 text화 시킨다
  // localStorage에 개체를 저장시키려고 할 경우 개체는 파싱되어 저장까지는 되나 그 이후 innerText로 불러올 경우 Object의 형태로 html문서에 나타난다.
  button.innerText = "X";
  button.addEventListener("click", deleteToDo); // X를 누를 경우 알아서 사라지게 만듦 // 분기문의 느낌이 강함
  toDoList.appendChild(li);
  li.appendChild(span); // li는 span이라는 자식을 갖게 됨
  li.appendChild(button);
}

function saveToDos() {
  // localStorage에 단순 txt 형식으로 저장되는 것을 JSON 형식으로 저장하기 위한 함수
  // JSON을 쓸 경우 String 파싱이 훨씬 편해지며 json으로 저장되어져 있는 localStorage value 값을 파싱할 경우 자바스크립트가 이해할 수 있는 배열로 파싱함
  // 4번
  localStorage.setItem(TODOS_KEY, JSON.stringify(toDos));
  // stringfy 함수 : stringfy 함수는 자바스크립트 언어 환경에서의 Json형식의 object를 매개변수로 넣을 경우 parsing 후 return String 을 하는 것을 말함.
  // stringfy를 써야 하는 이유는... localStorage는 데이터를 저장할 경우에 자동으로 string으로 파싱한다.
  // 만약, 저장하는 데이터 타입이 개체일 경우 string 으로 파싱되어 이상하게 저장된다.
  // json은 txt를 형식화한 것이다. 결국, 최종적으로 localStroage에 string 하나의 개체로 저장되겠지만 그 string의 구조를 json 파일로 볼 때는
  // 이해하기 편하게 바꿔놓음
  // 이는 json을 쓰는 근본적인 이유와도 연계되어 있다.
  // 하나 더 질문, key 가 중복될 경우 기존의 string에 값을 concat하여 string에 저장된다. 보이는 건 배열이지만 이는 하나의 string이다.
}

function deleteToDo(event) {
  // 3의 1번
  // x 를 클릭할 경우 todo-list가 사리지게 만듦
  const li = event.target.parentElement; // event target 속성은 이벤트가 발생한 대상 객체를 가리킨다.
  li.remove(); // text를 삭제시킴 .. localStorage 값을 없애지는 못함
  toDos = toDos.filter(element => element.id !== parseInt(li.id)); // 해석 : 내가 x 를 누른 li를 제외한 것은 남겨두고 싶다!
  saveToDos(); // save 되는 배열은 filter 후에 return 된 배열을 다시 localStorage에 저장한다.
}

/*
7.3 
localStorage 에 todolist 작성할 때 저장을 하려는 목적 o

실행순서
1. toDoForm.addEventListener("submit", handleToDoSubmit);
2. function handleToDoSubmit(event)
3. const toDos = []; // paintToDo가 실행될 때 array에 객체를 추가
4. function saveToDos() {} : 배열의 내용을 localStorage에 저장 
4. function paintToDo(newTodo)
5. function deleteToDo(event)

toDo 내용을 저장하려고 하는데 어떤 값이 들어오든 string 배열의 형태로 저장하고 싶다.
  - JSON.stringify() 에서 () 안에 바꾸고 싶은 값을 넣으면 된다. 
  - 위의 함수는 JavaScript object 나 array 또는 어떤 JavaScrip 코드건 간에 스트링 배열로 바꿔주는 기능을 한다. 

setItem을 할 경우 [string, string] 의 형태로 저장되는 것이 아닌, 하나의 string 에 추가되는 형태로 결과적으로 하나의 string 이다.
  - JSON.stringify() 할 경우 하나의 String의 형태가 parsing 되어 [string, string, string]의 형태로 바뀐다. 

7.4

JSON.stringify() 를 할 경우 string 배열로 바뀌게 되는데 이를 다시 JSON.parse 할 경우 파싱이 된 값으로 배열이 생성된다.
  - 쭉 과정을 살펴보자 
  - 1.setItem 의 형태로 하나의 string 형태로 저장 
  - 2.JSON.stringify() 로 string 배열의 형태로 쪼갬
  - 3.JSON.parse() 로 string 배열의 원소들을 파싱하여 타입을 변환시켜 의도에 맞게 가공할 수 있는 원재료로 만들어 놓음 
*/
