import { useEffect, useState } from 'react'
import logo from './logo.svg'
import './App.css'

const uri = 'http://localhost:8080/'
const query = 'teste'

function App() {
  const [error, setError] = useState(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [items, setItems] = useState([])

  const chamarAPI = async () => {
    try {
      const response = await fetch(uri + query, { mode: 'cors' })
      const data = await response.json()
      setIsLoaded(true)
      setItems(data)
    }
    catch (error) {
      setIsLoaded(true)
      setError(error)
    }
  }

  useEffect(() => {
    chamarAPI()
  }, [])

  if (error) {
    return <div>Error: {error.message}</div>
  } else if (!isLoaded) {
    return <div>Loading...</div>
  } else {
    if (query === 'dados') {
      var lista =
        <ul>
          {items.map(item => (
            <li key={item.LOGS_ID}>
              {item.LOGS_NOME} {item.LOGS_DESCRICAO}
            </li>
          ))}
        </ul>
    } else {
      var lista =
        <ul>
          {items.map(item => (
            <li key={item.msg}>
              {item.msg}
            </li>
          ))}
        </ul>
    }

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <p>
            Dados API:
            {lista}
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
    )
  }
}

export default App
