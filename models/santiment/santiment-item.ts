export type SantimentItem = {
  areaStyle: {
    color: string;
    opacity: number;
    shadowBlur: number;
    shadowOffsetX: number;
    shadowOffsetY: number;
  }[];
  lineStyle: { color: string; width: number; type: string };
  symbol: string;
  label: string;
  metric: string;
  slug: string;
  data: { datetime: string; value: number };
};
