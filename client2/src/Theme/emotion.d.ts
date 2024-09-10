import '@emotion/react';

declare module '@emotion/react' {
  export interface Theme {
    sizes: {
      s0: number;
      s1: number;
      s2: number;
      s3: number;
      s4: number;
      s5: number;
      s6: number;
      s7: number;
      s8: number;
      s9: number;
      s10: number;
      s11: number;
      s12: number;
      NAV_HEIGHT: number;
    };
  }
}

declare module '@emotion/react' {
  export interface Theme extends LibTheme {}
}
