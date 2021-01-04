import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

//Redux
import { Provider } from 'react-redux';
import store from './redux/store.redux';
//Components
import Navbar from './components/Layout/Navbar.component';
import Profiles from './components/Profiles/Profiles.component';
import Profile from './components/Profile/Profile.component';
import Footer from './components/Layout/Footer.component';

function App() {

  return (
    <Provider store={store}>
      <Router>
        <Navbar />
        <Switch>
          <Route exact path="/" component={Profiles} />
        </Switch>
        <Switch>
          <Route exact path="/profile/:id" component={Profile} />
        </Switch>
        <Footer />
      </Router>
    </Provider>
  );
}

export default App;
