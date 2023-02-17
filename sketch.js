
var trex ,trex_running;
var fundo;
var fundoImg;
var chaoinvisivel;
var nuvemImg;
var cacto1;
var cacto2;
var cacto3;
var cacto4;
var cacto5;
var cacto6;
var pontos;
var cactos2;
var nuvens2; 
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var trex2;
var gameoverImg;
var gameover;
var restartImg;
var restart;
var som1;
var som2;
var som3;
var teste = "olá";


function preload(){
  trex_running = loadAnimation("assets/trex1.png", "assets/trex3.png", "assets/trex4.png");
  fundoImg = loadImage ("assets/ground2.png");
  nuvemImg = loadImage ("assets/cloud.png");
  cacto1 = loadImage ("assets/obstacle1.png");
  cacto2 = loadImage ("assets/obstacle2.png");
  cacto3 = loadImage ("assets/obstacle3.png");
  cacto4 = loadImage ("assets/obstacle4.png");
  cacto5 = loadImage ("assets/obstacle5.png");
  cacto6 = loadImage ("assets/obstacle6.png");
  trex2 = loadAnimation ("assets/trex_collided.png");
  gameoverImg = loadImage ("assets/gameOver.png");
  restartImg = loadImage ("assets/restart.png");
  som1 = loadSound ("assets/checkpoint.mp3");
  som2 = loadSound ("assets/die.mp3");
  som3 = loadSound ("assets/jump.mp3");


}

function setup(){
  createCanvas(windowWidth, windowHeight);
  
  //crie um sprite de trex
  trex = createSprite(50,windowHeight - 170,20,50);
  trex.addAnimation("running",trex_running);
  trex.setCollider("rectangle", 0, 0, trex.width, trex.height);
  trex.addAnimation("morto", trex2);

  edges=createEdgeSprites();

  //adicione dimensão e posição ao trex
  trex.scale=0.5;
  trex.x=50;
  
  // adicionei o fundo e dei velocidade 
  fundo = createSprite(windowWidth/2, windowHeight - 20, 400, 20);

  fundo.addImage(fundoImg);

  // criamos o chao invisivel e tiramos a cor
  chaoinvisivel = createSprite (50, windowHeight - 10, 400, 20);
  chaoinvisivel.visible = false

  var M = Math.round(random(10,30));
  //console.log(M);

  pontos = 0

  cactos2 = new Group();
  nuvens2 = new Group();

  gameover = createSprite(windowWidth/2, windowHeight/2);
  gameover.addImage(gameoverImg);
  gameover.scale = 0.5;
  gameover.visible = false;
  restart = createSprite(windowWidth/2, windowHeight/1.8);
  restart.addImage(restartImg);
  restart.scale = 0.5
  restart.visible = false;
}

function draw(){
  console.log(teste);
  //definir a cor do plano de fundo para branco
  background("white");
  
  //adcionei os pontos do jogo
  text ("Pontuação: " +pontos, windowWidth - 200, 50);
 
  //impede que o trex caia
  trex.collide(chaoinvisivel);
  drawSprites();

  if (gameState===PLAY){
    pontos += Math.round (getFrameRate()/60);
  if (pontos > 0 && pontos %1000===0) {
    som1.play();
  } 
  if(keyDown("space") && trex.y >= windowHeight - 39 || touches.length > 0)
  {
    trex.velocityY=-20;
    som3.play();
    touches = []
  }
    trex.velocityY=trex.velocityY+0.5;
    nuvens ();
    cactos ();
    if (fundo.x<0){
      fundo.x = fundo.width/2;
    }
    if (cactos2.isTouching(trex)){
      // trex.velocityY=-10;
      // som3.play();
      gameState = END
      som2.play();
    }
    fundo.velocityX = -(2 + pontos/1000);
    fundo.x = fundo.width/2;

  } else if (gameState===END){
      fundo.velocityX = 0;
      cactos2.setVelocityXEach(0);
      nuvens2.setVelocityXEach(0);
      trex.changeAnimation("morto", trex2);
      cactos2.setLifetimeEach(-1);
      nuvens2.setLifetimeEach(-1);
      gameover.visible = true;
      restart.visible = true;

      if (mousePressedOver(restart) || touches.length > 0) {
        reset()
        touches = []
      }

  }
}
  // criei as nuvens
 function nuvens (){ 
  if (frameCount%60===0){
  nuvem = createSprite(windowWidth, 100, 40, 10);
  nuvem.addImage(nuvemImg);
  nuvem.scale = 0.4;
  nuvem.y = Math.round(random(10, 100));
  nuvem.depth = trex.depth;
  trex.depth +=1;
  nuvem.velocityX = -3;
  nuvem.lifetime = windowWidth/3;
  nuvens2.add(nuvem);
  }
 
 }

 function cactos (){
    if (frameCount%60===0){
    cacto = createSprite (windowWidth, windowHeight - 35, 10, 40);
    cacto.velocityX = -(6+pontos/1000);
    var sorteio = Math.round(random(1, 6));
    switch (sorteio){
     case 1: cacto.addImage (cacto1);
    break;
     case 2: cacto.addImage (cacto2);
    break;
     case 3: cacto.addImage (cacto3);
    break;
     case 4: cacto.addImage (cacto4);
    break;
     case 5: cacto.addImage (cacto5);
    break;
     case 6: cacto.addImage (cacto6);
    break;

    default: break;
    }
     cacto.scale = 0.5;
     cacto.lifetime = windowWidth/(6+pontos/1000);
     cactos2.add(cacto);

    }


 }

  function reset() {
  gameState = PLAY;
  gameover.visible = false;
  restart.visible = false;
  cactos2.destroyEach();
  nuvens2.destroyEach();
  trex.changeAnimation("running",trex_running);
  pontos = 0;
 }