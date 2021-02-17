import React from 'react';
import { Switch, Route } from 'react-router';
import Login from './components/Login';
import Manager from './components/Manager';
import styles from './App.module.scss';

function App() {
  return (
    <div className={styles.root}>
      <Switch>{/*This looks through all of it's children and finds the route that matches the requested path and only renders that component or route that matches. It goes in linear order. */}
        <Route path={["/login", "/sign-up"]} component={Login} />
        {/*below is the root path of the app */}
        <Route >
          <Manager />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
