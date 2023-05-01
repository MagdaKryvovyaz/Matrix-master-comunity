import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const PrivacyPolicy = () => {
  const [show, setShow] = React.useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <p  className="tools-used-link" onClick={handleShow}>Privacy Policy</p>

      <Modal show={show} onHide={handleClose} dialogClassName="policy-modal">
        <Modal.Header closeButton>
          <Modal.Title style={{paddingLeft:"50px"}}>Privacy Policy</Modal.Title>
        </Modal.Header>
        <Modal.Body className="policy-text">
          <p>
            Matrix-Master Community respects your privacy and is committed to protecting your personal data. This privacy policy will inform you about how we collect, use, store, and protect your personal information.
          </p>

          <h5 style={{fontWeight:"bolder"}}>Information We Collect</h5>
          <p>
            We collect personal information such as your name and email address when you register as a user on our website. We use this information to provide you with our services and to communicate with you about your account.
          </p>

          <h5 style={{fontWeight:"bolder"}}>How We Protect Your Information</h5>
          <p>
            We take reasonable measures to protect your personal information from unauthorized access, use, or disclosure. We store your information on secure servers and use encryption to protect it.
          </p>
          <p>
            We also use industry-standard measures to protect your information when you transmit it to us, such as secure sockets layer (SSL) technology.
          </p>

          <h5 style={{fontWeight:"bolder"}}>Use of Your Information</h5>
          <p>
            We use your personal information to provide you with our services and to communicate with you about your account. We do not share your personal information with third parties without your consent, except as required by law or to provide you with our services.
          </p>

          <h5 style={{fontWeight:"bolder"}}>Your Rights</h5>
          <p>
            You have the right to access, correct, or delete your personal information at any time. You can do so by logging into your account and editing your profile.
          </p>

          <h5 style={{fontWeight:"bolder"}}>Changes to This Policy</h5>
          <p>
            We reserve the right to make changes to this privacy policy at any time. If we make any changes, we will notify you by email or by posting a notice on our website.
          </p>

          <h5 style={{fontWeight:"bolder"}}>Contact Us</h5>
          <p>
            If you have any questions or concerns about this privacy policy, please contact us.
          </p>
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

export default PrivacyPolicy;
