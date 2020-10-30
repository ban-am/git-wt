import React, { useContext, useEffect } from "react";
import { RootStoreContext } from "./stores/rootStore";
import GitlabForm from "./pages/GitlabForm";
import User from "./pages/User";
import EventFilterForm from "./pages/EventFilterForm";
import Events from "./pages/Events";
import { Container } from "semantic-ui-react";
import { GitlabOutlined } from '@ant-design/icons';
import { Space, Typography } from "antd";
const { Title } = Typography;

const App: React.FC = () => {
  const rootStore = useContext(RootStoreContext);
  const { token, createApi } = rootStore.apiStore;
  const { getUser } = rootStore.userStore;

  useEffect(() => {
    if (token) {
      console.log(token);
      createApi();
      getUser()
    }
  }, [getUser, createApi, token])

  return (
    <Container>
      <div className="home-page">
        <Title style={{ fontSize: '62px' }}><GitlabOutlined translate style={{ fontSize: '72px' }} /> WT</Title>
      </div>

      <Space direction="vertical">
        <GitlabForm />
        <User />
        <EventFilterForm />
        <Events />
      </Space>

    </Container>
  )
};

export default App;
