var gameport = document.getElementById("gameport");

var renderer = PIXI.autoDetectRenderer({width: 400, height: 400, backgroundColor: 0x00FF96});
gameport.appendChild(renderer.view);

// Load assets
var stage = new PIXI.Container();
var clickButton = new PIXI.Sprite(PIXI.Texture.fromImage("Assets/Sprites/Click-Button.png"));

// Click Button init
clickButton.anchor.x = 0.5;
clickButton.anchor.y = 0.5;
clickButton.position.x = 200;
clickButton.position.y = 200;
stage.addChild(clickButton);

function animate()
{
    requestAnimationFrame(animate);
    //clickButton.rotation += 0.01;
    renderer.render(stage);
}

animate();
