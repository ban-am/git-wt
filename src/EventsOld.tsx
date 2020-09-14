import React, { useState } from "react";
import { Header, List, Input, Button, Grid, Segment } from "semantic-ui-react";
import * as _ from "underscore";
import { Dictionary } from "underscore";

interface Props {
    api: any;
    user: any;
    regex: string;
}

interface Event {
    action_name: string;
    created_at: string;
    target_title: string;
    task_number: string;
}


export const EventsOld: React.FC<Props> = ({ api, user, regex }) => {
    const [props, setProps] = useState([{
        name: 'after',
        value: "2020-7-31"
    }]);

    const [result, setResult] = useState<any>();

    const addProps = () => {
        setProps([...props, {
            name: '',
            value: ''
        }]);
    }
    const handlePropChange = (newValue: any, name: string, id: number) => {
        const allProps = [...props];
        if (name == 'name') {
            allProps[id].name = newValue;
        }

        if (name == 'value') {
            allProps[id].value = newValue;
        }

        setProps(allProps);
    };

    const loadData = async (obj: any) => {
        const after = new Date(obj['after']);
        var resultdata: any[] = [];
        let index = 1;
        obj['perPage'] = 50;
        while (1) {
            obj['page'] = index;
            var data = await api.Users.events(user.id, obj);
            index += 1;
            if (data.length == 0) {
                break;
            }
            resultdata.push(...data)
        }
        setResult(resultdata);
    }

    const submite = async () => {
        var obj: any = {}
        setResult(null);
        for (var item of props) {
            if (item.name)
                obj[item.name] = item.value;
        }

        try {
            loadData(obj);
            // var data = await api.Users.events(user.id, obj);
            // console.log(data);  
            // 
        }
        catch (error) {

        }
    }

    const taskNumberParse = (task: string): string => {
        var data = task.match(regex);
        if (data) {
            return data[0];
        }
        return "";
    }

    const processResult = () => {
        var data: Dictionary<any[]> = _.groupBy(result, (obj: any) => obj.created_at.split('T')[0]);

        var events: Dictionary<any[]> = {};
        for (var item in data) {

            events[item] = [];
            for (let i = 0; i < data[item].length; i++) {
                var actual = data[item][i];
                var date = new Date(actual.created_at);
                var eventData: Event = {
                    action_name: actual.action_name,
                    created_at: date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds()
                } as any;
                switch (eventData.action_name) {
                    case "commented on":
                        eventData.target_title = actual.target_title;
                        eventData.task_number = taskNumberParse(eventData.target_title);
                        events[item].push(eventData);
                        break;
                    case "pushed new":
                    case "pushed to":
                    case "deleted":
                        eventData.target_title = actual.push_data.ref;
                        eventData.task_number = taskNumberParse(eventData.target_title);
                        events[item].push(eventData);
                        break;
                    case "opened":
                        eventData.action_name = "opened merge request";
                        eventData.target_title = actual.target_title;
                        eventData.task_number = taskNumberParse(eventData.target_title);
                        events[item].push(eventData);
                    default:
                        break;
                }
            }
        }


        console.log(events);

        var output: any[] = [];

        for (var item in events) {
            for (let i = 0; i < events[item].length; i++) {
                var evn = events[item][i];
                output.push(
                    <div>
                        {i == 0 && <Header as='h3'>{item}</Header>}
                        <List>
                            <List.Item>
                                <List.Content>
                                    <Grid columns='equal'>
                                        <Grid.Column width={1}>
                                            {evn.created_at}
                                        </Grid.Column>
                                        <Grid.Column width={3}>
                                            {evn.action_name}
                                        </Grid.Column>
                                        <Grid.Column>
                                            <strong>{evn.target_title}</strong>
                                        </Grid.Column>
                                    </Grid>
                                    {/* <List.Header as='p'></List.Header>  */}
                                    {/* <List.Description> {evn.action_name} <strong>{evn.target_title}</strong></List.Description> */}
                                </List.Content>
                            </List.Item>
                        </List>
                        {/*   action_name: string;
    created_at: string;
    target_title: string;
    task_number: string; */}
                        {/* <pre>{JSON.stringify(events[item][i], null, 4)}</pre> */}
                    </div>)
            }
        }
        return output;
    }

    return (
        <>
            <Header as='h1'>Activity</Header>

            <Header as='h3'>Events props</Header>
            <List>
                <List.Item>
                    {props.map((obj, id) => {
                        return (
                            <div key={id}>
                                <Input
                                    placeholder='prop name'
                                    value={obj.name}
                                    onChange={e => handlePropChange(e.target.value, 'name', id)}
                                />
                                <Input
                                    placeholder='prop value'
                                    value={obj.value}
                                    onChange={e => handlePropChange(e.target.value, 'value', id)} />
                            </div>
                        )
                    }
                    )}
                </List.Item>


                <List.Item>
                    <Button onClick={addProps}>Add Prop</Button>

                    <Button onClick={submite}>Submite</Button>

                    <Button onClick={processResult}>Process</Button>
                </List.Item>
            </List>
            {/* 
    {result && result.map((x: any, id: any) => {
        // processResult();
        var title = x.created_at
        return (<div key={id}>
            
            <pre>{JSON.stringify(x, null, 4)}</pre>
        </div>)
    })} */}

            {result && processResult()}
        </>);
};