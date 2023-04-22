console.log("App.js: loaded");
export class App {
    mount() {
        if (typeof window !== "undefined") {
            const formElement = window.document.querySelector("#js-form");
            const inputElement = window.document.querySelector(
                "#js-form-input"
            );
            formElement.addEventListener("submit", (event) => {
                // preventDefaultしないとページがリロードされてしまう
                event.preventDefault();
                console.log(`入力欄の値: ${inputElement.value}`);
            });
        }
    }
}
