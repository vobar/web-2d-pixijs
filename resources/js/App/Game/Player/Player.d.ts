import {AnimatedSprite, Application} from "pixi.js";
import {loadSpriteSheet} from "@/App/Game/loadSpriteSheet.js";

export default class PlayerSprite {

    movingDirection: string;
    spriteDir: string;
    spriteName: string

    constructor(
        spriteDir: string,
        spriteName: string,
    ) {
        this.spriteDir = spriteDir;
        this.spriteName = spriteName;

    }

    async init(
        app: Application
    ) {
        this.movingDirection = 'r';
        const catTextures = await loadSpriteSheet(this.spriteDir, this.spriteName);
        // const cat = await loadSpriteSheet('/img/', 'character.json');

        // spritesheet is ready to use!
        let anim = new AnimatedSprite(catTextures.animations.right);

        // set the animation speed
        anim.animationSpeed = 0.1;
        // play the animation on a loop
        anim.play();

        anim.y = 520;
        anim.scale.x = 2;
        anim.scale.y = 2;

        anim.eventMode = 'static';
        anim.cursor = 'pointer';
        anim.on('pointerdown', this.onClick);

        app.stage.addChild(anim);
        this.initMoving(anim, catTextures);
        // return app
    }

    onClick = (event) => {
        if (event.button === 0) {
            event.currentTarget.scale.x *= 1.25;
            event.currentTarget.scale.y *= 1.25;
        } else if (event.button) {
            event.currentTarget.scale.x /= 1.25;
            event.currentTarget.scale.y /= 1.25;
        }
    }
    initMoving = (obj, textures) => {
        let tickRate = 30,
            keyDown = {},
            keyMap = {
                37: 'left',
                38: 'up',
                39: 'right',
                40: 'down'
            };

        document.addEventListener('keydown', (event) => {
            keyDown[event.key] = true; //array is for bi-direction moving
        });
        document.addEventListener('keyup', (event) => {
            keyDown[event.key] = false; //array is for bi-direction moving
        });

        const tick = () => {
            if (keyDown['a']) {
                if (this.movingDirection !== 'l') {
                    this.movingDirection = 'l';
                    obj.textures = textures.animations.left;
                    obj.play();
                }
                obj.x -= 10;
            }
            if (keyDown['d']) {
                if (this.movingDirection !== 'r') {
                    this.movingDirection = 'r';
                    obj.textures = textures.animations.right;
                    obj.play();
                }
                obj.x += 10;
            }

            if (keyDown['w']) {
                if (this.movingDirection !== 'u') {
                    this.movingDirection = 'u';
                    obj.textures = textures.animations.up;
                    obj.play();
                }
                obj.y -= 10;
            }
            if (keyDown['s']) {
                if (this.movingDirection !== 'd') {
                    this.movingDirection = 'd';
                    obj.textures = textures.animations.down;
                    obj.play();
                }
                obj.y += 10;
            }

            setTimeout(tick, tickRate);
        }

        tick();

    }
}
