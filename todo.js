const toDoForm = document.getElementById("todo-form");
const toDoInput = document.querySelector("#todo-form input");
const toDoList = document.getElementById("todo-list");

const TODOS_KEY = "todos";

const toDos = []; // paintToDo가 실행될 때 array에 객체를 추가 // 3번 localStorage에 넣어야 할 데이터

function paintToDo(newTodo) {
  // 4번
  // handleToDoSumbit 이 사용하게 될 함수
  const li = document.createElement("li"); // javaScript 에서 요소를 추가할 방법이 생김
  const span = document.createElement("span"); // paint 작업을 하기위해서 두 가지의 element를 만듦
  const button = document.createElement("button");
  span.innerText = newTodo; // span 안에 input 받은 값을 text화 시킨다
  button.innerText = "X";
  button.addEventListener("click", deleteToDo); // X를 누를 경우 알아서 사라지게 만듦
  toDoList.appendChild(li);
  li.appendChild(span); // li는 span이라는 자식을 갖게 됨
  li.appendChild(button);
}

function saveToDos() {
  localStorage.setItem(TODOS_KEY, JSON.stringify(toDos));
  // 알아서 배열을 쪼개서 들어감 // 배열 안의 변수값은 새로고침 할 때마다 초기화가 된다. // 배열과 일반 변수는 다르다는 것을 명심하길
}

function deleteToDo(event) {
  // 5번
  // x 를 클릭할 경우 todo-list가 사리지게 만듦
  const li = event.target.parentElement; // 부모 객체 참조값인듯
  li.remove(); // text를 삭제시킴 .. localStorage 값을 없애지는 못함
}

function handleToDoSubmit(event) {
  // 2 실행
  event.preventDefault(); // submit이 일어날 경우 새로고침을 막는다.
  const newTodo = toDoInput.value; // 들어온 값을 const 화 시키고
  toDoInput.value = ""; // 다시 input.value를 초기화 시킴
  toDos.push(newTodo); // push 함수는 원본에 들어가기 때문에 새로운 객체가 새로 생기는 상황이 아님
  paintToDo(newTodo); // 들어온 값을 처리하기 위해서 함수에 newToDo값을 보냄
  saveToDos();
}

toDoForm.addEventListener("submit", handleToDoSubmit); // 1

const savedToDos = localStorage.getItem(TODOS_KEY);

if (savedToDos) {
  const parsedToDos = JSON.parse(savedToDos); // localStorage에 저장된 string 이 파싱되어진 배열의 형태로 반환되고 그 값이 상수에 저장됨
  parsedToDos.forEach(item => console.log("this is the turn of ", item));
  // item을 function의 매개변수로 이해하고 그 매개변수에 foreach 문을 돌며 순차적인 element가 들어간다고 생각해라
  // => 이후는 function이 body 부분으로 이해하자!
  // 이러한 형태를 화살표 함수라고 칭한다.
  // 속도문제도 없고 그냥 똑같은데 형태만 다르다.
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
