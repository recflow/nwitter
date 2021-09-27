import React, { useState, useEffect }  from 'react';
import AppRouter from 'components/Router';
import {authService} from "fbase";
import {onAuthStateChanged} from "firebase/auth";
function App() {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggeIn] = useState(false);
  useEffect(() => {
    onAuthStateChanged(authService, (user)=>{
      if(user){
        setIsLoggeIn(true);
      } else {
        setIsLoggeIn(false);
      }
      setInit(true);
    });
  }, []);
  return (
  <>
  {init ? <AppRouter isLoggedIn={isLoggedIn}/>: "Initializing..."}
  <footer>&copy; {new Date().getFullYear()} Nwitter</footer>
  </>
  );
}

export default App;
