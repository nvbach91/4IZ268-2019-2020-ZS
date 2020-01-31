import React, {useState, useEffect} from 'react';
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import { Button, Nav, Accordion, Card, ButtonGroup, Modal, InputGroup, FormControl, Form } from 'react-bootstrap';
import App from "firebase/app";
import axios from 'axios';

function NotePage() {
  const [notes, setNotes] = useState([]);
  const [responseIDS, setResponseIDS] = useState([]);
  const [posts, setPosts] = useState([]);
  const [modalAddShow, setModalAddShow] = useState(false);
  const [modalEditShow, setModalEditShow] = useState(false);
  const [modalContent, setModalContent] = useState({
    NotedId: null,
    Header: null,
    Main: null
  });


  function fetchFunc() {
    axios
    .get("https://gnotes-6aa9a.firebaseio.com/users/" + userId + "/posts.json")
    .then(res => {
      let response = Object.keys(res.data).map(item => [{
        data_notes: res.data[item],
        note_id: item
      }]);
      setPosts(response);
    });
  }
  
  useEffect(() => {
    fetchFunc();
  }, []);


  const userMail = localStorage.getItem('GNUAEM');
  const userId = localStorage.getItem('GNUAID');

  function saveNote(header, mainText) {

    const packedNote = {
      Header: header,
      Main: mainText
    };
    axios.post("https://gnotes-6aa9a.firebaseio.com/users/" + userId + "/posts.json", { packedNote })
    .then(res => {
      console.log(res.data);
      setModalAddShow(false);
      fetchFunc();
     })
  };


  
  function MyVerticallyCenteredAddModal(props) {

    const [header, setHeader] = useState('');
    const [mainText, setMainText] = useState('');

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
            <Button onClick={() => saveNote(header, mainText)}>Save</Button>
          </Modal.Footer>
        </Modal>
      );
    }

    function editNote(noteId, header, mainText) {
      setModalContent({
        NotedId: noteId,
        Header: header,
        Main: mainText
      });
  
      setModalEditShow(true);
    };
  
    function saveEditedNode(noteId, header, mainText) {
      const packedNote = {
        Header: header,
        Main: mainText
      };
      axios.patch("https://gnotes-6aa9a.firebaseio.com/users/" + userId + "/posts/" + noteId + ".json", { packedNote })
      .then(res => {
        console.log(res.data);
        setModalEditShow(false);
        fetchFunc();
       })
    };

    function MyVerticallyCenteredEditModal(props) {

      const [header, setHeader] = useState(modalContent.Header);
      const [mainText, setMainText] = useState(modalContent.Main);
  
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
                <FormControl aria-label="Large" aria-describedby="inputGroup-sizing-sm" onChange={handleHeaderChange} value={header}/>
                <InputGroup.Prepend>
                  <InputGroup.Text id="inputGroup-sizing-lg">Header</InputGroup.Text>
                </InputGroup.Prepend>
              </InputGroup>
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form.Group controlId="exampleForm.ControlTextarea1">
                <Form.Label>Enter text here:</Form.Label>
                <Form.Control as="textarea" rows="10" onChange={handleMainTextChange} value={mainText}/>
              </Form.Group>
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={() => saveEditedNode(modalContent.NotedId, header, mainText)}>Save</Button>
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
    console.log(posts);
  };

  function deleteNote(noteId) {
    console.log(noteId);
      axios
        .delete("https://gnotes-6aa9a.firebaseio.com/users/" + userId + "/posts/" + noteId + ".json")
        .then(res => {
          //const newPosts = posts.filter(item => item.note_id !== noteId);          // setPosts(prevState => {
          //   ///return {...prevState.filter(item => item.note_id !== noteId)};
          //   let serviceVar = {...prevState.filter(item => item.note_id !== noteId)}
          //   serviceVar = serviceVar[0];
          //   console.log(serviceVar);
          //   return {...prevState};
          // });
          //setPosts(newPosts)
          fetchFunc();
        });
  };

  return (<div className="App">
    <MyVerticallyCenteredAddModal
      show={modalAddShow}
      onHide={() => setModalAddShow(false)}
    />
    <MyVerticallyCenteredEditModal
      show={modalEditShow}
      onHide={() => setModalEditShow(false)}
    />
    <Nav className="justify-content-center" activeKey="/home">
     <Nav.Item>
       <Nav.Link><GoogleLogout clientId="619156863396-09hfggs2svjiqktioij8t3cpfq3s29m9.apps.googleusercontent.com" buttonText="Logout" onLogoutSuccess={logoutGoogle} /></Nav.Link>
     </Nav.Item>
     <Nav.Item>
       <Nav.Link><Button variant="success" type="button" size="lg" onClick={() => setModalAddShow(true)}>ADD NOTE</Button></Nav.Link>
     </Nav.Item>
   </Nav>
   <p className="text-center mt-4 mb-4">{userMail}</p>

   <Accordion defaultActiveKey="0">
   {
     posts.map(item =>
     <Card>
       <Accordion.Toggle as={Card.Header} eventKey={item[0].note_id}>
         <h4>{item[0].data_notes.packedNote.Header}</h4>
       </Accordion.Toggle>
       <Accordion.Collapse eventKey={item[0].note_id}>
         <Card.Body>{item[0].data_notes.packedNote.Main}
         <br />
         <ButtonGroup aria-label="Basic example" size="sm" className="mt-3">
           <Button variant="danger" type="button" onClick={() => deleteNote(item[0].note_id, item[0].data_notes.packedNote.Header, item[0].data_notes.packedNote.Main)}>delete</Button>
           <Button variant="primary" type="button" onClick={() => editNote(item[0].note_id, item[0].data_notes.packedNote.Header, item[0].data_notes.packedNote.Main)}>edit</Button>
         </ButtonGroup></Card.Body>
       </Accordion.Collapse>
     </Card>
   )
  }
  </Accordion>
    </div>);
}

export default NotePage;
