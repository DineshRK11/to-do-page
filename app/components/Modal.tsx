import React from "react";

interface ModalProps {
  modalOpen: boolean | undefined;
  setModalOpen: (open: boolean) => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ modalOpen, setModalOpen, children }) => {
  return (
    <dialog id="my_modal_3" className="modal" open={modalOpen}>
      <div className="modal-box">
        <form method="dialog">
          <button
            onClick={() => setModalOpen(false)}
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          >
            ✕
          </button>
        </form>
        {children}
      </div>
    </dialog>
  );
};

export default Modal;
