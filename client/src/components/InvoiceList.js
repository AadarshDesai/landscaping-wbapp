import React, { useEffect, useState } from 'react';
import api from '../api/api';

const InvoiceList = ({ projectId }) => {
  const [invoices, setInvoices] = useState([]);

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const response = await api.get(`/invoices/${projectId}`);
        setInvoices(response.data);
      } catch (error) {
        console.error('Error fetching invoices:', error);
      }
    };

    fetchInvoices();
  }, [projectId]);

  return (
    <div>
      <h3>Invoices</h3>
      <ul>
        {invoices.map((invoice) => (
          <li key={invoice.id}>
            Amount: ${invoice.amount} - Due: {new Date(invoice.dueDate).toLocaleDateString()} - {invoice.isRecurring ? 'Recurring' : 'One-time'}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default InvoiceList;
