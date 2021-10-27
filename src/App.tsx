import "./styles.css";
import { useState, useMemo, useCallback } from "react";
import DataGrid, { Column, RowRendererProps } from "react-data-grid";
import createRows from "./create";
import { ImageFormatter } from "./components/ImageFormatter";
import { Row, SortColumn } from "./types";
import { getComparator } from "./utils";
import { DraggableRowRenderer } from "./components/DraggableRowRenderer";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const TOTAL_ROWS = 10;

export default function App() {
  const [rows, setRows] = useState(createRows(TOTAL_ROWS));
  const [sortColumns, setSortColumns] = useState<readonly SortColumn[]>([]);

  const rowKeyGetter = (row: Row) => row.id;

  const sortedRows = useMemo((): readonly Row[] => {
    if (sortColumns.length === 0) return rows;
    const sortedRows = [...rows];
    sortedRows.sort((a, b) => {
      for (const sort of sortColumns) {
        const comparator = getComparator(sort.columnKey);
        const compResult = comparator(a, b);
        if (compResult !== 0) {
          return sort.direction === "ASC" ? compResult : -compResult;
        }
      }
      return 0;
    });
    return sortedRows;
  }, [rows, sortColumns]);

  const columns: Column[] = [
    { key: "variant", name: "Variant name" },
    {
      name: "Image variants",
      key: "img",
      width: 100,
      formatter: ({ row }) => <ImageFormatter value={row.img} />
    },
    {
      key: "retailPrice",
      name: "Retail price($ USD)"
    },
    {
      key: "empPrice",
      name: "Employee price($ USD)"
    },
    { key: "size", name: "Size" },
    { key: "stock", name: "Stock" },
    { key: "sku", name: "Sku" },
    { key: "vat", name: "VAT(%)" }
  ];

  const RowRenderer = useCallback((props: RowRendererProps<Row>) => {
    console.log({ props });
    function onRowReorder(fromIndex: number, toIndex: number) {
      setRows((rows) => {
        const newRows = [...rows];
        newRows.splice(toIndex, 0, newRows.splice(fromIndex, 1)[0]);
        return newRows;
      });
    }
    return <DraggableRowRenderer {...props} onRowReorder={onRowReorder} />;
  }, []);

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="App">
        <DataGrid
          columns={columns}
          rows={sortedRows}
          onRowsChange={setRows}
          rowRenderer={RowRenderer}
          sortColumns={sortColumns}
          rowKeyGetter={rowKeyGetter}
          onSortColumnsChange={setSortColumns}
          defaultColumnOptions={{
            sortable: true,
            resizable: true
          }}
        />
      </div>
    </DndProvider>
  );
}
