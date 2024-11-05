function tetriohover(){
  document.getElementById("tetrio").src="./assets/tetrio-color.svg"
}
function tetrionohover() {
  document.getElementById("tetrio").src = "./assets/tetrio-mono.svg"
}

// TODO: 
// regenerate sprites when they dissapear
// randomize x/y to positions

var popCounter = 0;

var $windowWidth = $(window).width();
var $windowHeight = $(window).height();

PIXI.utils.skipHello(); // remove pixi message in console log 

var app = new PIXI.Application($windowWidth, $windowHeight, {transparent:true, resolution:1});
$('#canvas-container').append(app.view);

var particleCount = 100;
var particleColors = ['26a3ff', '13ce66', 'ff49db', 'af8dd1', '9162bf', 'ff7849', 'ffc82c']
var particleSettings;

for (var i=0; i < particleCount; i++) {
  particleSettings = {
    particleSize: 10,
    x: Math.floor(Math.random() * app.renderer.width),
    y: Math.floor(Math.random() * app.renderer.height),
    scale: Math.floor(Math.random() * 3) / 3,
    alpha: Math.random(),
    particleSpeed: Math.floor(Math.min(200, Math.random() * 1000)),
    color: particleColors[Math.floor(Math.random() * particleColors.length)]
  }
  createParticle(particleSettings);
}

function createParticle() {

  // GRAPHIC
  var graphic = new PIXI.Graphics(); // create graphic
  graphic.beginFill('0x'+particleSettings.color);
  graphic.drawCircle(0, 0, particleSettings.particleSize); // (x, y, radius) // gets scaled as a sprite later
  graphic.endFill();

  // TEXTURE
  var texture = graphic.generateCanvasTexture(); // create texture using graphic (scaleMode, resolution)
  texture.baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST; // scale mode for pixelation

  // SPRITE
  var particleSprite = new PIXI.Sprite(texture);  // create particle using texture			  // show hand cursor on mouseover
  particleSprite.anchor.set(0.5); 							  // center anchor point
  particleSprite.blendMode = PIXI.BLEND_MODES.SCREEN;

  // console.log('createParticle')
  // console.log('_particleSpeed', _particleSpeed);

  // SET POSITIONING
  TweenMax.set(particleSprite, {pixi:{x:particleSettings.x, y:particleSettings.y, scale:particleSettings.scale, alpha:particleSettings.alpha}}, 0);
  TweenMax.to(particleSprite, particleSettings.particleSpeed, {pixi:{x:Math.floor(Math.random() * app.renderer.width), y:Math.floor(Math.random() * app.renderer.height)}, ease:Power4.easeOut, 
    onComplete: function(){
      console.log('onComplete')
      popParticle();
    }
  }, 1);

  // 
  function popParticle() {
    TweenMax.to(particleSprite, 0.3, {pixi:{scale:3, alpha:0}}, 0);
  }
  

  // ADD SPRITE TO STAGE
  app.stage.addChild(particleSprite);
}