const ratio = 1.61803398875;
const baseSize = 1.5;
const theme = {
  colors: {
    primary: 'hotpink',
  },
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
  },
};

// --s-5: calc(var(--s-4) / var(--ratio));
// --s-4: calc(var(--s-3) / var(--ratio));
// --s-3: calc(var(--s-2) / var(--ratio));
// --s-2: calc(var(--s-1) / var(--ratio));
// --s-1: calc(var(--s0) / var(--ratio));
// --s0: 1.5rem;
// --s1: calc(var(--s0) * var(--ratio));
// --s2: calc(var(--s1) * var(--ratio));
// --s3: calc(var(--s2) * var(--ratio));
// --s4: calc(var(--s3) * var(--ratio));
// --s5: calc(var(--s4) * var(--ratio));
// --s6: calc(var(--s5) * var(--ratio));
export default theme;
