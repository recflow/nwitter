import React, { useEffect, useState }  from 'react';
import AppRouter from './Router';
function App() {
  const [isLoggedIn, setIsLoggeIn] = useState(false);
  return <AppRouter/>;
}

export default App;
