var doorImg1 = document.getElementById('door1');
const botDoorPath ='https://s3.amazonaws.com/codecademy-content/projects/chore-door/images/robot.svg';
var doorImg2 = document.getElementById('door2');
const Img1 ='https://s3.amazonaws.com/codecademy-content/projects/chore-door/images/beach.svg';
var doorImg3 = document.getElementById('door3');
const Img2 ='https://s3.amazonaws.com/codecademy-content/projects/chore-door/images/space.svg';
var NumClosedDoors = 3;
const closedDoorPath = 'https://s3.amazonaws.com/codecademy-content/projects/chore-door/images/closed_door.svg'
var startButton = document.getElementById('start');
let openDoor1;
let openDoor2;
let openDoor3;
var currentlyPlaying = true;
var currentStreak = 0;
var bestStreak = 0;

function isBot(door){
  if(door.src===botDoorPath){
    return true;
  }
  else{
    return false;
  }
}

function isClicked(door){
  if(door.src===closedDoorPath){
  return false;
  }
  return true;
}

function playDoor(door){
  NumClosedDoors--;
  if(NumClosedDoors===0){
    gameOver('win')
  }
  else if(isBot(door)){
    gameOver();
  }
}

function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}


function randomChoreDoorGenerator(){
  let choreDoor = Math.floor(Math.random()*NumClosedDoors);
  if(choreDoor===0){
    openDoor1 = botDoorPath;
    openDoor3 = Img1;
    openDoor2 = Img2;
  }
  else if(choreDoor===1){
    openDoor2 = botDoorPath;
    openDoor1 = Img1;
    openDoor3 = Img2;
  }
  else{
    openDoor3 = botDoorPath;
    openDoor2 = Img1;
    openDoor1 = Img2;
  }
}


doorImg1.onclick = () => {
  if(!isClicked(doorImg1)&& currentlyPlaying){
    doorImg1.src = openDoor1;
    playDoor(doorImg1);
  }
  else{
    alert(`this door has been clicked or game is over, start again`)}
}

doorImg2.onclick = () => {
  if(!isClicked(doorImg2) && currentlyPlaying){
    doorImg2.src = openDoor2;
    playDoor(doorImg2);
  }
  else{
    alert(`this door has been clicked or game is over, start again`)}
}

doorImg3.onclick = () => {
  if(!isClicked(doorImg3) && currentlyPlaying){
    doorImg3.src = openDoor3;
    playDoor(doorImg3);
  }
  else{
    alert(`this door has been clicked game is over, start again`)}
}

function startRound(){
  console.log('new round is being started');
  doorImg1.src = closedDoorPath;
  doorImg2.src = closedDoorPath;
  doorImg3.src = closedDoorPath;
  NumClosedDoors = 3;
  startButton.innerHTML = 'Good luck!'
  randomChoreDoorGenerator();
  currentlyPlaying = true;
}


startButton.onclick = () => {
    if (!currentlyPlaying) {
      startRound();
  }
}



function gameOver(status){
  if(status === 'win'){
    startButton.innerHTML = 'You Win! Play again?'
    currentStreak++;
    if(bestStreak<=currentStreak){
        bestStreak = currentStreak;
    }
    else{
        bestStreak = bestStreak;
    }
  }
  else{
    startButton.innerHTML = 'Game Over! Play again?';
    currentStreak = 0;
  }
  currentlyPlaying = false;
  console.log(currentlyPlaying)
  console.log(bestStreak);
  console.log(currentStreak);
  document.getElementById('score-number').innerHTML = currentStreak;
  document.getElementById('high-score-number').innerHTML = bestStreak;
}



startRound();
