export function initializeUI(actions) {

    document
        .getElementById('wave-btn')
        ?.addEventListener('click', actions.wave);

    document
        .getElementById('blink-btn')
        ?.addEventListener('click', actions.blink);
}