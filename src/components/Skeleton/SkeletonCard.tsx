import React from "react";
export const SkeletonCard = () => (
  <div className="rounded-lg border border-gray-700 bg-gray-800 animate-pulse overflow-hidden">
    <div className="h-60 bg-gray-700"></div> {/* image */}
    <div className="p-3 space-y-2">
      <div className="h-4 bg-gray-600 rounded w-3/4"></div> {/* title */}
      <div className="h-3 bg-gray-600 rounded w-1/2"></div> {/* author */}
      <div className="h-4 bg-gray-700 rounded w-1/4 ml-auto"></div>{" "}
    </div>
  </div>
);
