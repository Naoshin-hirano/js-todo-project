import { element } from "./html-util.js";

export class TodoItemView {
    /**
     * `todoItem`に対応するTodoアイテムのHTML要素を作成して返す
     * @param {TodoItemModel} todoItem
     * @param {function({id:string, completed: boolean})} onUpdateTodo チェックボックスの更新イベントリスナー
     * @param {function({id:string})} onDeleteTodo 削除ボタンのクリックイベントリスナー
     * @returns {Element}
     */
    createElement(
        todoItem,
        { onUpdateTodo, onDeleteTodo, onEditTodo, onSaveEditTodo }
    ) {
        const todoItemElement = todoItem.completed
            ? element`<li>
                        <input type="checkbox" class="checkbox" checked>
                        <span class="editZone">
                        </span>
                        <span class="title">
                          <s>${todoItem.title}</s>
                        </span>
                        <button class="delete">x</button>
                        <span class="editBtnZone">
                        </span>
                        <button class="edit">編集</button>
                      </li>`
            : element`<li>
                        <input type="checkbox" class="checkbox">
                        <span class="editZone">
                        </span>
                        <span class="title">${todoItem.title}</span>
                        <button class="delete">x</button>
                        <span class="editBtnZone">
                        </span>
                        <button class="edit">編集</button>
                      </li>`;

        const inputCheckboxElement = todoItemElement.querySelector(".checkbox");
        const deleteButtonElement = todoItemElement.querySelector(".delete");
        const editButtonElement = todoItemElement.querySelector(".edit");
        const editZoneElement = todoItemElement.querySelector(".editZone");

        // 編集モードフラグ（editMode）がtrueのときは編集モードになる
        if (todoItem.editMode) {
            const editField = element`<input type="text" class="editField" placeholder=${todoItem.title}></>`;
            const editSave = element`<button class="editSave">保存</button>`;
            const titleFieldElement = todoItemElement.querySelector(".title");
            const editBtnZoneElement = todoItemElement.querySelector(
                ".editBtnZone"
            );
            // タイトルをinputフィールドに切り替え
            editZoneElement.appendChild(editField);
            // 編集ボタンを保存ボタンに表示切り替え
            editBtnZoneElement.appendChild(editSave);
            // タイトル表示を削除
            titleFieldElement.remove();
            // 編集ボタンを削除
            editButtonElement.remove();
            // 追加したDOMの取得
            // 保存ボタンの取得
            const editSaveElement = todoItemElement.querySelector(".editSave");

            const editFieldElement = todoItemElement.querySelector(
                ".editField"
            );
            editSaveElement.addEventListener("click", () => {
                // 入力フォームのvalueが空だとアラート表示
                if (!editFieldElement.value) {
                    alert("入力フォームに文字を入力してください");
                    return;
                }
                // 編集したタイトル文言を保存
                onSaveEditTodo({
                    id: todoItem.id,
                    editMode: !todoItem.editMode,
                    title: editFieldElement.value,
                });
            });
        }

        inputCheckboxElement.addEventListener("change", () => {
            // 指定したTodoアイテムの完了状態を反転させる
            // todoListModelのonChangeが実行される
            onUpdateTodo({
                id: todoItem.id,
                completed: !todoItem.completed,
            });
        });
        deleteButtonElement.addEventListener("click", () => {
            // 削除
            onDeleteTodo({
                id: todoItem.id,
            });
        });
        editButtonElement.addEventListener("click", () => {
            // 編集モードへの切り替え
            onEditTodo({
                id: todoItem.id,
                editMode: !todoItem.editMode,
            });
        });

        return todoItemElement;
    }
}
