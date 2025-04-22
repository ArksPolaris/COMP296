// AchievementMenu.tsx
import React from "react";
import { useAchievements } from "./achievementsContext";

export function AchievementMenu({ onClose }: { onClose: () => void }) {
  const { achievements, unlocked } = useAchievements();

  return (
    <div className="achievement-menu fixed top-0 left-0 w-full h-full bg-black bg-opacity-70 flex justify-center items-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-lg w-full max-h-[80vh] overflow-y-auto">
        <h2 className="text-xl font-bold mb-4">Achievements</h2>
        <button
          className="mb-4 px-3 py-1 bg-red-500 text-white rounded"
          onClick={onClose}
        >
          Close
        </button>
        <ul className="grid grid-cols-2 gap-4 overflow-y-auto">
          {achievements.map((ach) => {
            const isUnlocked = unlocked.has(ach.id);
            return (
              <li
                key={ach.id}
                className={`flex items-center gap-3 p-2 rounded border ${
                  isUnlocked ? "border-green-500" : "border-gray-300"
                }`}
                title={ach.description}
              >
                <img
                  src={ach.icon}
                  alt={ach.name}
                  className={`w-10 h-10 ${
                    isUnlocked ? "opacity-100" : "opacity-30 grayscale"
                  }`}
                />
                <span
                  className={`font-semibold ${
                    isUnlocked ? "text-green-700" : "text-gray-500"
                  }`}
                >
                  {ach.name}
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
