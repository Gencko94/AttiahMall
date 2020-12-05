import { useState, useEffect } from 'react';

export const useLazyLoadFetch = (src, page) => {
  const mapPagesToItems = {
    0: { from: 0, to: 12 },
    1: { from: 12, to: 24 },
    2: { from: 24, to: 36 },
    3: { from: 36, to: 48 },
    4: { from: 48, to: 60 },
  };
  const [relatedData, setData] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  useEffect(() => {
    if (src.length > 12) {
      const splittedArr = src.slice(
        mapPagesToItems[page].from,
        mapPagesToItems[page].to
      );
      const newData = [...relatedData, ...splittedArr];

      if (splittedArr.length < 12) {
        setData(newData);
        setHasMore(false);
      } else {
        setData(newData);
        setHasMore(true);
      }
    } else if (src.length < 12) {
      setData(src);
      setHasMore(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [src, page]);
  return [relatedData, hasMore];
};
