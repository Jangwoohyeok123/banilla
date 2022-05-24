function onGeoOk(position) {
  const lat = position.coords.latitude;
  const lng = position.coords.longitude;
  console.log("You live in", lat, lng);
}
function onGeoError() {
  alert("Can't find you. No weather for you.");
}

navigator.geolocation.getCurrentPosition(onGeoOk, onGeoError); // 이 코드줄 하나면 브라우저에서 많은 정보를 얻어낼 수 있음
// 위의 함수는 2개의 인자가 필요하다.
// 첫째, 잘 됐을 경우의 실행될 함수의 이름. 둘째, 에러가 발생한 경우
// 첫 callback은 GeolocationPosiotion object 하나를 유일한 인자로 입력 받는다. // callback 함수는 다른 프로젝트에 있는 함수를 끌어온다 생각하면 될듯
// 둘째 callback 은

// 이 함수는 user의 위치를 준다.
// 화면에 날씨를 보여줄 것이다.

// 자바스크립트가 position에 대한 정보를 준다.

// api란 기본적으로 다른 서버와 연결시키는 방법이다.
