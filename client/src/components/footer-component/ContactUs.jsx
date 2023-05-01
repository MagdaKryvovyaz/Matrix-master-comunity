import React from "react";
import { Modal, Button } from "react-bootstrap";
import "animate.css/animate.min.css";
import "animate.css";
import { HiOutlineMail } from "react-icons/hi";
import { IoCallSharp, IoLogoLinkedin } from "react-icons/io5";
import { IoLogoGithub } from "react-icons/io";

import magdaPhoto from "./contactImg/Magda.JPG";

const ContactUs = () => {
  const [show, setShow] = React.useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <p
        className="tools-used-link"
        variant="outline-primary"
        size="sm"
        onClick={handleShow}
      >
        Contact Us
      </p>

      <Modal show={show} onHide={handleClose} dialogClassName="policy-modal">
        <Modal.Header closeButton>
          <Modal.Title>Contact Us</Modal.Title>
        </Modal.Header>
        <Modal.Body className="contact-us-body">
          <div className="row">
            <div className="col-md-6">
              <div
                className={`contact-card animate__animated animate__fadeInUp d-flex flex-column justify-center`}
              >
                <div className="text-center">
                  <img src={magdaPhoto} alt="Magda" className="contact-photo" />
                </div>
                <div className="contact-info">
                  <h5 className="text-center">Magda Kryvovyaz</h5>
                  <p style={{ marginBottom: "20px" }} className="text-center">
                    Full Stack Developer
                  </p>
                  <p>
                    <HiOutlineMail />
                    <a
                      style={{ paddingLeft: "10px" }}
                      href="mailto:m.kryvovyaz@gmail.com"
                    >
                      m.kryvovyaz@gmail.com
                    </a>
                  </p>
                  <p>
                    <IoCallSharp />
                    <a style={{ paddingLeft: "10px" }} href="tel:+31685505603">
                      +31 (68) 550-56-03
                    </a>
                  </p>
                  <p>
                    <IoLogoGithub />
                    <a
                      style={{ paddingLeft: "10px" }}
                      target="_blank"
                      rel="noreferrer"
                      href="https://github.com/MagdaKryvovyaz"
                    >
                      github.com/MagdaKryvovyaz
                    </a>
                  </p>
                  <p>
                    <IoLogoLinkedin />
                    <a
                      style={{ paddingLeft: "10px" }}
                      target="_blank"
                      rel="noreferrer"
                      href="https://www.linkedin.com/in/magda-kryvovyaz/"
                    >
                      www.linkedin.com/in/magda-kryvovyaz
                    </a>
                  </p>
                </div>
              </div>
            </div>

            <div className="col-md-6">
              <div
                className={`contact-card animate__animated animate__fadeInDown d-flex flex-column justify-center`}
              >
                <div className="text-center">
                  <img src="/Olena.JPG" alt="Olena" className="contact-photo" />
                </div>
                <div className="contact-info">
                  <h5 className="text-center">Olena Beliavska</h5>
                  <p style={{ marginBottom: "20px" }} className="text-center">
                    Full Stack Developer
                  </p>
                  <p>
                    <HiOutlineMail />
                    <a
                      style={{ paddingLeft: "10px" }}
                      href="mailto:elenabeliavska2@gmail.com
                      "
                    >
                      elenabeliavska2@gmail.com
                    </a>
                  </p>
                  <p>
                    <IoCallSharp />
                    <a style={{ paddingLeft: "10px" }} href="tel:+31685505603">
                      +31 6 45768064
                    </a>
                  </p>
                  <p>
                    <IoLogoGithub />
                    <a
                      style={{ paddingLeft: "10px" }}
                      target="_blank"
                      rel="noreferrer"
                      href="https://github.com/mozartin"
                    >
                      github.com/mozartin
                    </a>
                  </p>
                  <p>
                    <IoLogoLinkedin />
                    <a
                      style={{ paddingLeft: "10px" }}
                      target="_blank"
                      rel="noreferrer"
                      href="https://www.linkedin.com/in/olenabeliavska/"
                    >
                     www.linkedin.com/in/olenabeliavska/
                    </a>
                  </p>
                </div>
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

export default ContactUs;
