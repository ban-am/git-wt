import React, { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { Form, Button } from 'semantic-ui-react';
import { Form as FinalForm, Field } from 'react-final-form';
import { JiraUser } from '../models/User';
import TextInput from '../components/TextInput';
import { RootStoreContext } from '../stores/rootStore';

const JiraLoginForm: React.FC = () => {
   const rootStore = useContext(RootStoreContext);
   // const { login } = rootStore.jiraStore;

   return (
      <FinalForm
         onSubmit={(values: JiraUser) =>
            console.log(values)
            // login(values)
         }
         render={({
            handleSubmit,
            submitting,
            submitError,
            invalid,
            pristine,
            dirtySinceLastSubmit
         }) => (
               <Form onSubmit={handleSubmit} error autoComplete='off'>
                  <Field name='username' component={TextInput} placeholder='Username' />
                  <Field
                     name='password'
                     component={TextInput}
                     placeholder='Password'
                     type='password'
                  />
                  {submitError && !dirtySinceLastSubmit && (
                        console.log(submitError)
                     )}
                  <Button
                     disabled={(invalid && !dirtySinceLastSubmit) || pristine}
                     loading={submitting}
                     color='teal'
                     content='Login'
                     fluid
                  />
               </Form>
            )}
      />
   );
};

export default observer(JiraLoginForm);