import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const CustomerEdit = () => {
  const [customer, setCustomer] = useState({ name: '', email: '', phone: '' });
  const { id } = useParams(); // Assuming you're using React Router and the route is /customers/edit/:id
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        const response = await axios.get(`/api/customers/${id}`);
        setCustomer(response.data);
      } catch (error) {
        console.error('Fetch customer error:', error);
      }
    };

    if (id) fetchCustomer();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCustomer((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await axios.put(`/api/customers/${id}`, customer);
      } else {
        await axios.post('/api/customers', customer);
      }
      navigate('/customers');
    } catch (error) {
      console.error('Submit customer error:', error);
    }
  };

  const handleDelete = async () => {
    try {
      if (id && window.confirm('Are you sure you want to delete this customer?')) {
        await axios.delete(`/api/customers/${id}`);
        navigate('/customers');
      }
    } catch (error) {
      console.error('Delete customer error:', error);
    }
  };

  return (
    <div>
      <h2>{id ? 'Edit' : 'Add'} Customer</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={customer.name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={customer.email}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="phone">Phone</label>
          <input
            type="text"
            id="phone"
            name="phone"
            value={customer.phone}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Save</button>
        {id && (
          <button type="button" onClick={handleDelete}>
            Delete Customer
          </button>
        )}
      </form>
    </div>
  );
};

export default CustomerEdit;
