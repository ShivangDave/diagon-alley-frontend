import './App.css';
import { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link
} from 'react-router-dom';

import Header from './components/Header';
import Auth from './components/Auth';
import ItemPage from './components/ItemPage';
import Cart from './components/Cart';
import Order from './components/Order';
import OrderDetails from './components/OrderDetails';
import MainContainer from './containers/MainContainer';

const App = () => {

  const [ loginView, setLoginView ] = useState(false)
  const [ itemCount, setItemCount ] = useState(0)

  useEffect(() => {
    fetch('http://localhost:3000/api/v1/carts',{
      method: 'GET',
      headers: {
        'Auth-Token': localStorage.getItem('token')
      }
    }).then(res => res.json())
    .then(data => {
      setItemCount(data.items.length)
    }).catch(_ => setItemCount(0))
  },[itemCount])

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
          <Route path='/cart' component={Cart} />
          <Route exact path='/orders' component={Order} />
          <Route exact path='/orders/:id' component={OrderDetails} />
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
