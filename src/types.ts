export interface Row {
  id: number;
  title: string;
  variant: string;
  img: string;
  retailPrice: number;
  empPrice: number;
  size: string;
  stock: number;
  sku: string;
  vat: number;
}

export interface SortColumn {
  readonly columnKey: string;
  readonly direction: SortDirection;
}

export type SortDirection = "ASC" | "DESC";
