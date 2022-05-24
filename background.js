const images = [
  "KakaoTalk_20210920_180439961_01.jpg",
  "KakaoTalk_20210920_180439961_02.jpg",
  "wallpaperbetter.com_1920x1080.jpg",
];

const chosenImage = images[Math.floor(Math.random() * images.length)];

const bgImage = document.createElement("img");

bgImage.src = `img/${chosenImage}`;

document.body.appendChild(bgImage);

console.log(chosenImage);
