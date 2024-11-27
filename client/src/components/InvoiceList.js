import React, { useEffect, useState } from 'react';
import api from '../api/api';

const InvoiceList = ({ projectId }) => {
  const [invoices, setInvoices] = useState([]);
  const [amount, setAmount] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [isRecurring, setIsRecurring] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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

  // Handle invoice submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const invoiceData = {
        projectId,
        amount: parseFloat(amount),
        dueDate: new Date(dueDate).toISOString(),
        isRecurring,
      };

      const response = await api.post('/invoices', invoiceData);
      // On successful submission, add the new invoice to the list
      setInvoices((prevInvoices) => [response.data, ...prevInvoices]);

      // Clear form fields after submitting
      setAmount('');
      setDueDate('');
      setIsRecurring(false);
    } catch (error) {
      setError('Error creating invoice. Please try again.');
      console.error('Error creating invoice:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-50 p-6 rounded-lg shadow-md w-full max-w-md mx-auto">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">Invoices</h3>

      {/* Invoice Form */}
      <form onSubmit={handleSubmit} className="mb-6">
        <div className="mb-4">
          <label htmlFor="amount" className="block text-sm font-medium text-gray-700">Amount</label>
          <input
            type="number"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="mt-1 p-2 border rounded w-full"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700">Due Date</label>
          <input
            type="date"
            id="dueDate"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="mt-1 p-2 border rounded w-full"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="isRecurring" className="block text-sm font-medium text-gray-700">Recurring</label>
          <input
            type="checkbox"
            id="isRecurring"
            checked={isRecurring}
            onChange={() => setIsRecurring(!isRecurring)}
            className="mt-1"
          />
        </div>

        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-lg"
          disabled={loading}
        >
          {loading ? 'Creating Invoice...' : 'Create Invoice'}
        </button>

        {error && <p className="mt-4 text-red-500 text-sm">{error}</p>}
      </form>

      {/* Invoice List */}
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
