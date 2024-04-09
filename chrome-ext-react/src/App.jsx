import { Box, Button, Flex, useMantineColorScheme, Title, Input, Divider} from '@mantine/core'
import { useState, useEffect } from 'react'

import ConnectPage from './pages/ConnectPage';
import HomePage from './pages/HomePage';

// Contains the the extension and its sizing
function App() {

  useMantineColorScheme("light")

  const [walletKey, setWalletKey] = useState("");
  const [apiKey, setApiKey] = useState("");

  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    // Open (or create) the database
    const request = window.indexedDB.open('myDatabase', 1);

    request.onerror = function(event) {
      console.log('Database error: ' + event.target.errorCode);
    };

    request.onupgradeneeded = function(event) {
      const db = event.target.result;
      
      // Create an object store named "data"
      const objectStore = db.createObjectStore('data', { keyPath: 'id' });

      // Create an index to search values by id
      objectStore.createIndex('id', 'id', { unique: true });
    };

    request.onsuccess = function(event) {
      const db = event.target.result;

      // Start a new transaction
      const transaction = db.transaction(['data'], 'readwrite');

      // Get the object store
      const objectStore = transaction.objectStore('data');

      // Add data to the object store
      const data = { id: 1, value: '123' };
      objectStore.add(data);
    };
  }, []);
  
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
