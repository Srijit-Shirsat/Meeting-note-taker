import { useState } from 'react'
import { auth } from '../config/firebase'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'


function LoginForm() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [loading,setLoading]=useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};

    const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!emailValid.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setLoading(true);
      try {
        await signInWithEmailAndPassword(auth, formData.email, formData.password);
        navigate('/dashboard');
      } catch (err) {
        setErrors({
          auth: "Invalid email or password. Please try again."
        });
      } finally {
        setLoading(false);
      }
      console.log("Login form submitted successfully :", formData);
    }
  };

  return (
    <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
      <h2 className="text-3xl font-bold text-slate-900 mb-6 text-center">
        Login
      </h2>
      {errors.auth && <p className="text-red-500 text-sm mb-4 text-center font-medium">{errors.auth}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Email Address
          </label>
          <input 
            type="email" name="email" value={formData.email} onChange={handleChange} placeholder=""
            disabled={loading}
            className={`w-full px-4 py-3 rounded-xl border outline-none transition-all ${errors.email ? 'border-red-500 ring-1 ring-red-500' : 'border-gray-200'}`}
          />
          {errors.email && <p className="text-red-500 text-xs mt-1 font-medium">{errors.email}</p>}
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Password
          </label>
          <input 
            type="password" name="password" value={formData.password} onChange={handleChange} placeholder=""
            disabled={loading}
            className={`w-full px-4 py-3 rounded-xl border outline-none transition-all ${errors.password ? 'border-red-500 ring-1 ring-red-500' : 'border-gray-200'}`}/>
          {errors.password && 
          <p className="text-red-500 text-xs mt-1 font-medium">
            {errors.password}
          </p>}
        </div>

        <button disabled={loading}
         className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-200">
          {loading ? "Signing in...":"Login"}
        </button>
      </form>
    </div>
  );
}

export default LoginForm