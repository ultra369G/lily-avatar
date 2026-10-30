export function startInteractionLoop(
    model
) {

    function loop() {

        requestAnimationFrame(
            loop
        );
    }

    loop();
}