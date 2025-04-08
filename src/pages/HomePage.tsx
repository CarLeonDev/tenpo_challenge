import { keepPreviousData, useInfiniteQuery } from "@tanstack/react-query";
import { Person, PersonApiResponse } from "@/types/person";
import { PERSON_FETCH_SIZE } from "@/contants/constants";
import { getPersons } from "@/services/personService";
import { ColumnDef } from "@tanstack/react-table";
import { Loading } from "@/components/ui/Loading";
import { InfiniteTable } from "@/components/InfiniteTable";

const columns: ColumnDef<Person, any>[] = [
  {
    accessorKey: 'id',
    header: () => (<span className="text-primary">ID</span>),
    size: 60,
    cell: info => (<span className="text-primary">{info.getValue() as any}</span>),
  },
  {
    accessorKey: 'firstname',
    header: 'First Name',
    cell: info => info.getValue(),
  },
  {
    accessorKey: 'lastname',
    header: 'Last Name',
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
  {
    accessorKey: 'gender',
    header: 'Gender',
    cell: info => info.getValue(),
    size: 80,
  },
  {
    accessorKey: 'address',
    header: 'Address',
    cell: info => {
      const address = info.getValue();
      const addressFormatted = [address.street, address.city, address.zipcode].filter(Boolean).join(', ');
      return addressFormatted;
    },
    size: 300,
  }
];

export const HomePage = () => {
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

  const totalRows = data?.pages[0].total ?? 0;

  if (isLoading) {
    return (
      <Loading size="lg" />
    );
  }

  return (
    <div className="flex flex-col flex-1 self-center gap-3 px-6 py-4 w-screen sm:w-2xl md:w-3xl lg:w-4xl xl:w-5xl relative">
      <h2 className="text-2xl font-bold text-primary">People</h2>

      <InfiniteTable
        fullHeight={true}
        data={data}
        columns={columns}
        isFetching={isFetching}
        isFetchingNextPage={isFetchingNextPage}
        fetchNextPage={fetchNextPage}
        totalRows={totalRows}
      />
    </div>
  );
}