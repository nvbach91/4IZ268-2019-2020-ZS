import React, {useState, useEffect} from 'react';
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import { Button, Nav, Accordion, Card, ButtonGroup, Modal, InputGroup, FormControl, Form } from 'react-bootstrap';
import App from "firebase/app";
import axios from 'axios';
//import './App.css';

function NotePage() {
  const [notes, setNotes] = useState([]);
  const [posts, setPosts] = useState([]);
  const [modalShow, setModalShow] = useState(false);

  // const firebaseConfig = {
  //   apiKey: "AIzaSyBsk-nrTPRN3WYjd6f5HBvhY_qymMiuIio",
  //   authDomain: "gnotes-6aa9a.firebaseapp.com",
  //   databaseURL: "https://gnotes-6aa9a.firebaseio.com",
  //   projectId: "gnotes-6aa9a",
  //   storageBucket: "gnotes-6aa9a.appspot.com",
  //   messagingSenderId: "59366761135",
  //   appId: "1:59366761135:web:9135a7577f49c48e576a5a"
  // };

    useEffect(() => {
      async function fetchFunc() {
        await axios
        .get("https://gnotes-6aa9a.firebaseio.com/users/" + userId + "/posts.json")
        .then(res => {
          setPosts(res.data);
        });
      }
      fetchFunc();
    }, []);

    const listItems = Object.keys(posts).map((item) =>
      <Card>
        <Accordion.Toggle as={Card.Header} eventKey={item}>
          {item.packedNote}
        </Accordion.Toggle>
        <Accordion.Collapse eventKey={item}>
          <Card.Body>{item.packedNote}
          <br />
          <ButtonGroup aria-label="Basic example" size="sm" className="mt-3">
            <Button variant="danger" type="button" onClick={smthFunc}>delete</Button>
            <Button variant="primary" type="button" onClick={smthFunc}>edit</Button>
          </ButtonGroup></Card.Body>
        </Accordion.Collapse>
      </Card>
    );


      // Object.keys(posts).forEach((item, key) => {
      //   //notesIDs.push(item);
      //   //testNotes.push(posts[item]);
      //   let currentId = item;
      //   let currentNote = posts[item]['packedNote'];
      //   // console.log(currentId);
      //   // console.log(currentNote);
      //   let fullNote = {
      //     id: currentId,
      //     header: currentNote.Header,
      //     main: currentNote.main
      //   };
      //   console.log(fullNote);
      //   notes.push(fullNote);
      //
      // });

      // <Card>
      //   <Accordion.Toggle as={Card.Header} eventKey={key}>
      //     {item}
      //   </Accordion.Toggle>
      //   <Accordion.Collapse eventKey={key}>
      //     <Card.Body>{item}
      //     <br />
      //     <ButtonGroup aria-label="Basic example" size="sm" className="mt-3">
      //       <Button variant="danger" type="button" onClick={smthFunc}>delete</Button>
      //       <Button variant="primary" type="button" onClick={smthFunc}>edit</Button>
      //     </ButtonGroup></Card.Body>
      //   </Accordion.Collapse>
      // </Card>





  //var database = App.database().ref;
  //console.log(database);

  const userMail = localStorage.getItem('GNUAEM');
  const userId = localStorage.getItem('GNUAID');



  function MyVerticallyCenteredModal(props) {

    const [header, setHeader] = useState('');
    const [mainText, setMainText] = useState('');

    const saveNote = () => {

      const packedNote = {
        Header: header,
        Main: mainText
      };
      axios.post("https://gnotes-6aa9a.firebaseio.com/users/" + userId + "/posts.json", { packedNote })
      .then(res => {
        console.log(res.data);
        window.location.replace("/");
       })
    };

    const handleHeaderChange = e => {
      setHeader(e.target.value);
    }

    const handleMainTextChange = e => {
      setMainText(e.target.value);
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
          <InputGroup>
            <FormControl aria-label="Large" aria-describedby="inputGroup-sizing-sm" onChange={handleHeaderChange}/>
            <InputGroup.Prepend>
              <InputGroup.Text id="inputGroup-sizing-lg">Header</InputGroup.Text>
            </InputGroup.Prepend>
          </InputGroup>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="exampleForm.ControlTextarea1">
            <Form.Label>Enter text here:</Form.Label>
            <Form.Control as="textarea" rows="10" onChange={handleMainTextChange} />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={saveNote}>Save</Button>
        </Modal.Footer>
      </Modal>
    );
  }

    //Logout function
    const logoutGoogle = () => {
      localStorage.removeItem('GNUAID');
      localStorage.removeItem('GNUAEM');
      window.location.replace("/");
    };



    function smthFunc() {
      // console.log(testNotes);
      // console.log(notesIDs);
      console.log(notes);
    };

    return (<div className="App">
    <MyVerticallyCenteredModal
      show={modalShow}
      onHide={() => setModalShow(false)}
    />
    <Nav className="justify-content-center" activeKey="/home">
     <Nav.Item>
       <Nav.Link><GoogleLogout clientId="619156863396-09hfggs2svjiqktioij8t3cpfq3s29m9.apps.googleusercontent.com" buttonText="Logout" onLogoutSuccess={logoutGoogle} /></Nav.Link>
     </Nav.Item>
     <Nav.Item>
       <Nav.Link><Button variant="success" type="button" size="lg" onClick={() => setModalShow(true)}>ADD NOTE</Button></Nav.Link>
     </Nav.Item>
   </Nav>
   <p className="text-center mt-4 mb-4">{userMail}</p>

   <Accordion defaultActiveKey="0">
   {listItems}
  </Accordion>
    </div>);
}

export default NotePage;
