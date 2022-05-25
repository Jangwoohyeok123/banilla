const API_KEY = "6cabee90b20a748ba1cbdf9869d3cec6";

function onGeoOk(position) {
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;

  console.log("You live in", lat, lon);
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
  fetch(url) // url을 통해서 서버에서 데이터를 받아올 경우 html과 연계시켜 innerText를 시전
    .then(response => response.json())
    .then(data => {
      const weather = document.querySelector("#weather span:first-child");
      const city = document.querySelector("#weather span:last-child");
      city.innerText = data.name;
      weather.innerText = `weather : ${data.weather[0].main}  temp : ${data.main.temp}`;
    });
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

/*--------------------------------------------------------------------------------------------------------
7.2
api key 를 받은 뒤에 해야할 건 open weather map 서버와 통신할 것이다.
open weather map doc를 클릭하면 위치에 대한 현재 날씨를 얻을 수 있다. 

fetch(url) 을 시도할 때, 구글 크롬의 network에 가면 WIFI에서 어떤 일이 일어나는지 볼 수 있다.
-fetch 함수는 첫번째 매개변수로 URL, 두번째 매개변수로 옵션 객체이며
-Promise 타입의 객체를 반환한다.
  -Api 호출이 성공했을 때 응답(response) 객체를 resolve 하고
  -Api 호출이 실패했을 때 예외(error) 객체를 reject 한다. 

화살표 함수는 무명함수를 생성한 후 변수에 담는 방식
 특징
 1. 함수 바디가 한 줄인 경우에는 {}로 감싸지 않아도 된다. otherwise 는 감싸야 한다.
 2. 함수 내용이 한 줄 이상인 경우 return을 사용해서 결과를 return 해야한다.
 3. 매개변수가 한 개인 경우 매개변수를 감싸는 ()를 생략할 수 있다.
  ex) filter(function(element){return element>2});

jason 호출할 때 
  "weather": [
    {
      "id": 501,
      "main": "Rain",
      "description": "moderate rain",
      "icon": "10d"
    }
  ],

  - data.weather[0].main;
  - weather[0]의 의미는 [ ..... ], 범위를 말한다.
  - .main은 [0] 안의 main 을 말한다.
*/
