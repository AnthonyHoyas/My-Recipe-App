// FRONT END FILE TO INTERACT WITH THE DOM
// let loader = document.getElementById('loader')
function fadeOutEffect() {
    var fadeTarget = document.getElementById("loader");
    var fadeEffect = setInterval(function () {
        if (!fadeTarget.style.opacity) {
            fadeTarget.style.opacity = 1;
        }
        if (fadeTarget.style.opacity > 0) {
            fadeTarget.style.opacity -= 0.1;
        } else {
            clearInterval(fadeEffect);
        }
    }, 200);
}

window.addEventListener('load', () => {
fadeOutEffect()    
})