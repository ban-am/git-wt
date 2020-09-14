import React, { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { RootStoreContext } from '../stores/rootStore';

const User: React.FC = () => {
  const rootStore = useContext(RootStoreContext);
  const { user } = rootStore.userStore;

  return (
     <>
      {user && user.name}
     </>
  );

};

export default observer(User);