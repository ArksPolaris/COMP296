"use client";

import { useState } from "react";
import Modal from 'react-modal';
import { Food, Cat } from "./upgrade";

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
          
          <div className="flex justify-center gap-10">
            <h2 className="text-center">Cat-alog</h2>
            <button onClick={closeModal}>Close</button>
          </div>
          <p>This is the cat-alog pop-up!</p>
          <Food />
          <Cat />
        </Modal>

        <Modal isOpen={isModal === "settings"} onRequestClose={closeModal} ariaHideApp={false}
        className="modal-content" overlayClassName={"modal-overlay"}>
          <div className="flex justify-center gap-10">
            <h2 className="text-center">Settings</h2>
            <button onClick={closeModal}>Close</button>
          </div>
          <p>This is the settings pop-up!</p>
        </Modal>
      </div>
    );
  }

export default Navbar;
