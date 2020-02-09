/*=======================================================
    Player (Hero) Class
========================================================*/

class Hero extends PIXI.Sprite {

    constructor(options) {
        super(options.texture);

        this.vx = options.vx || 10;
        this.vy = options.vy || 10;
        this.lives = options.lives || 3;

        this.moveDirection = false;
        this.bulletTexture = options.bulletTexture;
        this.bulletSound = options.bulletSound || '';

        this.btns = {
            left: keyboard("ArrowLeft"),
            up: keyboard("ArrowUp"),
            right: keyboard("ArrowRight"),
            down: keyboard("ArrowDown")
        }

        this.btns.right.press = () => {
            this.moveDirection = 'right';
        };

        this.btns.right.release = () => {
            this.moveDirection = false;
        };

        this.btns.left.press = () => {
            this.moveDirection = 'left';
        };

        this.btns.left.release  = () => {
            this.moveDirection = false;
        };
    }

    iMove(direction) {
        switch (direction) {
            case 'up':
                this.y -= this.vy;
                break;
            case 'down':
                this.y += this.vy;
                break;
            case 'left':
                if (this.x < -this.width)
                    this.x = window.innerWidth + this.width;
                else
                    this.x -= this.vx;
                break;
            case 'right':
                if (this.x > window.innerWidth + this.width)
                    this.x = 0;
                else
                    this.x += this.vx;
                break;
            default:
                break;
        }
    }

    launchBullet() {

        //const randomIndex = Math.floor(Math.random() * this.children.length);

        const bullet = new Bullet({
            texture: this.bulletTexture
        });

        bullet.x = this.x - 4;
        bullet.y = this.y - 20;

        let audio = new Audio(this.bulletSound);
        audio.volume = 1;
        audio.play();

        return bullet;
    }

    ifCollapse(sprite, callback) {

        if (sprite.y >= this.y - this.height * 2 && sprite.x < this.x + this.width / 2 && sprite.x > this.x - this.width / 2) {
            callback();
        }
    }

    iRender() {
        
        if (this.moveDirection) {
            this.iMove(this.moveDirection);
        }
    }
}

/*=======================================================
   One Enemy Class
========================================================*/

class Enemy extends PIXI.Sprite {
    constructor(options) {

        super(options.texture);
    }
}

/*=======================================================
    Group of Enemy Class
========================================================*/

class EnemyGroup extends PIXI.Container {

    constructor(options) {

        super();

        this.speed = options.spped || 4;
        this.row = options.row || 2;
        this.col = options.col || 5;
        this.count = this.row * this.col;

        this.bulletTexture = options.bulletTexture;
        this.bulletSound = options.bulletSound || '';

        for (let i = 0, y = 0; i < this.count; i++, y++) {
    
            if (y == this.col) y = 0;
    
            const enemy = new Enemy({
                texture: options.texture
            });

            enemy.scale = new PIXI.Point(0.5, 0.5);
            enemy.x = (i % this.col) * 40 + y * 20;
            enemy.y = Math.floor(i / this.col) * 80;
            enemy.anchor.set(0.5);
            this.addChild(enemy);  
        }
        this.constWidth = this.width;
    }

    launchBullet() {

        const randomIndex = Math.floor(Math.random() * this.children.length);

        const bullet = new Bullet({
            texture: this.bulletTexture,
            speed: 10
        });

        bullet.x = this.x + this.children[randomIndex].x - 4;
        bullet.y = this.y + this.children[randomIndex].y - 20;

        let audio = new Audio(this.bulletSound);
        audio.volume = 1;
        audio.play();

        return bullet;
    }

    ifCollapse(sprite, callback) {

        for (let index = 0; index < this.children.length; index++) {
            
            const enemy = this.children[index];
            const enemyX = this.x + enemy.x;

            if (sprite.y <= enemy.y + enemy.height * 2 && sprite.x < enemyX + enemy.width / 2 && sprite.x > enemyX - enemy.width / 2) {
                console.log('ff');
                callback(enemy);
                return
            }   
        }
    }

    iRender() {
        // toggle to left direction
        if (this.speed > 0 && this.x + this.constWidth > window.innerWidth - 100)
            this.speed = -4
        // toggle to right direction
        else if (this.speed < 0 && this.x < 100)
            this.speed = 4
        this.x += this.speed;
    }
}

/*=======================================================
    Bullet Class
========================================================*/

class Bullet extends PIXI.Sprite {
    constructor(options) {

        super(options.texture);
        this.speed = options.speed || -10;
    }

    iRender() {
        this.y += this.speed;
    }
}