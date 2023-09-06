import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useState } from 'react';
function ModalTemplate(props) {
    const [state, setState] = useState({
        roomName: '',
        description:''
    })
    
  const inputChangeHandler = (e, value) => {
    console.log(e, value);
    props.onClose();
    setState((prev) => ({
      ...prev,
      [value]: e.target.value,
    }));
  };
  const onFinishSubmit = (e) => {
    e.preventDefault()
    setState({
        roomName: '',
        descripiton: ''
    })
    props.onFinish(state)
  }
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {props.heading}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
              <Form
                bg="light"
                data-bs-theme="light"
                align="left"
                onSubmit={onFinishSubmit}
              >
                <Form.Group className="mb-3" controlId="Class Room">
                  <Form.Label>Class Room</Form.Label>
                  <Form.Control
                    value={state.roomName}
                    type="text"
                    required
                    onChange={(e) => inputChangeHandler(e, "roomName")}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="Description">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    value={state.description}
                    as="textarea"
                    required
                    rows={3}
                    onChange={(e) => inputChangeHandler(e, "description")}
                  />
                </Form.Group>

                <Button block type="submit">
                  Create
                </Button>
                </Form>
      </Modal.Body>
    </Modal>
  )
}
export default ModalTemplate;
//   const [modalShow, setModalShow] = React.useState(false);

//   return (
//     <>
//       <Button variant="primary" onClick={() => setModalShow(true)}>
//         Launch vertically centered modal
//       </Button>

//       <MyVerticallyCenteredModal
//         show={modalShow}
//         onHide={() => setModalShow(false)}
//       />
//     </>
//   );
// }

// render(<App />);