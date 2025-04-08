import { useCallback, useEffect, useMemo, useRef } from "react";
import { keepPreviousData, useInfiniteQuery } from "@tanstack/react-query";
import { Person, PersonApiResponse } from "@/types/person";
import { PERSON_FETCH_SIZE } from "@/contants/constants";
import { getPersons } from "@/services/personService";
import { useReactTable, getCoreRowModel, getSortedRowModel, ColumnDef, flexRender, Row } from "@tanstack/react-table";
import { useVirtualizer } from "@tanstack/react-virtual";
import { useMeasure } from "@/hooks/useMesure";
import { Loader2 } from "lucide-react";

const columns: ColumnDef<Person>[] = [
  {
    accessorKey: 'id',
    header: 'ID',
    size: 60,
  },
  {
    accessorKey: 'firstname',
    cell: info => info.getValue(),
  },
  {
    id: 'lastname',
    header: 'Last Name',
    accessorFn: row => row.lastname,
    cell: info => info.getValue(),
  },
  {
    accessorKey: 'email',
    header: 'Email',
    size: 200,
  },
  {
    accessorKey: 'phone',
    header: 'Phone',
    size: 120,
  },
  {
    accessorKey: 'birthday',
    header: 'Birthday',
    cell: info => (
      info.getValue<Date>().toLocaleString()
    ),
    size: 100,
  },
];

export const HomePage = () => {
  const tableRef = useRef<HTMLTableElement>(null);
  const [containerRef, { height }] = useMeasure<HTMLDivElement>();

  //react-query has a useInfiniteQuery hook that is perfect for this use case
  const { data, fetchNextPage, isFetching, isFetchingNextPage, isLoading } = useInfiniteQuery<PersonApiResponse>({
    queryKey: [
      'people',
    ],
    queryFn: async (context) => {
      const pageParam = context.pageParam as number;
      const fetchedData = await getPersons({ page: pageParam + 1, size: PERSON_FETCH_SIZE });
      return fetchedData;
    },
    initialPageParam: 0,
    getNextPageParam: (_lastGroup, groups) => groups.length,
    refetchOnWindowFocus: false,
    placeholderData: keepPreviousData,
  });

  //flatten the array of arrays from the useInfiniteQuery hook
  const flatData = useMemo(
    () => data?.pages?.flatMap(page => page.data) ?? [],
    [data]
  );
  const totalDBRowCount = data?.pages[0].total ?? 0;
  const totalFetched = flatData.length;

  //called on scroll and possibly on mount to fetch more data as the user scrolls and reaches bottom of table
  const fetchMoreOnBottomReached = useCallback(
    (containerRefElement?: HTMLDivElement | null) => {
      if (containerRefElement) {
        const { scrollHeight, scrollTop, clientHeight } = containerRefElement;

        //once the user has scrolled within 500px of the bottom of the table, fetch more data if we can
        if (
          scrollHeight - scrollTop - clientHeight < 500 &&
          !isFetching &&
          totalFetched < totalDBRowCount
        ) {
          fetchNextPage();
        }
      }
    },
    [fetchNextPage, isFetching, totalFetched, totalDBRowCount]
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
    estimateSize: () => 33, //estimate row height for accurate scrollbar dragging
    getScrollElement: () => tableRef.current,
    overscan: 5,
  });


  //a check on mount and after a fetch to see if the table is already scrolled to the bottom and immediately needs to fetch more data
  useEffect(() => {
    fetchMoreOnBottomReached(tableRef.current);
  }, [fetchMoreOnBottomReached]);

  if (isLoading) {
    return (
      <Loader2 className="w-10 h-10 animate-spin text-primary" />
    );
  }

  return (
    <div className="flex flex-col flex-1 self-center gap-3 px-6 py-4 w-screen sm:w-2xl md:w-3xl lg:w-4xl xl:w-5xl relative">
      <h2 className="text-2xl font-bold text-primary">People</h2>

      <div ref={containerRef} className="flex flex-1 self-stretch justify-center items-center">
        <table
          ref={tableRef}
          className="grid overflow-auto relative border border-card-border rounded-md auto-rows-min w-screen sm:w-2xl md:w-3xl lg:w-4xl xl:w-5xl"
          style={{
            height: `${height}px`,
          }}
          onScroll={e => fetchMoreOnBottomReached(e.currentTarget)}
        >
          <thead className="grid sticky top-0 z-10 row-start-1 row-auto-start">
            {
              table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id} className="flex w-full bg-sidebar border-b border-card-border">
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      className="flex p-2 text-sm font-medium border-r last:border-r-0 border-card-200"
                      style={{ width: header.column.getSize() }}
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                    </th>
                  ))}
                </tr>
              ))
            }
          </thead>

          <tbody className="grid relative" style={{ height: `${rowVirtualizer.getTotalSize() + (isFetchingNextPage ? 33 : 0)}px` }}>
            {rowVirtualizer.getVirtualItems().map(virtualRow => {
              const row = rows[virtualRow.index] as Row<Person>
              return (
                <tr
                  key={row.id}
                  ref={node => rowVirtualizer.measureElement(node)} //measure dynamic row height
                  data-index={virtualRow.index} //needed for dynamic row height measurement
                  className="flex absolute w-full border-b last:border-b-0 border-card-200"
                  style={{
                    transform: `translateY(${virtualRow.start}px)`, //this should always be a `style` as it changes on scroll
                  }}
                >
                  {row.getVisibleCells().map(cell => {
                    return (
                      <td
                        key={cell.id}
                        className="flex p-2 text-sm text-card-foreground border-r last:border-r-0 border-card-200"
                        style={{
                          width: cell.column.getSize(),
                        }}
                      >
                        <div className="w-full overflow-hidden truncate" title={cell.getValue() as string}>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </div>
                      </td>
                    )
                  })}
                </tr>
              )
            })}
            {rows.length === 0 && (
              <tr className="flex w-full bg-card-50 border-b border-card-200">
                <td colSpan={columns.length} className="flex p-2 text-sm font-medium border-r last:border-r-0 border-card-200">
                  No data found
                </td>
              </tr>
            )}

            {isFetchingNextPage && (
              <tr className="flex absolute w-full bg-card-50 border-b border-card-200" style={{ transform: `translateY(${rowVirtualizer.getTotalSize()}px)` }}>
                <td colSpan={columns.length} className="flex items-center p-2 text-sm font-medium border-r last:border-r-0 border-card-200 gap-2">
                  <Loader2 className="w-4 h-4 animate-spin text-primary" /><span>Loading...</span>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}