let attentionInterval = null;

export function initializeAttentionSystem(model) {

    if (!model?.internalModel?.coreModel) return;

    const core =
        model.internalModel.coreModel;

    let targetX = 0;

    let targetY = 0;

    /*
        RANDOM ATTENTION SHIFTS
    */

    attentionInterval = setInterval(() => {

        targetX =
            randomRange(-12, 12);

        targetY =
            randomRange(-8, 8);

    }, 2500);

    /*
        SMOOTH EYE MOVEMENT
    */

    setInterval(() => {

        const currentX =
            core.getParameterValueById(
                "ParamEyeBallX"
            );

        const currentY =
            core.getParameterValueById(
                "ParamEyeBallY"
            );

        const newX =
            lerp(currentX, targetX / 30, 0.08);

        const newY =
            lerp(currentY, targetY / 30, 0.08);

        core.setParameterValueById(
            "ParamEyeBallX",
            newX
        );

        core.setParameterValueById(
            "ParamEyeBallY",
            newY
        );

    }, 33);
}

function randomRange(min, max) {

    return Math.random() * (max - min) + min;
}

function lerp(start, end, factor) {

    return start + (end - start) * factor;
}