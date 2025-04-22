"use client";

import React, { useState, useMemo } from "react";
import Modal from "react-modal";
import { Food, Cat, Shelter, catIds, shelters } from "./upgrade";
import { Auto, Load, Save } from "./save";
import { Item } from "./minigame";
import { Stats } from "./stats";
import { ReadoutsProvider } from "./console";
import { moneySpent, stickyBalance } from "./balance";
import { AchievementsProvider } from "./achievementsContext";
import { AchievementMenu } from "./achievementsMenu";

const Navbar = () => {
  const [isModal, setIsOpen] = useState<string | null>(null);
  const [showAchievements, setShowAchievements] = useState(false);

  const openModal = (popName: string) => setIsOpen(popName);
  const closeModal = () => setIsOpen(null);

  type Stats = {
    moneyMade: number;
    catsOwned: number;
    sheltersOwned: number;
    moneySpent: number;
  };

  const stats: Stats = useMemo(() => {
    return {
      moneyMade: stickyBalance,
      catsOwned: catIds,
      sheltersOwned: shelters,
      moneySpent: moneySpent,
    };
  }, [stickyBalance, catIds, shelters, moneySpent]);

  return (
    <AchievementsProvider stats={stats}>
      <div>
        <nav className="flex justify-center gap-4 outline-solid outline-2 outline-foreground">
          <button onClick={() => openModal("cat-alog")}>Cat-alog</button>
          <button onClick={() => openModal("lostItems")}>Lost Items</button>
          <button onClick={() => openModal("settings")}>Settings</button>
        </nav>

        <Modal
          isOpen={isModal === "cat-alog"}
          onRequestClose={closeModal}
          ariaHideApp={false}
          className="modal-content"
          overlayClassName={"modal-overlay"}
        >
          <div className="flex justify-center gap-10">
            <h2 className="text-center">Cat-alog</h2>
            <button onClick={closeModal}>Close</button>
          </div>
          <p>This is the cat-alog pop-up!</p>
          <ReadoutsProvider>
            <Food />
            <br />
            <Cat />
            <br />
            <Shelter />
          </ReadoutsProvider>
        </Modal>

        <Modal
          isOpen={isModal === "lostItems"}
          onRequestClose={closeModal}
          ariaHideApp={false}
          className="modal-content"
          overlayClassName={"modal-overlay"}
        >
          <div className="flex justify-center gap-10">
            <h2 className="text-center">Lost Items</h2>
            <button onClick={closeModal}>Close</button>
          </div>
          <p>This is the lost items pop-up!</p>
          <div className="flex justify-center gap-10" style={{ width: "100%", maxWidth: "600px" }}>
            <Item />
          </div>
        </Modal>

        <Modal
          isOpen={isModal === "settings"}
          onRequestClose={closeModal}
          ariaHideApp={false}
          className="modal-content"
          overlayClassName={"modal-overlay"}
        >
          <div className="flex justify-center gap-10">
            <h2 className="text-center">Settings</h2>
            <button onClick={closeModal}>Close</button>
          </div>
          <p>This is the settings pop-up!</p>
          <div className="flex flex-col items-center gap-4">
            <button onClick={() => setShowAchievements(true)}>
              Show Achievements
            </button>
            {showAchievements && (
              <AchievementMenu onClose={() => setShowAchievements(false)} />
            )}
            <div className="flex gap-4 justify-center">
              <Save />
              <Load />
            </div>
          </div>

          <br />
          <Stats />
        </Modal>
      </div>
    </AchievementsProvider>
  );
};

export default Navbar;
