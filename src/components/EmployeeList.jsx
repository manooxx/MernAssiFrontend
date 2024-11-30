import React, { useEffect, useState } from 'react';
import API from '../api';
import EmployeeForm from './EmployeeForm';
import Navbar from './Navbar';

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const fetchEmployees = async () => {
    try {
      const response = await API.get('/employees');
      const orderedEmployees = response.data.map((employee, index) => ({
        ...employee,
        id: index + 1,
        joiningDate: new Date(employee.joiningDate).toLocaleDateString() || 'N/A', // Format the date
      }));
      setEmployees(orderedEmployees);
    } catch (err) {
      console.error('Error fetching employees:', err);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleDelete = async (id) => {
    try {
      await API.delete(`/employees/${id}`);
      fetchEmployees();
    } catch (err) {
      console.error('Error deleting employee:', err);
    }
  };

  const handleFormSuccess = () => {
    setShowForm(false);
    setSelectedEmployee(null);
    fetchEmployees();
  };

  return (
    <div className='w-full min-h-screen'>
      <Navbar />
      <div className="p-6 py-20">
        <div className="flex justify-between items-center mb-4">
          <h1 className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500 font-semibold text-2xl">Employee List</h1>
          <div className='flex w-36 h-9 justify-center items-center rounded-lg shadow-[0_0_10px_theme("colors.purple.700")] duration-300 hover:shadow-neon'>
            <button
              onClick={() => {
                setSelectedEmployee(null);
                setShowForm(true);
              }}
              className='text-xs bg-clip-text w-36 h-9 duration-300 hover:text-transparent bg-gradient-to-r from-pink-500 to-violet-500 flex justify-center items-center font-semibold'
            >
              Create New Employee
            </button>
          </div>
        </div>
        <div className='flex justify-center items-center'>
          {showForm ? (
            <EmployeeForm 
              onSuccess={handleFormSuccess}
              employee={selectedEmployee}
            />
          ) : (
            <table className="w-full table-auto border-collapse border border-gray-200">
              <thead>
                <tr>
                  <th className="border border-gray-300 p-2">ID</th>
                  <th className="border border-gray-300 p-2">Image</th>
                  <th className="border border-gray-300 p-2">Name</th>
                  <th className="border border-gray-300 p-2">Email</th>
                  <th className="border border-gray-300 p-2">Mobile</th>
                  <th className="border border-gray-300 p-2">Designation</th>
                  <th className="border border-gray-300 p-2">Gender</th>
                  <th className="border border-gray-300 p-2">Course</th>
                  <th className="border border-gray-300 p-2">Joining Date</th>
                  <th className="border border-gray-300 p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {employees.map((employee) => (
                  <tr key={employee._id}>
                    <td className="border border-gray-300 p-2">{employee.id}</td>
                    <td className="border border-gray-300 p-2"><img className='w-[50px] h-[50px] rounded-full' src={employee.image} alt="Profile" /></td>
                    <td className="border border-gray-300 p-2">{employee.name}</td>
                    <td className="border border-gray-300 p-2">{employee.email}</td>
                    <td className="border border-gray-300 p-2">{employee.mobile}</td>
                    <td className="border border-gray-300 p-2">{employee.designation}</td>
                    <td className="border border-gray-300 p-2">{employee.gender}</td>
                    <td className="border border-gray-300 p-2">{employee.course}</td>
                    <td className="border border-gray-300 p-2">{employee.joiningDate}</td>
                    <td className="border border-gray-300 p-2">
                      <button
                        onClick={() => {
                          setSelectedEmployee(employee);
                          setShowForm(true);
                        }}
                        className="bg-yellow-500 text-white px-2 py-1 rounded mr-2 hover:bg-yellow-600"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(employee._id)}
                        className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmployeeList;
