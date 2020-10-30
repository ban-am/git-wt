import React, { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { RootStoreContext } from '../stores/rootStore';
import { List } from 'semantic-ui-react';
import { QuestionCircleOutlined, MinusOutlined } from '@ant-design/icons';
import { Tooltip, Typography, Button, Space, Input } from 'antd';

const { Title } = Typography;

const EventFilterForm: React.FC = () => {
  const rootStore = useContext(RootStoreContext);
  const { params, setParamName, setParamValue, addParam, getEvents, removeParam } = rootStore.eventStore;

  return (
    <>
      <Title level={4}>
        Event filter {' '}
        <Tooltip
          title={<p>All parameters: <a href="https://docs.gitlab.com/ee/api/events.html#list-currently-authenticated-users-events">www.docs.gitlab.com/ee/api/events.html#list-currently-authenticated-users-events</a></p>}
          overlayStyle={{ fontSize: '14px' }}>
          <QuestionCircleOutlined translate style={{ color: '#ff4d4f', fontSize: '16px' }} />
        </Tooltip>
      </Title>

      <List>
        <List.Item>
          {params.map((obj, id) => {
            return (
              <div key={id}>
                <Space>
                  <Input.Group>
                    <Input
                      placeholder='prop name'
                      defaultValue={obj.name}
                      onChange={e => setParamName(e.target.value, id)}
                      style={{ width: '45%' }} />

                    <Input
                      placeholder='prop value'
                      value={obj.value}
                      onChange={e => setParamValue(e.target.value, id)}
                      style={{ width: '45%' }} />

                    <Button
                      type='text'
                      icon={<MinusOutlined translate />}
                      style={{ width: '10%' }}
                      onClick={() => removeParam(id)}></Button>

                  </Input.Group>
                </Space>
              </div>
            )
          }
          )}
        </List.Item>

        <List.Item>
          <Space>
            <Button onClick={addParam}>Add props</Button>
            <Button onClick={getEvents} type="primary">Submit</Button>
          </Space>
        </List.Item>
      </List>
    </>
  );

};

export default observer(EventFilterForm);