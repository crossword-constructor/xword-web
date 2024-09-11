import { useState, useEffect } from 'react';

const useKeyDownMap = () => {
  const [keyDownMap, setKeyDownMap] = useState({});

  useEffect(() => {
    const registerKeydown = event => {
      const map = { ...keyDownMap };
      map[event.key] = true;
      setKeyDownMap(map);
    };

    const unregisterKeydown = event => {
      const map = { ...keyDownMap };
      delete map[event.key];
      setKeyDownMap(map);
    };
    document.addEventListener('keydown', registerKeydown);
    document.addEventListener('keyup', unregisterKeydown);
  }, [keyDownMap]);

  return keyDownMap;
};

export default useKeyDownMap;
