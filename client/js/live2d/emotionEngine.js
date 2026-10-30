let currentEmotion = "neutral";

const emotionValues = {
    neutral: {
        mouthSmile: 0,
        eyeOpen: 1,
        angleX: 0
    },

    happy: {
        mouthSmile: 1,
        eyeOpen: 1.1,
        angleX: 5
    },

    sad: {
        mouthSmile: -0.5,
        eyeOpen: 0.7,
        angleX: -5
    },

    angry: {
        mouthSmile: -0.7,
        eyeOpen: 0.9,
        angleX: 10
    },

    sleepy: {
        mouthSmile: 0,
        eyeOpen: 0.4,
        angleX: 0
    }
};

export function setEmotion(model, emotion) {

    if (!model?.internalModel?.coreModel) return;

    if (!emotionValues[emotion]) return;

    currentEmotion = emotion;

    const values = emotionValues[emotion];

    smoothParam(
        model,
        "ParamMouthForm",
        values.mouthSmile
    );

    smoothParam(
        model,
        "ParamEyeLOpen",
        values.eyeOpen
    );

    smoothParam(
        model,
        "ParamEyeROpen",
        values.eyeOpen
    );

    smoothParam(
        model,
        "ParamAngleX",
        values.angleX
    );
}

function smoothParam(model, param, target) {

    let current =
        model.internalModel.coreModel
            .getParameterValueById(param);

    const interval = setInterval(() => {

        current += (target - current) * 0.15;

        model.internalModel.coreModel
            .setParameterValueById(
                param,
                current
            );

        if (Math.abs(target - current) < 0.01) {

            clearInterval(interval);

            model.internalModel.coreModel
                .setParameterValueById(
                    param,
                    target
                );
        }

    }, 16);
}

export function randomEmotion(model) {

    const emotions = [
        "neutral",
        "happy",
        "sad",
        "angry",
        "sleepy"
    ];

    const random =
        emotions[
            Math.floor(Math.random() * emotions.length)
        ];

    setEmotion(model, random);
}