import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCopy,
  faEnvelope,
  faShareSquare,
} from "@fortawesome/free-solid-svg-icons";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";

export default function SharePost({ url, user, title, description }) {
  const [isShareOpen, setIsShareOpen] = useState(false);
  const modalRef = useRef(null);

  // const shareOnFacebook = () => {
  //   const message = `Check out this question on Matrix-Master Community: ${title}\n\n${description}`;
  //   const urlWithMessage = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
  //     url
  //   )}&quote=${encodeURIComponent(message)}`;
  //   window.open(urlWithMessage);
  // };

  const shareOnTwitter = () => {
    window.open(`https://twitter.com/intent/tweet?url=${url}`);
  };

  const copyLink = () => {
    navigator.clipboard.writeText(url);
  };

  const shareByEmail = () => {
    const subject = `Check out this question on Matrix-Master Community: ${title}`;
    const body = `Hi,\n\nI found this question on Matrix-Master Community and thought you might find it interesting:\n\nTitle: ${title}\nDescription: ${description}\nAsked by: ${user}\n\n${url}`;
    window.location.href = `mailto:?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setIsShareOpen(false);
      }
    };
    window.addEventListener("click", handleClickOutside);
    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, [modalRef]);

  return (
    <div className="share-container">
      <i onClick={() => setIsShareOpen(!isShareOpen)}>
        <FontAwesomeIcon className="icon-colored" icon={faShareSquare} />
      </i>
      {isShareOpen && (
        <div
          className="modal fade show share-modal"
          tabIndex="-1"
          role="dialog"
          style={{ display: "block" }}
          onClick={(e) => {
            if (e.target.classList.contains("share-modal")) {
              setIsShareOpen(false);
            }
          }}
        >
          <div className="modal-dialog m-0 p-0" role="document">
            <div className="modal-content">
              <div className="modal-body p-1">
                <div className="d-flex align-items-center justify-content-around">
                  {/* <div className="text-center">
                    <p
                      className="p-0 m-0"
                      onClick={shareOnFacebook}
                      data-toggle="tooltip"
                      title="Facebook"
                    >
                      <FontAwesomeIcon
                        className="icon-colored"
                        icon={faFacebook}
                      />
                    </p>
                  </div> */}
                  <div className="text-center">
                    <p
                      className="p-0 m-0"
                      onClick={shareOnTwitter}
                      data-toggle="tooltip"
                      title="Twitter"
                    >
                      <FontAwesomeIcon
                        className="icon-colored"
                        icon={faTwitter}
                      />
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="p-0 m-0" onClick={copyLink}>
                      <FontAwesomeIcon
                        className="icon-colored"
                        icon={faCopy}
                        data-toggle="tooltip"
                        title="Copy Link"
                      />
                    </p>
                  </div>
                  <div className="text-center">
                    <p
                      className="p-0 m-0"
                      onClick={shareByEmail}
                      data-toggle="tooltip"
                      title="Email"
                    >
                      <FontAwesomeIcon
                        className="icon-colored"
                        icon={faEnvelope}
                      />
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
