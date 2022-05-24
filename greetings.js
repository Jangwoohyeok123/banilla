const loginForm = document.querySelector("#login-form");
const loginInput = document.querySelector("#login-form input");
const greeting = document.querySelector("#greeting");
const HIDDEN_CLASSNAME = "hidden";
const USERNAME_KEY = "username";

function onLoginSubmit(event) {
  event.preventDefault();
  loginForm.classList.add(HIDDEN_CLASSNAME);
  const username = loginInput.value;
  localStorage.setItem(USERNAME_KEY, username);
  paintGreetings(username);
}

function paintGreetings(username) {
  // 목적 : 히든클래스를 걷어내고 텍스트에 유저이름을 들어내기 위한 함수
  greeting.innerText = `Hello ${username}`;
  greeting.classList.remove(HIDDEN_CLASSNAME);
}
const savedUsername = localStorage.getItem(USERNAME_KEY); // null 값이 들어가 있음

if (savedUsername === null) {
  // show the form // localStorage에 내용이 없다면 hidden 클래스를 없애버려라 // == 입력을 받아내라는 것!
  loginForm.classList.remove(HIDDEN_CLASSNAME); // classList는 태그에 관련된 클래스에 관련된 기능을 제공하는 함수모음집이다.
  loginForm.addEventListener("submit", onLoginSubmit);
} else {
  // show the greeting // else 는 이미 입력받은 값이 있으므로 사용자에게 입력란을 보여주지 말라는 것
  paintGreetings(savedUsername);
}
