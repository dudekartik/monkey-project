
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, rockGroup
var score

function preload(){
  
  
  monkey_running =            loadAnimation("monkey_0.png","monkey_1.png","monkey_2.png","monkey_3.png","monkey_4.png","monkey_5.png","monkey_6.png","monkey_7.png","monkey_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}
 

function setup() {
  createCanvas(400, 400);
  


  var survivalTime=0;
  
  //creating monkey
   monkey=createSprite(80,315,20,20);
   monkey.addAnimation("moving", monkey_running);
  // monkey.addImage(bananaImage)
   monkey.scale=0.1
  
  ground = createSprite(400,350,1400,10);
  ground.velocityX=-4;
  ground.x=ground.width/2;
  console.log(ground.x)

    score = 0;
  FoodGroup = new Group();
  rockGroup= new Group();
  
}


function draw() {
  
  background(255);
  
  spawnrock();
  spawnfruit(); 
  if(ground.x<0) {
    ground.x=ground.width/2;
  }
  
 if(keyDown("space") && monkey.y >= 314) {
      monkey.velocityY = -12;
    }
 
  
    monkey.velocityY = monkey.velocityY + 0.6 ;
  
    monkey.collide(ground);   
  
     if(rockGroup.isTouching(monkey)) {
    ground.velocity=0;
    rockGroup.setVelocityXEach(0);
     }
  drawSprites();       
  
  
  stroke("black");
  textSize(20);
  fill("black");
  survivalTime=Math.ceil(frameCount/frameRate()) 
  text("Survival Time: "+ survivalTime, 100,50);
}
function spawnrock() {
  if (frameCount % 120 === 0) {
    var rock = createSprite(600,325);
    rock.addImage(obstacleImage);
    rock.scale = 0.1;
    rock.debug = true
    rock.setCollider("rectangle",0,0,500,rock.height);
    rock.velocityX = -6;
    rock.lifetime = 250;
    rockGroup.add(rock);
  }
}
function spawnfruit() {
  if (frameCount % 60 === 0) {
    var fruit = createSprite(600,120,40,10);
    fruit.y = Math.round(random(80,120));
    fruit.addImage(bananaImage);
    fruit.scale = 0.1;
    fruit.velocityX = -3;
    fruit.lifetime = 200;
    
    FoodGroup.add(fruit);
  }
}
