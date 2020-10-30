import React, { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { RootStoreContext } from '../stores/rootStore';
import { Typography, Input } from 'antd';

const { Title } = Typography;

const JiraTaskParser: React.FC = () => {
  const rootStore = useContext(RootStoreContext);
  const { regex, setRegex } = rootStore.eventStore;

  return (
    <>
      <Title level={4}>
        Task Parser
      </Title>

      <Input
        placeholder='prop name'
        defaultValue={regex.toString()}
        style={{ width: '15%' }} 
        onChange={e => setRegex(e.target.value)}/>
    </>
  );

};

export default observer(JiraTaskParser);