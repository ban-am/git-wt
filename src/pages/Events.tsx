import React, { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { RootStoreContext } from '../stores/rootStore';
import { Timeline, Typography, Input, Button } from 'antd';
import { ClockCircleOutlined, MessageOutlined, DeleteOutlined, CheckCircleOutlined, PlusCircleOutlined, ForkOutlined, LinkOutlined } from '@ant-design/icons';

const { Title } = Typography;

var Scroll = require('react-scroll');
var dayjs = require('dayjs')

const { Link, Element } = Scroll;

const Events: React.FC = () => {
    const rootStore = useContext(RootStoreContext);
    const { events, grupedEvents, createLink } = rootStore.eventStore;

    const getTime = (value: any) => {
        var date = new Date(value);
        var newDate = date.setTime(date.getTime() + date.getTimezoneOffset() * 60 * 1000);
        return dayjs(newDate).format('H:mm');
    }

    const createObj = (x: any) => {
        var item: any[] = [];
        item.push(<p>{getTime(x.created_at)}</p>);

        if (x.push_data) {
            item.push(<p>{x.action_name} {x.push_data.ref_type}</p>);
            var link = createLink(x.push_data.ref);
            item.push(<p>{x.push_data.ref} {link && <Button title={link} type="link" href={link} target="_blank" icon={<LinkOutlined translate/>}></Button>}</p>);
        }
        else if (x.note) {
            console.log(x);
            item.push(<p>{x.action_name}</p>);
            var link = createLink(x.target_title);
            item.push(<p>{x.target_title} {link && <Button title={link} type="link" href={link} target="_blank" icon={<LinkOutlined translate/>}></Button>}</p>);
        } else {
            item.push(<p>{x.action_name} {x.target_type}</p>);
            var link = createLink(x.target_title);
            item.push(<p>{x.target_title} {link && <Button title={link} type="link" href={link} target="_blank" icon={<LinkOutlined translate/>}></Button>}</p>);
        }
        return item;
    }

    const print = (key: string) => {
        let list = [];
        list.push(<Timeline.Item dot={<ClockCircleOutlined translate style={{ fontSize: '18px' }} />} color="red"><h2>{dayjs(key).format('DD. MM. YYYY (dd)')}</h2></Timeline.Item>);
        list.push(grupedEvents[key].map((x: any, id: any) => {

            var text = createObj(x);

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
            <Title level={4}>
                Events
            </Title>

            <nav className="vertical-nav">
                <ul>
                    <li>
                        <Input.Search
                            size="large"
                            placeholder="Jira ticket number"
                            enterButton
                            onSearch={value => {
                                if(!value)
                                    return;
                                window.open(
                                    "https://jira.smart-digital.de/browse/SMAR-" + value,
                                    '_blank'
                                );
                            }}
                            style={{ width: 200 }}
                        />
                    </li>
                </ul>
                <ul style={{ float: 'right' }} className="timeLineItem">
                    {Object.keys(grupedEvents).map((key, index) => (
                        <li key={index}>
                            <Link activeClass="active" to={key} spy={true} smooth={true} duration={250} >{dayjs(key).format('DD. MM. YYYY')}</Link>
                        </li>
                    ))}

                </ul>
            </nav>
            {events && (
                <Timeline className='timeline'>
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