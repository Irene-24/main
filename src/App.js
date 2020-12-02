import React, { useState, useEffect } from "react";
import
{

  Switch,
  Route,
  Link
} from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { GlobalStyles } from "./components/GlobalStyles";
import { lightTheme, darkTheme } from "./components/Themes";
import { useDarkMode } from "./components/useDarkMode";
import dummyData from "./data";
import CardList from "./components/CardList";

import Page from "./components/Page2";



import "./App.css";

const App = () =>
{
  const [ videos, setVideos ] = useState( [] );
  const [ theme, themeToggler, mountedComponent ] = useDarkMode();

  const themeMode = theme === 'light' ? lightTheme : darkTheme;

  useEffect( () =>
  {
    const timer = setTimeout( () =>
    {
      setVideos( dummyData );
    }, 1000 );
    return () => clearTimeout( timer );
  }, [] );

  if ( !mountedComponent ) return <div />;
  return (
    <ThemeProvider theme={ themeMode }>
      <>
        <GlobalStyles />
        <Link to="/">
          Home
        </Link>
        <br />
        <Link to="/test">
          Test
        </Link>
        <br />
        <Link to="/sub">
          Other
        </Link>
        <Switch>
          <Route exact path="/">
            <div className="App">
              <button onClick={ themeToggler }>Switch Theme</button>
              {
                videos.map( ( list, index ) =>
                {
                  return (
                    <section key={ index }>
                      <h2 className="section-title">{ list.section }</h2>
                      <CardList list={ list } />
                      <hr />
                    </section>
                  );
                } ) }
            </div>

          </Route>

          <Route exact path="/test" component={ Page } />
        </Switch>
      </>
    </ThemeProvider>

  );
};

export default App;
