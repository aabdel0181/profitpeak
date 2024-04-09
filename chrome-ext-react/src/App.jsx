import { Box, Button, Flex, useMantineColorScheme, Title, Input, Divider} from '@mantine/core'
import { useState } from 'react'

import ConnectPage from './pages/ConnectPage';
import HomePage from './pages/HomePage';

// Contains the the extension and its sizing
function App() {

  useMantineColorScheme("light")

  const [walletKey, setWalletKey] = useState("");
  const [apiKey, setApiKey] = useState("");

  const [loggedIn, setLoggedIn] = useState(false);
  
  if (!loggedIn) {
      return (
        <ConnectPage 
          walletKey={walletKey}
          setWalletKey={setWalletKey} 
          apiKey={apiKey} 
          setApiKey={setApiKey} 
          setLoggedIn={setLoggedIn} 
        />
      )
    } else {
      return (
        <HomePage />
      )
    }
  
}

export default App
