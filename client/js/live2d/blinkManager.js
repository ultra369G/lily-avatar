import { CONFIG }
from '../core/config.js';

export function initializeBlinking(model) {

    function blink() {

        if (
            !model
            ||
            !model.internalModel
            ||
            !model.internalModel.coreModel
        ) return;

        const core =
            model.internalModel.coreModel;

        core.setParameterValueById(
            CONFIG.EYE_L,
            0
        );

        core.setParameterValueById(
            CONFIG.EYE_R,
            0
        );

        setTimeout(() => {

            core.setParameterValueById(
                CONFIG.EYE_L,
                1
            );

            core.setParameterValueById(
                CONFIG.EYE_R,
                1
            );

        }, 120);

        const nextBlink =
            2500 + Math.random() * 3000;

        setTimeout(
            blink,
            nextBlink
        );
    }

    blink();

    console.log(
        '✅ Blink System Initialized'
    );
}