import { Box, Button, Flex, useMantineColorScheme, Title, Input, Divider} from '@mantine/core'
import { useState, useEffect } from 'react'
import ConnectPage from './pages/ConnectPage';
import HomePage from './pages/HomePage';
import Transactions from './pages/Transactions';
import { BrowserRouter, Routes, Route } from "react-router-dom";
function App() {

  useMantineColorScheme("light")

  const [walletKey, setWalletKey] = useState("");
  const [apiKey, setApiKey] = useState("");

  const [loggedIn, setLoggedIn] = useState(false);

  const [test, setTest] = useState("none!");

  useEffect(() => {
    // Check if 'walletKey' exists in localStorage when the component mounts
    const storedWalletKey = localStorage.getItem('walletKey');
    const storedApiKey = localStorage.getItem('apiKey');
    if (storedWalletKey) {
      setWalletKey(storedWalletKey);
    }
    if (storedApiKey) {
      setApiKey(storedApiKey);
    }

    if (storedWalletKey && storedApiKey) {
      setLoggedIn(true);
    }
  }, []);

  return (
    <div>
      <BrowserRouter>
        <Routes> 
          <Route exact path="/" element={<ConnectPage 
          walletKey={walletKey}
          setWalletKey={setWalletKey} 
          apiKey={apiKey} 
          setApiKey={setApiKey} 
          setLoggedIn={setLoggedIn} />} />
          <Route path="/transactions" element={<Transactions />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
  
  // if (!loggedIn) {
  //     return (
  //       <ConnectPage 
  //         walletKey={walletKey}
  //         setWalletKey={setWalletKey} 
  //         apiKey={apiKey} 
  //         setApiKey={setApiKey} 
  //         setLoggedIn={setLoggedIn} 
  //       />
  //     )
  //   } else {
  //     return (
  //       <>
  //         <HomePage />
  //       <div>{test}</div>
  //       </>
  //     )
  //   }
  
}

export default App
