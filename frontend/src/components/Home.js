import React, { useEffect, useState } from 'react'
import { connect, useSelector } from 'react-redux'
import NavbarTemplate from "./NavbarTemplate"
import { getAllUsers } from '../services/api'
import NavbarBootstrap from './NavbarBootstrap'
import Calender from './Calender'
import ClassRoom from './ClassRoom'
import ClassRoomStudent from './ClassRoomStudent'
import { setCurrentPage } from '../actions/classDetails'
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
        this.props.setCurrentPage('classRoomForStudent')
        return
      }
    }
    this.props.setCurrentPage(value)
  }
  render() {
    console.log('currentPage', this.props.currentPage);
    return (
      <div>
        <NavbarBootstrap onComponentChange={(value) => this.componentChangeHandler(value)} />
        {componentList[this.props.currentPage] || ''}

      </div>
    )
  }
}

function mapStateToProps(state) {
  console.log('state -> ', state);
  const value = state.user;
  const {currentClass, currentPage} = state.class
  console.log(currentClass, currentPage);
  return {
    value,
    currentPage,
    currentClass
  }
}
function mapDispatchToProps(dispatch) {
   return {
    setCurrentPage: (value) => dispatch(setCurrentPage(value))
   }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
// export default Home