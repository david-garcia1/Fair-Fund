import React, { useState, useEffect } from "react";
import { Transaction } from "../../Interfaces/Transaction";

interface TransactionModalProps {
  isOpen: boolean;
  transaction: Transaction | null; 
  onClose: () => void;
  onSave: (transaction: Partial<Transaction>) => void | Promise<void>;
}

const TransactionModal: React.FC<TransactionModalProps> = ({
  isOpen,
  transaction,
  onClose,
  onSave,
}) => {
  const [formData, setFormData] = useState<Partial<Transaction>>({
    amount: 0,
    description: "",
    Date: "",
  });

  
  useEffect(() => {
    if (transaction) {
      setFormData({
        amount: transaction.amount,
        description: transaction.description,
        Date: transaction.Date,
      });
    } else {
      setFormData({ amount: 0, description: "", Date: "" }); 
    }
  }, [transaction]);

 
  const handleChange = (field: keyof Transaction) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [field]: event.target.value });
  };

  const handleSave = async () => {
    if (!formData.amount || !formData.Date || !formData.description) {
      alert("Please fill in all fields.");
      return;
    }
  
    try {
      await onSave(formData); 
      onClose(); 
    } catch (error) {
      console.error("Failed to save transaction:", error);
      alert("There was an error saving the transaction.");
    }
  };
  

  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>{transaction ? "Edit Transaction" : "Add Transaction"}</h2>
        <input
          type="number"
          placeholder="Amount"
          value={formData.amount}
          onChange={handleChange("amount")}
        />
        <input
          type="text"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange("description")}
        />
        <input
          type="date"
          value={formData.Date}
          onChange={handleChange("Date")}
        />
        <div className="modal-actions">
          <button onClick={handleSave}>Save</button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default TransactionModal;
