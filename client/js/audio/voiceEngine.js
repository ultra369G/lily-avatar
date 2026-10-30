import { CONFIG }
from '../core/config.js';

let selectedVoice = null;

let mouthLoop = null;

export function initializeVoice() {

    function loadVoices() {

        const voices =
            speechSynthesis.getVoices();

        console.log('Available voices:');

        voices.forEach(v => {
            console.log(v.name);
        });

        selectedVoice =

            voices.find(v =>
                v.name.includes(
                    'Google UK English Female'
                )
            )

            ||

            voices.find(v =>
                v.name.includes('Zira')
            )

            ||

            voices[0];

        console.log(
            'Selected voice:',
            selectedVoice?.name
        );
    }

    loadVoices();

    speechSynthesis.onvoiceschanged =
        loadVoices;
}

export function speak(model, text) {

    speechSynthesis.cancel();

    const utterance =
        new SpeechSynthesisUtterance(text);

    utterance.voice =
        selectedVoice;

    utterance.rate = 1;

    utterance.pitch = 1.1;

    utterance.volume = 1;

    utterance.onstart = () => {

        animateMouth(model);
    };

    utterance.onend = () => {

        stopMouth(model);
    };

    speechSynthesis.speak(utterance);
}

function animateMouth(model) {

    stopMouth(model);

    mouthLoop = setInterval(() => {

        if (
            !model
            ||
            !model.internalModel
            ||
            !model.internalModel.coreModel
        ) return;

        const value =
            0.3 + Math.random() * 0.5;

        model.internalModel.coreModel
            .setParameterValueById(
                CONFIG.MOUTH_PARAM,
                value
            );

    }, 80);
}

function stopMouth(model) {

    clearInterval(mouthLoop);

    if (
        !model
        ||
        !model.internalModel
        ||
        !model.internalModel.coreModel
    ) return;

    model.internalModel.coreModel
        .setParameterValueById(
            CONFIG.MOUTH_PARAM,
            0
        );
}