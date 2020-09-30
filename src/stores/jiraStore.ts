import { RootStore } from "./rootStore";
import { observable, action } from "mobx";

export default class JiraStore {
  rootStore: RootStore;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
  }

  @observable ticket: string = "";

  @action setTicket = (ticket: string) => {
    this.ticket = ticket;
  }
}