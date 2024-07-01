import { useState, useEffect } from "react";

const UseMediaQuery = (query: string): boolean => {
  const [matches, setMatches] = useState<boolean>(false);

  useEffect(() => {
    const media: MediaQueryList = window.matchMedia(query);

    const updateMatches = () => {
      if (media.matches !== matches) {
        setMatches(media.matches);
      }
    };

    // Initial check
    updateMatches();

    const listener = () => {
      updateMatches();
    };

    // Add listener
    media.addEventListener("change", listener);

    // Clean up listener
    return () => media.removeEventListener("change", listener);
  }, [matches, query]);

  return matches;
};

export default UseMediaQuery;
