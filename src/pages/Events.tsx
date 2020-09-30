import React, { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { RootStoreContext } from '../stores/rootStore';
import { Timeline } from 'antd';
import { ClockCircleOutlined, MessageOutlined, DeleteOutlined, CheckCircleOutlined, PlusCircleOutlined, ForkOutlined } from '@ant-design/icons';
import { Input } from 'semantic-ui-react';

var Scroll = require('react-scroll');
var dayjs = require('dayjs')

const { Link, Element } = Scroll;

const Events: React.FC = () => {
    const rootStore = useContext(RootStoreContext);
    const { events, grupedEvents, ignoredFileds } = rootStore.eventStore;
    const { ticket, setTicket } = rootStore.jiraStore;

    const replacer = (key: any, value: any) => {
        if (value === null || ignoredFileds.includes(key)) {
            return;
        }
        if (key === 'created_at') {
            var date = new Date(value);
            var newDate = date.setTime(date.getTime() + date.getTimezoneOffset() * 60 * 1000);
            var data = dayjs(newDate).format('H:mm:ss');
            return data;
        }
        return value;
    }

    const print = (key: string) => {
        let list = [];
        list.push(<Timeline.Item dot={<ClockCircleOutlined translate style={{ fontSize: '18px' }} />} color="red"><h2>{dayjs(key).format('DD. MM. YYYY')}</h2></Timeline.Item>);
        list.push(grupedEvents[key].map((x: any, id: any) => {
            var text = <pre>{JSON.stringify(x, replacer, 1).slice(2, -2).replace(/\"/g, '')}</pre>;
            switch (x.action_name) {
                case "commented on":
                    return (<Timeline.Item dot={<MessageOutlined translate style={{ fontSize: '18px' }} />} color="green">{text}</Timeline.Item>);

                case "deleted":
                    return (<Timeline.Item dot={<DeleteOutlined translate style={{ fontSize: '18px', color: "gray" }} />} >{text}</Timeline.Item>);

                case "closed":
                    return (<Timeline.Item dot={<CheckCircleOutlined translate style={{ fontSize: '18px', color: "red" }} />} >{text}</Timeline.Item>);

                case "opened":
                    return (<Timeline.Item dot={<PlusCircleOutlined translate style={{ fontSize: '18px', color: "green" }} />} >{text}</Timeline.Item>);

                case "accepted":
                    return (<Timeline.Item dot={<ForkOutlined translate style={{ fontSize: '18px', color: "blue" }} />} >{text}</Timeline.Item>);

                default:
                    return (<Timeline.Item>{text}</Timeline.Item>);
            }

        }));
        return list;
    }

    return (
        <>
            <nav className="vertical-nav">
                <ul>
                    <li>
                        <Input placeholder='Jira ticket number'
                            onChange={e => setTicket(e.target.value)}
                            value={ticket}
                            action={{
                                icon: 'external',
                                onClick: () => {
                                    window.open(
                                        "https://jira.smart-digital.de/browse/SMAR-" + ticket,
                                        '_blank'
                                      );
                                }
                            }} />
                    </li>
                </ul>
                <ul style={{ float: 'right'}}>
                    {Object.keys(grupedEvents).map((key, index) => (
                        <li key={index}>
                            <Link activeClass="active" to={key} spy={true} smooth={true} duration={250} >{dayjs(key).format('DD. MM. YYYY')}</Link>
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