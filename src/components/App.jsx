import React, { useState } from "react";
import SearchComp from "./Search";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  useHistory,
} from "react-router-dom";

// Components
import Login from './Login';
import Register from './Register';
import StrainsList from './StrainsList';
import Header from './Header';
import Profile from './Profile';

// route
import PrivateRoute from "./PrivateRoute";

function App() {
  const initialFormValues = {
    name: "",
    email: "",
    password: "",
  };
  const initialStrains = [
    {
      name: "Strain name",
      effects: "Effects...",
      flavors: "Flavors...",
      description: "Strain description... Lorem Ipsum",
    }
  ];
  const initialSearchStrings = {
    effects: "",
    flavors: "",
  };

  const history = useHistory();

  const [formValues, setFormValues] = useState(initialFormValues);
  const [searchStrings, setSearchStrings] = useState(initialSearchStrings);
  const [strains, setStrains] = useState(initialStrains);

  const onSearchSubmit = (evt) => {
    evt.preventDefault();
    setSearchStrings(initialSearchStrings);
    history.push("/search-query");
    console.log(searchStrings);
  }

  const addSearchTerm = (evt) => {
    const searchTerm = evt.target.value;
    const targetId = evt.target.id;
    const targetSearchString = searchStrings[targetId];
    const searchString = targetSearchString 
      ? `${targetSearchString}, ${searchTerm}`
      : searchTerm;
  
    return setSearchStrings({
      ...searchStrings,
      [targetId]: searchString,
    });
  }

  return (
    <Route>
      <div className="App">
        <ul>
          <li>
            <Link to="/Login">Login</Link>
          </li>
          <li>
            <Link to="/protected">Protected Page</Link>
          </li>
          <li>
            <Link to="/register">Sign Up</Link>
          </li>
        </ul>
        <Switch>
          <PrivateRoute exact path="/protected" component={PrivateRoute} />
          <Route exact path="/" component={Register} />

          <Route exact path="/login" component={Login} />
          <PrivateRoute exact path="/protected" component={SearchComp} />
          <Route path="/register" component={Register} />
          <Route component={Register} />
        </Switch>
      </div>
    </Route>
  );
}

export default App;
