import { Alert, Button, Card, Col, Container, Row } from "react-bootstrap";
import "./css/classroom.scss";
import { Form } from 'react-bootstrap';
import studentImage from '../assets/images/student.svg'
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getUserClass, joinToClassApi } from "../services/api";
import ClassList from "./ClassList";
function ClassRoomStudent() {
    const classDetails = useSelector(state => state.class.currentClass)
    const [code, setCode] = useState('')
    const [state, setState] = useState({
        users: [],
        loading: true,
      });
    const [message, setMessage] = useState({
        statusCode: '',
        statusMessage: '',
    })
    console.log(classDetails);
    const clearError = () => {
        setMessage({ statusCode: '', statusMessage: '' })
    }
    useEffect(() => {
        console.log("component mounted");
        getClass()
    }, []);
    const getClass = () => {
        const { _id } = JSON.parse(localStorage.getItem('userDetails') || {})
        getUserClass({ _id }).then((response) => {
            console.log(response);
            setState((prev) => ({
                ...prev,
                users: response.data.data || [],
                loading: false,
            }));
        });
    }
    const onSubmit = (e) => {
        e.preventDefault();
        const { email, _id } = JSON.parse(localStorage.getItem('userDetails') || {})
        const payload = {
            classCode: code,
            _id,
            email

        }
        console.log('payload', payload);
        joinToClassApi(payload).then(response => {
            // setCode('')
            if (response.status === 200) {
                getClass()
                setCode('')
            }
            console.log('response', response);
            setMessage({
                statusCode: response.status,
                statusMessage: response.message,
            })
            console.log(response);
        })

    }
    return (
        <>
            <Container className="classroom-container" fluid className="mt-2 mb-2 ml-2">
                <Card className="classroom-for-students px-2 py-2">
                    <Row>
                        <Col lg="4">
                            <img src={studentImage} alt="student" />
                        </Col>
                        <Col lg="8">
                            <div className="classroom-for-students-description">

                                <div className="classroom-for-students-description-content mx-4 my-4">
                                    <h1>JOIN CLASSROOM</h1>
                                    <p className="p-content">Get class Room code from you tutor</p>
                                    <p className="p-content">Join the class and keep yourself updated</p>
                                    <Form
                                        bg="light"
                                        className="form-content"
                                        data-bs-theme="light"
                                        align="left"
                                        onSubmit={onSubmit}
                                    >
                                        <Form.Group className="mb-3" controlId="Class Room">
                                            <Form.Label>Class Room Code</Form.Label>
                                            <Form.Control
                                                value={code}
                                                type="text"
                                                required
                                                onChange={(e) => {
                                                    clearError();
                                                    setCode(e.target.value)
                                                }}
                                            />

                                        </Form.Group>

                                        <Button block type="submit">
                                            Join Class
                                        </Button>

                                    </Form>
                                    {message.statusMessage && <Alert
                                        dismissible
                                        className="mt-2 mb-2"
                                        variant={message.statusCode == 200 ? "success" : "danger"}
                                        onClose={() => clearError()}

                                    > {message.statusMessage}</Alert>}
                                </div>
                            </div>
                        </Col>

                    </Row> 
                </Card>
            </Container>
            <Container className="mt-4">
                <ClassList  type="Student" loading={state.loading} users={state.users} />
            </Container>
        </>
    );
}

export default ClassRoomStudent;