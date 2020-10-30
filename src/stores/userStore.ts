import { RootStore } from "./rootStore";
import { observable, action, runInAction } from "mobx";
import { UserSchemaDefault } from "../models/User";

export default class UserStore {
  rootStore: RootStore;
  
  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
  }
    
  @observable user: UserSchemaDefault | null = null;
  @observable err: string | null = null;
  @observable loadingUser: boolean = false;

  @action getUser = async () => {
    try {
      this.loadingUser = true;
      const user = await this.rootStore.apiStore.api.Users.current();
      runInAction(() => {
        this.user = user;
        this.loadingUser = false;
        this.err = null
      });
    } catch (error) {
      runInAction(() => {
        this.user = null;
        this.loadingUser = false;
        this.err = "Token is not valid";
      });
      console.log(error);
    }
  }
}