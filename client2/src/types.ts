import type { Theme, ThemeOptions } from '@mui/material/styles';
import '@mui/material';
declare module '@mui/material/styles' {
  interface CustomTheme extends Theme {
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
    status: {
      dange: string;
    };
  }
  // allow configuration using `createTheme`
  interface CustomThemeOptions extends ThemeOptions {
    sizes?: {
      s0?: number;
      s1?: number;
      s2?: number;
      s3?: number;
      s4?: number;
      s5?: number;
      s6?: number;
      s7?: number;
      s8?: number;
      s9?: number;
      s10?: number;
      s11?: number;
      s12?: number;
      NAV_HEIGHT?: number;
    };
    status?: {
      danger?: string;
    };
  }
  export function createTheme(options?: CustomThemeOptions): CustomTheme;
}
