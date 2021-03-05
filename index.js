// wait for the content of the window element
// to load, then performs the operations.
// This is considered best practice.
window.addEventListener("load", () => {
  resize(); // Resizes the canvas once the window loads
  document.addEventListener("mousedown", startPainting);
  document.addEventListener("mouseup", stopPainting);
  document.addEventListener("mousemove", sketch);
  window.addEventListener("resize", resize);
});

let images = [
  "golden_retriever_full_hd.jpg",
  "PumpBicep.png",
  "concert.jpg",
  "aoki.jpg",
  "cheat_code.jpg",
  "geliusno.png",
];
let pics = [];
for (imageIndex in images) {
  let pic = new Image();
  pic.src = "images/" + images[imageIndex];
  pics.push(pic);
}

// let pic = new Image();
// pic.src = "images/golden_retriever_full_hd.jpg"; //"PumpBicep.png";
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

let imageHeight,
  imageWidth = 0;

// The following functions toggle the flag to start
// and stop drawing
function startPainting(event) {
  paint = true;
  pic = pics[Math.floor(Math.random() * pics.length)];
  getPosition(event);
  x = coord.x;
  y = coord.y;

  let height = 250;
  let multiplier = pic.height / height;
  imageHeight = pic.height / multiplier;
  imageWidth = pic.width / multiplier;

  ctx.drawImage(
    pic,
    coord.x - imageWidth / 2,
    coord.y - imageHeight / 2,
    imageWidth,
    imageHeight
  );
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
    let n = 40;
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
}
