import React, { useContext, useEffect } from "react";
import { RootStoreContext } from "./stores/rootStore";
import GitlabForm from "./pages/GitlabForm";
import User from "./pages/User";
import EventFilterForm from "./pages/EventFilterForm";
import Events from "./pages/Events";
import { Container } from "semantic-ui-react";

const App: React.FC = () => {
  const rootStore = useContext(RootStoreContext);
  const { token, createApi }  = rootStore.apiStore;
  const { getUser }  = rootStore.userStore;

  useEffect(() => {
    if (token) {
      console.log(token);
      createApi();
      getUser()
    } 
  }, [getUser, createApi, token])

  return (
    <Container>
      <h3>GitLab User Token:</h3>
      <GitlabForm />

      {/* <h3>Jira User:</h3>
      <JiraLoginForm /> */}

      <h3>User:</h3>
      <User />

      <h3>Event filter:</h3>
      <EventFilterForm />

      <h3>Events:</h3>
      <Events />
    </Container>
  )
};

export default App;
