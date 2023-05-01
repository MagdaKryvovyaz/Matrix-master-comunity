import React, { useState } from "react";
import baseApi from "../API";

export default function ProfilePhoto({ url }) {
  const [isImgOpen, setIsImgOpen] = useState(false);

  return (
    <>
      <div className="userPicture-big">
        <img
          alt="ptofile"
          className="img-medium"
          src={`${baseApi}/public/images/${url}`}
          onClick={() => setIsImgOpen(!isImgOpen)}
        />
      </div>
      {isImgOpen && (
        <div className="img-large-bg" onClick={() => setIsImgOpen(!isImgOpen)}>
          <img
            alt="ptofile"
            className="img-large"
            src={`${baseApi}/public/images/${url}`}
          />
        </div>
      )}
    </>
  );
}
