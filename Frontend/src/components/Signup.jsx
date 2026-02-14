import { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/firebase';

function SignupForm() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  
  const [errors, setErrors] = useState({});
  const [firebaseError, setFirebaseError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFirebaseError('');

    let newErrors = {};
    const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!emailValid.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      try {
        await createUserWithEmailAndPassword(auth, formData.email, formData.password);
        alert("Your account is created successfully");
      } catch (err) {
        setFirebaseError(err.message);
      }
    }
  };

  return (
    <div className="w-full max-w-sm sm:max-w-md bg-white p-6 sm:p-8 rounded-2xl shadow-xl border border-gray-100">
      <h2 className="text-3xl font-bold text-slate-900 mb-6 text-center">Join NoteTaker Today!!</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Email</label>
          <input 
            type="email" name="email" value={formData.email} onChange={handleChange} placeholder=""
            className={`w-full px-4 py-2 border rounded-lg outline-none transition-all ${errors.email ? 'border-red-500' : 'border-gray-300'}`}/>
          {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Password</label>
          <input 
            type="password" name="password" value={formData.password} onChange={handleChange}placeholder=""
            className={`w-full px-4 py-2 border rounded-lg outline-none transition-all ${errors.password ? 'border-red-500' : 'border-gray-300'}`}
          />
          {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 transition-all shadow-md"
        >
          Sign Up
        </button>

        {firebaseError && (
          <p className="text-red-500 text-xs mt-3 text-center">
            {firebaseError}
          </p>
        )}
      </form>
    </div>
  );
}

export default SignupForm