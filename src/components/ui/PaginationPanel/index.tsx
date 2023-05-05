import { FC } from "react";
import ReactPaginate from "react-paginate";

interface PaginationPanelProps {
  pageCount: number;
  onClick: ({ selected }) => void;
  currentPage: number;
}

export const PaginationPanel: FC<PaginationPanelProps> = ({
  onClick,
  pageCount,
  currentPage,
}) => {
  return (
    <div className="mt-5 flex w-full justify-center border-b-2 border-t-2  p-3">
      <ReactPaginate
        previousLabel={"←"}
        nextLabel={"→"}
        pageCount={pageCount}
        onPageChange={onClick}
        containerClassName={
          "flex justify-between gap-2 cursor-pointer list-none"
        }
        previousLinkClassName={
          "hover:text-indigo-500 text-indigo-400 rounded-md border-2 border-indigo-400 px-3 py-2 text-sm font-bold hover:border-indigo-500 mr-2"
        }
        nextLinkClassName={
          "hover:text-indigo-500 text-indigo-400 rounded-md border-2 border-indigo-400 px-3 py-2 text-sm font-bold hover:border-indigo-500  ml-2"
        }
        disabledClassName={""}
        activeClassName={""}
        activeLinkClassName="text-white bg-indigo-400 hover:bg-indigo-500 hover:text-white"
        pageLinkClassName="hover:text-indigo-500 text-indigo-400 rounded-md border-2 border-indigo-400 px-3 py-2 text-sm font-medium hover:border-indigo-500"
        forcePage={currentPage}
      />
    </div>
  );
};
