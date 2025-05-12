'use client';
import React, { createContext, useContext, useState, useEffect, ReactNode, } from "react";

export type Stats = {
  moneyMade: number;
  catsOwned: number;
  sheltersOwned: number;
  moneySpent: number;
};

export type Achievement = {
  id: string;
  name: string;
  description: string;
  icon?: string;
  check: (stats: Stats) => boolean;
};

const achievements: Achievement[] = [
    {
        id: "just_the_beginning",
        name: "Just the beginning",
        description: "Make 100 dollars",
        icon: "/file.svg",
        check: (stats) => stats.moneyMade >= 100,
      },
      {
        id: "your_new_friend",
        name: "Your new friend",
        description: "Own 1 cat",
        icon: "/file.svg",
        check: (stats) => stats.catsOwned >= 1,
      },
      {
        id: "foundations_to_a_brand_new_start",
        name: "Foundations to a brand new start",
        description: "Own 1 shelter",
        icon: "/file.svg",
        check: (stats) => stats.sheltersOwned >= 1,
      },
      {
        id: "cat_collector",
        name: "Cat Collector",
        description: "Own 10 cats",
        icon: "/file.svg",
        check: (stats) => stats.catsOwned >= 10,
      },
      {
        id: "shelter_builder",
        name: "Shelter Builder",
        description: "Own 5 shelters",
        icon: "/file.svg",
        check: (stats) => stats.sheltersOwned >= 5,
      },
      {
        id: "wealthy_cat_owner",
        name: "Wealthy Cat Owner",
        description: "Make 1,000 dollars",
        icon: "/file.svg",
        check: (stats) => stats.moneyMade >= 1000,
      },
      {
        id: "feline_fortune",
        name: "Feline Fortune",
        description: "Make 10,000 dollars",
        icon: "/file.svg",
        check: (stats) => stats.moneyMade >= 10000,
      },
      {
        id: "shelter_manager",
        name: "Shelter Manager",
        description: "Own 10 shelters",
        icon: "/file.svg",
        check: (stats) => stats.sheltersOwned >= 10,
      },
      {
        id: "cat_whisperer",
        name: "Cat Whisperer",
        description: "Have 50 cats in total",
        icon: "/file.svg",
        check: (stats) => stats.catsOwned >= 50,
      },
      {
        id: "big_spender",
        name: "Big Spender",
        description: "Spend 5,000 dollars on cats and shelters",
        icon: "/file.svg",
        check: (stats) => stats.moneySpent >= 5000,
      },
      {
        id: "feline_fortune_2",
        name: "Feline Fortune 2",
        description: "Make 100,000 dollars",
        icon: "/file.svg",
        check: (stats) => stats.moneyMade >= 100000,
      },
      {
        id: "cat_hoarder",
        name: "Cat Hoarder",
        description: "Own 100 cats",
        icon: "/file.svg",
        check: (stats) => stats.catsOwned >= 100,
      },
      {
        id: "shelter_empire",
        name: "Shelter Empire",
        description: "Own 20 shelters",
        icon: "/file.svg",
        check: (stats) => stats.sheltersOwned >= 20,
      },
];

type AchievementsContextType = {
  unlocked: Set<string>;
  unlockAchievement: (id: string) => void;
  restoreAchievements: (ids: string[]) => void;
  achievements: Achievement[];
};

const AchievementsContext = createContext<AchievementsContextType | undefined>(
  undefined
);

export function AchievementsProvider({
  children,
  stats,
}: {
  children: ReactNode;
  stats: Stats;
}) {
  const [unlocked, setUnlocked] = useState<Set<string>>(new Set());

  // Check for new achievements whenever stats change
  useEffect(() => {
    const newlyUnlocked = achievements.filter(
      (ach) => ach.check(stats) && !unlocked.has(ach.id)
    );

    if (newlyUnlocked.length > 0) {
      setUnlocked((prev) => {
        const updated = new Set(prev);
        newlyUnlocked.forEach((ach) => {
          updated.add(ach.id);
          alert(`Achievement unlocked: ${ach.name}`);
        });
        return updated;
      });
    }
  }, [stats, unlocked]);

  // Function to unlock achievement manually (e.g. on load)
  function unlockAchievement(id: string) {
    setUnlocked((prev) => new Set(prev).add(id));
  }

  // Restore unlocked achievements from saved data
  function restoreAchievements(ids: string[]) {
    setUnlocked(new Set(ids));
  }

  return (
    <AchievementsContext.Provider
      value={{ unlocked, unlockAchievement, restoreAchievements, achievements }}
    >
      {children}
    </AchievementsContext.Provider>
  );
}

export function useAchievements() {
  const context = useContext(AchievementsContext);
  if (!context) {
    throw new Error(
      "useAchievements must be used within an AchievementsProvider"
    );
  }
  return context;
}
