import React, { Component } from 'react'
import "./css/card.scss"
export default class card extends Component {
  render() {
    return (
      <div className="card-wrapper">
       {this.props.children}
      </div>
    )
  }
}
