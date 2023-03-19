
import React, { useState, createContext, Suspense , useEffect } from "react";
import ReactDOM from "react-dom";
import {
  BrowserRouter as Router,
  Link,
  Routes,
  Route,
  useLocation,
  Outlet,
} from "react-router-dom";
import { HelmetProvider } from 'react-helmet-async';
import './App.scss';
import Spinner from 'react-bootstrap/Spinner';
import Header from "./includes/Header/Header";
import Footer from "./includes/Footer/Footer";
import { motion } from "framer-motion";
import Login from "./Pages/Login/Login";

import Profile from "./Pages/Profile/Profile"
import ProfileView from "./Pages/ProfileView/ProfileView"
 
import ViewEvent from "./Pages/ViewEvent/ViewEvent";
import Home from "./Pages/Home/Home";

import Register from "./Pages/Register/Register";
//import CreateEvent from "./Pages/CreateEvent/CreateEvent";
export const Data = createContext();
const PageLayout = ({ children }) => children;
const pageVariants = {
  initial: {
    opacity: 0,
  },
  in: {
    opacity: 1,
  },
  out: {
    opacity: 0,
  },
};

const pageTransition = {
  type: "tween",
  ease: "linear",
  duration: 0.5,
};

const AnimationLayout = () => {
  const { pathname } = useLocation();
  return (
    <PageLayout>
     
        <motion.div
          key={pathname}
          initial='initial'
          animate='in'
          variants={pageVariants}
          transition={pageTransition}>
          <Outlet />
        </motion.div>
    
    </PageLayout>
  );
};

export function App() {
  const [userPosition, setUserPosition] = useState();
  const [loginState, setLoginState] = useState(false);
  const [letestEventData, setLatestEventData] = useState(false);
  const [profileData, setProfileData] = useState();


    const webStore = {
      setLoginState,
      loginState,
      setProfileData,
      profileData,
      letestEventData,
      setLatestEventData,
      setUserPosition,
      userPosition
    };
  
  const helmetContext = {};
  return (
    <HelmetProvider context={helmetContext}>
 <Data.Provider value={webStore}>
 <React.StrictMode>
        <Header />

        <Routes>
     
        
            <Route path='*' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
           
            <Route path='/profile' element={<Profile />}  >
            
            </Route>
            <Route path='/profile/:userId' element={<ProfileView />} />
            <Route path='/event'>
              <Route path=':eventName' element={<ViewEvent />} />
            </Route>
        
     
        </Routes>
        <Footer/>
        </React.StrictMode>
    </Data.Provider>
    </HelmetProvider>
  );
}

export default App;
