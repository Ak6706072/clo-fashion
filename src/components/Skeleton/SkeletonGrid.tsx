import React from "react";
import { SkeletonCard } from "./SkeletonCard";

export const SkeletonGrid = ({ noOfCards = 12 }: { noOfCards?: number }) => {
  return (
    <>
      {Array.from({ length: noOfCards }).map((_, idx) => (
        <SkeletonCard key={idx} />
      ))}
    </>
  );
};
