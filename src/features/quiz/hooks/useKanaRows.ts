'use client';

import { useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { parseKanaRows, type KanaRow } from '@/data/gojuon';

/**
 * 读取 `?rows=a,ka,sa`（课程单元按行出题）。
 * 只读 URL、不写状态：配置页正常开练时没有 rows 参数，即整池出题。
 */
export const useKanaRows = (): KanaRow[] | undefined => {
  const searchParams = useSearchParams();
  const raw = searchParams.get('rows');
  return useMemo(() => parseKanaRows(raw), [raw]);
};
