import { useState, useEffect, useContext } from "react";
import { Menu, Segment, Sticky } from "semantic-ui-react";
import { Route, Routes, useNavigate } from "react-router-dom";

import { FetchProfile } from "./actions";
import { GlobalContext, GlobalProvider } from "./global-context";
import { authNavOptions, unAuthNavOptions } from "./routes";
import { addAuthHeaders, getTokenFromStorage } from "../services/axios";

const Feed = () => {
  const [activeItem, setActiveItem] = useState(window.location.pathname.slice(1));
  const {
    data: { isLoggedIn },
    logout,
    login
  } = useContext(GlobalContext);
  const navigate = useNavigate();
  const routes = isLoggedIn ? authNavOptions : unAuthNavOptions;
  const routeOptions = Object.values(routes);

  const onItemClick = key => {
    setActiveItem(key);
    navigate(key);
  };

  useEffect(() => {
    const token = getTokenFromStorage();
    if (token) {
      addAuthHeaders(token);
      FetchProfile().then(user => login({ isLoggedIn: true, user }));
    }
  }, []);

  return (
    <div>
      <Sticky>
        <Menu attached size="large" inverted color="purple">
          <Menu.Item header>
            <Segment inverted color="orange">
              Message Node
            </Segment>
          </Menu.Item>
          {routeOptions.map(
            ({ key, name, position, onClick, hide }) =>
              !hide && (
                <Menu.Item
                  key={`feed-nav-${key}`}
                  position={position}
                  name={name}
                  active={activeItem == key}
                  onClick={() => (onClick ? onClick(logout) : onItemClick(key))}
                />
              )
          )}
        </Menu>
      </Sticky>

      <Segment>
        <Routes>
          {routeOptions.map(
            ({ key, component: Content, route }) =>
              Content && <Route key={`route-content-${key}`} exact path={route || key} element={<Content />} />
          )}
          <Route path="/*" element={null} />
        </Routes>
      </Segment>
    </div>
  );
};

export default () => (
  <GlobalProvider>
    <Feed />
  </GlobalProvider>
);
