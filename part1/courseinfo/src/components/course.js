import React from 'react'

const Course = (props) => {
  const course = props.course
  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
    </div>
  )
}

const Header = (props) => {
  return (
    <h1>{props.course}</h1>
  )
}

const Part = (props) => {
  const part = props.part
  return (
    <p>{part.name} {part.exercises}</p>
  )
}

const Content = (props) => {
  const parts = props.parts
  return (
    <div>
      {parts.map(part => <Part key={part.id} part={part} />)}
      <Total parts={parts}/>
    </div>
  )
}

const Total = (props) => {
  const parts = props.parts
  const total = parts.reduce( (sum, part) => sum + part.exercises, 0)
  return (
    <b>total of {total} exercises</b>
  )
}

export default Course