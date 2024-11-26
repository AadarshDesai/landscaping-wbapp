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
    <div className="bg-gray-50 p-6 rounded-lg shadow-md w-full max-w-md mx-auto">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">Invoices</h3>
      {invoices.length > 0 ? (
        <ul className="space-y-4">
          {invoices.map((invoice) => (
            <li
              key={invoice.id}
              className="p-4 border rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow"
            >
              <p className="text-gray-700">
                <span className="font-medium text-gray-900">Amount:</span> ${invoice.amount}
              </p>
              <p className="text-gray-700">
                <span className="font-medium text-gray-900">Due:</span>{' '}
                {new Date(invoice.dueDate).toLocaleDateString()}
              </p>
              <p className={`font-medium ${invoice.isRecurring ? 'text-green-600' : 'text-blue-600'}`}>
                {invoice.isRecurring ? 'Recurring' : 'One-time'}
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-600">No invoices available.</p>
      )}
    </div>
  );
};

export default InvoiceList;
