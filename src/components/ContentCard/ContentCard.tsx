import React from "react";
import { ContentItem } from "../../constants/types";

type ContentCardProps = {
  contentCard: ContentItem;
};

export default function ContentCard({ contentCard }: ContentCardProps) {
  const { title, creator, price, imagePath, pricingOption } = contentCard;

  const getPriceLabel = () => {
    switch (pricingOption) {
      case 1:
        return "Free";
      case 2:
        return "View Only";
      default:
        return `$${price}`;
    }
  };

  return (
    <div className="bg-black text-white rounded-md overflow-hidden shadow-md border border-gray-700">
      <img src={imagePath} alt={title} className="w-full h-60 object-cover" />
      <div className="flex justify-between p-3">
        <div>
          <div className="text-sm">{title}</div>
          <div className="text-xs text-gray-400">{creator}</div>
        </div>
        <div className=" text-right font-semibold text-white">
          {getPriceLabel()}
        </div>
      </div>
    </div>
  );
}
