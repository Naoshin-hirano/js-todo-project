import { EventEmitter } from "./EventEmitter.js";
const event = new EventEmitter();
// イベントリスナー（コールバック関数）を登録
// 'test-event'がきたらconsole.logのイベントを実行するように登録
event.addEventListener("test-event", () => console.log("One!"));
event.addEventListener("test-event", () => console.log("Two!"));
// イベントをディスパッチする
// "test-event"がきたときに実行するように登録されてあるイベントを実行
event.emit("test-event");
// コールバック関数がそれぞれ呼びだされ、コンソールには次のように出力される
// "One!"
// "Two!"
