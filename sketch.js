var PLAY , END , gameState ;
var trex, trexRunning, trexCollided, ground, invisibleGround , groundImage , cloudImage , obstacleImage1 , obstacleImage2 , obstacleImage3 , obstacleImage4 , obstacleImage5 , obstacleImage6 , obstacleGroup , cloudGroup , score , gameOverImage , gameOver , restartImage , restart;

function preload() {
trexRunning = loadAnimation("trex1.png","trex3.png","trex4.png");
  trexCollided = loadAnimation("trexcrash.png" ,"trexcrash.png","trexcrash.png" );
groundImage = loadImage("ground2.png");
cloudImage = loadImage("cloud.png");
obstacleImage1 = loadImage("obstacle1.png");
obstacleImage2 = loadImage("obstacle2.png");  
obstacleImage3 = loadImage("obstacle3.png"); 
obstacleImage4 = loadImage("obstacle4.png"); 
obstacleImage5 = loadImage("obstacle5.png");  
obstacleImage6 = loadImage("obstacle6.png"); 
gameOverImage = loadImage("gameOver.png");
  restartImage = loadImage("restart.png");
  
}
function setup() {
  createCanvas(600, 200);
  trex = createSprite(50,180,20,20);
  trex.addAnimation("trexRunning",trexRunning);
  trex.scale = 0.5;
  trex.setCollider("circle",0,0,40);
  ground = createSprite(300,180,600,5);
  ground.addImage("ground2", groundImage);
  ground.x = ground.width/2;
  invisibleGround = createSprite(300,190,600,5);
  invisibleGround.visible = false;
  cloudGroup = createGroup();
  obstacleGroup = createGroup();
  score = 0;
  PLAY = 1;
  END = 0;
  gameState = PLAY;
  gameOver = createSprite(300,100,20,20);
  gameOver.addImage("gameOverImage",gameOverImage);
  gameOver.visible = false;
  gameOver.scale = 0.5;
  restart = createSprite(300,150,20,20);
  restart.addImage("restartImage" , restartImage);
  restart.visible = false;
  restart.scale = 0.5;
  
}

function draw() {
  background(0);
  
  if(gameState === PLAY) {
  
  ground.velocityX = -(6 + 3*score/100);  
    
  score = score + Math.round(getFrameRate()/60);
  if(keyDown("space") && trex.y>=159) {
  trex.velocityY = -10;
  }
  
  trex.velocityY = trex.velocityY+0.8;
  
  if(ground.x<0) {
  ground.x = ground.width/2;
  }
  
  spawnObstacles();

  spawnClouds();
  
  if(obstacleGroup.isTouching(trex)){
      gameState = END;
    }
  }
  else if(gameState === END) {
   ground.velocityX = 0; 
  trex.velocityY = 0;
  obstacleGroup.setLifetimeEach(-1);  
  cloudGroup.setLifetimeEach(-1);
  obstacleGroup.setVelocityXEach(0);
  cloudGroup.setVelocityXEach(0);
    gameOver.visible = true;
    restart.visible = true;
    trex.addAnimation("trexCollided", trexCollided);
    if(mousePressedOver(restart)) {
    reset();
  }
  }
  
  trex.collide(invisibleGround);
  
  text("Score = " + score,500,20);
  
  camera.position.x = trex.x;
  camera.position.y = trex.y;
  
  
  drawSprites();
  
  
  
}

function spawnClouds() {
if(frameCount%60 === 0){
  var cloud = createSprite(600,120,20,20);
cloud.addImage("cloudImage", cloudImage);  
cloud.velocityX = -6;
cloud.scale = 0.5;  
cloudGroup.add(cloud);
}
  
}

function spawnObstacles() {
if(frameCount%100 === 0) {
  var obstacle = createSprite(600,170,20,20);
  obstacle.velocityX = -7;
  var rand = Math.round(random(1,6));
  switch(rand) {
    case 1 :
  obstacle.addImage("obstacleImage1",obstacleImage1);
  break;
  case 2:
  obstacle.addImage("obstacleImage2",obstacleImage2);
  break; 
  case 3:
  obstacle.addImage("obstacleImage3",obstacleImage3);
  break;
  case 4:
  obstacle.addImage("obstacleImage6",obstacleImage6);
  break;
  case 5:   
  obstacle.addImage("obstacleImage5",obstacleImage5);
  break;    
  case 6:
  obstacle.addImage("obstacleImage6",obstacleImage6);
  break;    
  default: 
  break;
  }
  obstacleGroup.add(obstacle);
  obstacle.lifetime = 100;
  obstacle.scale = 0.4;
}
} 

function reset() {
gameState = 1;
restart.visible = 0;
gameOver.visible = 0;
obstacleGroup.destroyEach();
cloudGroup.destroyEach();
trex.changeAnimation("trexRunning" , trexRunning); 
score = 0;
}