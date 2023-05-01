import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faJs, faReact, faNode } from '@fortawesome/free-brands-svg-icons';
import { SiSocketdotio, SiMongodb, SiBootstrap, SiGithub, SiExpress, SiJsonwebtokens, SiSlack, SiTrello} from 'react-icons/si';
import 'animate.css/animate.min.css';
import 'animate.css';



const ToolsUsed = () => {
  const [show, setShow] = React.useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <p className="tools-used-link" onClick={handleShow}>
        Tools Used
      </p>

  <Modal show={show} onHide={handleClose} dialogClassName="policy-modal">
  <Modal.Header >
    <Modal.Title>Tools Used</Modal.Title>
  </Modal.Header>
  <Modal.Body>
  <div className="grid-container">
    <div className="grid-item js animate__animated animate__fadeInUp">
      <div className="grid-item-text text-center">
        <FontAwesomeIcon icon={faJs} size="3x" />
        <h5 className='text-center'>JavaScript</h5>
        <p>Frontend & Backend language</p>
      </div>
    </div>
    <div className="grid-item animate__animated animate__flipInX">
      <div className="grid-item-text text-center">
        <FontAwesomeIcon icon={faReact} size="3x" />
        <h5 className='text-center'>React</h5>
        <p>Frontend Framework</p>
      </div>
    </div>
    <div className="grid-item animate__animated animate__fadeInLeft">
      <div className="grid-item-text text-center">
        <FontAwesomeIcon icon={faNode} size="3x" style={{color:"#68A063 !important"}} />
        <h5 className='text-center'>Node.js</h5>
        <p>Backend Framework</p>
      </div>
    </div>
    <div className="grid-item animate__animated animate__fadeInRight d-flex justify-content-center">
      <div className="grid-item-text text-center">
         <SiMongodb size="35%"/>
        <h5 className='text-center'>MongoDB</h5>
        <p>NoSQL Database</p>
      </div>
    </div>
      <div className="grid-item animate__animated animate__bounceIn d-flex justify-content-center">
          <div className="grid-item-text text-center">
            <SiSocketdotio size="25%" /> 
            <h5 className='text-center'>Socket.io</h5>
            <p>Real-time Communication Library</p>
          </div>
      </div>
    <div className="grid-item animate__animated animate__zoomIn justify-content-center">
      <div className="grid-item-text text-center">
        <SiBootstrap size="25%"/>
        <h5 className='text-center'>Bootstrap</h5>
        <p>Frontend Framework</p>
      </div>
    </div>
    <div className="grid-item animate__animated animate__rotateInDownRight justify-content-center">
      <div className="grid-item-text text-center">
        <SiGithub size="25%"/>
        <h5 className='text-center'>GitHub</h5>
        <p>Version Control System</p>
      </div>
    </div>
    <div className="grid-item animate__animated animate__fadeInDown justify-content-center">
      <div className="grid-item-text text-center">
        <SiExpress size="25%"/>
        <h5 className='text-center'>Express</h5>
        <p>Backend Framework</p>
      </div>
    </div>
    <div className="grid-item animate__animated animate__fadeInDown justify-content-center">
      <div className="grid-item-text text-center">
        <SiJsonwebtokens size="25%"/>
        <h5 className='text-center'>JWT</h5>
        <p>JSON Web Tokens for Authentication</p>
      </div>
    </div>
    <div className="grid-item animate__animated animate__fadeInDown justify-content-center">
      <div className="grid-item-text text-center">
        <SiSlack size="25%"/>
        <h5 className='text-center'>Slack</h5>
        <p>Team Collaboration Tool</p>
      </div>
    </div>
    <div className="grid-item animate__animated animate__fadeInDown justify-content-center">
  <div className="grid-item-text text-center">
    <SiTrello size="25%"/>
    <h5 className="text-center">Trello</h5>
    <p>Collaborative Task Management Tool</p>
  </div>
</div>
  </div>
</Modal.Body>
  <Modal.Footer>
    <Button variant="secondary" onClick={handleClose}>
      Close
    </Button>
  </Modal.Footer>
</Modal>

    </>
  );
};

export default ToolsUsed;
