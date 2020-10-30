import { RootStore } from "./rootStore";
import { observable, action, runInAction } from "mobx";
import { EventFilterParams } from "../models/Event";
import { Dictionary, groupBy } from "underscore";
var dayjs = require('dayjs');

export default class EventStore {
    rootStore: RootStore;
    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;
    }

    @observable.ref events: any[] = [];
    @observable.ref grupedEvents: { [time: string]: any[]; } = {}
    @observable processedEvents: any[] = [];
    @observable ignoredFileds: string[] = ["author", "author_username", "author_id", "commit_count", "commit_from", "commit_to", "project_id", "target_id", "target_iid", "position"];
    @observable regex = "SMAR.[\\d]+";

    @action getLastDayOfMonth = (): string => {
        var d = new Date();
        var newMonth = d.getMonth() - 1;
        if(newMonth < 0){
            newMonth += 12;
            d.setFullYear(d.getFullYear() - 1);
        }
        d.setMonth(newMonth);

        let date = dayjs(d);

        return date.format('YYYY-MM') + '-' + date.daysInMonth();
    }

    @observable params: EventFilterParams[] = [{
        name: 'after',
        value: this.getLastDayOfMonth()
    } as EventFilterParams];

    @action addParam = () => {
        this.params.push({
            name: '',
            value: ''
        });
    }

    @action setRegex = (text: string) => {
        this.regex = text;
    }

    @action createLink = (text: string): string | undefined => {
        const data: any = text.match(this.regex);
        let link: string | undefined = undefined;
        if(data) {
            link = "https://jira.smart-digital.de/browse/" + data[0]
        }
        return link;
    }

    @action removeParam = (index: number) => {
        this.params.splice(index, 1);
    }

    @action setParamName = (newValue: any, id: number) => {
        this.params[id]['name'] = newValue;
    };

    @action setParamValue = (newValue: any, id: number) => {
        this.params[id]['value'] = newValue;
    };

    @action getEvents = async () => {
        if (!this.rootStore.userStore.user)
            return;
        try {
            var evn = await this.loadEvents();
            runInAction(() => {
                this.events = evn;
            });
            this.processEvents();
        } catch (error) {
            console.log(error);
        }
    }

    loadEvents = async () => {
        var result: any[] = [];
        var evnFilter = this.processParams();
        var userId = this.rootStore.userStore.user!.id;
        while (true) {
            var data = await this.rootStore.apiStore.api.Users.events(userId, evnFilter);
            if (data.length === 0) {
                break;
            }
            evnFilter['page'] += 1;
            result.push(...data);
        }
        return result;
    }

    processParams(): any {
        var obj: any = {};
        for (var item of this.params) {
            if (item.name)
                obj[item.name] = item.value;
        }
        obj['perPage'] = 50;
        obj['page'] = 1;
        return obj;
    }

    @action processEvents = () => {
        var result: { [id: string]: any[]; } = {}
        var grupedEvents: Dictionary<any[]> = groupBy(this.events, (obj: any) => obj.created_at.split('T')[0]);

        for (var item in grupedEvents) {
            result[item] = [];
            for (let i = 0; i < grupedEvents[item].length; i++) {
                result[item].push(grupedEvents[item][i]);
            }
        }
        runInAction(() => {
            this.grupedEvents = result;
        });
    }
}