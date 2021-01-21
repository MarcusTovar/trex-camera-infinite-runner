var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;
var obstacle1, obstacle2, obstacle3,obstacle4,obstacle5, obstactle6;
var cloudImage;
var CloudsGroup, ObstaclesGroup;
var gameOver, reset;
var gameOverImage, resetImage;
var count = 0;


var PLAY = 1;
var END = 2;
var gameState = PLAY;

function preload(){
  //I loaded the image using different variables and matching them up with the pngs loaded already
  trex_running=loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadImage("trex_collided.png");
  groundImage = loadImage("ground2.png")
  obstacle1 = loadImage("obstacle1.png")
  obstacle2 = loadImage("obstacle2.png")
  obstacle3 = loadImage("obstacle3.png")
  obstacle4 = loadImage("obstacle4.png")
  obstacle5 = loadImage("obstacle5.png")
  obstacle6 = loadImage("obstacle6.png")
  cloudImage = loadImage("cloud.png")
  gameOverImage = loadImage("gameOver.png")
  resetImage = loadImage("restart.png")
  
}

function setup() {
  createCanvas(windowWidth,windowHeight);
  
  //You had to add the animation to the trex after we loaded the animations
  trex = createSprite(200,380,20,50);
  trex.addAnimation("running", trex_running);
  trex.scale = 0.5;
     
  ground = createSprite(200,380,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  ground.velocityX = -2+3*count/100;
  
  invisibleGround = createSprite(200,385,400,5);
  invisibleGround.visible = false;
  
  //The keyword new has to be used to create a group unlike code.org
  CloudsGroup = new Group();
  ObstaclesGroup = new Group();
  
  gameOver = createSprite(100,200,50,20)
  gameOver.addImage(gameOverImage)
  gameOver.scale = 0.5;
  gameOver.visible = false;
  
  reset = createSprite(100,300,50,20)
  reset.addImage(resetImage)
  reset.scale = 0.5;
  reset.visible = false;
  
}


function draw() { 
  background("white");
  

  
  if (gameState === PLAY){
    
    count = count + Math.round(getFrameRate()/60);
    
    if(keyDown("space")) {
    trex.velocityY = -10;
    }
    
    trex.velocityY = trex.velocityY + 0.8
  
    if (ground.x < 0){
    ground.x = ground.width/2;
    }
  
    trex.collide(invisibleGround);
  
    spawnClouds();
    spawnObstacles();
    
    if (ObstaclesGroup.isTouching(trex)){
      gameState = END;
      }
  }
    if (gameState === END){
      trex.velocityY = 0;
      
      ground.velocityX = 0;
      
      ObstaclesGroup.setVelocityXEach(0)
      CloudsGroup.setVelocityXEach(0)
      
      trex.changeAnimation("collide",trex_collided);
   
      gameOver.visible = true;
      reset.visible = true;
      
      gameOver.x = camera.x;
      reset.x = camera.x;

      ObstaclesGroup.setLifetimeEach(-1);
      CloudsGroup.setLifetimeEach(-1);
      
    
      if(mousePressedOver(reset)){
        
        restartGame();
        }
      
     }  camera.x = trex.x;
        drawSprites();
        textSize(20);
        fill("black");
        text("Score: "+ count, camera.x+250,100)

        
   } 

function spawnObstacles() {
  //frameCount was different to code.org because you did not need world infront of it

  if(frameCount % 60 === 0) {
    var obstacle = createSprite(400,365,10,40);
    obstacle.velocityX = -6;
    
    //You had to use a switch instead of animations like in code.org because it does not concatinate strings
    //keyword random instead of randomNumber
    var rand = Math.round(random(1,6));
    switch(rand){
      case 1: obstacle.addImage(obstacle1); 
        break;
    case 2: obstacle.addImage(obstacle2); 
        break;
    case 3: obstacle.addImage(obstacle3); 
        break;
    case 4: obstacle.addImage(obstacle4); 
        break;
    case 5: obstacle.addImage(obstacle5); 
        break;
    case 6: obstacle.addImage(obstacle6); 
        break;
    default: break;
      
    }
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 70;
    ObstaclesGroup.add(obstacle);
  }
}

function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    var cloud = createSprite(400,320,40,10);
    cloud.y = Math.round(random(280,320))
    cloud.addImage(cloudImage);
    cloud.scale = 0.5; 
    cloud.velocityX = -3;
    
    
     //assign lifetime to the variable
    cloud.lifetime = 134;
    
    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    CloudsGroup.add(cloud);
  }
  
}
function restartGame(){
  trex.changeAnimation("running", trex_running);
  
  gameOver.visible = false;
  reset.visible = false;
  
  ObstaclesGroup.destroyEach();
  CloudsGroup.destroyEach();
      
  count=0;
  
  gameState = PLAY;
  
}
