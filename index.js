import { App } from "./src/App.js";
const formElement = document.querySelector("#js-form");
const inputElement = document.querySelector("#js-form-input");
const containerElement = document.querySelector("#js-todo-list");
const todoItemCountElement = document.querySelector("#js-todo-count");
const keepButton = document.querySelector("#keep-btn");
const nonComplete = document.querySelector("#non-complete");
const completed = document.querySelector("#completed");

const app = new App({
    formElement,
    inputElement,
    containerElement,
    todoItemCountElement,
    keepButton,
    nonComplete,
    completed,
});
window.addEventListener("load", () => {
    app.mount();
});
window.addEventListener("unload", () => {
    app.unmount();
});
