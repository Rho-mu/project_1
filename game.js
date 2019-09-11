var gameport = document.getElementById("gameport");

var renderer = PIXI.autoDetectRenderer({width: 400, height: 400, backgroundColor: 0x1a52ff});
gameport.appendChild(renderer.view);

// Load assets
var stage = new PIXI.Container();
//ar clickButton = new PIXI.Sprite(PIXI.Texture.fromImage("Assets/Sprites/Click-Button.png"));
var knight = new PIXI.Sprite(PIXI.Texture.fromImage("Assets/Sprites/knight.png"));
/*
// Click Button init
clickButton.anchor.x = 0.5;
clickButton.anchor.y = 0.5;
clickButton.position.x = 200;
clickButton.position.y = 200;
stage.addChild(clickButton);
*/

// Knight init
knight.anchor.x = 0.5;
knight.anchor.y = 0.5;
knight.position.x = 100;
knight.position.y = 100;
stage.addChild(knight);

function keydownEventHandler(e)
{
  if(e.keyCode == 87) { knight.position.y -= 10; }
  if(e.keyCode == 83) { knight.position.y += 10; }
  if(e.keyCode == 65) { knight.position.x -= 10; }
  if(e.keyCode == 68) { knight.position.x += 10; }
}

function mouseHandler(e)
{
  knight.position.x = Math.floor(Math.random() * 300 + 50);
  knight.position.y = Math.floor(Math.random() * 300 + 50);
}

knight.interactive = true;
knight.on('mousedown', mouseHandler);

document.addEventListener('keydown', keydownEventHandler);

function animate()
{
    requestAnimationFrame(animate);
    renderer.render(stage);
}

animate();
