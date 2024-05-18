import { Controller } from '@hotwired/stimulus';
import JSConfetti from 'js-confetti';

/* stimulusFetch: 'lazy' */
export default class extends Controller {
    poof() {

        const jsconfetti = new JSConfetti();
        jsconfetti.addConfetti();

    }
}
