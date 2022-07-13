import { View } from "./view.js";

export class Search extends View {
  constructor(...args) {
    super(...args)
    console.log(this.usersPerPageInput);
  }
}