import "./css/classroom.scss";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useEffect, useState } from "react";
import { createNewClass, getUserClass } from "../services/api";
import ClassList from "./ClassList";
import { Alert, Card } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import ModalTemplate from "./ModalTemplate";
import Button from "react-bootstrap/Button";
import  classRoomImage from '../assets/images/staff.svg'
const layout = {
  labelCol: {
    span: 4,
  },
  wrapperCol: {
    span: 12,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 4,
    span: 5,
  },
};

const ClassRoom = () => {
  const [state, setState] = useState({
    users: [],
    loading: true,
  });
  const [modalShow, setModalShow] = useState(false);
  const [message, setMessage] = useState({});

  const inputChangeHandler = (e, value) => {
    console.log(e, value);
    onClose();
    setState((prev) => ({
      ...prev,
      [value]: e.target.value,
    }));
  };

  useEffect(() => {
    console.log("component mounted");
    getClass()
  }, []);
  const getClass = () => {
    const {_id} = JSON.parse(localStorage.getItem('userDetails') || {})
    getUserClass({_id}).then((response) => {
      console.log(response);
      setState((prev) => ({
        ...prev,
        users: response.data.data || [],
        loading: false,
      }));
    });
  }
  const onFinish = (state) => {
    const {_id} = JSON.parse(localStorage.getItem('userDetails') || {})
    console.log("submiting form", state);
    setModalShow(false);
    createNewClass({
      className: state.roomName,
      description: state.description,
      _id
    }).then((res) => {
      console.log(res);
      if (res.status == 200) {
        getClass()
        setMessage({
          status: res.status,
          statusMessage:
            "New class has been created successfully. Share the above class code to join the class",
          classCode: ` CLASS CODE : ${res.response.data.data.classCode}`,
        });
      } else {
        setMessage({
          status: res.status,
          statusMessage: res.response.data.message,
          classCode: "Something went wrong",
        });
      }
    });
  };
  const onClose = () => {
    setMessage({});
  };
  return (
    <div>
      <div className="classroom-form">
        <Card>
          <Row>
            <Col lg="5">
             <img src={classRoomImage} alt="classrroom"></img>
            </Col>
            <Col lg="7">
              <div className="classroom-form-description px-4 py-4">
                <h1>Create Classroom</h1>
                <p>
                  Create class room and share the generated code with your
                  students <br/> They can join the classroom using the code shared by
                  you.
                </p>

                <Button onClick={() => setModalShow(true)}>New Class</Button>
                <ModalTemplate
                  show={modalShow}
                  onHide={() => setModalShow(false)}
                  heading="Create Class"
                  onFinish={onFinish}
                  onClose={onClose}
                ></ModalTemplate>

                {message && message.statusMessage && (
                  <Alert
                  className="mt-2 mb-2"
                    dismissible
                    onClose={onClose}
                    variant={message.status == 200 ? "success" : "danger"}
                  >
                    <Alert.Heading>{message.classCode}</Alert.Heading>
                    {message.statusMessage}
                  </Alert>
                )}
              </div>
            </Col>
          </Row>
        </Card>
      </div>
      <Container className="mt-4">
        <ClassList loading={state.loading} users={state.users} />
      </Container>
    </div>
  );
  // return (
  //   <div>
  //     <div className="classroom-form">
  //       <Card>
  //         <Row gutter={[16, 8]}>
  //           <Col span={12} >
  //             <div className="classroom-form-description">
  //               <h1>Create Classroom</h1>
  //               <p>Create class room and share the generated code with your students</p>
  //               <p> They can join the classroom using the code shared by you.</p>
  //             </div>
  //           </Col>
  //           <Col span={12} >
  //             <div className="classroom-form-details">
  //               <Form
  //                 {...layout}
  //                 name="basic"
  //                 form={form}
  //                 initialValues={{
  //                   remember: true
  //                 }}
  //                 onFinish={onFinish}
  //               // onFinishFailed={onFinishFailed}
  //               >
  //                 <Form.Item
  //                   label="Class Room Name"
  //                   name="Class Room Name"
  //                   rules={[
  //                     {
  //                       required: true
  //                     }
  //                   ]}
  //                 >
  //                   <Input onChange={(e) => inputChangeHandler(e, 'roomName')} />
  //                 </Form.Item>

  //                 <Form.Item
  //                   label="Description"
  //                   name="Description"
  //                   rules={[
  //                     {
  //                       required: true,
  //                       message: "Please give description!"
  //                     }
  //                   ]}
  //                 >
  //                   <TextArea onChange={(e) => inputChangeHandler(e, 'description')} />
  //                 </Form.Item>

  //                 <Form.Item {...tailLayout}>
  //                   <Button type="primary" htmlType="submit" shape="round" size="large" block>
  //                     Create
  //                   </Button>
  //                 </Form.Item>
  //               </Form>
  //             </div></Col>
  //           {message && message.statusMessage && <Col span={24} >

  //             <Alert
  //               message={message.classCode}
  //               description={message.statusMessage}
  //               closable
  //     onClose={onClose}
  //               type={message.status == 200 ? "success" : "error"}
  //               showIcon
  //             />
  //           </Col>}
  //         </Row>
  //         <ClassList loading={state.loading} users={state.users} />

  //       </Card>
  //     </div>
  //   </div>
  // )
};
export default ClassRoom;
