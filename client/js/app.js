console.log("🌸 Lily Engine Starting");

import {
    initializeVoice,
    speak
}
from "./audio/voiceEngine.js";

let app;
let model;

let currentEmotion = "neutral";

const MODEL_PATH =
    "/assets/live2d/kei/kei_vowels_pro.model3.json";

boot();

async function boot() {

    const status =
        document.getElementById("status");

    try {

        status.textContent =
            "Loading Lily...";

        /*
        ========================
        PIXI
        ========================
        */

        app =
            new PIXI.Application({

                view:
                    document.getElementById(
                        "live2d-canvas"
                    ),

                resizeTo: window,

                transparent: true,

                antialias: true,

                resolution: 1,

                autoDensity: true,

                powerPreference:
                    "low-power"
            });

        console.log(
            "✅ PIXI initialized"
        );

        /*
        ========================
        LOAD MODEL
        ========================
        */

        model =
            await PIXI.live2d
                .Live2DModel
                .from(MODEL_PATH);

        console.log(
            "✅ MODEL LOADED"
        );

        setupModel();

        initializeVoice();

        setupControls();

        startIdleBreathing();

        startBlinking();

        startAutonomousBehavior();

        status.textContent =
            "✅ Lily Ready";

        console.log(
            "✅ Lily Ready"
        );

        setTimeout(() => {

            speak(
                model,
                "Hello. I am Lily."
            );

        }, 1200);

    }

    catch(error) {

        console.error(error);

        if(status){

            status.textContent =
                "❌ Failed to load Lily";
        }
    }
}

/*
=================================
MODEL SETUP
=================================
*/

function setupModel() {

    model.anchor.set(0.5);

    const scale =
        Math.min(
            window.innerWidth / 3200,
            window.innerHeight / 3200
        );

    model.scale.set(scale);

    model.x =
        window.innerWidth / 2;

    model.y =
        window.innerHeight * 0.72;

    app.stage.addChild(model);

    window.addEventListener(
        "resize",
        () => {

            model.x =
                window.innerWidth / 2;

            model.y =
                window.innerHeight * 0.72;
        }
    );
}

/*
=================================
CONTROLS
=================================
*/

function setupControls() {

    const talkBtn =
        document.getElementById(
            "talk-btn"
        );

    const happyBtn =
        document.getElementById(
            "happy-btn"
        );

    const sadBtn =
        document.getElementById(
            "sad-btn"
        );

    const sleepBtn =
        document.getElementById(
            "sleep-btn"
        );

    if(talkBtn){

        talkBtn.onclick = () => {

            speak(
                model,
                "How are you today?"
            );
        };
    }

    if(happyBtn){

        happyBtn.onclick = () => {

            setEmotion("happy");
        };
    }

    if(sadBtn){

        sadBtn.onclick = () => {

            setEmotion("sad");
        };
    }

    if(sleepBtn){

        sleepBtn.onclick = () => {

            setEmotion("sleepy");
        };
    }
}

/*
=================================
EMOTIONS
=================================
*/

function setEmotion(type) {

    if(!model?.internalModel?.coreModel)
        return;

    currentEmotion = type;

    const core =
        model.internalModel.coreModel;

    switch(type){

        case "happy":

            core.setParameterValueById(
                "ParamMouthSmile",
                1
            );

            break;

        case "sad":

            core.setParameterValueById(
                "ParamMouthSmile",
                -1
            );

            break;

        case "sleepy":

            core.setParameterValueById(
                "ParamEyeLOpen",
                0.4
            );

            core.setParameterValueById(
                "ParamEyeROpen",
                0.4
            );

            break;

        default:

            resetExpression();
    }
}

/*
=================================
RESET
=================================
*/

function resetExpression() {

    if(!model?.internalModel?.coreModel)
        return;

    const core =
        model.internalModel.coreModel;

    core.setParameterValueById(
        "ParamMouthSmile",
        0
    );

    core.setParameterValueById(
        "ParamEyeLOpen",
        1
    );

    core.setParameterValueById(
        "ParamEyeROpen",
        1
    );
}

/*
=================================
IDLE BREATHING
=================================
*/

function startIdleBreathing() {

    let time = 0;

    const baseScale =
        model.scale.x;

    app.ticker.add(() => {

        time += 0.01;

        const breathe =

            1 +
            Math.sin(time)
            * 0.002;

        model.scale.set(
            baseScale * breathe
        );
    });
}

/*
=================================
AUTO BLINK
=================================
*/

function startBlinking() {

    setInterval(() => {

        blink();

    }, 5000);
}

function blink() {

    if(!model?.internalModel?.coreModel)
        return;

    const core =
        model.internalModel.coreModel;

    core.setParameterValueById(
        "ParamEyeLOpen",
        0
    );

    core.setParameterValueById(
        "ParamEyeROpen",
        0
    );

    setTimeout(() => {

        core.setParameterValueById(
            "ParamEyeLOpen",
            1
        );

        core.setParameterValueById(
            "ParamEyeROpen",
            1
        );

    }, 120);
}

/*
=================================
AUTONOMOUS BEHAVIOR
=================================
*/

function startAutonomousBehavior() {

    setInterval(() => {

        const r =
            Math.random();

        if(r < 0.40){

            blink();
        }

        else if(r < 0.70){

            slightHeadMove();
        }

        else {

            randomEmotion();
        }

    }, 8000);
}

/*
=================================
HEAD MOVEMENT
=================================
*/

function slightHeadMove() {

    if(!model?.internalModel?.coreModel)
        return;

    const core =
        model.internalModel.coreModel;

    const angle =

        (Math.random() - 0.5)
        * 15;

    core.setParameterValueById(
        "ParamAngleX",
        angle
    );

    setTimeout(() => {

        core.setParameterValueById(
            "ParamAngleX",
            0
        );

    }, 2000);
}

/*
=================================
RANDOM EMOTIONS
=================================
*/

function randomEmotion() {

    const emotions = [

        "happy",
        "sad",
        "neutral"
    ];

    const emotion =

        emotions[
            Math.floor(
                Math.random()
                * emotions.length
            )
        ];

    if(emotion === "neutral"){

        resetExpression();
    }

    else {

        setEmotion(emotion);
    }
}