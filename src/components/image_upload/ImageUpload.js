import React from "react";
import "./ImageUpload.css";
import { UserContext } from "../../context/userContext";

function ImageUpload() {
  const fileInputRef = React.useRef();

  const userContext = React.useContext(UserContext);
  const user = userContext.user;
  const { picture: Image } = user;
  const selectedImage = () => {
    fileInputRef.current.click();
  };
  return (
    <div className="ImageUpload">
      <img className="ImageUpload-image" src={Image} alt="image upload" width="250px" height="250px" />
      <input ref={fileInputRef} className="ImageUpload-input" type="file" name="image" accept="image/jpeg, image/png" />
      <span onClick={selectedImage} className="material-icons-outlined ImageUpload-upload-icon">
        add_a_photo
      </span>
    </div>
  );
}

export default ImageUpload;
