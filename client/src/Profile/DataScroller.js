import React, { useState, useRef, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import PuzzleIcon from '../Shared/PuzzleIcon';
import usePrevious from '../Hooks/usePrevious';
import styles from './DataScroller.module.css';

// "globals" for recursive requestAnimationFrame
let start = null;
let progress = null;
let right = true;

const DataScroller = ({ data, fetchMore, dataLength }) => {
  const [[shouldDisplayPrev, shouldDisplayNext], displayArrows] = useState([
    false,
    false,
  ]);

  useEffect(() => {
    shouldDisplayArrows();
  }, []); // I feel like this is fine...I dont wanna have to wrap everything in useCalleback

  const scrollRef = useRef(null);
  const animateScroll = useCallback(timestamp => {
    if (!start) start = timestamp;
    progress = timestamp - start;
    if (right) {
      scrollRef.current.scrollLeft += 0.175 * progress;
    } else {
      scrollRef.current.scrollLeft -= 0.175 * progress;
    }
    if (progress < 500) {
      window.requestAnimationFrame(animateScroll);
    }
  }, []);

  /**
   * @function scrollOne
   * @param  {Number}  direction - 1 for right -1 for left
   */
  const scrollOne = useCallback(
    direction => {
      if (direction === 'left') {
        right = false;
      } else {
        right = true;
      }
      // scrollRef.current.scrollLeft =
      //   scrollRef.current.getBoundingClientRect().width * direction;
      progress = null;
      start = null;
      window.requestAnimationFrame(animateScroll);
    },
    [animateScroll]
  );

  /**
   * @function next
   * scrolls if it can. Fecthes more data if it cant
  
   */
  const next = () => {
    const { clientWidth, scrollWidth, scrollLeft } = scrollRef.current;
    if (scrollWidth - clientWidth !== scrollLeft) {
      scrollOne(1);
    } else if (data.length < dataLength) {
      fetchMore();
    }
  };

  const previousData = usePrevious(data);
  useEffect(() => {
    if (previousData) {
      if (data.length !== previousData.length) {
        // perhaps we should check if we have MORE data and not just that its binding has changed
        // but it really only should update if we fetch more...for now
        scrollOne(1);
      }
    }
  }, [data, scrollOne, previousData]);

  const shouldDisplayArrows = () => {
    let shouldDisPr;
    let shouldDisNe;
    const { clientWidth, scrollWidth, scrollLeft } = scrollRef.current;
    if (data.length < dataLength || scrollWidth - clientWidth !== scrollLeft) {
      shouldDisNe = true;
    } else {
      shouldDisNe = false;
    }
    if (scrollRef.current.scrollLeft === 0) {
      shouldDisPr = false;
    } else {
      shouldDisPr = true;
    }

    if (
      shouldDisNe !== shouldDisplayNext ||
      shouldDisPr !== shouldDisplayPrev
    ) {
      displayArrows([shouldDisPr, shouldDisNe]);
    }
    // if (scrollRef.current.scrollLeft === parentRef.container.outerWidth)
  };

  const mouseWheelListener = e => {
    const rawData = e.deltaY ? e.deltaY : e.deltaX;
    const mouseY = Math.floor(rawData) / 5;
    scrollRef.current.scrollLeft += mouseY;
  };

  return (
    <div className={styles.container}>
      <div
        className={styles.puzzleRow}
        ref={scrollRef}
        onScroll={shouldDisplayArrows}
        onWheel={mouseWheelListener}
      >
        {/* {this is assuming the data is always puzzle related...if this component becomes more general purpose
  require another prop describing the kind of data so we know which icons to render */
        data.map(p => {
          return (
            <div className={styles.puzzle} key={p._id}>
              <PuzzleIcon
                id={p.puzzle._id}
                date={p.puzzle.date}
                fillPercent={0}
                size={50}
              />
            </div>
          );
        })}
        {shouldDisplayPrev ? (
          <div
            className={styles.prev}
            onClick={() => scrollOne('left')}
            onKeyUp={event =>
              event.key === 'Enter' ? scrollOne('left') : null
            }
            role="button"
            tabIndex="0"
          >
            <i className="fas fa-chevron-left" />
          </div>
        ) : null}
        {shouldDisplayNext ? (
          <div
            className={styles.next}
            onClick={next}
            onKeyUp={event =>
              event.key === 'Enter' ? scrollOne('right') : null
            }
            role="button"
            tabIndex="0"
          >
            <i className="fas fa-chevron-right" />
          </div>
        ) : null}
      </div>
    </div>
  );
};

DataScroller.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  fetchMore: PropTypes.func.isRequired,
  dataLength: PropTypes.number.isRequired,
};

export default DataScroller;
