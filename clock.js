const clock = document.getElementById("clock");

function getClock() {
  const date = new Date(); // date 내장함수를 사용하기 위해 객체생성
  const hours = String(date.getHours()).padStart(2, "0"); // pad 함수는 무조건 string 의 형식을 띄어야 함
  const minutes = String(date.getMinutes()).padStart(2, "0"); // string으로 캐스팅 후, pad 함수 적용하는 구조를 띄고 있다. 
  const seconds = String(date.getSeconds()).padStart(2, "0");
  clock.innerText = `${hours}:${minutes}:${seconds}`;
}

getClock(); // site가 열리자마자 시간을 볼 수 있는 구조를 만들기 위함
setInterval(getClock, 1000);
