(function () {
    'use strict';

    let lightBox: Fade;
    let overlay: Fade;

    window.onload = function () {
        let privacyBtnClose: HTMLElement = document.getElementById('lightbox-close');
        let privacyBtnOpen: HTMLElement = document.getElementById('lightbox-open');
        let lightBoxElement: HTMLElement = document.getElementById('lightbox');
        let overlayElement: HTMLElement = document.getElementById('overlay');
        lightBox = new Fade(lightBoxElement);
        overlay = new Fade(overlayElement);
        privacyBtnClose.onclick = closeLightBox;
        privacyBtnOpen.onclick = openLightBox;
    };

    function openLightBox(event) {
        event.preventDefault();
        overlay.fadeIn();
        lightBox.fadeIn();
    }

    function closeLightBox() {
        overlay.fadeOut();
        lightBox.fadeOut();
    }

    class Fade {
        element: HTMLElement;

        constructor(element: HTMLElement) {
            this.element = element;
        }

        fadeIn() {
            let el = this.element;
            el.style.display = 'block';
            el.style.opacity = '0';
            (function fade() {
                let val = Number(parseFloat( el.style.opacity).toFixed(1));
                if (!((val += 0.1) > 1)) {
                    el.style.opacity = val.toString();
                    requestAnimationFrame(fade);
                }
            })();
        }

        fadeOut() {
            let el = this.element;
            el.style.opacity = '1';
            (function fade() {
                let val = parseFloat(el.style.opacity);
                if ((val -= 0.1) < 0) {
                    el.style.display = "none";
                } else {
                    el.style.opacity = val.toString();
                    requestAnimationFrame(fade);
                }
            })();
        }
    }
})();