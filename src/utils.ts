import { Row } from "./types";

type Comparator = (a: Row, b: Row) => number;
export const getComparator = (sortColumn: string): Comparator => {
  switch (sortColumn) {
    case "variant":
    case "title":
    case "img":
    case "size":
    case "sku":
      return (a, b) => {
        return a[sortColumn].localeCompare(b[sortColumn]);
      };
    case "id":
    case "retailPrice":
    case "empPrice":
    case "stock":
    case "vat":
      return (a, b) => {
        return a[sortColumn] - b[sortColumn];
      };
    default:
      throw new Error(`unsupported sortColumn: "${sortColumn}"`);
  }
};
