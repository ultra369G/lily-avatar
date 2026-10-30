import { CONFIG }
from '../core/config.js';

export async function loadModel() {

    const model =
        await PIXI.live2d.Live2DModel.from(
            CONFIG.MODEL_PATH
        );

    model.anchor.set(0.5);

    model.scale.set(CONFIG.SCALE);

    return model;
}