'use strict';


let state = 'title';
let cnv;
let points = 0;
let w = 600;
let h = 600;
let player;
let grasses = [];
let dogImg;
let grassImg;
let bg;

function preload(){
  dogImg = loadImage('dog.gif');
  grassImg = loadImage('grass.png');
  bg = loadImage('yardbg.png');
}

function setup() {
   cnv = createCanvas(w, h);
     textAlign(CENTER);
   textFont('monospace');
  player = new Player();
  //grasses[0] = new Grass();
  grasses.push(new Grass());
}

function draw() {

switch(state){
  case 'title':
    title();
    cnv.mouseClicked(titleMouseClicked);
      break;
  case 'main screen':
    mainScreen();
    cnv.mouseClicked(mainscreenMouseClicked);
      break;
  case 'win':
    winScreen();
    cnv.mouseClicked(winmouseClicked);
      break;
  default:
      break;
}

}

function keyPressed(){
  if (keyCode == LEFT_ARROW){
    player.direction = 'left';
  } else if (keyCode == RIGHT_ARROW) {
    player.direction = 'right'
  } else if (keyCode == UP_ARROW) {
    player.direction = 'up'
  } else if (keyCode == DOWN_ARROW) {
    player.direction = 'down'
  } else if (key == ' ') {
    player.direction = 'still';
  }
}

function keyReleased(){

  let numKeysPressed = 0;
  if(keyIsDown(LEFT_ARROW)){
    numKeysPressed++;
  }
  if(keyIsDown(RIGHT_ARROW)){
    numKeysPressed++;
  }
  if(keyIsDown(UP_ARROW)){
    numKeysPressed++;
  }
  if(keyIsDown(DOWN_ARROW)){
    numKeysPressed++;
  }

  console.log(numKeysPressed);

if (numKeysPressed == 0){
  player.direction = 'still';
  }
}

function title(){
  background(100);
  textSize(60);
  stroke(255);
  text('Backyard Diggin!', w/2, h/5)

  textSize(30);
  text('click canvas to start', w/2, w/2);
}


function titleMouseClicked(){
    console.log('canvas is clicked on title page');
    state = 'main screen';
}


function mainScreen(){
  textAlign(CENTER);
  background(bg);

if (random(1) <= 0.01){
  grasses.push(new Grass());
}

  player.display();
  player.move();


  for (let i = 0; i < grasses.length; i++){
    grasses[i].display();
    grasses[i].move();

  }

  //check collision. collision = true? points + 1 and splice coin
  //iterate backwards through array
  for(let i = grasses.length - 1; i >= 0; i--){
  if (dist(player.x, player.y, grasses[i].x, grasses[i].y) <= (player.r + grasses[i].r) / 2){
    points++;
    console.log(points);
    grasses.splice(i, 1);
  } else if (grasses[i].y > h){
    grasses.splice(i,1);
    //console.log('bye');
  }
}
    textSize(20);
    text('points total: ' + points,  w/5.3 , h - 20);
}


function mainscreenMouseClicked(){
//   points++;
//   console.log('points = ' + points);
//
// if (points >= 10){
//   state = 'win';
// }
}


function winScreen(){
  textAlign(CENTER);
  background(255, 50, 80);
  textSize(80);
  stroke(255);
  text('WINNER', w/2, h/2)

  textSize(30);
  text('click canvas to restart', h/2, h * 3/4);
}


function winmouseClicked(){
state = 'main screen'
points = 0;
}
