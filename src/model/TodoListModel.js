import { EventEmitter } from "../EventEmitter.js";

export class TodoListModel extends EventEmitter {
    #items;
    /**
     * @param {TodoItemModel[]} [items] 初期アイテム一覧（デフォルトは空の配列）
     */
    constructor(items = []) {
        super();
        this.#items = items;
    }

    /**
     * TodoItemの合計個数を返す
     * @returns {number}
     */
    getTotalCount() {
        return this.#items.length;
    }

    /**
     * 完了済みのTodoItemの数を返す
     * @returns {number}
     */
    getCheckedCount() {
        let count = 0;
        for (let i = 0; i < this.#items.length; i++) {
            if (this.#items[i].completed) {
                count++;
            }
        }
        return count;
    }

    /**
     * 未完了のTodoItemの数を返す
     * @returns {number}
     */
    getUncheckedCount() {
        let count = 0;
        for (let i = 0; i < this.#items.length; i++) {
            if (!this.#items[i].completed) {
                count++;
            }
        }
        return count;
    }

    /**
     * 表示できるTodoItemの配列を返す
     * @returns {TodoItemModel[]}
     */
    getTodoItems() {
        return this.#items;
    }

    /**
     * TodoListの状態が更新されたときに呼び出されるリスナー関数を登録する
     * @param {Function} listener
     */
    onChange(listener) {
        this.addEventListener("change", listener);
    }

    /**
     * TodoListの状態が更新されたときに呼び出されるリスナー関数を削除する
     * @param {Function} listener
     */
    offChange(listener) {
        this.removeEventListener("change", listener);
    }

    /**
     * 状態が変更されたときに呼ぶ。登録済みのリスナー関数を呼び出す
     */
    emitChange() {
        this.emit("change");
    }

    /**
     * TodoItemを追加する
     * @param {TodoItemModel} todoItem
     */
    addTodo(todoItem) {
        this.#items.push(todoItem);
        this.emitChange();
    }

    /**
     * 指定したidのTodoItemの完了チェックボタンを更新する
     * @param {{ id:number, completed: boolean }}
     */
    updateTodo({ id, completed }) {
        const todoItem = this.#items.find((item) => item.id === id);
        if (!todoItem) {
            return;
        }
        todoItem.completed = completed;
        this.emitChange();
    }

    /**
     * 指定したidのTodoItemを編集モードに切り替え
     * @param {{ id:number, editMode: boolean }}
     */
    editTodo({ id, editMode }) {
        const todoItem = this.#items.find((item) => item.id === id);
        if (!todoItem) {
            return;
        }
        todoItem.editMode = editMode;
        this.emitChange();
    }

    /**
     * 指定したidのTodoItemの編集したタイトルを更新する
     * @param {{ id:number, editMode: boolean, title: string }}
     */
    saveEditTodo({ id, editMode, title }) {
        const todoItem = this.#items.find((item) => item.id === id);
        if (!todoItem) {
            return;
        }
        todoItem.editMode = editMode;
        todoItem.title = title;
        this.emitChange();
    }

    /**
     * 指定したidのTodoItemを削除する
     * @param {{ id:number }}
     */
    deleteTodo({ id }) {
        const question = confirm("本当に削除してもよろしいですか？");
        if (!question) {
            return;
        }
        this.#items = this.#items.filter((item) => {
            return item.id !== id;
        });
        this.emitChange();
    }
}
