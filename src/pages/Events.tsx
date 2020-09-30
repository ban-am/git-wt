import React, { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { RootStoreContext } from '../stores/rootStore';
import { Timeline } from 'antd';
var Scroll = require('react-scroll');

const { Link, Element } = Scroll;

const Events: React.FC = () => {
    const rootStore = useContext(RootStoreContext);
    const { events, grupedEvents, ignoredFileds } = rootStore.eventStore;

    const replacer = (key: any, value: any) => {
        if (value === null || ignoredFileds.split(" ").includes(key)) {
            return;
        }
        if (key === 'created_at') {
            return (new Date(value)).toTimeString();
        }
        return value;
    }

    const print = (key: string) => {
        let list = [];
        list.push(
            <Timeline.Item color="red"><h2>{key}</h2></Timeline.Item>
        );
        list.push(grupedEvents[key].map((x: any, id: any) => <Timeline.Item><pre>{JSON.stringify(x, replacer, 1).slice(2, -2).replace(/\"/g, '')}</pre></Timeline.Item>));
        return list;
    }

    return (
        <>
            <nav className="vertical-nav">
                <ul>
                    {Object.keys(grupedEvents).map((key, index) => (
                        <li key={index}>
                            <Link activeClass="active" to={key} spy={true} smooth={true} duration={250} >{key}</Link>
                        </li>
                    ))}
                </ul>
            </nav>
            {events && (
                <Timeline >
                    {Object.keys(grupedEvents).map((key, index) => (
                        <Element name={key} className="element big">
                           {print(key)}
                        </Element>
                    ))}
                </Timeline>
            )}
        </>
    );

};

export default observer(Events);