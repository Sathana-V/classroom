import React from 'react';
import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FileUploader } from "react-drag-drop-files";
import { Trash } from 'react-bootstrap-icons';

const fileTypes = ["JPG", "PNG", "GIF"];

class NewAssignment extends React.Component {
  state = {
    title: '',
    description: '',
    file: []
  }
  handleChange(file) {
    let newArray = Array.from(file).map(fileObj => {
      const fileNameCreated = fileObj.name + new Date() + Math.random();
      fileObj.fileNameCreated = fileNameCreated
      return fileObj
    });

    this.setState({ file: this.state.file.concat(Array.from(newArray)), fileLength: file.length })
  };
  inputChangeHandler(e, value) {
    console.log(e, value);
    this.setState((prev) => ({
      ...prev,
      [value]: e.target.value,
    }));
  };
  onFinishSubmit(e) {
    console.log("on finish submit");

    this.setState({
      title: '',
      description: ''
    })
    console.log('submited here', this.state);
    this.props.onFinish(this.state)
  }
  componentWillUnmount() {
    debugger
    console.log('component unmounted');
  }
  removeSelectedItems(e) {
    console.log('remove item:', e);
    this.setState({
      file: this.state.file.filter(item => !(item.name == e.name && item.fileNameCreated == e.fileNameCreated))
    })
  }
  render() {
    console.log('state file', this.state.file);
    return (
      <Modal
        {...this.props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {this.props.heading}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form
            bg="light"
            data-bs-theme="light"
            align="left"
          // onSubmit={() => this.onFinishSubmit()}
          >
            <Form.Group className="mb-3" controlId="Class Room">
              <Form.Label>Class Room</Form.Label>
              <Form.Control
                value={this.state.title}
                type="text"
                required
                onChange={(e) => this.inputChangeHandler(e, "title")}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="Description">
              <Form.Label>Description</Form.Label>
              <Form.Control
                value={this.state.description}
                as="textarea"
                required
                rows={3}
                onChange={(e) => this.inputChangeHandler(e, "description")}
              />
            </Form.Group>
            <FileUploader
              className="mt-2 mb-3"
              multiple={true}
              handleChange={(e) => this.handleChange(e)}
              name="file"
              types={fileTypes}
            />
            <div className="file-items ml-5">
              {
                this.state.file.map(e => (
                  <p className="file-items-container"> {e.name}  <Trash color='red' onClick={() => this.removeSelectedItems(e)} /></p>
                ))
              }
            </div>
            <Button className=" block-button" onClick={() => this.onFinishSubmit()}>
              Create
            </Button>
          </Form>

        </Modal.Body>
      </Modal>
    );
  }
}

export default NewAssignment;