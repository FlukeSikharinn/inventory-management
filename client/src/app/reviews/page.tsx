"use client";

import { useGetReviewsQuery } from "@/state/api";
import Header from "@/app/(components)/Header";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

const columns: GridColDef[] = [
  { field: "reviewId", headerName: "ID", width: 90 },
  { field: "productName", headerName: "Product Name", width: 200 },
  {
    field: "rating",
    headerName: "Rating",
    width: 110,
    type: "number",
    valueGetter: (value, row) => (row.rating ? row.rating : "N/A"),
  },
  {
    field: "review",
    headerName: "Review",
    width: 150,
    type: "number",
  },
];
import React from 'react'

const reviews = () => {
  const { data: review, isError, isLoading } = useGetReviewsQuery();

  if (isLoading) {
    return <div className="py-4">Loading...</div>;
  }

  if (isError || !review) {
    return (
      <div className="text-center text-red-500 py-4">
        Failed to fetch review
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      <Header name="Inventory" />
      <DataGrid
        rows={review}
        columns={columns}
        getRowId={(row) => row.reviewId}
        checkboxSelection
        className="bg-white shadow rounded-lg border border-gray-200 mt-5 !text-gray-700"
      />
    </div>
  );
}

export default reviews