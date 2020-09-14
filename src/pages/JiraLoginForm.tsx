import React, { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { RootStoreContext } from '../stores/rootStore';
import { Input, Message, Button } from 'semantic-ui-react';

const JiraLoginForm: React.FC = () => {
   const rootStore = useContext(RootStoreContext);
   const { setUsername, setPassword, createJira } = rootStore.jiraStore;

   return (
      <>
         <Input icon='user' iconPosition='left' placeholder='Username' onChange={e => setUsername(e.target.value)}/>
         <Input icon='key' iconPosition='left' placeholder='Password' type='password' onChange={e => setPassword(e.target.value)}/>
         <Button onClick={createJira}>Login</Button>
      </>
   );

};

export default observer(JiraLoginForm);