import { useState, useEffect } from "react";

export const usePageControl = (currentPage, pagesLength) => {
  const [positionCSS, setPositionCSS] = useState<string>("");
  const [showNext, setShowNext] = useState<Boolean | null>(null);
  const [showPrevious, setShowPrevious] = useState<Boolean | null>(null);
  const [showSubmit, setShowSubmit] = useState<Boolean | null>(null);

  const positionButtons = () => {
    if (currentPage === 0) {
      return "flex-end";
    } else if (currentPage === pagesLength - 1) {
      return "flex-start";
    } else {
      return "space-between";
    }
  };

  useEffect(() => {
    if (pagesLength - 1 !== currentPage) {
      setShowNext(true);
      setShowSubmit(false);
    } else {
      setShowNext(false);
      setShowSubmit(true);
    }

    if (currentPage === 0) {
      setShowPrevious(false);
    } else {
      setShowPrevious(true);
    }

    setPositionCSS(positionButtons());
  }, [currentPage, pagesLength]);

  return { positionCSS, showNext, showPrevious, showSubmit };
};
