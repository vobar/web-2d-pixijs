import {AnimatedSprite, BaseTexture, Spritesheet} from "pixi.js";

export async function loadSpriteSheet(filePath, fileJson) {
    const response = await fetch(filePath + fileJson);

    // Create object to store sprite sheet data
    const atlasData = await response.json();

    // Create the SpriteSheet from data and image
    const spritesheet = new Spritesheet(
        BaseTexture.from(filePath + atlasData.meta.image),
        atlasData
    );

    // Generate all the Textures asynchronously
    await spritesheet.parse();

    return spritesheet
}
