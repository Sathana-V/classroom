import { Card } from "react-bootstrap";
import React from 'react';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "../components/css/classroom.scss"
import bookImg from "../assets/images/books.jpeg"
import { setCurrentClass, setCurrentPage } from "../actions/classDetails";
import { useDispatch, useSelector } from "react-redux";
const ClassList = (props) => {
    const dispatch = useDispatch()
    console.log('userlist', props.users);
    const state = useSelector(state => state);
    console.log('state', state);
    const onSubmitHandler = (e) => {
        console.log(e);
        dispatch(setCurrentClass(e))
        dispatch(setCurrentPage('description'))
        sessionStorage.setItem('description_id', e._id)
        // navigate('/classroom?id='+e._id)
    }
    return (
        <Row>
            {props.users.map(e => (
                <Col className="classlist-card" xs={12} md={4} lg={4} key={e._id}>

                    {
                        <Card onClick={() => onSubmitHandler(e)} className="mx-2 my-2">
                            <Card.Header>
                                <div className="classlist-card-count">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="white" class="bi bi-people" viewBox="0 0 16 16">
                                        <path d="M15 14s1 0 1-1-1-4-5-4-5 3-5 4 1 1 1 1h8Zm-7.978-1A.261.261 0 0 1 7 12.996c.001-.264.167-1.03.76-1.72C8.312 10.629 9.282 10 11 10c1.717 0 2.687.63 3.24 1.276.593.69.758 1.457.76 1.72l-.008.002a.274.274 0 0 1-.014.002H7.022ZM11 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0ZM6.936 9.28a5.88 5.88 0 0 0-1.23-.247A7.35 7.35 0 0 0 5 9c-4 0-5 3-5 4 0 .667.333 1 1 1h4.216A2.238 2.238 0 0 1 5 13c0-1.01.377-2.042 1.09-2.904.243-.294.526-.569.846-.816ZM4.92 10A5.493 5.493 0 0 0 4 13H1c0-.26.164-1.03.76-1.724.545-.636 1.492-1.256 3.16-1.275ZM1.5 5.5a3 3 0 1 1 6 0 3 3 0 0 1-6 0Zm3-2a2 2 0 1 0 0 4 2 2 0 0 0 0-4Z" />
                                    </svg>
                                    <span>  {props.type === "Staff" ? e.students.length : e.students.length - 1}</span>
                                </div>

                                <h4>{e.className || ''} </h4>
                            </Card.Header>
                            <Card.Body>
                                <Row>
                                    <Col lg="4">
                                        <img src={bookImg} alt="book"></img>
                                        <i className="bi bi-clipboard"></i> <span className="classlist-card-code">{e.classCode}</span>
                                    </Col>
                                    <Col lg="8">

                                        <Card.Text className="classlist-card-text" >
                                            {e.description || ''}
                                        </Card.Text>

                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                    }
                </Col>
            ))}
        </Row>
    )
}
export default ClassList;