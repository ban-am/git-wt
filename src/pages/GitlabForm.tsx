import React, { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { RootStoreContext } from '../stores/rootStore';
import { QuestionCircleOutlined, SearchOutlined, CheckOutlined } from '@ant-design/icons';
import { Typography, Tooltip, Input, Button } from 'antd';
import { Container } from 'semantic-ui-react';

const { Title } = Typography;

const GitlabForm: React.FC = () => {
   const rootStore = useContext(RootStoreContext);
   const { setToken, createApi, token } = rootStore.apiStore;
   const { getUser, loadingUser, user } = rootStore.userStore;

   return (
      <Container>
         <Title level={4}>
            GitLab User Token {' '}
            <Tooltip
               title={<p>Create read_api token here: <a href="https://gitlab.webix.de/profile/personal_access_tokens">wwww.gitlab.webix.de/profile/personal_access_tokens</a></p>}
               overlayStyle={{ fontSize: '14px' }}>
               <QuestionCircleOutlined translate style={{ color: '#ff4d4f', fontSize: '16px' }} />
            </Tooltip>
         </Title>

         <Input.Group compact style={{ width: '35%' }}>
            <Input placeholder="Your token"
               onChange={e => setToken(e.target.value)}
               value={token as string}
               style={{ width: '90%' }}
            />

            <Button type='primary'
               danger={!user}
               loading={loadingUser}
               icon={user ? <CheckOutlined translate/> : <SearchOutlined translate />}
               style={{ width: '10%' }}
               onClick={() => {
                  createApi();
                  getUser();
               }}></Button>
         </Input.Group>
      </Container>
   );

};

export default observer(GitlabForm);