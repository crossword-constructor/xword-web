import React from "react";
import { buildMonth } from "./utils";
import { Link } from "react-router-dom";
import styles from "./Month.module.css";
const Month = ({ puzzles, month, year }) => {
  // return <div>{puzzles.map(puzzle => puzzle.title)}</div>;
  // FOr the first few years of the NYT crossword puzzle the puzzle was only published on sunday.
  // For these months we need to construct the days of the month and then figure out which puzzle goes where
  // in the array of dates
  //
  // For puzzles after 1952 we have a puzzle for every day of the week until the present day without exception
  // so for those years (which is most) we can just iterate over the list of puzzles
  let days = buildMonth(month, year);
  let puzzleDates = puzzles.map(puzzle => puzzle.date);

  return (
    <ul className={styles.month}>
      {days.map((day, i) => {
        console.log(day);
        if (puzzleDates.indexOf(day.date) > -1) {
          let index = puzzleDates.indexOf(day.date);
          return (
            <ul className={styles.day}>
              <li>
                <div>{day.number}</div>
                <Link to={`solve/${puzzles[index].id}`}>
                  <span>{puzzles[index].title}</span>
                  <div>{puzzles[index].author}</div>
                </Link>
              </li>
            </ul>
          );
        } else
          return (
            <div className={day.number ? styles.day : styles.dayHeading}>
              {day.number || day}
            </div>
          );
      })}
    </ul>
  );
  //   <div class="wrapper">
  //     <main>
  //     <div class="toolbar">
  //       <div class="current-month">June 2016</div>
  //       <div class="search-input">
  //         <input type="text" value="What are you looking for?" />
  //         <i class="fa fa-search"></i>
  //       </div>
  //     </div>
  //     <div class="calendar">
  //       <div class="calendar__header">
  //         <div>mon</div>
  //         <div>tue</div>
  //         <div>wed</div>
  //         <div>thu</div>
  //         <div>fri</div>
  //         <div>sat</div>
  //         <div>sun</div>
  //       </div>
  //       <div class="calendar__week">
  //         <div class="calendar__day day">1</div>
  //         <div class="calendar__day day">2</div>
  //         <div class="calendar__day day">3</div>
  //         <div class="calendar__day day">4</div>
  //         <div class="calendar__day day">5</div>
  //         <div class="calendar__day day">6</div>
  //         <div class="calendar__day day">7</div>
  //       </div>
  //       <div class="calendar__week">
  //         <div class="calendar__day day">8</div>
  //         <div class="calendar__day day">9</div>
  //         <div class="calendar__day day">10</div>
  //         <div class="calendar__day day">11</div>
  //         <div class="calendar__day day">12</div>
  //         <div class="calendar__day day">13</div>
  //         <div class="calendar__day day">14</div>
  //       </div>
  //       <div class="calendar__week">
  //         <div class="calendar__day day">15</div>
  //         <div class="calendar__day day">16</div>
  //         <div class="calendar__day day">17</div>
  //         <div class="calendar__day day">18</div>
  //         <div class="calendar__day day">19</div>
  //         <div class="calendar__day day">20</div>
  //         <div class="calendar__day day">21</div>
  //       </div>
  //       <div class="calendar__week">
  //         <div class="calendar__day day">22</div>
  //         <div class="calendar__day day">23</div>
  //         <div class="calendar__day day">24</div>
  //         <div class="calendar__day day">25</div>
  //         <div class="calendar__day day">26</div>
  //         <div class="calendar__day day">27</div>
  //         <div class="calendar__day day">28</div>
  //       </div>
  //       <div class="calendar__week">
  //         <div class="calendar__day day">29</div>
  //         <div class="calendar__day day">30</div>
  //         <div class="calendar__day day">31</div>
  //         <div class="calendar__day day">1</div>
  //         <div class="calendar__day day">2</div>
  //         <div class="calendar__day day">3</div>
  //         <div class="calendar__day day">4</div>
  //       </div>
  //     </div>
  //   </main>
  //     <sidebar>
  //     <div class="logo">logo</div>
  //     <div class="avatar">
  //       <div class="avatar__img">
  //         <img src="https://picsum.photos/70" alt="avatar">
  //       </div>
  //       <div class="avatar__name">John Smith</div>
  //     </div>
  //     <nav class="menu">
  //       <a class="menu__item" href="#">
  //         <i class="menu__icon fa fa-home"></i>
  //         <span class="menu__text">overview</span>
  //       </a>
  //       <a class="menu__item" href="#">
  //         <i class="menu__icon fa fa-envelope"></i>
  //         <span class="menu__text">messages</span>
  //       </a>
  //       <a class="menu__item" href="#">
  //         <i class="menu__icon fa fa-list"></i>
  //         <span class="menu__text">workout</span>
  //       </a>
  //       <a class="menu__item menu__item--active" href="#">
  //         <i class="menu__icon fa fa-calendar"></i>
  //         <span class="menu__text">calendar</span>
  //       </a>
  //       <a class="menu__item" href="#">
  //         <i class="menu__icon fa fa-bar-chart"></i>
  //         <span class="menu__text">goals</span>
  //       </a>
  //       <a class="menu__item" href="#">
  //         <i class="menu__icon fa fa-trophy"></i>
  //         <span class="menu__text">achivements</span>
  //       </a>
  //       <a class="menu__item" href="#">
  //         <i class="menu__icon fa fa-sliders"></i>
  //         <span class="menu__text">measurements</span>
  //       </a>
  //     </nav>
  //     <div class="copyright">copyright &copy; 2018</div>
  //   </sidebar>
  // </div>)
  //   </div>
  // )
};

//codepen.io/afontcu/pen/bapBxv

export default Month;
