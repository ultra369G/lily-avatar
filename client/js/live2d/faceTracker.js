import { CONFIG }
from '../core/config.js';

export async function startFaceTracking(model) {

    const video =
        document.createElement('video');

    video.style.display = 'none';

    document.body.appendChild(video);

    const stream =
        await navigator.mediaDevices
            .getUserMedia({

                video: true
            });

    video.srcObject = stream;

    await video.play();

    const faceMesh =
        new FaceMesh({

            locateFile: file => {

                return `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/${file}`;
            }
        });

    faceMesh.setOptions({

        maxNumFaces: 1,

        refineLandmarks: true,

        minDetectionConfidence: 0.5,

        minTrackingConfidence: 0.5
    });

    faceMesh.onResults(results => {

        if (
            !results.multiFaceLandmarks
            ||
            !results.multiFaceLandmarks[0]
        ) return;

        const landmarks =
            results.multiFaceLandmarks[0];

        const nose =
            landmarks[1];

        const left =
            landmarks[33];

        const right =
            landmarks[263];

        const centerX =
            (left.x + right.x) / 2;

        const offsetX =
            nose.x - centerX;

        const angleX =
            offsetX * 120;

        if (
            model.internalModel
            &&
            model.internalModel.coreModel
        ) {

            model.internalModel.coreModel
                .setParameterValueById(
                    CONFIG.ANGLE_X,
                    angleX
                );
        }
    });

    async function detect() {

        await faceMesh.send({

            image: video
        });

        requestAnimationFrame(detect);
    }

    detect();

    console.log(
        '✅ Face Tracking Active'
    );
}