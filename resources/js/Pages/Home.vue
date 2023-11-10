<script setup>
import {Head} from "@inertiajs/vue3";
import GuestLayout from "@/Layouts/GuestLayout.vue";
//region pixijs
import {
    Application,
    Sprite,
    Assets,
    BaseTexture,
    Spritesheet,
    AnimatedSprite,
    Container, Point, Graphics, TilingSprite
} from 'pixi.js';
import {onMounted, ref} from "vue";
import {loadSpriteSheet} from "@/App/Game/loadSpriteSheet.js";
//endregion pixijs

const appContainer = ref(null);

onMounted(async () => {

    // The application will create a renderer using WebGL, if possible,
    // with a fallback to a canvas render. It will also setup the ticker
    // and the root stage PIXI.Container
    const app = new Application();

    // The application will create a canvas element for you that you
    // can then insert into the DOM
    // document.body.appendChild(app.view);

    // load the texture we need
    // const texture = await Assets.load('/img/friendship.png');
    //
    // // This creates a texture from a 'bunny.png' image
    // const bunny = new Sprite(texture);
    //
    // // Setup the position of the bunny
    // bunny.x = app.renderer.width / 2;
    // bunny.y = app.renderer.height / 2;
    //
    // // Rotate around the center
    // bunny.anchor.x = 0.5;
    // bunny.anchor.y = 0.5;

    // Add the bunny to the scene we are building
    // app.stage.addChild(bunny);
    //
    // // Listen for frame updates
    // app.ticker.add(() => {
    //     // each frame we spin the bunny around a bit
    //     bunny.rotation += 0.01;
    // });

    // const container = new Container();
    // container.x = app.screen.width / 2;
    // container.y = app.screen.height / 2;
    // app.stage.addChild(container);

    // const cat = loadSpriteSheet('character.png', app);


    appContainer.value.appendChild(app.view);

    const texture = await Assets.load("/img/background.jpg");
    const backgroundSprite = new TilingSprite(
        texture
    );
    backgroundSprite.tileScale.x = 0.2
    backgroundSprite.tileScale.y = 0.2
    backgroundSprite.width = 800;
    backgroundSprite.height = 600;

    app.stage.addChild(backgroundSprite);

    app.ticker.add(() => {
        // backgroundSprite.tilePosition.x -= 2;
    });

    // force resize: slide.doResize();
    // renderer.render(app.stage);

    const catTextures = await loadSpriteSheet('/img/cat/', 'cat_white.json');
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
    anim.on('pointerdown', onClick);

    app.stage.addChild(anim);
    initMoving(anim, catTextures);
})

const onClick = (event) => {
    if (event.button === 0) {
        event.currentTarget.scale.x *= 1.25;
        event.currentTarget.scale.y *= 1.25;
    } else if (event.button) {
        event.currentTarget.scale.x /= 1.25;
        event.currentTarget.scale.y /= 1.25;
    }
}

let movingDirection = 'r';

const initMoving = (obj, textures) => {
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
            if (movingDirection !== 'l') {
                movingDirection = 'l';
                obj.textures = textures.animations.left;
                obj.play();
            }
            obj.x -= 10;
        }
        if (keyDown['d']) {
            if (movingDirection !== 'r') {
                movingDirection = 'r';
                obj.textures = textures.animations.right;
                obj.play();
            }
            obj.x += 10;
        }

        if (keyDown['w']) {
            if (movingDirection !== 'u') {
                movingDirection = 'u';
                obj.textures = textures.animations.up;
                obj.play();
            }
            obj.y -= 10;
        }
        if (keyDown['s']) {
            if (movingDirection !== 'd') {
                movingDirection = 'd';
                obj.textures = textures.animations.down;
                obj.play();
            }
            obj.y += 10;
        }

        setTimeout(tick, tickRate);
    }

    tick();

}


</script>

<template>
    <Head title="test pixi.js"/>
    <GuestLayout>
        <div ref="appContainer"></div>
    </GuestLayout>
</template>

