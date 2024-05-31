// import '../styles/alien-greeting.css';

export default function (message, inPace = false) {
    if(!inPace) {
        setTimeout(
            () => {
                import("../styles/alien-greeting.css");
            },
        4000
    );
    }
    console.log(`${message}! ${inPace ? '🖖' : '👽'}`);
}
