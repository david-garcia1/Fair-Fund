import React from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Transaction } from '../../Interfaces/Transaction';

interface TransactionTableProps {
  transactions: Transaction[];
  onEdit: (transaction: Transaction) => void;
  onDelete: (id: string) => void;
}

const TransactionTable: React.FC<TransactionTableProps> = ({ transactions, onEdit, onDelete }) => {
  const columns: GridColDef[] = [
    { field: 'date', headerName: 'Date', flex: 1 },
    { field: 'description', headerName: 'Description', flex: 2 },
    { field: 'amount', headerName: 'Amount', flex: 1, type: 'number' },
    {
      field: 'actions',
      headerName: 'Actions',
      flex: 1,
      renderCell: (params) => (
        <div>
          <button onClick={() => onEdit(params.row)}>Edit</button>
          <button onClick={() => onDelete(params.row.id)}>Delete</button>
        </div>
      ),
    },
  ];

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={transactions.map((transaction) => ({
          id: transaction.id, // Still used internally
          date: transaction.Date,
          description: transaction.description,
          amount: transaction.amount,
        }))}
        columns={columns}
        pageSizeOptions={[5, 10, 15, 20]}
        initialState={{
          pagination: {
            paginationModel: { pageSize: 10},
          },
        }}
      />
    </div>
  );
};

export default TransactionTable;
