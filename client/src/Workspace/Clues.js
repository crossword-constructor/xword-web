import React from "react";
import { Aux } from "../Shared";
import styles from "./Clues.module.css";
export default ({ clues, currentClue, setClue }) => {
  return (
    <Aux>
      <ul className={styles.acrossClues}>
        {clues
          .filter(clue => clue.position.indexOf("A") > -1)
          .map(clue => (
            <li
              onClick={() => setClue(clue.position)}
              className={
                currentClue === clue.position ? styles.highlighted : styles.clue
              }
            >
              <span style={{ fontWeight: 600 }}>{clue.position}</span>{" "}
              {clue.clue}
            </li>
          ))}
      </ul>
      <ul className={styles.downClues}>
        {clues
          .filter(clue => clue.position.indexOf("D") > -1)
          .map(clue => (
            <li
              onClick={() => setClue(clue.position)}
              className={
                currentClue === clue.position ? styles.highlighted : styles.clue
              }
            >
              <span style={{ fontWeight: 600 }}>{clue.position}</span>{" "}
              {clue.clue}
            </li>
          ))}
      </ul>
    </Aux>
  );
};
