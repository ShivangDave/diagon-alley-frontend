import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link
} from 'react-router-dom';

import Header from './components/Header';
import ItemPage from './components/ItemPage';
import MainContainer from './containers/MainContainer';

const App = () => {
  return (
    <div className="App">
      <Header />
      <Router>
        <Switch>
          <Route exact path='/' component={MainContainer} />
          <Route path='/product/:productId' component={ItemPage} />

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
