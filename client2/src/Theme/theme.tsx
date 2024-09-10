import { createTheme } from '@mui/material/styles';

const ratio = 1.61803398875;
const baseSize = 1.5;
const black = '';
const blue = '';
export const defaultTheme = createTheme({
  // colors: {
  //   primary: 'hotpink',
  // },
  // palette: {
  //   primary: {
  //     main: '#fff'
  //   }
  // },
  sizes: {
    s0: baseSize / ratio / ratio / ratio / ratio / ratio / ratio,
    s1: baseSize / ratio / ratio / ratio / ratio / ratio,
    s2: baseSize / ratio / ratio / ratio / ratio,
    s3: baseSize / ratio / ratio / ratio,
    s4: baseSize / ratio / ratio,
    s5: baseSize / ratio,
    s6: baseSize,
    s7: baseSize * ratio,
    s8: baseSize * ratio * ratio,
    s9: baseSize * ratio * ratio * ratio,
    s10: baseSize * ratio * ratio * ratio * ratio,
    s11: baseSize * ratio * ratio * ratio * ratio * ratio,
    s12: baseSize * ratio * ratio * ratio * ratio * ratio * ratio,
    NAV_HEIGHT: baseSize * ratio * ratio,
  },
  components: {
    MuiSelect: {
      styleOverrides: {
        root: {
          color: 'black',
          height: 30,
          '&.MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: '#999',
            },
            '&:hover fieldset': {
              borderColor: 'blue',
            },
            '&.Mui-focused fieldset': {
              borderColor: 'blue',
            },
          },
          legend: {
            width: 0,
          },
        },
        // select: {
        //   '&:focus': {
        //     background: 'red',
        //     outline: 'none',
        //     borderColor: 'red'
        //   },

        // },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          color: 'black',
        },
      },
    },
  },
});
