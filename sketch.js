var trex0;
var ground0;
var invisible0;
var cloud0;
var obstacle0;
var play=0;
var end=1;
var gameState=play;
var score;
var jump;
var die;
var over0;
var res0;
var check0;

function preload(){
  trex=loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_coll=loadAnimation("trex_collided.png");
  ground=loadImage("ground2.png");
  cloud=loadImage("cloud.png");
  obs1=loadImage("obstacle1.png");
  obs2=loadImage("obstacle2.png");
  obs3=loadImage("obstacle3.png");
  obs4=loadImage("obstacle4.png");
  obs5=loadImage("obstacle5.png");
  obs6=loadImage("obstacle6.png");
  jump=loadSound("jump.mp3");
  die=loadSound("die.mp3");
  over=loadImage("gameOver.png");
  res=loadImage("restart.png");
  check0=loadSound("checkPoint.mp3");
}

function setup(){
  createCanvas(600,400);
  
  trex1();
  ground1();
  invisible();
  
  res1();
  over1();
  

  Cloud=new Group();
  Obstacle=new Group();
  
  score=0;
  
}

function draw(){
  background("skyblue");
  
  if(gameState===play){
    
    res0.visible=false;
    over0.visible=false
    
    if(keyDown("space")&&trex0.y>100){
    trex0.velocityY=-10;
      jump.play();
  }
    
    if(ground0.x<0||invisible0.x<0){
    ground0.x=300;
    invisible0.x=300;
  }
    
    if(trex0.isTouching(Obstacle)){
      gameState=end;
      die.play();
    }
    
    score=score+Math.round(frameCount/100);
    
    cloud1();
  obstacle1();
    
    if(score%1000===0){
      check0.play();
    }
    
  }
  
  if(gameState===end){
    
    ground0.velocityX=0;
    invisible0.velocityX=0;
    
    Obstacle.setVelocityXEach(0);
    Obstacle.setLifetimeEach(-1);
    
    Cloud.setVelocityXEach(0);
    Cloud.setLifetimeEach(-1);
    
    trex0.changeAnimation("t2",trex_coll);
    
    res0.visible=true;
    over0.visible=true;
    
    if(mousePressedOver(res0)){
      reset();
    }
  }
  
  
  
  trex0.velocityY=trex0.velocityY+1;
  
  trex0.collide(invisible0);
  
  
  
  
  drawSprites()
  textFont("algerian");
  text("score: "+score,400,30);
  
  
}

function trex1(){
  trex0=createSprite(30,340,20,20);
  trex0.addAnimation("t",trex);
  trex0.addAnimation("t2",trex_coll);
  trex0.scale=0.6;
}

function ground1(){
  ground0=createSprite(300,360,20,20);
  ground0.addImage("g",ground);
  ground0.velocityX=-5;
}

function invisible(){
  invisible0=createSprite(300,375,1000,5);
  invisible0.velocityX=-5
  invisible0.visible=false;
}

function cloud1(){
  if(frameCount%60===0){
  cloud0=createSprite(600,random(10,100),20,20);
  cloud0.addImage("c",cloud);
    cloud0.velocityX=-5;
    cloud0.lifetime=200;
    cloud0.depth=trex0.depth-1;
    
    Cloud.add(cloud0);
    
  
}
}

function obstacle1(){
  if(frameCount%60===0){
  obstacle0=createSprite(600,360,20,20);
  obstacle0.velocityX=-5;
  obstacle0.lifetime=200;
  
  var rand=Math.round(random(1,6));
  
    
    
  Obstacle.add(obstacle0);
    
  switch(rand){
      
    case 1: obstacle0.addImage("o1",obs1);
      break;
      
      case 2: obstacle0.addImage("o2",obs2);
      break;
      
      case 3:obstacle0.addImage("o3",obs3);
      break;
      
      case 4:obstacle0.addImage("o4",obs4);
      break;
      
      case 5:obstacle0.addImage("o5",obs5);
      break;
      
      case 6:obstacle0.addImage("o6",obs6);
      break;
      
      default:break;
    
  }
  
  
}
}

function res1(){
  res0=createSprite(300,150,20,20);
  res0.addImage("r",res);
}

function over1(){
  over0=createSprite(300,250,20,20);
  over0.addImage("o",over);
}

function reset(){
  gameState=play;
  Obstacle.destroyEach();
  Cloud.destroyEach();
  trex0.changeAnimation("t",trex)
  ground0.velocityX=-5;
  
}