let activeAnimation = null;

/*
=================================
BLEND PARAMETER
=================================
*/

export function blendParameter(
    core,
    parameterId,
    targetValue,
    duration = 500
) {

    if (!core) return;

    const startValue =
        core.getParameterValueById(
            parameterId
        );

    const startTime =
        performance.now();

    function animate(now) {

        const elapsed =
            now - startTime;

        const progress =
            Math.min(
                elapsed / duration,
                1
            );

        const value =

            startValue +

            (
                targetValue -
                startValue
            ) * progress;

        core.setParameterValueById(
            parameterId,
            value
        );

        if (progress < 1) {

            requestAnimationFrame(
                animate
            );
        }
    }

    requestAnimationFrame(
        animate
    );
}

/*
=================================
EMOTIONS
=================================
*/

export function applyEmotion(
    model,
    emotion
) {

    if (
        !model ||
        !model.internalModel ||
        !model.internalModel.coreModel
    ) {
        return;
    }

    const core =
        model.internalModel.coreModel;

    switch (emotion) {

        case "happy":

            blendParameter(
                core,
                "ParamMouthSmile",
                1
            );

            blendParameter(
                core,
                "ParamEyeLOpen",
                1
            );

            blendParameter(
                core,
                "ParamEyeROpen",
                1
            );

            break;

        case "sad":

            blendParameter(
                core,
                "ParamMouthSmile",
                -1
            );

            blendParameter(
                core,
                "ParamEyeLOpen",
                0.8
            );

            blendParameter(
                core,
                "ParamEyeROpen",
                0.8
            );

            break;

        case "sleepy":

            blendParameter(
                core,
                "ParamEyeLOpen",
                0.4
            );

            blendParameter(
                core,
                "ParamEyeROpen",
                0.4
            );

            break;

        case "surprised":

            blendParameter(
                core,
                "ParamEyeLOpen",
                1.3
            );

            blendParameter(
                core,
                "ParamEyeROpen",
                1.3
            );

            break;

        default:

            resetEmotion(
                model
            );
    }
}

/*
=================================
RESET
=================================
*/

export function resetEmotion(
    model
) {

    if (
        !model ||
        !model.internalModel ||
        !model.internalModel.coreModel
    ) {
        return;
    }

    const core =
        model.internalModel.coreModel;

    blendParameter(
        core,
        "ParamMouthSmile",
        0
    );

    blendParameter(
        core,
        "ParamEyeLOpen",
        1
    );

    blendParameter(
        core,
        "ParamEyeROpen",
        1
    );
}