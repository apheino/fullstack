import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => {
    return (
        <h1>
            {props.text}
        </h1>
    )
}




const Statistic = (props) => {
    return (
        <tr>
            <td>{props.text}</td> 
            <td>{props.count}</td> 
        </tr>
    )
}

const Button = (props) => {
    return (
    <button onClick={props.handleClick}>
      {props.text}
    </button>
    )
}

const Statistics = ({good, neutral, bad, all, summa}) => {
    if (all===0){
        return(
        <div>
            No feedback given
        </div>)
    }
    return (
        <table>
        <tbody>
            <Statistic text='good' count={good} />
            <Statistic text='neutral' count={neutral} />
            <Statistic text='bad' count={bad} />
            <Statistic text='all' count={all} />
            <Statistic text='average' count={summa / all} />
            <Statistic text='positive' count={good/all*100 + ' %'} />
        </tbody>
        </table>
    )
}
const App = () => {
    // tallenna napit omaan tilaansa
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)
    const [all, setAll] = useState(0)
    const [summa, setSumma] = useState(0)

    const setToGood = () =>{
        setGood(good + 1)
        setAll(all + 1)
        setSumma(summa + 1)
    }
    const setToNeutral = () =>{
        setNeutral(neutral + 1)
        setAll(all + 1)
        
    }
    const setToBad = () =>{
        setBad(bad + 1)
        setAll(all + 1)
        setSumma(summa - 1)
    }

    return (
        <div>
            <Header text='give feedback' />
            <Button handleClick={setToGood} text='good'/>
            <Button handleClick={setToNeutral} text='neutral'/>
            <Button handleClick={setToBad} text='bad'/>
            <Header text='statistics' />
            <Statistics good={good} neutral={neutral} bad={bad} all={all} summa={summa} />
        </div>
    )
}

ReactDOM.render(<App />, 
    document.getElementById('root')
)
