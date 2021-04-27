import './App.css';
import { useState } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link
} from 'react-router-dom';

import Header from './components/Header';
import Auth from './components/Auth';
import ItemPage from './components/ItemPage';
import MainContainer from './containers/MainContainer';

const App = () => {

  const [ loginView, setLoginView ] = useState(false)
  const [ itemCount, setItemCount ] = useState(localStorage.getItem('items_in_cart_length'))

  return (
    <div className="App">
      <Router>
        <Header setLoginView={setLoginView} itemCount={itemCount} />
        {
          loginView && (
            <Auth loginView setLoginView={setLoginView} />
          )
        }
        <Switch>
          <Route exact path='/' component={MainContainer} />
          <Route path='/product/:productId' component={() => <ItemPage setItemCount={setItemCount} /> } />

          <Route>
            <>
              <h1> Not Found </h1>
              <Link to='/'> Go Home </Link>
            </>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
