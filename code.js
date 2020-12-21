var p5Inst = new p5(null, 'sketch');

window.preload = function () {
  initMobileControls(p5Inst);

  p5Inst._predefinedSpriteAnimations = {};
  p5Inst._pauseSpriteAnimationsByDefault = false;
  var animationListJSON = {"orderedKeys":["a6870703-0124-47f7-acff-dbe905f5014c","5ce44e39-12ac-4a66-88cf-a87a0ed6a180","33841f90-7a53-4346-b956-e51d1961959b","bb80b7d4-b1a6-4a82-929d-1c04327552a3"],"propsByKey":{"a6870703-0124-47f7-acff-dbe905f5014c":{"name":"monkey","sourceUrl":null,"frameSize":{"x":560,"y":614},"frameCount":10,"looping":true,"frameDelay":12,"version":"EdSPX_xBBt9NKkCb.dNmVxmOORlWuotS","loadedFromSource":true,"saved":true,"sourceSize":{"x":1680,"y":1842},"rootRelativePath":"assets/a6870703-0124-47f7-acff-dbe905f5014c.png"},"5ce44e39-12ac-4a66-88cf-a87a0ed6a180":{"name":"Banana","sourceUrl":null,"frameSize":{"x":1080,"y":1080},"frameCount":1,"looping":true,"frameDelay":12,"version":"2g2qzdZJbv.j7tKbqk8dTAkjoYEQF488","loadedFromSource":true,"saved":true,"sourceSize":{"x":1080,"y":1080},"rootRelativePath":"assets/5ce44e39-12ac-4a66-88cf-a87a0ed6a180.png"},"33841f90-7a53-4346-b956-e51d1961959b":{"name":"Stone","sourceUrl":null,"frameSize":{"x":512,"y":512},"frameCount":1,"looping":true,"frameDelay":12,"version":"LdNJvyTbXqxUVgcz_6kBrLrQkPYWIJWU","loadedFromSource":true,"saved":true,"sourceSize":{"x":512,"y":512},"rootRelativePath":"assets/33841f90-7a53-4346-b956-e51d1961959b.png"},"bb80b7d4-b1a6-4a82-929d-1c04327552a3":{"name":"GAMEOVER","sourceUrl":"assets/v3/animations/iZ5CojmZUgn-Ey6uMv-iDH0QU2S4OIUYfr3sXrgo0YE/bb80b7d4-b1a6-4a82-929d-1c04327552a3.png","frameSize":{"x":700,"y":435},"frameCount":1,"looping":true,"frameDelay":4,"version":"kCvWgjOXJukyXmIcUnLwDtSiz50mvjHa","loadedFromSource":true,"saved":true,"sourceSize":{"x":700,"y":435},"rootRelativePath":"assets/v3/animations/iZ5CojmZUgn-Ey6uMv-iDH0QU2S4OIUYfr3sXrgo0YE/bb80b7d4-b1a6-4a82-929d-1c04327552a3.png"}}};
  var orderedKeys = animationListJSON.orderedKeys;
  var allAnimationsSingleFrame = false;
  orderedKeys.forEach(function (key) {
    var props = animationListJSON.propsByKey[key];
    var frameCount = allAnimationsSingleFrame ? 1 : props.frameCount;
    var image = loadImage(props.rootRelativePath, function () {
      var spriteSheet = loadSpriteSheet(
          image,
          props.frameSize.x,
          props.frameSize.y,
          frameCount
      );
      p5Inst._predefinedSpriteAnimations[props.name] = loadAnimation(spriteSheet);
      p5Inst._predefinedSpriteAnimations[props.name].looping = props.looping;
      p5Inst._predefinedSpriteAnimations[props.name].frameDelay = props.frameDelay;
    });
  });

  function wrappedExportedCode(stage) {
    if (stage === 'preload') {
      if (setup !== window.setup) {
        window.setup = setup;
      } else {
        return;
      }
    }
// -----

var monkey = createSprite(200,320,20,50);
monkey.setAnimation("monkey");
monkey.scale = 0.17;
//monkey.debug=true;

var ground = createSprite(200,380,400,10);
  ground.x = ground.width/2;
var bananagroup = createGroup();
var stonegroup = createGroup();



function draw() {
  background(255); // background is set to white color
  //score = Math.round(World.frameCount/4);

  if (ground.x < 0){  
    ground.x = ground.width/2;
  }  

  food();
  obstacle();  

  if(keyDown("space")){
    monkey.velocityY = -10;
  }
  monkey.velocityY=monkey.velocityY+4;
  
  if(monkey.isTouching(stonegroup)){
    if(monkey.scale===0.05) {
      monkey.destroy();
      GameOver();
      stonegroup.destroyEach();
      bananagroup.destroyEach();
    }
    monkey.scale=0.05;
  }
  
  
  if(monkey.isTouching(bananagroup)){
    bananagroup.destroyEach();
  }
  
  monkey.collide(ground);
  survivalTime();
  drawSprites();
}


function survivalTime() {
  var survivalTime = 0;
  stroke("black");
  textSize(20);
  fill("black");
  survivalTime=Math.ceil(frameCount/frameRate());
  text("Survival Time :" + survivalTime,100,50);
}


function food(){
  if (World.frameCount%80 === 0){
    var banana = createSprite (400,150,20,50);
    banana. setAnimation("Banana");
    banana.scale = 0.05;
    banana.y = randomNumber(120,200);
    banana.velocityX = -2;
    banana.lifetime = 200;
    bananagroup.add (banana);
  }
}

function obstacle(){
  if (World.frameCount%300 === 0){
    var stone = createSprite (400,340,20,50);
    stone.setAnimation("Stone");
    stone.scale = 0.2;
    stone.velocityX = -2;
    stone.lifetime = 200;
    stonegroup.add (stone);
  }
}

 function GameOver(){
    var GAMEOVER = createSprite(200,200,50,50);
    GAMEOVER.setAnimation("GAMEOVER");
    GAMEOVER.scale = 1;
    
}
// -----
    try { window.draw = draw; } catch (e) {}
    switch (stage) {
      case 'preload':
        if (preload !== window.preload) { preload(); }
        break;
      case 'setup':
        if (setup !== window.setup) { setup(); }
        break;
    }
  }
  window.wrappedExportedCode = wrappedExportedCode;
  wrappedExportedCode('preload');
};

window.setup = function () {
  window.wrappedExportedCode('setup');
};
