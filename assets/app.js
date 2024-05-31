import './bootstrap.js';
/*
 * Welcome to your app's main JavaScript file!
 *
 * This file will be included onto the page via the importmap() Twig function,
 * which should already be in your base.html.twig.
 */
import './styles/app.css';
import alienGreeting from './lib/alien-greeting.js';
import { shouldPerformTransition, performTransition } from 'turbo-view-transitions';

alienGreeting('Give us all your canddy! ', false);
console.log('This log comes from assets/app.js - welcome to AssetMapper! 🎉');

let skipNextTransition = false;
document.addEventListener('turbo:before-render', (event) => {
    if (shouldPerformTransition() && !skipNextTransition) {
        event.preventDefault();
        performTransition(document.body, event.detail.newBody, async () => {
            await event.detail.resume();
        });
    }
});

document.addEventListener('turbo:before-frame-render', (event) => {
    if (shouldPerformTransition() && !event.target.hasAttribute('data-skip-transition')) {
        event.preventDefault();
        skipNextTransition = true;
        setTimeout(
            () => {
                skipNextTransition = false;
            },
            100
        );
        performTransition(event.target, event.detail.newFrame, async () => {
            await event.detail.resume();
        });
    }
});

document.addEventListener('turbo:load', () => {
    // View Transitions don't play nicely with Turbo cache
    if (shouldPerformTransition()) Turbo.cache.exemptPageFromCache();
})