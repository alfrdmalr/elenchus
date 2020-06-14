import React from 'react';
import './App.css';
import { Pupil } from './Pupil';
import { Roll } from './Roll'
import { AddPupil } from './AddPupil';

let names: Pupil[] = [
  { first: "John", last: "Doe" },
  { first: "Jane", last: "Deer", },// penalty: 60},
  { first: "Ray", last: "Sun", },//penalty: 50},
  { first: "in", last: "trouble" },//, penalty: 50}
]

function App() {
  return (
    <div className="App">
      <h1><i><a href="https://en.wikipedia.org/wiki/Socratic_method">elenchus</a></i></h1>
      <div style={{padding: '0 15rem'}}>
        <Roll
          initialPupils={names}
        />
      </div>


    </div>
  );
}

export default App;