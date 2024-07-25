import { generateId } from "./generateID"

export class Project {
  constructor(name) {
    this.name = name;
    this.id = generateId();
    this.projectItems = [];
  }

  get projectItems() {
    return this.projectItems;
  }

  set projectItems(value) {
    this.projectItems.push(value);
  }

  get id() {
    return this.id;
  }

  set name(value) {
    this.name = value;
  }

  get name () {
    return this.name;
  }
}