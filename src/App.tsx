import React from 'react';
import logo from './logo.svg';
import './App.css';
import { ChakraProvider } from '@chakra-ui/react';
import { Center } from '@chakra-ui/layout';
import AllChats from './Components/AllChats';
import { BrowserRouter } from 'react-router-dom';
import {Routes, Route} from 'react-router-dom';
import ChatScreen from './Components/ChatScreen';

function App() {
  return (
    <ChakraProvider>
      <Routes>
        <Route path='/' element={<AllChats/>}></Route>
        <Route path=':chatId' element={<ChatScreen/>}></Route>
      </Routes>
    </ChakraProvider>
  );
}

export default App;
