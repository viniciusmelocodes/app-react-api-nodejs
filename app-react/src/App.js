import { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';

const uri = 'http://localhost:8080/';
const query = 'dados';

var dados = [];

function App() {
  const chamarAPI = async () => {
    try {
      const response = await fetch(uri + query, { mode: 'cors' });
      const data = await response.json();
      dados = data
      console.log({ dados })
    }
    catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    chamarAPI()
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
