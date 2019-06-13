import React from 'react'

const Header = ({name}) => {
    console.log(name)
    return (
      <h2>{name}</h2>
      )
    }
  
  const Part = (props) => {
    
    return (
      <p>{props.name} {props.exercises}</p>
    )
  }
  
  const Content = ({parts}) => {
    
    return (
      <div>
        {parts.map(part => 
          <Part 
            key={part.id}
            name={part.name}
            exercises={part.exercises}
          />
        )}
  
      </div>
    )
  }
  
  const Total = ({parts}) => {
    //console.log(parts)
  
    const total = parts.reduce((totExercises, part) =>  {
      console.log(totExercises, part.exercises)
      return totExercises + part.exercises;
      } , 0 
    )
  
    return (
      <div>
        <p>
          <strong>
            total of {total} exercises 
          </strong>
        </p>
      </div>
    )
  }
  
  const Course = ({course}) => {
    return (
      <div>
        <Header name = {course.name} />
        <Content  parts = {course.parts} />
        <Total parts = {course.parts} />
      </div>
    )
  }

export default Course