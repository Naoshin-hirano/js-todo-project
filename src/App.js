import { TodoListModel } from "./model/TodoListModel.js";
import { TodoItemModel } from "./model/TodoItemModel.js";
import { TodoListView } from "./view/TodoListView.js";
import { render } from "./view/html-util.js";

export class App {
    // 1. TodoListModelの初期化
    #todoListModel = new TodoListModel();

    /**
     * Todoを追加するときに呼ばれるリスナー関数
     * @param {string} title
     */
    handleAdd(title) {
        this.#todoListModel.addTodo(
            new TodoItemModel({ title, completed: false })
        );
    }

    /**
     * Todoの状態を更新したときに呼ばれるリスナー関数
     * @param {{ id:number, completed: boolean }}
     */
    handleUpdate({ title, completed }) {
        this.#todoListModel.updateTodo({ title, completed });
    }

    /**
     * Todoを削除したときに呼ばれるリスナー関数
     * @param {{ id: number }}
     */
    handleDelete({ id }) {
        this.#todoListModel.deleteTodo({ id });
    }

    mount() {
        const formElement = document.querySelector("#js-form");
        const inputElement = document.querySelector("#js-form-input");
        const containerElement = document.querySelector("#js-todo-list");
        const todoItemCountElement = document.querySelector("#js-todo-count");

        // 2. TodoListModelの状態が更新されたら表示を更新する
        // Model → View
        this.#todoListModel.onChange(() => {
            const todoItemList = this.#todoListModel.getTodoItems();
            // TodoListViewをインスタンス化
            const todoListView = new TodoListView();
            const todoListElement = todoListView.createElement(todoItemList, {
                // View → Model
                onUpdateTodo: ({ id, completed }) => {
                    this.handleUpdate({ id, completed });
                },
                // View → Model
                onDeleteTodo: ({ id }) => {
                    this.handleDelete({ id });
                },
            });
            render(todoListElement, containerElement);
            // アイテム数の表示を更新
            todoItemCountElement.textContent = `Todoアイテム数: ${this.#todoListModel.getTotalCount()}`;
        });
        // 3. フォームを送信したら、新しいTodoItemModelを追加する
        // View → Model
        formElement.addEventListener("submit", (event) => {
            event.preventDefault();
            // 新しいTodoItemをTodoListへ追加する
            // todoListModelのonChangeが実行される
            this.handleAdd(inputElement.value);
            inputElement.value = "";
        });
    }
}
