import { useState } from 'react';
import API from '../api';

const EmployeeForm = ({ onSuccess, employee = null }) => {
  const [formData, setFormData] = useState({
    name: employee?.name || '',
    email: employee?.email || '',
    mobile: employee?.mobile || '',
    designation: employee?.designation || '',
    gender: employee?.gender || '',
    course: employee?.course || '', // Store single course instead of array
    image: null,
  });

  const [error, setError] = useState('');
  const [validationErrors, setValidationErrors] = useState({});

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateMobile = (mobile) => {
    const mobileRegex = /^[0-9]{10}$/;
    return mobileRegex.test(mobile);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));

    if (name === 'email') {
      setValidationErrors((prev) => ({
        ...prev,
        email: validateEmail(value) ? '' : 'Invalid email format',
      }));
    }

    if (name === 'mobile') {
      setValidationErrors((prev) => ({
        ...prev,
        mobile: validateMobile(value) ? '' : 'Mobile number must be 10 digits',
      }));
    }
  };

  const handleCourseChange = (e) => {
    setFormData((prevData) => ({ ...prevData, course: e.target.value }));
  };

  const handleFileChange = (e) => {
    setFormData((prevData) => ({ ...prevData, image: e.target.files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!validateEmail(formData.email) || !validateMobile(formData.mobile)) {
      setError('Please correct the errors before submitting.');
      return;
    }

    const form = new FormData();
    Object.keys(formData).forEach((key) => {
      form.append(key, formData[key]);
    });

    try {
      if (employee) {
        await API.put(`/employees/${employee._id}`, form);
      } else {
        await API.post('/employees', form);
      }
      onSuccess();
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-black shadow-neon flex flex-col justify-center items-center w-1/3 h-auto text-white p-6 rounded">
      <h2 className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500 flex justify-center items-center text-3xl font-bold mb-4">
        {employee ? 'Edit Employee' : 'Add Employee'}
      </h2>
      {error && <p className="text-red-500">{error}</p>}
      <input
        type="text"
        name="name"
        placeholder="Name"
        value={formData.name}
        onChange={handleChange}
        className="w-full p-2 mb-4 border bg-black rounded"
        required
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        className="w-full p-2 mb-2 border bg-black rounded"
        required
      />
      {validationErrors.email && <p className="text-red-500">{validationErrors.email}</p>}
      <input
        type="tel"
        name="mobile"
        placeholder="Mobile Number"
        value={formData.mobile}
        onChange={handleChange}
        className="w-full p-2 mb-2 border bg-black rounded"
        required
      />
      {validationErrors.mobile && <p className="text-red-500">{validationErrors.mobile}</p>}
      <select
        name="designation"
        value={formData.designation}
        onChange={handleChange}
        className="w-full p-2 mb-4 border bg-black rounded"
        required
      >
        <option value="">Select Designation</option>
        <option value="developer">Developer</option>
        <option value="designer">Designer</option>
        <option value="manager">Manager</option>
        <option value="tester">Tester</option>
      </select>
      <div className="w-full p-2   bg-black rounded items-center justify-between flex ">
        <label className="block mb-2">Gender:</label>
        <label className="mr-4">
          <input
            type="radio"
            name="gender"
            value="male"
            checked={formData.gender === 'male'}
            onChange={handleChange}
          />
          Male
        </label>
        <label className="mr-4">
          <input
            type="radio"
            name="gender"
            value="female"
            checked={formData.gender === 'female'}
            onChange={handleChange}
          />
          Female
        </label>
        <label>
          <input
            type="radio"
            name="gender"
            value="other"
            checked={formData.gender === 'other'}
            onChange={handleChange}
          />
          Other
        </label>
      </div>
      <div className="w-full p-2   bg-black rounded flex items-center gap-3">
        <label className="block mb-2">Course:</label>
        <label className="mr-4">
          <input
            type="checkbox"
            name="course"
            value="MCA"
            checked={formData.course === 'MCA'}
            onChange={handleCourseChange}
          />
          MCA
        </label>
        <label className="mr-4">
          <input
            type="checkbox"
            name="course"
            value="BCA"
            checked={formData.course === 'BCA'}
            onChange={handleCourseChange}
          />
          BCA
        </label>
        <label>
          <input
            type="checkbox"
            name="course"
            value="BSC"
            checked={formData.course === 'BSC'}
            onChange={handleCourseChange}
          />
          BSC
        </label>
      </div>
      <input
        type="file"
        name="image"
        onChange={handleFileChange}
        className="w-full p-2 bg-black mb-4"
        accept="image/*"
      />
      <div className="flex w-36 h-9 justify-center items-center rounded-lg shadow-[0_0_10px_theme('colors.purple.700')] duration-300 hover:shadow-neon">
        <button
          type="submit"
          className="bg-clip-text w-36 h-9 duration-300 hover:text-transparent bg-gradient-to-r from-pink-500 to-violet-500 flex justify-center items-center font-semibold"
        >
          {employee ? 'Update Employee' : 'Add Employee'}
        </button>
      </div>
    </form>
  );
};

export default EmployeeForm;
