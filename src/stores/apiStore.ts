import { RootStore } from "./rootStore";
import { observable, reaction, action } from "mobx";
import { Gitlab } from "@gitbeaker/browser";

export default class ApiStore {
    rootStore: RootStore;
    
    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;
        
        reaction(
            () => this.token,
            token => {
                if(token) 
                    window.localStorage.setItem('token', token);
                else
                    window.localStorage.removeItem('token');
            }
        );
    }
    
    @observable token: string | null = window.localStorage.getItem('token');
    @observable api: any | null = null;

    @action setToken = (token: string | null) => {
        this.token = token;
    }

    @action createApi = async () => {
        this.api = new Gitlab({
            host: "https://gitlab.webix.de/",
            token: this.token
        });
    }
}