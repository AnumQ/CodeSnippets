import React from "react";

export const Pagination = ({
  pages,
  currentPage,
  setCurrentPage
}: {
  pages: number;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const numberOfPages = Array.from({ length: pages }, (_, i) => i + 1);

  const renderPageButton = (page: number, index: number) => {
    return (
      <button
        key={index}
        className={
          currentPage === index
            ? "btn btn-primary ml-2 active mt-2"
            : "btn btn-light ml-2 mt-2"
        }
        onClick={() => {
          setCurrentPage(index);
        }}
        type="button"
      >
        {page}
      </button>
    );
  };

  return (
    <div
      style={{
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      <div>{numberOfPages.map(renderPageButton)}</div>
    </div>
  );
};
