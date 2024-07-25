import { generateId } from "./generateID";

export class Item {
  constructor(title, description, dueDate, priority){
    this.id = generateId();
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
  }

  get id() {
    return this.id
  }

  get title() {
    return this.title
  }

  set title(value) {
    this.title = value;
  }

  get description() {
    return this.description;
  }

  set description(value) {
    this.description = value;
  }

  get dueDate() {
    return this.dueDate;
  }

  set dueDate(value) {
    this.dueDate = value
  }

  get priority() {
    return this.priority;
  }

  set priority(value){
    this.priority = value
  }
}

