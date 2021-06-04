//Create variables here
var dog,dogImage,happyDogImage,database,foodS,foodStock
function preload()
{
	//load images here
  dogImage=loadImage("images/dogImg.png")
  happyDogImage=loadImage("images/dogImg1.png");
}

function setup() {
	createCanvas(500,500);
  database=firebase.database()
  foodStock=database.ref("Food")
  foodStock.on("value",readStock)
  foodStock.set(20);

  dog=createSprite(250,350,10,60)
  dog.addImage("dog",dogImage)
  dog.scale=0.2
}


function draw() {  
background(0, 51, 255)

if(foodS!==undefined){
  textSize(20)
  fill(255)
  text("Important:PRESS UP ARROW TO FEED BRUNO",50,50)
  text("Food Remaining:-"+ foodS,150,150)

  if(keyWentDown(UP_ARROW)){
    writeStock(foodS)
    dog.addImage("happyDog",happyDogImage)
 dog.changeImage("happyDog",happyDogImage)
  }

  if(keyWentUp(UP_ARROW))
  dog.changeImage("dog",dogImage)
}

if(foodS===0){
  foodS=20
}
  drawSprites();
}
function writeStock(x){
  if(x<=0){
    x=0
  }
  else{
    x=x-1
  }
database.ref("/").update({
   Food:x
  })
}
function readStock(data){
foodS=data.val();
}

