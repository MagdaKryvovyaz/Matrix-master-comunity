import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const CookiePolicy = () => {
  const [show, setShow] = React.useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <p className="tools-used-link" onClick={handleShow}>Cookie Policy</p>

      <Modal show={show} onHide={handleClose} dialogClassName="policy-modal">
        <Modal.Header closeButton>
          <Modal.Title style={{paddingLeft:"50px"}}>Cookie Policy</Modal.Title>
        </Modal.Header>
        <Modal.Body className="policy-text">
          <p>
          Matrix-Master Community uses cookies on our website. By using our website, you consent to the use of cookies. Our Cookies Policy explains what cookies are, how we use cookies, how third-parties we may partner with may use cookies on our website, your choices regarding cookies and further information about cookies.
          </p>

          <h5 style={{fontWeight:"bolder"}}>What are cookies</h5>
          <p>
          Cookies are small pieces of text sent by your web browser by a website you visit. A cookie file is stored in your web browser and allows the website or a third-party to recognize you and make your next visit easier and the website more useful to you.
          Cookies can be "persistent" or "session" cookies. Persistent cookies remain on your personal computer or mobile device when you go offline, while session cookies are deleted as soon as you close your web browser.
          </p>

          <h5 style={{fontWeight:"bolder"}} >How Matrix-Master Community uses cookies</h5>
          <p>
          When you use and access our website, we may place a number of cookies files in your web browser. We use cookies for the following purposes: to enable certain functions of the website, to provide analytics, to store your preferences, to enable advertisements delivery, including behavioral advertising.
          </p>

          <h5 style={{fontWeight:"bolder"}}>What are your choices regarding cookies</h5>
          <p>
          If you'd like to delete cookies or instruct your web browser to delete or refuse cookies, please visit the help pages of your web browser. Please note, however, that if you delete cookies or refuse to accept them, you might not be able to use all of the features we offer, you may not be able to store your preferences, and some of our pages might not display properly.
          </p>
          <ul style={{margin:"20px"}}>
            <li>For the Chrome web browser, please visit this page from Google: <a href="https://support.google.com/accounts/answer/32050" target="_blank" rel="noopener noreferrer">https://support.google.com/accounts/answer/32050</a></li>
            <li>For the Firefox web browser, please visit this page from Mozilla: <a href="https://support.mozilla.org/en-US/kb/delete-cookies-remove-info-websites-stored" target="_blank" rel="noopener noreferrer">https://support.mozilla.org/en-US/kb/delete-cookies-remove-info-websites-stored</a></li>
            <li>For the Safari web browser, please visit this page from Apple: <a href="https://support.apple.com/guide/safari/manage-cookies-and-website-data-sfri11471/mac" target="_blank" rel="noopener noreferrer">https://support.apple.com/guide/safari/manage-cookies-and-website-data-sfri11471/mac</a></li>
            <li>For any other web browser, please visit your web browser's official web pages.</li>
          </ul>


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

export default CookiePolicy;
