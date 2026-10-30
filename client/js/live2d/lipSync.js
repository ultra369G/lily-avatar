export async function startLipSync(model) {

    const stream = await navigator.mediaDevices.getUserMedia({
        audio: true
    });

    const ctx = new AudioContext();

    const analyser = ctx.createAnalyser();

    const source = ctx.createMediaStreamSource(stream);

    source.connect(analyser);

    analyser.fftSize = 256;

    const data = new Uint8Array(
        analyser.frequencyBinCount
    );

    function update() {

        analyser.getByteFrequencyData(data);

        let volume = data.reduce((a, b) => a + b) / data.length;

        let mouth = Math.min(volume / 160, 1);

        model.internalModel.setParameterValueById(
            'ParamMouthOpenY',
            mouth
        );

        requestAnimationFrame(update);
    }

    update();
}