"use client";

import { useState } from "react";
import Modal from 'react-modal';

const Navbar = () => {

    const [isModal, setIsOpen] = useState<string | null>(null);
    const openModal = (popName: string) => setIsOpen(popName);
    const closeModal = () => setIsOpen(null);
    
    return (
      <div>
        <nav className="flex justify-center gap-4 outline-solid outline-2 outline-foreground">
          <button onClick={() => openModal("cat-alog")}>Cat-alog</button>
          <button onClick={() => openModal("settings")}>Settings</button>
        </nav>
        <Modal isOpen={isModal === "cat-alog"} onRequestClose={closeModal} ariaHideApp={false}
        className="modal-content" overlayClassName={"modal-overlay"}>
          <h2 className="text-center">Cat-alog</h2>
          <p>This is the cat-alog pop-up!</p>
          <button onClick={closeModal}>Close</button>
        </Modal>
        <Modal isOpen={isModal === "settings"} onRequestClose={closeModal} ariaHideApp={false}
        className="modal-content" overlayClassName={"modal-overlay"}>
          <h2 className="text-center">Settings</h2>
          <p>This is the settings pop-up!</p>
          <button onClick={closeModal}>Close</button>
        </Modal>
      </div>
    );
  }

export default Navbar;
