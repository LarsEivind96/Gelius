// wait for the content of the window element
// to load, then performs the operations.
// This is considered best practice.
window.addEventListener("load", () => {
  resize(); // Resizes the canvas once the window loads
  document.addEventListener("mousedown", startPainting);
  document.addEventListener("mouseup", stopPainting);
  document.addEventListener("mousemove", sketch);

  document.addEventListener("touchstart", touchStart);
  document.addEventListener("touchend", touchEnd);
  document.addEventListener("touchmove", touchMove);

  window.addEventListener("resize", resize);
});

function touchStart(event) {
  // startPainting(event.touches[0]);
  paint = true;
  pic = pics[picIndex];
  getPositionTouch(event.touches[0]);
  x = coord.x;
  y = coord.y;

  let height = 250;
  let multiplier = pic.height / height;
  imageHeight = pic.height / multiplier;
  imageWidth = pic.width / multiplier;

  console.log(images[picIndex]);

  ctx.drawImage(
    pic,
    coord.x - imageWidth / 2,
    coord.y - imageHeight / 2,
    imageWidth,
    imageHeight
  );
  document.getElementById("imageText").innerHTML = images[picIndex];
  picIndex += 1;
  if (picIndex == pics.length) {
    picIndex = 0;
  }
  event.preventDefault();
}
function touchMove(event) {
  if (!paint) return;
  // The position of the cursor
  // gets updated as we move the
  // mouse around.
  getPositionTouch(event.touches[0]);
  if (x != 0 || y != 0) {
    let n = 10;
    for (let i = 1; i < n + 1; i++) {
      ctx.drawImage(
        pic,
        ((coord.x - x) * i) / n + x - imageWidth / 2,
        ((coord.y - y) * i) / n + y - imageHeight / 2,
        imageWidth,
        imageHeight
      );
    }
  }
  x = coord.x;
  y = coord.y;

  event.preventDefault();
}
function touchEnd(event) {
  stopPainting(event.changedTouches[0]);
}

let images = [
  "fast_entertainment_2.png",
  "Fastclvb horsepower fff red.png",
  "imm007_8-kopi.jpg",
  "imm026_29.jpg",
  "imm027_29.jpg",
  "imm029_32.jpg",
  "prosjekt2-kopi.jpg",
  "Skjermbilde 2019-10-27 kl. 14.45.10.png",
  "Skjermbilde 2021-03-03 kl. 13.31.33-kopi.png",
];
let pics = [];
for (imageIndex in images) {
  let pic = new Image();
  pic.src = "assets/" + images[imageIndex];
  pics.push(pic);
}
let picIndex = 0;

let pic = pics[0];

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

// Updates the coordianates of the cursor when
// an event e is triggered to the coordinates where
// the said event is triggered.
function getPosition(event) {
  coord.x = event.clientX - canvas.offsetLeft;
  coord.y = event.clientY - canvas.offsetTop;
}

function getPositionTouch(event) {
  coord.x = event.pageX - canvas.offsetLeft;
  coord.y = event.pageY - canvas.offsetTop;
}

let imageHeight,
  imageWidth = 0;

// The following functions toggle the flag to start
// and stop drawing
function startPainting(event) {
  if (event.path[0].id != "navigationButton") {
    console.log("Launched");
    paint = true;
    pic = pics[picIndex];
    getPosition(event);
    x = coord.x;
    y = coord.y;

    let height = 250;
    let multiplier = pic.height / height;
    imageHeight = pic.height / multiplier;
    imageWidth = pic.width / multiplier;

    console.log(images[picIndex]);

    ctx.drawImage(
      pic,
      coord.x - imageWidth / 2,
      coord.y - imageHeight / 2,
      imageWidth,
      imageHeight
    );
    document.getElementById("imageText").innerHTML = images[picIndex];
    picIndex += 1;
    if (picIndex == pics.length) {
      picIndex = 0;
    }
  }
}

function stopPainting() {
  paint = false;
}

let x,
  y = 0;

function sketch(event) {
  if (!paint) return;
  // The position of the cursor
  // gets updated as we move the
  // mouse around.
  getPosition(event);
  if (x != 0 || y != 0) {
    let n = 10;
    for (let i = 1; i < n + 1; i++) {
      ctx.drawImage(
        pic,
        ((coord.x - x) * i) / n + x - imageWidth / 2,
        ((coord.y - y) * i) / n + y - imageHeight / 2,
        imageWidth,
        imageHeight
      );
    }
  }
  x = coord.x;
  y = coord.y;
}

/*ctx.beginPath();

  ctx.lineWidth = 5;

  // Sets the end of the lines drawn
  // to a round shape.
  ctx.lineCap = "round";

  ctx.strokeStyle = "green";

  // The cursor to start drawing
  // moves to this coordinate
  ctx.moveTo(coord.x, coord.y);

  // The position of the cursor
  // gets updated as we move the
  // mouse around.
  getPosition(event);

  // A line is traced from start
  // coordinate to this coordinate
  ctx.lineTo(coord.x, coord.y);

  // Draws the line.
  ctx.stroke();*/
