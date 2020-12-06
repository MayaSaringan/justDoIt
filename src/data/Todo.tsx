export default class Todo {
  id: string;

  item: string;

  constructor(id: string, item: string) {
    this.id = id;
    this.item = item;
  }
}
