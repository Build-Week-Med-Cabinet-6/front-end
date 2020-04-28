import React, {useState} from 'react';
import { Switch, Route, Link, useHistory } from 'react-router-dom';

// Components
import Login from './Login';
import Register from './Register';
import Search from './Search';
import StrainsList from './StrainsList';
import Header from './Header';
import Profile from './Profile';

function App() {
  const initialFormValues = {
    name: "",
    email: "",
    password: "",
  }
  const initialStrains = [
    {
      name: "Strain name",
      effects: "Effects...",
      flavors: "Flavors...",
      description: "Strain description... Lorem Ipsum",
    }
  ]
  const initialSearchStrings = {
    effects: "",
    flavors: "",
  }

  const history = useHistory();

  const [formValues, setFormValues] = useState(initialFormValues);
  const [users, setUsers] = useState([]);
  const [searchStrings, setSearchStrings] = useState(initialSearchStrings);
  const [strains, setStrains] = useState(initialStrains);


  const onInputChange = evt => {
    const name = evt.target.name;
    const value = evt.target.value;

    return setFormValues({
      ...formValues,
      [name]: value,
    });
  }

  const onLoginSubmit = evt => {
    evt.preventDefault();

    for(let i = 0; i < users.length; i++) {
      const userEmail = users[i].email;
      const userPassword = users[i].password;

      // If this user's email and password matches the form values 
      // go to the /home route and break out of this loop.
      if(userEmail === formValues.email && userPassword === formValues.password) { 
        history.push("/search");
        break;
      }
    }
  }

  const onRegisterSubmit = evt => {
    evt.preventDefault();
    setFormValues(initialFormValues);
    history.push("/");
    return setUsers([
      ...users,
      formValues,
    ]);
  }

  const onSearchSubmit = evt => {
    evt.preventDefault();
    setSearchStrings("");
    history.push("/search-query");
    console.log(searchStrings);
  }

  const addSearchTerm = evt => {
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
    <div className="App">
      <Switch>
        <Route path="/profile">
          <Header />
          <Profile />
        </Route>
        <Route path="/search-query">
          <StrainsList strainsArray={strains}/>
        </Route>
        <Route path="/search">
          <Header />
          <Search onAddSearchTerm={addSearchTerm} onSearchSubmit={onSearchSubmit}/>
        </Route>
        <Route path="/register">
          <Register 
            onInputChange={onInputChange} 
            onRegisterSubmit={onRegisterSubmit} 
            formValues={formValues}
          />
        </Route>
        <Route path="/">
          <Login 
            onInputChange={onInputChange} 
            onLoginSubmit={onLoginSubmit} 
            formValues={formValues}
          />
          <Link to="/register">Register</Link>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
