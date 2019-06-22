import React, { useState } from 'react';
import Stack from '../Layouts/Stack';
import styles from './ConstructedPreview.module.css';
import Sidebar from '../Layouts/Sidebar';
import Create from '../Create/Create';

const ConstructedPreview = () => {
  const [isConstructing, setIsConstructing] = useState(false);

  return (
    <>
      <div className={styles.Container}>
        <Stack>
          <h3 className={styles.Title}>Constructed Puzzles</h3>
          <Sidebar sideBar={<div>Statys</div>} mainContent={<div>Graph</div>} />
          <div>
            <button
              onClick={() => setIsConstructing(!isConstructing)}
              type="button"
            >
              New
            </button>
          </div>
        </Stack>
      </div>
      {isConstructing ? (
        <Create close={() => setIsConstructing(false)} />
      ) : null}
    </>
  );
};

export default ConstructedPreview;
