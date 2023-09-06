import React, { useEffect, useState } from 'react'
import { connect, useSelector } from 'react-redux'
import NavbarTemplate from "./NavbarTemplate"
import { getAllUsers } from '../services/api'
import NavbarBootstrap from './NavbarBootstrap'
import Calender from './Calender'
import ClassRoom from './ClassRoom'
import ClassRoomStudent from './ClassRoomStudent'
const componentList = {
  classRoom: <ClassRoom />,
  classRoomForStudent: <ClassRoomStudent />,
  calender: <Calender />
}
class Home extends React.PureComponent {
  state = {
    componentToRender: ''
  }
  componentDidMount() {
    this.componentChangeHandler('classRoom')
  }
  componentChangeHandler(value) {
    let userDetails = JSON.parse(localStorage.getItem('userDetails') || {})
    console.log('userDetails', localStorage.getItem('userDetails'));
    if (value === 'classRoom') {
      if (userDetails.type === 'Student') {
        this.setState({ componentToRender: 'classRoomForStudent' })
        return
      }
    }
    this.setState({ componentToRender: value })
  }
  render() {
    return (
      <div>
        <NavbarBootstrap onComponentChange={(value) => this.componentChangeHandler(value)} />
        {componentList[this.state.componentToRender] || ''}

      </div>
    )
  }
}

function mapStateToProps(state) {
  const value = state.user;
  return {
    value
  }
}

export default connect(mapStateToProps)(Home)
// export default Home