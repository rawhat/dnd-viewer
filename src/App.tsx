import React from 'react';

import './App.css';

import { DbProvider } from "./DbProvider";
import { Class } from "./Class";

function App() {
  return (
    <DbProvider>
      <Class />
    </DbProvider>
  );
}

export default App;
