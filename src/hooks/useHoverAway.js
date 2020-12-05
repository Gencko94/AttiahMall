import { useEffect } from 'react';

const useHoverAway = (ref, cb) => {
  const handleClick = e => {
    if (ref.current && !ref.current.contains(e.target)) {
      cb();
    }
  };
  useEffect(() => {
    document.addEventListener('mouseout', handleClick);
    return () => {
      document.removeEventListener('mouseout', handleClick);
    };
  });
};

export default useHoverAway;
