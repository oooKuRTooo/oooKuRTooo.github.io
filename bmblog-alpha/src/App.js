import React from 'react';
import './App.scss';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import { Transition } from 'react-spring/renderprops';
import Admin from './pages/Admin/AdminContainer';
import AdminEdit from './pages/Admin/AdminEdit/AdminEditContainer';
import Home from './pages/Home/HomeContainer';
import Post from './pages/Post/PostContainer';
import Test from './pages/Test';

function App() {

  const config = item => {

    if (item.pathname.match(/admin/)) return { duration: 0 };
    return { duration: 1000 };
  }

  return (
    <div className="App">
      <BrowserRouter>
        <Route>
          {
            props => (
              <Transition
                items={props.location}
                keys={location => location.pathname}
                from={{ opacity: '0', position: 'absolute' }}
                enter={{ opacity: '1', position: 'absolute' }}
                leave={{ opacity: '0', position: 'absolute' }}
                config={config}
              >
                {location => style =>(
                  <Switch location={location}>
                    <Route exact 
                      path="/"
                      render={(props) => <Home {...{...props, style}}/>}>
                    </Route>
                    <Route
                      path="/post/:slug"
                      render={(props) => <Post {...{...props, style}}/>}>
                    </Route>
                    <Route
                      path="/admin/edit/:slug"
                      render={(props) => <AdminEdit {...props}/>}>
                    </Route>
                    <Route
                      path="/admin/posts"
                      render={(props) => <Admin {...{...props, page: 'posts'}}/>}>
                    </Route>
                    <Route
                      path="/admin/stats"
                      render={(props) => <Admin {...{...props, page: 'stats'}}/>}>
                    </Route>
                    <Route
                      path="/admin/files"
                      render={(props) => <Admin {...{...props, page: 'files'}}/>}>
                    </Route>
                    <Route
                      path="/admin/settings"
                      render={(props) => <Admin {...{...props, page: 'settings'}}/>}>
                    </Route>
                    <Route
                      path="/admin"
                      render={(props) => <Admin {...{...props, page: 'posts'}}/>}>
                    </Route>
                    <Route
                      path="/test"
                      render={(props) => <Test {...{...props, style}}/>}>
                    </Route>
                  </Switch>
                )}
              </Transition>)
          }
        </Route>
      </BrowserRouter>
    </div>
  );
}

export default App;