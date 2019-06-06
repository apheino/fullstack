import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = (props) => (
    <button onClick={props.handleClick}>
      {props.text}
    </button>
  )

const App = (props) => {
    const [selected, setSelected] = useState(0)
    const [highest, setHighest] = useState(0)
    const [points, setPoints] = useState(new Array(props.anecdotes.length).fill(0))
    
    const selectNextAnecdote =() => setSelected(Math.floor(Math.random()*props.anecdotes.length))  

    const voteSelectedAnecdote = () => {
        const copy = [...points]
        copy[selected] += 1

        let len = copy.length
        let maxIndex = 0
        let max = 0
        while(len--){
            if (copy[len]>max){
                max = copy[len]
                maxIndex = len
            }
        }

        setPoints(copy)
        setHighest(maxIndex)
        //console.log('Vote: ', copy)    
    }

    return (
        <div>
            <h1>
                Anecdote of the day
            </h1>
            <div>
                {props.anecdotes[selected]}
            </div>
            <div>
                has {points[selected]} votes
            </div>
            <div>       
                <Button handleClick={voteSelectedAnecdote} text='vote' />
                <Button handleClick={selectNextAnecdote} text='next anecdote' />
            </div>
            <h1>
                Anecdote with most votes
            </h1>
            <div>
                {props.anecdotes[highest]}
                <div>
                has {points[highest]} votes
            </div>
            </div>
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
