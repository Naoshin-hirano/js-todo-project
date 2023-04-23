import { element } from "./html-util.js";

export class TodoItemView {
    /**
     * `todoItem`に対応するTodoアイテムのHTML要素を作成して返す
     * @param {TodoItemModel} todoItem
     * @param {function({id:string, completed: boolean})} onUpdateTodo チェックボックスの更新イベントリスナー
     * @param {function({id:string})} onDeleteTodo 削除ボタンのクリックイベントリスナー
     * @returns {Element}
     */
    createElement(todoItem, { onUpdateTodo, onDeleteTodo }) {
        const todoItemElement = todoItem.completed
            ? element`<li><input type="checkbox" class="checkbox" checked><s>${todoItem.title}</s><button class="delete">x</button></li>`
            : element`<li><input type="checkbox" class="checkbox"><button class="delete">x</button>${todoItem.title}</li>`;
        const inputCheckboxElement = todoItemElement.querySelector(".checkbox");
        const deleteButtonElement = todoItemElement.querySelector(".delete");
        inputCheckboxElement.addEventListener("change", () => {
            // 指定したTodoアイテムの完了状態を反転させる
            // todoListModelのonChangeが実行される
            onUpdateTodo({
                id: todoItem.id,
                completed: !todoItem.completed,
            });
        });
        deleteButtonElement.addEventListener("click", () => {
            onDeleteTodo({
                id: todoItem.id,
            });
        });

        return todoItemElement;
    }
}
