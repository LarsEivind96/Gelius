// wait for the content of the window element
// to load, then performs the operations.
// This is considered best practice.
window.addEventListener("load", () => {
  resize(); // Resizes the canvas once the window loads
  document.addEventListener("mousedown", mouseDown);
  document.addEventListener("mouseup", mouseUp);
  document.addEventListener("mousemove", mouseMove);

  document.addEventListener("touchstart", touchStart);
  document.addEventListener("touchend", touchEnd);
  document.addEventListener("touchmove", touchMove);

  window.addEventListener("resize", resize);
});

const canvas = document.querySelector("#canvas");
// Context for the canvas for 2 dimensional operations
const ctx = canvas.getContext("2d");

// Resizes the canvas to the available size of the window.
function resize() {
  ctx.canvas.width = window.innerWidth;
  ctx.canvas.height = window.innerHeight;
}

// Stores the initial position of the cursor
let coord = { x: 0, y: 0 };

// This is the flag that we are going to use to
// trigger drawing
let paint = false;

let images = [
  // "BicepGif.gif",
  "fast_entertainment_2.png",
  "Fastclvb horsepower fff red.png",
  "imm007_8-kopi.jpg",
  "prosjekt2-kopi.jpg",
  /*  "imm026_29.jpg",
      "imm027_29.jpg",
      "imm029_32.jpg",
      "prosjekt2-kopi.jpg",
      "Skjermbilde 2019-10-27 kl. 14.45.10.png",
      "Skjermbilde 2021-03-03 kl. 13.31.33-kopi.png",*/
];

let gifs = [
  { src: "spriteGif.png", width: 480, height: 480, frames: 45 },
  { src: "DiCaprioSprite.png", width: 600, height: 400, frames: 68 },
  { src: "NyanCatSprite.png", width: 476, height: 280, frames: 12 },
];

let assets = [];

for (gifIndex in gifs) {
  let gif = new Image();
  gif.src = "assets/" + gifs[gifIndex].src;
  let gifObject = {
    isGif: true,
    image: gif,
    frameWidth: gifs[gifIndex].width,
    frameHeight: gifs[gifIndex].height,
    frames: gifs[gifIndex].frames,
  };
  assets.push(gifObject);
}

let pics = [];
for (imageIndex in images) {
  let pic = new Image();
  pic.src = "assets/" + images[imageIndex];
  pics.push(pic);
  let picObject = {
    isGif: false,
    image: pic,
  };
  assets.push(picObject);
}

let picIndex = 0;
let assetIndex = 0;

let pic = pics[0];
let asset = assets[assetIndex];

let imageHeight,
  imageWidth = 0;

let x,
  y = 0;

// Touch handler functions
function touchStart(event) {
  if (event.targetTouches[0].target.tagName != "BUTTON") {
    startDraw(event);
  }
  event.preventDefault();
}

function touchMove(event) {
  sketch(event);
  event.preventDefault();
}

function touchEnd() {
  paint = false;
}

// Mouse event handler functions
function mouseDown(event) {
  if (event.path[0].id != "navigationButton") {
    startDraw(event);
  }
}

function mouseMove(event) {
  sketch(event);
}

function mouseUp() {
  paint = false;
  shift = 0;
  currentFrame = 0;
  if (asset.isGif) cancelAnimationFrame(animationFrameId);
}

var shift = 0;
var frameWidth = 480;
var frameHeight = 480;
var totalFrames = 45;
var currentFrame = 0;
let nextFrame = false;
let frameCount = 0;

// Draws the current image
function startDraw(event) {
  paint = true;
  pic = pics[picIndex];
  asset = assets[assetIndex];
  getPosition(event);
  x = coord.x;
  y = coord.y;

  let height = 250;
  let multiplier = asset.image.height / height;
  imageHeight = asset.image.height / multiplier;
  imageWidth = asset.image.width / multiplier;

  if (asset.isGif) {
    console.log("Draw gif");
    console.log("shift", shift);
    imageWidth = asset.frameWidth / multiplier;
    totalFrames = asset.frames;
    ctx.drawImage(
      asset.image,
      shift,
      0,
      asset.frameWidth,
      asset.frameHeight,
      coord.x - imageWidth / 2,
      coord.y - imageHeight / 2,
      imageWidth,
      imageHeight
    );
    animate();
  } else {
    ctx.drawImage(
      asset.image,
      coord.x - imageWidth / 2,
      coord.y - imageHeight / 2,
      imageWidth,
      imageHeight
    );
  }
  document.getElementById("imageText").innerHTML = images[picIndex];
  assetIndex += 1;
  if (assetIndex == assets.length) {
    assetIndex = 0;
  }
}

// Draws the current image along the path of the mouse or touch entity.
function sketch(event) {
  if (!paint) return;

  animatingGif = true;
  // When mousemove has stopped, the gif should stop as well
  if (timeout !== undefined) clearTimeout(timeout);
  timeout = setTimeout(function () {
    animatingGif = false;
  }, 100);

  getPosition(event);

  if (asset.isGif) {
    drawSmoothGif();
  } else {
    drawSmoothImage();
  }

  x = coord.x;
  y = coord.y;
}

function drawSmoothImage() {
  if (x != 0 || y != 0) {
    let n = 10;
    for (let i = 1; i < n + 1; i++) {
      ctx.drawImage(
        asset.image,
        ((coord.x - x) * i) / n + x - imageWidth / 2,
        ((coord.y - y) * i) / n + y - imageHeight / 2,
        imageWidth,
        imageHeight
      );
    }
  }
}

function drawSmoothGif() {
  if (x != 0 || y != 0) {
    let n = 10;
    for (let i = 1; i < n + 1; i++) {
      ctx.drawImage(
        asset.image,
        shift,
        0,
        asset.frameWidth,
        asset.frameHeight,
        ((coord.x - x) * i) / n + x - imageWidth / 2,
        ((coord.y - y) * i) / n + y - imageHeight / 2,
        imageWidth,
        imageHeight
      );
    }
  }
}

let animationFrameId;
let animatingGif = false;
let timeout;

function animate() {
  frameCount++;
  if (frameCount < 3 || !animatingGif) {
    animationFrameId = requestAnimationFrame(animate);
    return;
  }
  frameCount = 0;

  if (currentFrame == asset.frames) {
    shift = 0;
    currentFrame = 0;
  }
  shift += asset.frameWidth;
  console.log(shift);

  currentFrame++;

  animationFrameId = requestAnimationFrame(animate);
}

// Updates the coordinates of the cursor or touch when
// an event is triggered to the coordinates where
// the said event is triggered.
function getPosition(event) {
  if (event.type.includes("mouse")) {
    coord.x = event.clientX - canvas.offsetLeft;
    coord.y = event.clientY - canvas.offsetTop;
  } else if (event.type.includes("touch")) {
    coord.x = event.touches[0].pageX - canvas.offsetLeft;
    coord.y = event.touches[0].pageY - canvas.offsetTop;
  }
}
