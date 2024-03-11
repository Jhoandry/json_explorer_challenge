import React from 'react';
import './App.css';
import JsonExplorer from './components/JsonExplorer';
import data from './assets/data.json';

function App() {
  return (
    <div className="App">
      <h1>JSON Explorer Challenge</h1>
      <JsonExplorer json={data}/>
    </div>
  );
}

export default App;
