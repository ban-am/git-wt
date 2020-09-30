import React, { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { RootStoreContext } from '../stores/rootStore';
import { Input, List, Button, Message } from 'semantic-ui-react';

const EventFilterForm: React.FC = () => {
  const rootStore = useContext(RootStoreContext);
  const { user } = rootStore.userStore;
  const { params, setParamName, setParamValue, addParam, getEvents } = rootStore.eventStore;
  return (
    <>
    
      <Message>
         All parameters: <a href="https://docs.gitlab.com/ee/api/events.html#list-currently-authenticated-users-events">www.docs.gitlab.com/ee/api/events.html#list-currently-authenticated-users-events</a>
      </Message>
      <List>
        <List.Item>
          {params.map((obj, id) => {
            return (
              <div key={id}>
                <Input
                  placeholder='prop name'
                  value={obj.name}
                  onChange={e => setParamName(e.target.value, id)}
                />
                <Input
                  placeholder='prop value'
                  value={obj.value}
                  onChange={e => setParamValue(e.target.value, id)} />
              </div>
            )
          }
          )}
        </List.Item>


        <List.Item>
          <Button onClick={addParam}>Add Param</Button>

          {user && <Button onClick={getEvents}>Submite</Button>}
          
          {/* <Button onClick={processEvents}>Process</Button> */}
        </List.Item>
      </List>
    </>
  );

};

export default observer(EventFilterForm);