import { TodoListModel } from "./model/TodoListModel.js";
import { TodoItemModel } from "./model/TodoItemModel.js";
import { TodoListView } from "./view/TodoListView.js";
import { render } from "./view/html-util.js";

export class App {
    // 1. TodoListModelの初期化
    #todoListModel = new TodoListModel();
    #todoListView = new TodoListView();

    formElement;
    inputElement;
    containerElement;
    todoItemCountElement;
    keepButton;
    nonComplete;
    completed;

    constructor({
        formElement,
        inputElement,
        containerElement,
        todoItemCountElement,
        keepButton,
        nonComplete,
        completed,
    }) {
        this.formElement = formElement;
        this.inputElement = inputElement;
        this.containerElement = containerElement;
        this.todoItemCountElement = todoItemCountElement;
        this.keepButton = keepButton;
        this.nonComplete = nonComplete;
        this.completed = completed;
    }

    /**
     * Todoを追加するときに呼ばれるリスナー関数
     * @param {string} title
     */
    handleAdd = (title) => {
        // メソッド時のthisは呼び出し元の親がないのでグローバルオブジェクト(App)になる
        this.#todoListModel.addTodo(
            new TodoItemModel({ title, completed: false })
        );
    };

    /**
     * Todoの状態を更新したときに呼ばれるリスナー関数
     * @param {{ id:number, completed: boolean }}
     */
    handleUpdate = ({ id, completed }) => {
        // メソッド時のthisは呼び出し元の親がないのでグローバルオブジェクト(App)になる
        this.#todoListModel.updateTodo({ id, completed });
    };

    /**
     * Todoを削除したときに呼ばれるリスナー関数
     * @param {{ id: number }}
     */
    handleDelete = ({ id }) => {
        // メソッド時のthisは呼び出し元の親がないのでグローバルオブジェクト(App)になる
        this.#todoListModel.deleteTodo({ id });
    };

    /**
     * フォームを送信時に呼ばれるリスナー関数
     * @param {Event} event
     */
    handleSubmit = (event) => {
        event.preventDefault();
        // 3. フォームを送信したら、新しいTodoItemModelを追加する
        // View → Model
        // handleSubmitがアロー関数のとき：thisはApp
        // handleSubmitがメソッドのとき:thisはform
        const inputElement = this.inputElement;
        // 文字未入力でsubmitできない制御
        if (!inputElement.value) {
            return;
        }
        // 新しいTodoItemをTodoListへ追加する
        // todoListModelのonChangeが実行される
        this.handleAdd(inputElement.value);
        inputElement.value = "";
    };

    /**
     * TodoListViewが変更した時に呼ばれるリスナー関数
     */
    handleChange = () => {
        // handleChangeがアロー関数のとき：thisはApp
        // handleChangeがメソッドのとき:thisは#todoListModel
        const todoItemList = this.#todoListModel.getTodoItems();
        const containerElement = this.containerElement;
        const countElement = this.todoItemCountElement;
        const nonComplete = this.nonComplete;
        const completed = this.completed;
        const todoListElement = this.#todoListView.createElement(todoItemList, {
            // View → Model
            onUpdateTodo: ({ id, completed }) => {
                // hadndleChangeがメソッドだとthisがhandleChangeになる
                // hadndleChangeがアロー関数だとthisがAppになる
                this.handleUpdate({ id, completed });
            },
            // View → Model
            onDeleteTodo: ({ id }) => {
                this.handleDelete({ id });
            },
        });
        render(todoListElement, containerElement);
        // アイテム数の表示を更新
        countElement.textContent = `Todoアイテム数: ${this.#todoListModel.getTotalCount()}`;
        // 未完了タスク数の更新
        nonComplete.textContent = `未完了: ${this.#todoListModel.getUncheckedCount()}`;
        // 完了済みタスク数の更新
        completed.textContent = `完了済み: ${this.#todoListModel.getCheckedCount()}`;
    };

    /**
     * アプリとDOMの紐づけを登録する関数
     */
    mount() {
        // 2. TodoListModelの状態が更新されたら表示を更新する
        // Model → View
        this.#todoListModel.onChange(this.handleChange);
        // 3. フォームを送信したら、新しいTodoItemModelを追加する
        // View → Model
        this.formElement.addEventListener("submit", this.handleSubmit);
        this.keepButton.addEventListener("click", this.handleSubmit);
    }

    /**
     * アプリとDOMの紐づけを解除する関数
     */
    unmount() {
        // 2. TodoListModelの状態が更新されたら表示を更新する
        // Model → View
        this.#todoListModel.offChange(this.handleChange());
        // 3. フォームを送信したら、新しいTodoItemModelを追加する
        // View → Model
        this.formElement.removeEventListener("submit", this.handleSubmit());
    }
}
