import { useState } from 'react'
import './App.css'
import Quiz from './components/Quiz'
import Start from './components/Start'

function App() {
  const [gameIsInProgress, setGameIsInProgress] = useState(false)

  function updateGameStatus() {
    setGameIsInProgress(prevStatus => !prevStatus)
  }

  let actualScreen;
  gameIsInProgress === false ? actualScreen = <Start updateGameStatus={updateGameStatus} /> : actualScreen = <Quiz updateGameStatus={updateGameStatus}/>

  return (
    <div className="App">
      {actualScreen}
    </div>
  )
}

export default App
