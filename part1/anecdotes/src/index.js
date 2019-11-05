import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const Anecdote = (props) => (
  <div>
    {props.anecdotes[props.index]}
    <br/>
    has {props.votes[props.index]} votes
  </div>
)

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState([0,0,0,0,0,0])
  
  const setToVotes = (index) => {
    const newVotes = [ ...votes ]
    newVotes[index] += 1
    setVotes(newVotes)
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <Anecdote index={selected} anecdotes={props.anecdotes} votes={votes} />
      <br/>
      <Button handleClick={() => setToVotes(selected)} text="Vote" />
      <Button handleClick={() => setSelected(Math.floor(Math.random() * props.anecdotes.length))} text="next anecdote" />
      <h1>Anecdote with the most votes</h1>
      <Anecdote index={votes.indexOf(Math.max(...votes))} anecdotes={props.anecdotes} votes={votes} />
    </div>
  )
}


const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)