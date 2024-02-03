import type { GridItemProps } from '../grid-item';

const computeColsSizes = (col: GridItemProps['col']) => {
  const colTokens = col.split('|');

  if (colTokens.length === 0 || colTokens.length > 3) {
    throw new Error('GridItem: Invalid column format');
  }

  const [sm = 0, md = sm, lg = md, xl = lg] = col.split('|').map((val, idx) => {
    if (!val) return;
    if (val === '-') {
      return idx === 0 ? 0 : undefined;
    }

    return parseInt(val, 10);
  }) as [number | undefined, number | undefined, number | undefined];

  return {
    sm,
    md,
    lg,
    xl,
  };
};

export default computeColsSizes;
