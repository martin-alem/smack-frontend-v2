import React from "react";
import "./Modal.css";

function Modal(props) {
  const { children, showClose, opened } = props;
  const overlayRef = React.useRef();
  const modalRef = React.useRef();
  const toggleModal = () => {
    overlayRef.current.classList.toggle("hide");
    modalRef.current.classList.toggle("hide");
  };
  return (
    <>
      <div ref={overlayRef} className={opened ? `Modal-overlay` : `Modal-overlay hide`}></div>
      <div ref={modalRef} className={opened ? `Modal` : `Modal hide`}>
        {showClose ? (
          <span onClick={toggleModal} className="material-icons-outlined">
            close
          </span>
        ) : null}

        <div className="Modal-content">{children}</div>
      </div>
    </>
  );
}

export default Modal;
