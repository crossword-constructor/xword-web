import React, { useState } from 'react';
import styled from '@emotion/styled';
import {
  useNavigate,
  createSearchParams,
  useSearchParams,
} from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { Month } from './Month';
// import YearList from './YearList';
// import Dropdown from './Dropdown';
import { FETCH_PUZZLES } from './calendar.gql';
import { Select, MenuItem, Button, FormControl } from '@mui/material';
import { Box } from '../Common/Atoms';
import { monthMap } from '../Utils/calendar';
// import { monthMap, numberMonth, buildYearsArr } from './utils';

export const Calendar = () => {
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const month = parseInt(searchParams.get('month') as string, 10);
  const year = parseInt(searchParams.get('year') as string, 10);

  const { data, refetch } = useQuery(FETCH_PUZZLES, {
    variables: {
      month,
      year,
    },
  });

  const handleMonthChange = (e: any) => {
    navigate(`/calendar?month=${e.target.value}&year=${year}`);
    // refetch({ month: e.target.value, year });
  };

  const handleYearChange = (e: any) => {
    navigate(`/calendar?month=${month}&year=${e.target.value}`);
    // refetch({ month, year: e.target.value });
  };

  return (
    <Box>
      <DatePicker>
        <Select
          value={month}
          labelId="month"
          label="Month"
          renderValue={(value) => monthMap[value.toString()]}
          onChange={handleMonthChange}
        >
          {Object.keys(monthMap).map((month) => (
            <MenuItem key={month} value={month}>
              {monthMap[month]}
            </MenuItem>
          ))}
        </Select>
        <Select
          value={year}
          labelId="year"
          label="Year"
          onChange={handleYearChange}
        >
          {/* @TODO get year options based on published (NYT goes back to 1942) */}
          {new Array(2025 - 1942)
            .fill('')
            .map((year, i) => (
              <MenuItem key={i} value={(1942 + i).toString()}>
                {(1942 + i).toString()}
              </MenuItem>
            ))
            .reverse()}
        </Select>
      </DatePicker>
      <Month puzzles={data?.getPuzzlesByMonth} month={month} year={year} />
    </Box>
  );
};

const DatePicker = styled.div`
  display: flex;
  padding: ${({ theme }) => theme.sizes.s4}rem;
  > :first-child {
    margin-right: ${({ theme }) => theme.sizes.s6}rem;
  }
`;
