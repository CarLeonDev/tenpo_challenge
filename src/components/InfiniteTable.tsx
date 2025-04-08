import { Table, TableBody, TableCell, TableHeader, TableHeaderCell, TableHeaderRow, TableRow } from "@/components/ui/Table";
import { InfiniteData } from "@tanstack/react-query";
import { ColumnDef, flexRender, getCoreRowModel, getSortedRowModel, Row, useReactTable } from "@tanstack/react-table";
import { useVirtualizer } from "@tanstack/react-virtual";
import { useCallback, useEffect, useMemo, useRef } from "react";
import { Loading } from "@/components/ui/Loading";
import React from "react";
import { renderToString } from 'react-dom/server';


type InfiniteTableProps = React.TableHTMLAttributes<HTMLTableElement> & {
  data: InfiniteData<any, unknown> | undefined;
  columns: ColumnDef<any>[];
  isFetching: boolean;
  isFetchingNextPage: boolean;
  fetchNextPage: () => void;
  totalRows: number;
  fullHeight?: boolean;
}

const ESTIMATE_ROW_HEIGHT = 33;  //estimate row height for accurate scrollbar dragging

export const InfiniteTable = React.forwardRef<HTMLTableElement, InfiniteTableProps>(({ data, columns, isFetching, isFetchingNextPage, fetchNextPage, totalRows, fullHeight = false }, externalRef) => {
  const internalRef = useRef<HTMLTableElement>(null);

  const ref = useMemo(
    () => externalRef || internalRef,
    [externalRef, internalRef]
  ) as React.RefObject<HTMLTableElement>;

  const flatData = useMemo(
    () => data?.pages?.flatMap(page => page.data) ?? [],
    [data]
  );

  const totalFetched = flatData.length;

  // called on scroll and possibly on mount to fetch more data as the user scrolls and reaches bottom of table
  const fetchMoreOnBottomReached = useCallback(
    (containerRefElement?: HTMLDivElement | null) => {
      if (containerRefElement) {
        const { scrollHeight, scrollTop, clientHeight } = containerRefElement;

        // once the user has scrolled within 500px of the bottom of the table, fetch more data if we can
        if (
          scrollHeight - scrollTop - clientHeight < 500 &&
          !isFetching &&
          totalFetched < totalRows
        ) {
          fetchNextPage();
        }
      }
    },
    [fetchNextPage, isFetching, totalFetched, totalRows]
  );


  const table = useReactTable({
    data: flatData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    debugTable: true,
  });

  const { rows } = table.getRowModel();

  const rowVirtualizer = useVirtualizer({
    count: rows.length,
    estimateSize: () => ESTIMATE_ROW_HEIGHT,
    getScrollElement: () => ref.current,
    overscan: 5,
  });

  // a check on mount and after a fetch to see if the table is already scrolled to the bottom and immediately needs to fetch more data
  useEffect(() => {
    fetchMoreOnBottomReached(ref.current);
  }, [fetchMoreOnBottomReached]);

  return (
    <Table
      ref={ref}
      fullHeight={fullHeight}
      onScroll={e => fetchMoreOnBottomReached(e.currentTarget)}
    >

      <TableHeader>
        {
          table.getHeaderGroups().map((headerGroup) => (
            <TableHeaderRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHeaderCell
                  key={header.id}
                  style={{ width: header.column.getSize() }}
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </TableHeaderCell>
              ))}
            </TableHeaderRow>
          ))
        }
      </TableHeader>

      <TableBody style={{ height: `${rowVirtualizer.getTotalSize() + (isFetchingNextPage ? ESTIMATE_ROW_HEIGHT : 0)}px` }}>
        {rowVirtualizer.getVirtualItems().map(virtualRow => {
          const row = rows[virtualRow.index] as Row<any>;

          return (
            <TableRow
              key={row.id}
              ref={node => rowVirtualizer.measureElement(node)} //measure dynamic row height
              data-index={virtualRow.index} //needed for dynamic row height measurement
              style={{
                transform: `translateY(${virtualRow.start}px)`, //this should always be a `style` as it changes on scroll
              }}
            >
              {row.getVisibleCells().map(cell => {
                const cellValue = flexRender(
                  cell.column.columnDef.cell,
                  cell.getContext()
                );

                return (
                  <TableCell
                    key={cell.id}
                    style={{
                      width: cell.column.getSize(),
                    }}
                  >
                    <div className="w-full overflow-hidden truncate" title={renderToString(cellValue) ?? ""}>
                      {cellValue}
                    </div>
                  </TableCell>
                )
              })}
            </TableRow>
          )
        })}

        {rows.length === 0 && (
          <TableRow className="bg-sidebar">
            <TableCell>
              No data available
            </TableCell>
          </TableRow>
        )}

        {isFetchingNextPage && (
          <TableRow className="bg-sidebar" style={{ transform: `translateY(${rowVirtualizer.getTotalSize()}px)` }}>
            <TableCell className="flex items-center gap-2">
              <Loading size="sm" />
              <span>Loading...</span>
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
});
