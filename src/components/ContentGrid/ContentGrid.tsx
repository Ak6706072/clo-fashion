import React, { useEffect, useMemo, useRef, useState } from "react";
import ContentCard from "../ContentCard/ContentCard";
import { useGlobalContext } from "../../GlobalProvider/hooks";
import { ContentItem } from "../../constants/types";
import { SkeletonGrid } from "../Skeleton/SkeletonGrid";
import { PricingOptionEnum } from "../../constants/enums";

type ContentItemProps = {
  contentData: ContentItem[];
};

export default function ContentGrid(props: ContentItemProps) {
  const { contentData, setInGlobalContext, filterConfig } = useGlobalContext();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const lastItemRef = useRef<HTMLDivElement | null>(null);

  const fetchApiData = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(
        "https://closet-recruiting-api.azurewebsites.net/api/data"
      );
      const data = await response.json();
      setInGlobalContext({ contentData: [...(contentData || []), ...data] });
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const isFilter = (item: ContentItem) => {
    let selectedPricingOptions: number[] = [];
    if (filterConfig[PricingOptionEnum.PAID]) {
      selectedPricingOptions.push(PricingOptionEnum.PAID);
    }
    if (filterConfig[PricingOptionEnum.FREE]) {
      selectedPricingOptions.push(PricingOptionEnum.FREE);
    }
    if (filterConfig[PricingOptionEnum.VIEW_ONLY]) {
      selectedPricingOptions.push(PricingOptionEnum.VIEW_ONLY);
    }

    if (selectedPricingOptions?.length === 0) {
      selectedPricingOptions = [
        PricingOptionEnum.PAID,
        PricingOptionEnum.FREE,
        PricingOptionEnum.VIEW_ONLY,
      ];
    }

    if (
      selectedPricingOptions.includes(item.pricingOption) &&
      item.price <= filterConfig.priceRange &&
      item?.title?.toLowerCase()?.includes(filterConfig?.searchText)
    ) {
      return true;
    }

    return false;
  };

  const sortContentData = (filteredData: ContentItem[]) => {
    const data = [...filteredData];

    if (filterConfig.sortBy === "higherPrice") {
      return data.sort((a, b) => b.price - a.price);
    } else if (filterConfig.sortBy === "lowPrice") {
      return data.sort((a, b) => a.price - b.price);
    } else {
      return data.sort((a, b) => a.title.localeCompare(b.title));
    }
  };

  const filteredData = useMemo(() => {
    const filteredAugmentedData =
      contentData?.filter((item) => isFilter(item)) || [];
    const sortedData = sortContentData(filteredAugmentedData);
    return sortedData || [];
  }, [
    filterConfig[PricingOptionEnum.PAID],
    filterConfig[PricingOptionEnum.FREE],
    filterConfig[PricingOptionEnum.VIEW_ONLY],
    contentData,
    filterConfig.searchText,
    filterConfig.sortBy,
    filterConfig.priceRange,
  ]);

  useEffect(() => {
    fetchApiData();
  }, []);

  const loadMore = () => {
    fetchApiData();
  };

  useEffect(() => {
    if (!lastItemRef?.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const lastEntry = entries[0];
        if (lastEntry.isIntersecting) {
          loadMore();
        }
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 0.5,
      }
    );

    observer?.observe(lastItemRef.current);

    return () => {
      observer?.disconnect();
    };
  }, [contentData, filteredData]);

  return (
    <div className="px-4 py-6 bg-gray-900">
      <h2 className="text-green-400 font-semibold mb-4">Contents List</h2>
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredData?.map((item, index) => (
          <ContentCard key={index} contentCard={item} />
        ))}
        <div className=" h-[30px]" ref={lastItemRef}></div>

        {isLoading && <SkeletonGrid />}
      </div>
    </div>
  );
}
