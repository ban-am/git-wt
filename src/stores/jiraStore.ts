import { RootStore } from "./rootStore";
import { observable, action } from "mobx";
import JiraApi from 'jira-client';
import { JiraUser } from "../models/User";
import agent from "../api/agent";

export default class JiraStore {
  rootStore: RootStore;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
  }

  @observable jira: JiraApi | null = null;

  @observable username: string = '';
  @observable password: string = '';

  @action login = async (values: JiraUser) => {
    try {
      await agent.Jira.issue(values, "");
    } catch (error) {
      
    }
    // this.jira = new JiraApi({
    //   protocol: 'https',
    //   host: 'jira.smart-digital.de',
    //   username: this.username,
    //   password: this.password,
    //   apiVersion: '2',
    //   strictSSL: false
    // });

  }
}