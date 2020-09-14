import { RootStore } from "./rootStore";
import { observable, action } from "mobx";
import JiraApi from 'jira-client';

export default class JiraStore {
  rootStore: RootStore;
  
  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
  }
    
  @observable jira: JiraApi | null = null;
  
  @observable username: string = '';
  @observable password: string = '';

  @action createJira = async () => {
    this.jira = new JiraApi({
      protocol: 'https',
      host: 'jira.smart-digital.de',
      username: this.username,
      password: this.password,
      apiVersion: '2',
      strictSSL: false
    });

  }

  @action setUsername = (username: string) => {
    this.username = username;
  }
  
  @action setPassword = (password: string) => {
    this.password = password;
  }
}