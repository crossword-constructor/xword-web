import React from 'react';
import styles from './Board.module.css';
import Board from './Board';

const initialBoard = [];
for (let i = 0; i < 15; i += 1) {
  const row = [];
  for (let x = 0; x < 15; x += 1) {
    row.push(' ');
  }
  initialBoard.push(row);
}

const Workspace = () => {
  const currentClue = '1A';
  const setClue = () => '1D';

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <Board
          initialBoard={initialBoard}
          currentClue={currentClue}
          setClue={setClue}
          construct
        />
        <div className={styles.clues}>
          <textarea width={600} height={400} />
          {/* <Clues clues={[]} setClue={setClue} currentClue={currentClue} /> */}
        </div>
      </div>
    </div>
  );
};

export default Workspace;
