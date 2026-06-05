import React, { useState, useEffect } from 'react';
import './Inventory.css';

function Inventory({ token }) {
  const [transactions, setTransactions] = useState([]);
  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    productId: '',
    type: 'inbound',
    quantity: '',
    reason: '',
    reference: '',
    notes: ''
  });
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchData();
  }, [token]);

  const fetchData = async () => {
    try {
      const [transRes, prodRes] = await Promise.all([
        fetch('/api/inventory', { headers: { Authorization: `Bearer ${token}` } }),
        fetch('/api/products', { headers: { Authorization: `Bearer ${token}` } })
      ]);

      const trans = await transRes.json();
      const prod = await prodRes.json();

      setTransactions(trans);
      setProducts(prod);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    try {
      const response = await fetch('/api/inventory', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          ...formData,
          quantity: parseInt(formData.quantity)
        })
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
      }

      setMessage('Inventory transaction created successfully!');
      setFormData({
        productId: '',
        type: 'inbound',
        quantity: '',
        reason: '',
        reference: '',
        notes: ''
      });
      setShowModal(false);
      fetchData();
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    }
  };

  if (loading) return <div className="container"><p>Loading...</p></div>;

  return (
    <div className="container inventory-page">
      <div className="page-header">
        <h1>Inventory Transactions</h1>
        <button className="btn-primary" onClick={() => setShowModal(true)}>
          + New Transaction
        </button>
      </div>

      {message && (
        <div className={`alert ${message.includes('Error') ? 'alert-error' : 'alert-success'}`}>
          {message}
        </div>
      )}

      <div className="card">
        <table className="table">
          <thead>
            <tr>
              <th>Product</th>
              <th>Type</th>
              <th>Quantity</th>
              <th>Reason</th>
              <th>Reference</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((trans) => (
              <tr key={trans._id}>
                <td>{trans.productId?.name || 'Unknown'}</td>
                <td>
                  <span className={`badge badge-${trans.type}`}>
                    {trans.type.toUpperCase()}
                  </span>
                </td>
                <td>{trans.quantity}</td>
                <td>{trans.reason}</td>
                <td>{trans.reference || '-'}</td>
                <td>{new Date(trans.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="modal open">
          <div className="modal-content">
            <div className="modal-header">
              <h2>New Inventory Transaction</h2>
              <button className="close-btn" onClick={() => setShowModal(false)}>×</button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Product *</label>
                <select
                  name="productId"
                  value={formData.productId}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select a product</option>
                  {products.map((p) => (
                    <option key={p._id} value={p._id}>
                      {p.name} (Stock: {p.quantity})
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>Transaction Type *</label>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  required
                >
                  <option value="inbound">Inbound (Stock In)</option>
                  <option value="outbound">Outbound (Stock Out)</option>
                  <option value="adjustment">Adjustment</option>
                </select>
              </div>
              <div className="form-group">
                <label>Quantity *</label>
                <input
                  type="number"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Reason *</label>
                <input
                  type="text"
                  name="reason"
                  value={formData.reason}
                  onChange={handleChange}
                  placeholder="e.g., Purchase Order, Sales, Damage"
                  required
                />
              </div>
              <div className="form-group">
                <label>Reference</label>
                <input
                  type="text"
                  name="reference"
                  value={formData.reference}
                  onChange={handleChange}
                  placeholder="e.g., PO-12345"
                />
              </div>
              <div className="form-group">
                <label>Notes</label>
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                />
              </div>
              <div className="modal-actions">
                <button type="submit" className="btn-primary">Create</button>
                <button type="button" className="btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Inventory;
