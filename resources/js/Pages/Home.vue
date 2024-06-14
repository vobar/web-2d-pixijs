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
import PlayerSprite from "@/App/Game/Player/Player.d.ts";
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

    //region add bg
    // const texture = await Assets.load("/img/background.jpg");
    // const backgroundSprite = new TilingSprite(
    //     texture
    // );
    // backgroundSprite.tileScale.x = 0.2
    // backgroundSprite.tileScale.y = 0.2
    // backgroundSprite.width = 800;
    // backgroundSprite.height = 600;
    //
    // app.stage.addChild(backgroundSprite);
    //endregion

    //region move background
    // app.ticker.add(() => {
    //     backgroundSprite.tilePosition.x -= 2;
    // });

    // force resize: slide.doResize();
    // renderer.render(app.stage);

    const player = new PlayerSprite('/img/cat/', 'cat_white.json');
    player.init(app);

})

</script>

<template>
    <Head title="test pixi.js"/>
    <GuestLayout>
        <div ref="appContainer"></div>
    </GuestLayout>
</template>

