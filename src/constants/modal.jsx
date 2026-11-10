
import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import "./Modal.css";

const Modal = ({ children, onClose }) => {
  const elRef = useRef(null);

  if (!elRef.current) {
    elRef.current = document.createElement("div");
  }

  useEffect(() => {
    const modalRoot = elRef.current;
    document.body.appendChild(modalRoot);

    // Prevent background scrolling
    document.body.style.overflow = "hidden";

    return () => {
      document.body.removeChild(modalRoot);
      document.body.style.overflow = "";
    };
  }, []);

  return createPortal(
    <div className="modal-overlay">
      <div
        className="modal-container"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        <button
          className="modal-close"
          onClick={onClose}
          aria-label="Close modal"
        >
          &times;
        </button>

        {children}
      </div>
    </div>,
    elRef.current
  );
};

export default Modal;
