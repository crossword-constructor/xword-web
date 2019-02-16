import React, { useState, useEffect } from "react";
import styles from "./Board.module.css";
const Cell = ({
  answer,
  number,
  guess,
  showAnswer,
  click,
  focus,
  highlighted
}) => {
  let background = "#F6F6F6";
  if (focus) {
    background = "yellow";
  } else if (highlighted) {
    background = "#a0effb";
  }
  let color = "black";
  if (showAnswer) {
    if (answer.toLowerCase() !== guess.toLowerCase()) {
      color = "red";
    }
  }
  return (
    <td onMouseDown={click} className={styles.cell}>
      <div className={styles.number}>{number}</div>
      <div
        style={{
          background,
          color
        }}
        className={styles.cellInput}
      >
        {showAnswer ? answer : guess}
      </div>
    </td>
  );
};

export default Cell;
