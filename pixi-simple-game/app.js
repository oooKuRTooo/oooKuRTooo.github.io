/*=======================================================
    Init Pixi
========================================================*/

console.log(`
/*=======================================================
    Game Start!
========================================================*/
`)

let type = "WebGL"

if(!PIXI.utils.isWebGLSupported()){
  type = "canvas"
}

const app = new PIXI.Application({
    width: 256,         // default: 800
    height: 256,        // default: 600
    antialias: true,    // default: false
    transparent: true, // default: false
    resolution: 1,       // default: 1
});

app.renderer.view.style.position = "absolute";
app.renderer.view.style.display = "block";
app.renderer.autoResize = true;
app.renderer.resize(window.innerWidth, window.innerHeight);

document.body.appendChild(app.view);

/*=======================================================
    Game Logic && Render
========================================================*/
// level
let level = 1;

// hero
let hero;
let cooldown = 500;
let IsCooldown = false;

// bullets
let heroBullets = [];
let enemyBullets = [];

// scores
let scores = 0;

// Enemies
let enemies = [];
let enemyCol = 6;
let enemyRow = 2;

// Enemies animation
let isAttackTime = true;

function enemiesAnimate() {

    enemies.forEach( enemy => {
        enemy.iRender();

        if (isAttackTime && enemy.children.length > 0) {
            const bullet = enemy.launchBullet();
            app.stage.addChild(bullet);
            enemyBullets.push(bullet);
            isAttackTime = false;

            const randomTime = Math.floor(Math.random() * 2000 - level * 200);

            setTimeout(() => isAttackTime = true, randomTime);
        }
    });
}

// Render All Objects
function renderGame() {

    hero.iRender();

    heroBullets.forEach(bullet => {
        bullet.iRender();
    });

    enemyBullets.forEach(bullet => {
        bullet.iRender();
    });
}

/*=======================================================
    Collapse Computed && Trach Cleaning
========================================================*/

function collapseComputed() {

    // collapse enemy with heroes bullet && delete bullets which off the stage
    for (let bulletIndex = 0; bulletIndex < heroBullets.length; bulletIndex++) {

        let bullet = heroBullets[bulletIndex];

        if (bullet.y < 0) {
            bullet.destroy();
            heroBullets.splice(bulletIndex, 1);
            continue
        }
        
        // delete bullets which off the stage
        for (let enemyIndex = 0; enemyIndex < enemies.length; enemyIndex++) {
            const enemy = enemies[enemyIndex];
            
            enemy.ifCollapse(bullet, deadEnemy => {
                deadEnemy.destroy();
                bullet.destroy();
                heroBullets.splice(bulletIndex, 1);
                scores++;
                return
            })
        }
    }

    // collapse hero with enemies bullet && delete bullets which off the stage
    for (let bulletIndex = 0; bulletIndex < enemyBullets.length; bulletIndex++) {

        let bullet = enemyBullets[bulletIndex];

        // delete bullets which off the stage
        if (bullet.y > window.innerHeight) {
            bullet.destroy();
            enemyBullets.splice(bulletIndex, 1);
            continue
        }

        hero.ifCollapse(bullet, () => {

            bullet.destroy();
            enemyBullets.splice(bulletIndex, 1);

            hero.lives--;
        })
    }

}

/*=======================================================
    Interface && Sound
========================================================*/

// HUD

let style = new PIXI.TextStyle({
    fontFamily: "Bangers, cursive",
    fontSize: 36,
    fill: "green",
    strokeThickness: 4,
    dropShadowBlur: 4,
    dropShadowAngle: Math.PI / 6,
    dropShadowDistance: 6,
});

// scores && lives out
const hudProps = new PIXI.Text(`Scores: 0\tLives: 3\tLevel: 1`, style);
hudProps.x = 10;
hudProps.y = 10;

// new game btn

const newGameBtn = new PIXI.Text('new game',style);
newGameBtn.x = app.renderer.width / 2;
newGameBtn.y = app.renderer.height / 2 + 100;
newGameBtn.anchor.set(0.5);
newGameBtn.visible = false;
newGameBtn.interactive = true;
newGameBtn.buttonMode = true;
newGameBtn.click = () => {
    newGame();
}

app.stage.addChild(hudProps);
app.stage.addChild(newGameBtn);

function renderHud() {
    hudProps.text = `Scores: ${scores}      Lives: ${hero.lives}        Level: ${level}     space - attack      left/right - move`;

    if (isEnd) {
        newGameBtn.visible = true;
        
    } else {
        newGameBtn.visible = false;
    }
}

/*=======================================================
    Game Loop
========================================================*/

let isEnd = false;

let attackBtn = keyboard(" ");

function gameLoop(delta) {

    // out game over
    if (hero.lives < 1) {

        gameEnd();
    }

    // 
    if (enemies[0].children.length === 0) {

        if (enemyCol > 12)
            enemyRow += 2
        else 
            enemyCol += 2

        enemies = [];
        initEnemies({
            col: enemyCol,
            row: enemyRow
        });
        level++;
    }

    if (!isEnd) {
        collapseComputed()
        enemiesAnimate();
        renderGame();
    }

    renderHud();
}

function initHero() {

    hero = new Hero({
        texture: PIXI.loader.resources.player.texture,
        bulletTexture: PIXI.loader.resources.laserRed.texture,
        bulletSound: 'sounds/sfx_laser1.ogg',
    })
    hero.scale = new PIXI.Point(0.5, 0.5);
    hero.x = app.renderer.width / 2;
    hero.y = app.renderer.height - 50;
    hero.anchor.set(0.5);
    app.stage.addChild(hero);


}

function initEnemies(options = {}) {

    const { x, y, col, row } = options;

    let startEnemies = new EnemyGroup({ 
        texture: PIXI.loader.resources.enemy.texture,
        bulletTexture: PIXI.loader.resources.laserGreen.texture,
        bulletSound: 'sounds/sfx_laser2.ogg',
        row: row || 2,
        col: col || 5
    });
    enemies.push(startEnemies);
    startEnemies.y = x || 100;
    startEnemies.x = y || 100;
    app.stage.addChild(startEnemies);
}

function newGame() {

    enemyCol = 6;
    enemyRow = 2;
    level = 0;

    enemies.forEach(enemy => enemy.destroy());
    enemies = [];
    heroBullets.forEach(bullet => bullet.destroy());
    enemyBullets.forEach(bullet => bullet.destroy());
    heroBullets = [];
    enemyBullets = [];
    
    hero.lives = 3;
    hero.x = app.renderer.width / 2;
    scores = 0;
    
    initEnemies({
        row: enemyRow,
        col: enemyCol
    });

    isEnd = false;
}

function gameEnd() {
    isEnd = true;
}
/*=======================================================
    Init Game
========================================================*/

//load an image and run the `setup` function when it's done
PIXI.loader
  .add("bunny", "images/bunny.png")
  .add("player", "images/player.png")
  .add("enemy", "images/enemy.png")
  .add("laserRed", "images/laserRed.png")
  .add("laserGreen", "images/laserGreen.png")
  .load(setup);

new Audio('sounds/sfx_laser1.ogg');
new Audio('sounds/sfx_laser2.ogg')

//This `setup` function will run when the image has loaded

function setup() {

    initHero();

    attackBtn.press = () => {
        if (IsCooldown) return

        IsCooldown = true;
        const bullet = hero.launchBullet();
        app.stage.addChild(bullet);
        heroBullets.push(bullet);

        setTimeout(() => IsCooldown = false, cooldown); 
    }

    newGame();

    hero.lives = 0;

    // Listen for animate update
    app.ticker.add(gameLoop);
}