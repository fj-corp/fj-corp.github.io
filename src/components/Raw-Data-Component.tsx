import { db, auth } from './firebase'
import { signInAnonymously, onAuthStateChanged } from 'firebase/auth';
import { collection, getDocs } from 'firebase/firestore'
import { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  getFilteredRowModel,
  type ColumnDef,
  type SortingState,
  type ColumnFiltersState,
} from "@tanstack/react-table";
import RawDataInterface from './Raw-Data-Interface';
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import MonthlyDataComponent from './Monthly-Data-Component';

// function to create an array of year-month strings from the date_completed field to be used by Monthly-Data-Component.tsx
const createMonthlyData = (oGT_array: RawDataInterface[]): string[] => {
  const result: string[] = [];

  for (let i = 0; i < oGT_array.length; i++) {
    const splitted_date = (oGT_array[i].date_completed).split("-");
    const monthPlusYear = `${splitted_date[0]}-${splitted_date[1]}`;
    result.push(monthPlusYear);
  }

  const resultIntoSet = new Set(result);
  const resultIntoArray: string[] = Array.from(resultIntoSet);

  return resultIntoArray;
}

const RawDataComponent = () => {
  const [originalData, setOriginalData] = useState<RawDataInterface[]>([]);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [difficultyFilter, setDifficultyFilter] = useState<string>("");
  const [yearMonthArr, setMyearMonthArr] = useState<string[]>([]);

  useEffect(() => {
    const fetchMonthlyData = async () => {
      try {

        // Authenticate anonymously, necessary for Firestore access, disallow scrapers and bots from causing havoc
        await new Promise<void>((resolve, reject) => {
          onAuthStateChanged(auth, async (user) => {
            if (user) {
              resolve();
            } else {
              try {
                await signInAnonymously(auth);
                resolve();
              } catch (err) {
                reject(err);
              }
            }
          });
        });

        // reads of the firestore database
        const originalDocRef = collection(db, 'leetcode_data/original_data/submissions');
        const originalDocData = await getDocs(originalDocRef);
        const data: RawDataInterface[] = originalDocData.docs.map((doc) => ({
          daily: doc.data().daily,
          date_completed: doc.data().date_completed,
          time_spent: doc.data().time_spent,
          worth_reviewing: doc.data().worth_reviewing,
          question: doc.data().question,
          difficulty: doc.data().difficulty,
        }));
        setOriginalData(data);

        setMyearMonthArr(createMonthlyData(data)); // doing this so that I can parse data and export an array of year-month strings for Monthly-Data-Component 

      } catch (error) {
        console.error('Error fetching original data: ', error);
      } finally {
        setLoading(false);
      }
    };
    fetchMonthlyData();
  }, []);

  const columns: ColumnDef<RawDataInterface>[] = [
    { 
      accessorKey: "date_completed", 
      header: ({ column }) => {
        return (
          <Button
            className='dark:text-white !p-2'
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Attempted Date
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      enableSorting: true 
    },
    { 
      accessorKey: "time_spent", 
      header: ({ column }) => {
        return (
          <Button
            className='dark:text-white !p-2'
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Time Spent
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      enableSorting: true 
    },
    { 
      accessorKey: "worth_reviewing", 
      header: ({ column }) => {
        return (
            <Button
              className='dark:text-white !px-2'
              onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
              Worth Reviewing
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        )
      },
      enableSorting: true 
    },
    { 
      accessorKey: "question", 
      header: "Question",
    },
    { 
      accessorKey: "difficulty", 
      header: () => {
        return (
          <Button className="dark:text-white !p-2">
              <select
                value={difficultyFilter}
                onChange={(e) => handleDifficultyChange(e)}
              >
                <option value="">All</option>
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
              </select>
          </Button>
        );
      },
      enableSorting: true,
      enableColumnFilter: true,
      filterFn: (row, columnId, value) => {
        return row.getValue(columnId) === value;
      },
    },
    { 
      accessorKey: "daily", 
      header: ({ column }) => {
        return (
          <Button
            className='dark:text-white !p-2'
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Leetcode Daily
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      enableSorting: true 
    },

  ];

  const handleDifficultyChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const difficulty = event.target.value;
    setDifficultyFilter(difficulty);
    if (difficulty === "") {
      setColumnFilters([]); // Clear the filter
    } else {
      setColumnFilters([{ id: "difficulty", value: difficulty }]); // Apply the filter
    }
  };
  

  const table = useReactTable({
    data: originalData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    state: {
      sorting,
      columnFilters,
    },
    initialState: {
      pagination: {
        pageSize: 15,
      },
    },
  });

  return (
    <div className="flex flex-col container w-full mt-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex flex-col items-center gap-2 w-full max-w-sm">
                <Input
                    placeholder="Search by question name or number.."
                    value={(table.getColumn("question")?.getFilterValue() as string) ?? ""}
                    onChange={(event) =>
                    table.getColumn("question")?.setFilterValue(event.target.value)
                    }
                    className="w-full focus-visible:border-[#98b65a] focus-visible:ring-[#98b65a]/50 focus-visible:ring-[1px]"
                />
            </div>
        
            <div className="flex items-center justify-end space-x-2 py-2">
                <Button
                    className="!p-3 !bg-[#808588]"
                    variant="outline"
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                >
                    <FaArrowLeft />
                </Button>
                <div className="flex items-center">
                    <span className="text-sm text-muted-foreground">
                    Page {table.getState().pagination.pageIndex + 1} of{" "}
                    {table.getPageCount()}
                    </span>
                </div>
                <Button
                    className="!p-3 !bg-[#808588]"
                    variant="outline"
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}
                >
                    <FaArrowRight />
                </Button>
            </div>
        </div>

        {loading ? (
            <div className="flex justify-center py-8">Loading data...</div>
        ) : (
          <div className="rounded-sm border">
            <Table className='table-auto'>
              <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id} className='bg-[#515a5e]'>
                    {headerGroup.headers.map((header) => (
                      <TableHead key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    ))}
                  </TableRow>
                ))}
              </TableHeader>

              <TableBody className='text-white'>
                {table.getRowModel().rows?.length ? (
                  table.getRowModel().rows.map((row) => (
                    <TableRow
                      key={row.id}
                      data-state={row.getIsSelected() && "selected"}
                    >
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id}>
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={columns.length} className="h-24 text-center">
                      You're so much better than me if you didn't find the question you're looking for. 5 booms for you!
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>

            </Table>
          </div>
        )}
      
      {/* Pass the monthly data to the MonthlyDataComponent, I don't think useContext is necessary here */}
      { loading ? (<div className="flex justify-center py-8">Loading graphs...</div>) 
      : (<MonthlyDataComponent data={yearMonthArr} />)}
      

    </div>
  );
}

export default RawDataComponent;