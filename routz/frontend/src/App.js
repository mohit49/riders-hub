
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
import '../src/App.scss';
import Spinner from 'react-bootstrap/Spinner';
import Header from "../src/includes/Header/Header";
import Footer from "../src/includes/Footer/Footer";
import { motion } from "framer-motion";
import Login from "./Pages/Login/Login";

import Profile from "./Pages/Profile/Profile"
import ProfileView from "./Pages/ProfileView/ProfileView"
 
import ViewEvent from "./Pages/ViewEvent/ViewEvent";
const Home = React.lazy(() => import("./Pages/Home/Home"));
const Register = React.lazy(() => import("./Pages/Register/Register"));
const CreateEvent = React.lazy(() => import("./Pages/CreateEvent/CreateEvent"));
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
   
        <Header />

        <Routes>
     
          <Route element={<AnimationLayout />}>
            <Route path='/' element={<Suspense fallback={ <div className="spinner-con"><Spinner animation="border" variant="primary"  /></div>}><Home /></Suspense>} />
            <Route path='/login' element={<Suspense fallback={ <div className="spinner-con"><Spinner animation="border" variant="primary"  /></div>}><Login /></Suspense>} />
            <Route path='/register' element={<Suspense fallback={<div className="spinner-con"><Spinner animation="border" variant="primary"  /></div>}><Register /></Suspense>} />
            <Route path='/create-events' element={<Suspense fallback={<div className="spinner-con"><Spinner animation="border" variant="primary"  /></div>}><CreateEvent /></Suspense>} />
            <Route path='/profile' element={<Suspense fallback={<div className="spinner-con"><Spinner animation="border" variant="primary"  /></div>}><Profile /></Suspense>}  >
            
            </Route>
            <Route path='/profile/:userId' element={<Suspense fallback={<div className="spinner-con"><Spinner animation="border" variant="primary"  /></div>}><ProfileView /></Suspense>} />
            <Route path='/event'>
              <Route path=':eventName' element={<Suspense fallback={<div className="spinner-con"><Spinner animation="border" variant="primary"  /></div>}><ViewEvent /></Suspense>} />
            </Route>
          </Route>
     
        </Routes>
        <Footer/>
     
    </Data.Provider>
    </HelmetProvider>
  );
}

export default App;
