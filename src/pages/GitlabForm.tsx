import React, { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { RootStoreContext } from '../stores/rootStore';
import { Input, Message } from 'semantic-ui-react';

const GitlabForm: React.FC = () => {
   const rootStore = useContext(RootStoreContext);
   const { setToken, createApi, token } = rootStore.apiStore;
   const { getUser, err, user } = rootStore.userStore;

   return (
      <>
      <Message>
         Create read_api token here: <a href="https://gitlab.webix.de/profile/personal_access_tokens">wwww.gitlab.webix.de/profile/personal_access_tokens</a>
      </Message>
         <Input icon='key' iconPosition='left' placeholder='Your token'
            onChange={e => setToken(e.target.value)}
            value={token}
            action={{
               icon: 'check',
               color: user == null ? 'red' : 'green',
               onClick: () => {
                  createApi();
                  getUser();
               }
            }} />

            {err && (
               <Message negative>
                  <p>{err}</p>
               </Message>
            )}
      </>
   );

};

export default observer(GitlabForm);