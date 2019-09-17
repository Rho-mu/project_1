var gameport = document.getElementById("gameport");

// Frame init
var fps = 60;
var WIDTH = 1000;
var HEIGHT = 300;
var renderer = PIXI.autoDetectRenderer({width: WIDTH, height: HEIGHT, backgroundColor: 0x1a52ff});
gameport.appendChild(renderer.view);

// Load assets
var stage = new PIXI.Container();
var arrowTexture = PIXI.Texture.fromImage("Assets/Sprites/Arrow.png");
//var arrow = new PIXI.Sprite(PIXI.Texture.fromImage("Assets/Sprites/Arrow.png"));
var knight = new PIXI.Sprite(PIXI.Texture.fromImage("Assets/Sprites/Knight64.png"));

// Score
var score = 0;
/*const scoreTextStyle = new Pixi.TextStyle(
{
  fontFamily: 'Arial',
  fontSize: 36,
  fontStyle: 'italic',
  fontWeight: 'bold',
  fill: ['#ffffff', '#00ff99'], // gradient
  stroke: '#4a1850',
  strokeThickness: 5,
  dropShadow: true,
  dropShadowColor: '#000000',
  dropShadowBlur: 4,
  dropShadowAngle: Math.PI / 6,
  dropShadowDistance: 6
});
*/
var scoreText = new PIXI.Text('score: ' + score);
scoreText.x = 0;
scoreText.y = 0;
stage.addChild(scoreText);

// Knight init
knight.anchor.x = 0.5;
knight.anchor.y = 0.5;
knight.position.x = 50;
knight.position.y = HEIGHT-50;
stage.addChild(knight);

// Enemy init
for(let i = 0; i < 10; i++)
{
  const arrow = new PIXI.Sprite(arrowTexture);
  arrow.anchor.set(0.5);
  arrow.x = WIDTH;
  arrow.y = Math.floor(Math.random() * HEIGHT);
  stage.addChild(arrow);
  arrowFlight(arrow);
}


/*
// Mouse functionality
function mouseHandler(e)
{
  arrow.position.x = Math.floor(Math.random() * HEIGHT + 50);
  arrow.position.y = Math.floor(Math.random() * HEIGHT + 50);
}
arrow.interactive = true;
arrow.on('mousedown', mouseHandler);
*/

// Knight controls
function knightControlHander(e)
{
  if(e.keyCode == 87 && e.keyCode == 65) { knight.position.x -= 10; knight.position.y -= 10;} // W + A
  if(e.keyCode == 87 && e.keyCode == 68) { knight.position.x -= 10; knight.position.y += 10;} // W + D
  if(e.keyCode == 83 && e.keyCode == 65) { knight.position.x += 10; knight.position.y -= 10;} // S + A
  if(e.keyCode == 83 && e.keyCode == 68) { knight.position.x += 10; knight.position.y += 10;} // S + D

  if(e.keyCode == 87) { knight.position.y -= 10; } // W
  if(e.keyCode == 83) { knight.position.y += 10; } // S
  if(e.keyCode == 65) { knight.position.x -= 10; } // A
  if(e.keyCode == 68) { knight.position.x += 10; } // D

  if(knight.position.x > WIDTH) {knight.position.x = 0;}
  if(knight.position.x < 0) {knight.position.x = WIDTH;}
  if(knight.position.y > HEIGHT) {knight.position.y = 0;}
  if(knight.position.y < 0) {knight.position.y = HEIGHT;}
}
document.addEventListener('keydown', knightControlHander);


// Enemy controls
function arrowFlight(arrow)
{
  setTimeout(function()
  {
    if(arrow.position.y >= knight.position.y-32 &&
       arrow.position.y <= knight.position.y+32 &&
       arrow.position.x-8 <= knight.position.x+32)
       {
         score++;
         stage.removeChild(arrow);
         reutrn;
       }

    requestAnimationFrame(function(temp)
    {
      arrowFlight(arrow);
    });

    arrow.x -= 10;

  }, 1000/ fps);
}

/*
function enemyAI()
{
  if(arrow.position.x < 0 )
  {
    arrow.anchor.x = 0.5;
    arrow.anchor.y = 0.5;
    arrow.position.x = WIDTH;
    arrow.position.y = Math.floor(Math.random() * HEIGHT);
    stage.addChild(arrow);
  }
  if(arrow.position.y >= knight.position.y-32 &&
     arrow.position.y <= knight.position.y+32 &&
     arrow.position.x-8 <= knight.position.x+32)
  {
    stage.removeChild(arrow);
  }
  arrow.position.x -= 10;
}*/


function animate()
{
    requestAnimationFrame(animate);
    renderer.render(stage);
}

// Code from http://creativejs.com/resources/requestanimationframe/
function draw() {
    setTimeout(function() {
        requestAnimationFrame(draw);
        enemyAI();

    }, 1000 / fps);
}

animate();
draw();
