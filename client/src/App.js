import React from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Box from '@mui/material/Box';
import Header from './components/Header';
import Cards  from './pages/Cards';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import Navbar from './components/Navbar';
import Likes from './pages/Likes';

import { ThemeProvider, createTheme } from '@mui/material/styles';


const client = new ApolloClient({
  uri: '/graphql',
  cache: new InMemoryCache(),
});



const theme = createTheme (theme => ({
  palette: {
    type: 'light',
    primary: {
      main: '#fafafa',
    },
  },
  typography: {
    h1: {
      fontFamily: 'Pacifico',
    },
    fontFamily: 'Oxygen',
    h2: {
      fontFamily: 'Source Sans Pro',
    },
  },
}));


function App() {

  return (

<ThemeProvider theme = {theme}>

    <ApolloProvider client={client}>
      <Router>
        <div>
          <Header />
          <div>
            <Route exact path="/">
              <Login />
            </Route>
            <Route exact path="/cards">
              <Cards />
            </Route>
            <Route exact path="/profile">
              <Profile />
            </Route>
            <Route exact path="/likes">
              <Likes />
            </Route>
            <Route exact path="/settings">
              <Settings />
            </Route>
          </div>
          <Navbar />
        </div>
      </Router>
    </ApolloProvider>

 </ThemeProvider>

  );
}

export default App;
