import { sizeMap, TSize } from '@budgie/design-system/common/size';

interface GetScaledSizeProps {
  scale: number;
  size: TSize;
  startAt: number;
}

export const getScaledSize = ({ size, scale = 1, startAt = 0 }: GetScaledSizeProps): number =>
  startAt + scale * sizeMap[size];
