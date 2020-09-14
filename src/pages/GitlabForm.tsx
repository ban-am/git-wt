import React, { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { RootStoreContext } from '../stores/rootStore';
import { Input, Message } from 'semantic-ui-react';

const GitlabForm: React.FC = () => {
   const rootStore = useContext(RootStoreContext);
   const { setToken, createApi } = rootStore.apiStore;
   const { getUser, err } = rootStore.userStore;

   return (
      <>
         <Input icon='key' iconPosition='left' placeholder='Your token'
            onChange={e => setToken(e.target.value)}
            action={{
               icon: 'check',
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