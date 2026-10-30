import { CONFIG }
from '../core/config.js';

let mouseX = 0;
let mouseY = 0;

export function initializeMotion(model) {

    window.addEventListener(
        'mousemove',
        e => {

            mouseX =
                (e.clientX / window.innerWidth - 0.5);

            mouseY =
                (e.clientY / window.innerHeight - 0.5);
        }
    );

    let time = 0;

    function animate() {

        time += 0.016;

        if (
            !model
            ||
            !model.internalModel
            ||
            !model.internalModel.coreModel
        ) {

            requestAnimationFrame(animate);

            return;
        }

        const core =
            model.internalModel.coreModel;

        /*
        ------------------------
        BREATHING
        ------------------------
        */

        const breath =
            Math.sin(time * 1.5) * 0.3;

        model.y =
            window.innerHeight / 1.45
            +
            breath * 8;

        model.scale.set(
            CONFIG.SCALE + breath * 0.002
        );

        /*
        ------------------------
        HEAD FOLLOW
        ------------------------
        */

        const targetX =
            mouseX * 18;

        const targetY =
            mouseY * 10;

        const currentX =
            core.getParameterValueById(
                CONFIG.ANGLE_X
            );

        const currentY =
            core.getParameterValueById(
                CONFIG.ANGLE_Y
            );

        const smoothX =
            currentX + (targetX - currentX) * 0.08;

        const smoothY =
            currentY + (targetY - currentY) * 0.08;

        core.setParameterValueById(
            CONFIG.ANGLE_X,
            smoothX
        );

        core.setParameterValueById(
            CONFIG.ANGLE_Y,
            smoothY
        );

        /*
        ------------------------
        BODY FOLLOW
        ------------------------
        */

        core.setParameterValueById(
            CONFIG.BODY_X,
            smoothX * 0.3
        );

        requestAnimationFrame(animate);
    }

    animate();

    console.log(
        '✅ Motion System Initialized'
    );
}