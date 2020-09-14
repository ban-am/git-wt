import { createContext } from 'react';
import { configure } from 'mobx';
import EventStore from './eventStore';
import ApiStore from './apiStore';
import UserStore from './userStore';
import JiraStore from './jiraStore';

configure({enforceActions: 'always'});

export class RootStore {
    eventStore: EventStore;
    apiStore: ApiStore;
    userStore: UserStore;
    jiraStore: JiraStore;

    constructor() {
        this.eventStore = new EventStore(this);
        this.apiStore = new ApiStore(this);
        this.userStore = new UserStore(this);
        this.jiraStore = new JiraStore(this);
    }
}

export const RootStoreContext = createContext(new RootStore());