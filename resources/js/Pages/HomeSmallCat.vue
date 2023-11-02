<script setup>
import {Head} from "@inertiajs/vue3";
import GuestLayout from "@/Layouts/GuestLayout.vue";
//region pixijs
import {Application, Sprite, Assets, BaseTexture, Spritesheet, AnimatedSprite, Container} from 'pixi.js';
import {onMounted, ref} from "vue";
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
    const cat = loadSpriteSheet('cat_sprites.png', app);
    // app.stage.addChild(cat);

    appContainer.value.appendChild(app.view);

})

const loadSpriteSheet = async (filename, app) => {
    // Create object to store sprite sheet data
    const atlasData = {
        frames: {
            "cat0": {
                "frame": {
                    "x": 0,
                    "y": 64,
                    "w": 32,
                    "h": 32
                },
                "rotated": false,
                "trimmed": false,
                "spriteSourceSize": {
                    "x": 0,
                    "y": 0,
                    "w": 384,
                    "h": 256
                },
                "sourceSize": {
                    "w": 384,
                    "h": 256
                }
            },
            "cat1": {
                "frame": {
                    "x": 32,
                    "y": 64,
                    "w": 32,
                    "h": 32
                },
                "rotated": false,
                "trimmed": false,
                "spriteSourceSize": {
                    "x": 0,
                    "y": 0,
                    "w": 384,
                    "h": 256
                },
                "sourceSize": {
                    "w": 384,
                    "h": 256
                }
            },
            "cat2": {
                "frame": {
                    "x": 64,
                    "y": 64,
                    "w": 32,
                    "h": 32
                },
                "rotated": false,
                "trimmed": false,
                "spriteSourceSize": {
                    "x": 0,
                    "y": 0,
                    "w": 384,
                    "h": 256
                },
                "sourceSize": {
                    "w": 384,
                    "h": 256
                }
            },
        },
        meta: {
            image: 'img/' + filename,
            format: 'RGBA8888',
            size: {w: 384, h: 256},
            scale: 0.2
        },
        animations: {
            cat: [
                'cat0',
                'cat1',
                'cat2',
                'cat1',
            ] //array of frames by name
        }
    }


    // Create the SpriteSheet from data and image
    const spritesheet = new Spritesheet(
        BaseTexture.from(atlasData.meta.image),
        atlasData
    );

    // Generate all the Textures asynchronously
    await spritesheet.parse();

    // spritesheet is ready to use!
    let anim = new AnimatedSprite(spritesheet.animations.cat);

    // set the animation speed
    anim.animationSpeed = 0.1666;
    // play the animation on a loop
    anim.play();

    console.log(app)

    app.stage.addChild(anim);

    return anim;
}


</script>

<template>
    <Head title="test pixi.js"/>
    <GuestLayout>
        <div ref="appContainer"></div>
    </GuestLayout>
</template>

