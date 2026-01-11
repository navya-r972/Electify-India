"use client";

import LevelShell from "@/components/learn/LevelShell";
import SwipeDeck, { type Card } from "@/components/learn/SwipeDeck";
import { useProgress } from "@/context/ProgressContext";

export default function Level4Page() {
  const { awardXP } = useProgress();

  const cards: Card[] = [
    { id: "b1", text: "Cost savings from fewer elections", type: "benefit" },
    { id: "c1", text: "Concerns about federal focus", type: "concern" },
    { id: "b2", text: "Policy continuity improves", type: "benefit" },
  ];

  const onSwipe = (_card: Card, _dir: "left" | "right") => {
    awardXP(1);
  };

  return (
    <LevelShell
      levelId="level-4"
      title="Level 4: Pros & Cons"
      prevHref="/learn/level-3"
      nextHref="/learn/level-5"
    >
      <SwipeDeck cards={cards} onSwipe={onSwipe} />
      <div className="mt-4 text-xs text-slate-600 dark:text-slate-300">
        Left = concern, Right = benefit
      </div>
    </LevelShell>
  );
}
