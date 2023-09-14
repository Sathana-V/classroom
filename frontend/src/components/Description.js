import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getCurrentUser } from "../services/api";
import { useParams } from "react-router-dom";
import { Button, Card, Col, Row } from "react-bootstrap";
import  classRoomImage from '../assets/images/room.svg'
import  book from '../assets/images/books.jpeg'
import empty from '../assets/images/empty.avif'
import NewAssignment from "./NewAssignment";
function Description() {
    const params = useParams()
    const state = useSelector(state => state)
    const { user } = state
    const currentClass = state.class.currentClass
    const [modalShow, setModalShow] = useState(false)
    useEffect(() => {
        console.log('aparms', params);
        console.log('state in desctipion', state);
        getCurrentUser(user.userStatus).then(response => {
            console.log(response)
        })
    }, [])
    const onFinish = (e) => {
        console.log('on finish discription');
    }
    const onClose = (e) => {
        console.log('on close');
    }
    return (<>
        <Row>
            <NewAssignment
             show={modalShow}
             onHide={() => setModalShow(false)}
             onFinish={onFinish}
             onClose={onClose}
             heading="New Task"></NewAssignment>
            <Col lg="3">
            <Card className="room-description mx-4 my-4 ml-0 pt-4">
                <img src={classRoomImage} alt="side_image"/>
                <div className="room-description-content">
                <h1 className="mt-5 ">{currentClass.className}</h1>
                <p>{currentClass.description}</p>
                <img src={book} alt="side_image"/>
                </div>
                </Card>
            </Col>
            <Col lg="9">
              <Card className="room-description-assignment mx-4 my-4 mlr-0">
                <img src={empty} />
                 <p>No assignments created yet</p>
                 <Button onClick={() => setModalShow(true)} className="mt-1 mb-4">Create new assignment</Button>
              </Card>
            </Col>
        </Row>
    </>);
}

export default Description;