import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import { Spin } from 'antd';


const Login = lazy(() => import('pages/login/Login'));
const Home = lazy(() => import('pages/index/IndexHome'));

function App() {
  return (
    <Provider store={store}>
      <div>
        <Router>
          <Suspense fallback={<Spin />}>
            <Switch>
              <Route exact path="/" component={Login} />
              <Route path="/" component={Home} />
            </Switch>
          </Suspense>
        </Router>
      </div>
    </Provider>
  )

}
export default App;
