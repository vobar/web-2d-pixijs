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
        backgroundSprite.tilePosition.x -= 2;
    });

    // force resize: slide.doResize();
    // renderer.render(app.stage);

    const cat = await loadSpriteSheet('character.png', app);
    cat.y = 150;

    cat.eventMode = 'static';
    cat.cursor = 'pointer';
    cat.on('pointerdown', onClick);

    app.stage.addChild(cat);

    initMoving(cat);
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

const initMoving = (obj) => {
    document.addEventListener('keydown', (event) => {
        switch (event.key) {
            case 'a':
                obj.x -= 10;
                break;
            case 'd':
                obj.x += 10;
                break;
            // case 's':
            //     market.value.scene.position.y += .1;
            //     CposY.value = market.value.scene.position.y
            //     break;
            // case 'w':
            //     market.value.scene.position.y -= .1;
            //     CposY.value = market.value.scene.position.y
            //     break;
        }
    });
}

const loadSpriteSheet = async (filename) => {
    // Create object to store sprite sheet data
    const atlasData = {
        frames: {
            "character0": {
                "frame": {
                    "x": 1,
                    "y": 1,
                    "w": 293,
                    "h": 450
                },
                "rotated": false,
                "trimmed": false,
                "spriteSourceSize": {
                    "x": 1,
                    "y": 1,
                    "w": 856,
                    "h": 1896
                },
                "sourceSize": {
                    "w": 856,
                    "h": 1896
                }
            },
            "character1": {
                "frame": {
                    "x": 550,
                    "y": 1,
                    "w": 293,
                    "h": 450
                },
                "rotated": false,
                "trimmed": false,
                "spriteSourceSize": {
                    "x": 1,
                    "y": 1,
                    "w": 856,
                    "h": 1896
                },
                "sourceSize": {
                    "w": 856,
                    "h": 1896
                }
            },
            "character2": {
                "frame": {
                    "x": 9,
                    "y": 484,
                    "w": 293,
                    "h": 450
                },
                "rotated": false,
                "trimmed": false,
                "spriteSourceSize": {
                    "x": 1,
                    "y": 1,
                    "w": 856,
                    "h": 1896
                },
                "sourceSize": {
                    "w": 856,
                    "h": 1896
                }
            },
            "character3": {
                "frame": {
                    "x": 557,
                    "y": 483,
                    "w": 293,
                    "h": 450
                },
                "rotated": false,
                "trimmed": false,
                "spriteSourceSize": {
                    "x": 1,
                    "y": 1,
                    "w": 856,
                    "h": 1896
                },
                "sourceSize": {
                    "w": 856,
                    "h": 1896
                }
            },
            "character4": {
                "frame": {
                    "x": 17,
                    "y": 970,
                    "w": 293,
                    "h": 450
                },
                "rotated": false,
                "trimmed": false,
                "spriteSourceSize": {
                    "x": 1,
                    "y": 1,
                    "w": 856,
                    "h": 1896
                },
                "sourceSize": {
                    "w": 856,
                    "h": 1896
                }
            },
            "character5": {
                "frame": {
                    "x": 563,
                    "y": 967,
                    "w": 293,
                    "h": 450
                },
                "rotated": false,
                "trimmed": false,
                "spriteSourceSize": {
                    "x": 1,
                    "y": 1,
                    "w": 856,
                    "h": 1896
                },
                "sourceSize": {
                    "w": 856,
                    "h": 1896
                }
            },
            "character6": {
                "frame": {
                    "x": 9,
                    "y": 1450,
                    "w": 293,
                    "h": 446
                },
                "rotated": false,
                "trimmed": false,
                "spriteSourceSize": {
                    "x": 1,
                    "y": 1,
                    "w": 856,
                    "h": 1896
                },
                "sourceSize": {
                    "w": 856,
                    "h": 1896
                }
            },
            "character7": {
                "frame": {
                    "x": 557,
                    "y": 1450,
                    "w": 293,
                    "h": 446
                },
                "rotated": false,
                "trimmed": false,
                "spriteSourceSize": {
                    "x": 1,
                    "y": 1,
                    "w": 856,
                    "h": 1896
                },
                "sourceSize": {
                    "w": 856,
                    "h": 1896
                }
            },
        },
        meta: {
            image: 'img/' + filename,
            format: 'RGBA8888',
            size: {w: 856, h: 1896},
            scale: 1
        },
        animations: {
            character: [
                'character0',
                'character2',
                'character4',
                'character6',
                'character1',
                'character3',
                'character5',
                'character7',
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
    let anim = new AnimatedSprite(spritesheet.animations.character);

    // set the animation speed
    anim.animationSpeed = 0.1;
    // play the animation on a loop
    anim.play();

    return anim;
}


</script>

<template>
    <Head title="test pixi.js"/>
    <GuestLayout>
        <div ref="appContainer"></div>
    </GuestLayout>
</template>

