// ユニークなIDを管理する変数
let todoIdx = 0;

export class TodoItemModel {
    /** @type {number} TodoアイテムのID */
    id;
    /** @type {string} Todoアイテムのタイトル */
    title;
    /** @type {boolean} Todoアイテムが完了済みならばtrue、そうでない場合はfalse */
    completed;
    /** @type {boolean} Todoアイテムのtitieの編集モードならばtrue、そうでない場合はfalse */
    editMode;

    /**
     * @param {{ title: string, completed: boolean, editMode: boolean }}
     */
    constructor({ title, completed, editMode }) {
        // idは連番となり、それぞれのインスタンス毎に異なるものとする
        this.id = todoIdx++;
        this.title = title;
        this.completed = completed;
        this.editMode = editMode;
    }
}
