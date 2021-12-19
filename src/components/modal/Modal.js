import React from "react";
import "./Modal.css";

function Modal(props) {
  const { children } = props;
  const overlayRef = React.useRef();
  const modalRef = React.useRef();
  const toggleModal = () => {
    overlayRef.current.classList.toggle("hide");
    modalRef.current.classList.toggle("hide");
  };
  return (
    <>
      <div ref={overlayRef} className="Modal-overlay"></div>
      <div ref={modalRef} className="Modal">
        <span onClick={toggleModal} className="material-icons-outlined">
          close
        </span>
        <div className="Modal-content">{children}</div>
      </div>
    </>
  );
}

export default Modal;
