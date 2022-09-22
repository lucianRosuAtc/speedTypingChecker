import { useEffect, useState, useRef } from 'react'
import './App.css'

function App() {
  const STARTING_GAME = 60
  const [text, setText] = useState("")
  const [timeRemaining, setTimeRemaining] = useState(STARTING_GAME)
  const [isTimeRunning, setIsTimeRunning] = useState(false)
  const [wordCount, setWordCount] = useState(0)
  const textBoxRef = useRef(false)

  function handleChange(e){
    const {value} = e.target
    setText(value)
  }

  function calculateWordCount(text){
    const wordsArr = text.trim().split(" ")
    return wordsArr.filter(word => word !== "").length
  }

  function startGame(){
    setIsTimeRunning(true)
    setTimeRemaining(STARTING_GAME)
    setText("")
    textBoxRef.current.disabled = false
    textBoxRef.current.focus()
  }

  function endGame(){
    setIsTimeRunning(false)
    setWordCount(calculateWordCount(text))
  }
  useEffect(()=>{
    if(isTimeRunning && timeRemaining >0){
      setTimeout(()=>{
        setTimeRemaining(time => time -1)
      }, 1000)
    } else if(timeRemaining === 0){
      endGame()
    }
  },[timeRemaining, isTimeRunning])

  return (
    <div className="App">
      <div>
        <h1>How fast do you type?</h1>
        <textarea
            ref={textBoxRef}
            onChange={handleChange}
            value={text}
            disabled={!isTimeRunning}
        />
        <h4>Time remaining: {timeRemaining}</h4>  
        <button onClick={startGame} disabled={isTimeRunning}>Start</button>
        <h1>Word count:{wordCount}</h1>  
      </div>
    </div>
  )
}

export default App

