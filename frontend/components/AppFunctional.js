import React, { useState } from 'react'
import axios from 'axios';

export default function AppFunctional(props) {

  const [state, setState] = useState({
        x: 2,
        y: 2,
        steps: 0,
        grid: [false, false, false,
               false, true, false,
               false, false, false],
        message: "",
        currentIdx: 4})
  
  const handleMove = (e) => {

    const handleUp = (e) => {
      if (state.y > 1 && state.currentIdx <= 8 && state.currentIdx >= 0 && e.target.id === "up") {
        setState({
          ...state,
          x: state.x,
          y: state.y - 1,
          steps: state.steps + 1,
          currentIdx: state.currentIdx - 3
        })} else if (e.target.id === "up") {
          setState({
            ...state,
            message: "You can't go up"
          })
        };
      }

    const handleDown = (e) => {
      if (state.y < 3 && state.currentIdx <= 8 && state.currentIdx >= 0 && e.target.id === "down") {
        setState({
          ...state,
          x: state.x,
          y: state.y + 1,
          steps: state.steps + 1,
          currentIdx: state.currentIdx + 3
        })} else if (e.target.id === "down") {
          setState({
            ...state,
            message: "You can't go down"
          })
        };
    }

    const handleLeft = (e) => {
      if (state.x > 1 && state.currentIdx <= 8 && state.currentIdx >= 0 && e.target.id === "left") {
        setState({
          ...state,
          x: state.x -1,
          y: state.y,
          steps: state.steps + 1,
          currentIdx: state.currentIdx - 1
        })} else if (e.target.id === "left") {
          setState({
            ...state,
            message: "You can't go left"
          })
        }
    }

    const handleRight = (e) => {
      if (state.x < 3 && state.currentIdx <= 8 && state.currentIdx >= 0 && e.target.id === "right") {
        setState({
          ...state,
          x: state.x + 1,
          y: state.y,
          steps: state.steps + 1,
          currentIdx: state.currentIdx + 1
        })} else if (e.target.id === "right") {
          setState({
            ...state,
            message: "You can't go right"
          })
        };
    }

    handleUp(e);
    handleDown(e);
    handleLeft(e);
    handleRight(e);
  }

  const handleReset = () => {
    setState({
      x: 2,
      y: 2,
      steps: 0,
      grid: [false, false, false,
            false, false, false,
            false, false, false],
      message: "",
      currentIdx: 4
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:9000/api/result', {
      x: state.x,
      y: state.y,
      steps: state.steps,
      email: e.target[0].value
    })
    .then((res) => {const winMessage = res.data.message;
      this.setState({...this.state, message: winMessage})})
      .catch((err) => {const errMessage = err.response.data.message
      this.setState({...this.state, message: errMessage})})
  }

    return (
      <div id="wrapper" className={props.className}>
        <div className="info">
          <h3 id="coordinates">Coordinates ({state.x}, {state.y})</h3>
          <h3 id="steps">You moved {state.steps} times</h3>
        </div>
        <div id="grid">
          {state.grid.map((item, index) => {
            return (<div key={index} id={index} className={index === state.currentIdx ? "square active" : "square"}>{index === state.currentIdx ? "B" : ""}</div>)
          })}
        </div>
        <div className="info">
          <h3 id="message">{state.message}</h3>
        </div>
        <div id="keypad">
          <button onClick={(e) => handleMove(e)} id="left">LEFT</button>
          <button onClick={(e) => handleMove(e)} id="up">UP</button>
          <button onClick={(e) => handleMove(e)} id="right">RIGHT</button>
          <button onClick={(e) => handleMove(e)} id="down">DOWN</button>
          <button onClick={handleReset} id="reset">reset</button>
        </div>
        <form onSubmit={(e) => handleSubmit(e)}>
          <input id="email" type="email" placeholder="type email"></input>
          <input id="submit" type="submit"></input>
        </form>
      </div>
    )
  }

