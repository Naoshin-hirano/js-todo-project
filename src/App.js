import { TodoListModel } from "./model/TodoListModel.js";
import { TodoItemModel } from "./model/TodoItemModel.js";
import { TodoListView } from "./view/TodoListView.js";
import { render } from "./view/html-util.js";

export class App {
    // 1. TodoListModelの初期化
    #todoListModel = new TodoListModel();

    mount() {
        const formElement = document.querySelector("#js-form");
        const inputElement = document.querySelector("#js-form-input");
        const containerElement = document.querySelector("#js-todo-list");
        const todoItemCountElement = document.querySelector("#js-todo-count");

        // 2. TodoListModelの状態が更新されたら表示を更新する
        this.#todoListModel.onChange(() => {
            const todoItemList = this.#todoListModel.getTodoItems();
            // TodoListViewをインスタンス化
            const todoListView = new TodoListView();
            const todoListElement = todoListView.createElement(todoItemList, {
                onUpdateTodo: ({ id, completed }) => {
                    this.#todoListModel.updateTodo({ id, completed });
                },
                onDeleteTodo: ({ id }) => {
                    this.#todoListModel.deleteTodo({ id });
                },
            });
            render(todoListElement, containerElement);
            // アイテム数の表示を更新
            todoItemCountElement.textContent = `Todoアイテム数: ${this.#todoListModel.getTotalCount()}`;
        });
        // 3. フォームを送信したら、新しいTodoItemModelを追加する
        formElement.addEventListener("submit", (event) => {
            event.preventDefault();
            // 新しいTodoItemをTodoListへ追加する
            // todoListModelのonChangeが実行される
            this.#todoListModel.addTodo(
                new TodoItemModel({
                    title: inputElement.value,
                    completed: false,
                })
            );
            inputElement.value = "";
        });
    }
}
