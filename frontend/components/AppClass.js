import React from 'react'
import axios from 'axios';

export default class AppClass extends React.Component {

  constructor() {
      super();
      this.state = {
        x: 2,
        y: 2,
        steps: 0,
        grid: [false, false, false,
               false, true, false,
               false, false, false],
        message: "",
        currentIdx: 4
      }
    }
  
  handleMove = (e) => {

    const handleUp = (e) => {
      if (this.state.y > 1 && this.state.currentIdx <= 8 && this.state.currentIdx >= 0 && e.target.id === "up") {
        this.setState({
          ...this.state,
          x: this.state.x,
          y: this.state.y - 1,
          steps: this.state.steps + 1,
          currentIdx: this.state.currentIdx - 3
        })} else if (e.target.id === "up") {
          this.setState({
            ...this.state,
            message: "You can't go up"
          })
        };
      }

    const handleDown = (e) => {
      if (this.state.y < 3 && this.state.currentIdx <= 8 && this.state.currentIdx >= 0 && e.target.id === "down") {
        this.setState({
          ...this.state,
          x: this.state.x,
          y: this.state.y + 1,
          steps: this.state.steps + 1,
          currentIdx: this.state.currentIdx + 3
        })} else if (e.target.id === "down") {
          this.setState({
            ...this.state,
            message: "You can't go down"
          })
        };
    }

    const handleLeft = (e) => {
      if (this.state.x > 1 && this.state.currentIdx <= 8 && this.state.currentIdx >= 0 && e.target.id === "left") {
        this.setState({
          ...this.state,
          x: this.state.x -1,
          y: this.state.y,
          steps: this.state.steps + 1,
          currentIdx: this.state.currentIdx - 1
        })} else if (e.target.id === "left") {
          this.setState({
            ...this.state,
            message: "You can't go left"
          })
        }
    }

    const handleRight = (e) => {
      if (this.state.x < 3 && this.state.currentIdx <= 8 && this.state.currentIdx >= 0 && e.target.id === "right") {
        this.setState({
          ...this.state,
          x: this.state.x + 1,
          y: this.state.y,
          steps: this.state.steps + 1,
          currentIdx: this.state.currentIdx + 1
        })} else if (e.target.id === "right") {
          this.setState({
            ...this.state,
            message: "You can't go right"
          })
        };
    }

    handleUp(e);
    handleDown(e);
    handleLeft(e);
    handleRight(e);
  }

  handleReset = () => {
    this.setState({
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

  handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:9000/api/result', {
      x: this.state.x,
      y: this.state.y,
      steps: this.state.steps,
      email: e.target[0].value
    })
    .then((res) => {const winMessage = res.data.message;
      this.setState({x: 2,
                y: 2,
                steps: 0,
                grid: [false, false, false,
                      false, false, false,
                      false, false, false],
                message: winMessage,
                currentIdx: 4})})
      .catch((err) => {const errMessage = err.response.data.message
      this.setState({x: 2,
                y: 2,
                steps: 0,
                grid: [false, false, false,
                      false, false, false,
                      false, false, false],
                message: errMessage,
                currentIdx: 4})})
    
  }

  render() {
    const { className } = this.props;

    return (
      <div id="wrapper" className={className}>
        <div className="info">
          <h3 id="coordinates">Coordinates ({this.state.x}, {this.state.y})</h3>
          <h3 id="steps">{this.state.steps === 1 ? `You moved ${this.state.steps} time` : `You moved ${this.state.steps} times`}</h3>
        </div>
        <div id="grid">
          {this.state.grid.map((item, index) => {
            return (<div key={index} id={index} className={index === this.state.currentIdx ? "square active" : "square"}>{index === this.state.currentIdx ? "B" : ""}</div>)
          })}
        </div>
        <div className="info">
          <h3 id="message">{this.state.message}</h3>
        </div>
        <div id="keypad">
          <button onClick={(e) => this.handleMove(e)} id="left">LEFT</button>
          <button onClick={(e) => this.handleMove(e)} id="up">UP</button>
          <button onClick={(e) => this.handleMove(e)} id="right">RIGHT</button>
          <button onClick={(e) => this.handleMove(e)} id="down">DOWN</button>
          <button onClick={this.handleReset} id="reset">reset</button>
        </div>
        <form onSubmit={(e) => this.handleSubmit(e)}>
          <input id="email" type="email" placeholder="type email"></input>
          <input id="submit" type="submit"></input>
        </form>
      </div>
    )
  }
}
