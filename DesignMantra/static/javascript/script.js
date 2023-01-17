// get the canvas related context
// set the image background of the person
// set the front of side as the user request
var canvas = document.getElementById("myCanvas");
canvas.height = 600;
canvas.width = 300;
canvas.style.backgroundRepeat = "no-repeat";
var ctx = canvas.getContext("2d");
var img = new Image();

// listen to the event from the user and render the background image of the canvas
document.getElementById("createDress").addEventListener("click", LoadPhoto);
// function to load the front and side image
let isDefault = true;
function LoadPhoto() {
  console.log("click");
  if (isDefault) {
    img.src = frontUrl;
    document.getElementById("createDress").innerHTML = "Load back!";
    img.onload = function () {
      canvas.style.backgroundImage = "url(" + img.src + ")";
    };
    isDefault = false;
  } else {
    img.src = backUrl;
    document.getElementById("createDress").innerHTML = "Load front!";
    img.onload = function () {
      canvas.style.backgroundImage = "url(" + img.src + ")";
    };
    isDefault = true;
  }
}

// listen to the click event n the sleeve
document.getElementById("sleeve").addEventListener("click", LoadSleeve);
document.getElementById("choli").addEventListener("click", LoadCholi);

// the currentImages array keeps track of all the images currently displayed on the canvas.

// The addImage(imageUrl) function takes an image URL as a parameter, creates a new image with that URL,
// adds it to the currentImages array, and then calls the updateCanvas() function to redraw all the
// images currently in the array on the canvas. The removeImage(imageUrl) function takes an image
// URL as a parameter, finds the index of the image in the currentImages array, removes it from
// the array and then calls the updateCanvas() function to redraw all the images currently in
// the array on the canvas.
let currentImages = [];

function addImage(imageUrl) {
  console.log(imageUrl);
  let image = new Image();
  image.src = imageUrl;
  console.log(image.src);
  currentImages.push(image);
  updateCanvas();
}

function removeImage(imageUrl) {
  let index = currentImages.findIndex((img) => img.src === imageUrl);
  console.log(index);
  if (index !== -1) {
    currentImages.splice(index, 1);
    updateCanvas();
  }
}

function updateCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  currentImages.forEach((image) => {
    ctx.drawImage(image, 0, 0);
  });
}

// function to render the sleeve on top of the canvas
function LoadSleeve() {
  let imageUrl = this.getAttribute("data-url");
  fetch(imageUrl)
    .then((response) => response.blob())
    .then((blob) => {
      let image = new Image();
      image.src = URL.createObjectURL(blob);
      console.log(imageUrl);
      console.log(image.src);
      image.onload = function () {
        console.log(currentImages);
        console.log(
          currentImages.findIndex((img) => {
            console.log(imageUrl);
            console.log(img.src);
            if (img.src === imageUrl) {
              return true;
            } else {
              return false;
            }
          })
        );
        if (currentImages.findIndex((img) => img.src === imageUrl) === -1) {
          console.log(imageUrl);
          addImage(imageUrl);
          console.log("add");
        } else {
          console.log("remove");
        }
      };
    });
}

// function to render the sleeve on top of the canvas
let choliOn = false;
function LoadCholi() {
  if (!choliOn) {
    fetch(choliImageUrl)
      .then((response) => response.blob())
      .then((blob) => {
        var img = new Image();
        img.src = URL.createObjectURL(blob);
        img.onload = function () {
          ctx.drawImage(img, 0, 0);
        };
      });
    choliOn = false;
  } else {
    ctx.clearRect(0, 0, 300, 600);
    choliOn = true;
  }
}
