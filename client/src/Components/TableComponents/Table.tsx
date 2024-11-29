import React from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Transaction } from "../../Interfaces/Transaction";

const TransactionTable: React.FC<{
  transactions: Transaction[];
  onEdit: (transaction: Transaction) => void;
  onDelete: (transactionId: number) => void;
}> = ({ transactions, onEdit, onDelete }) => {
  const columns: GridColDef[] = [
    { field: "date", headerName: "Date", flex: 1 },
    { field: "amount", headerName: "Amount", flex: 1 },
    { field: "description", headerName: "Description", flex: 2 },
    {
      field: "actions",
      headerName: "Actions",
      renderCell: (params) => (
        <>
          <button onClick={() => onEdit(params.row)}>Edit</button>
          <button onClick={() => onDelete(params.row.id)}>Delete</button>
        </>
      ),
    },
  ];

  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={transactions}
        columns={columns}
        getRowId={(row) => row.id}
      />
    </div>
  );
};

export default TransactionTable;
