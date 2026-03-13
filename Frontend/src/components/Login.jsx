import { useState } from 'react'
import { auth } from '../config/firebase'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'

function LoginForm() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
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
    if (!formData.password) newErrors.password = "Password is required";

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setLoading(true);
      try {
        await signInWithEmailAndPassword(auth, formData.email, formData.password);
        navigate('/dashboard');
      } catch (err) {
        setErrors({ auth: "Invalid email or password. Please try again." });
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="w-full max-w-md bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-3xl shadow-2xl">
      <h2 className="text-3xl font-bold text-white mb-2 text-center">
        Welcome Back
      </h2>
      <p className="text-indigo-200/60 text-center mb-10 text-sm">Log in to manage your AI notes</p>

      {errors.auth && (
        <p className="text-red-400 text-sm mb-6 text-center bg-red-950/30 p-2 rounded-lg border border-red-500/20">
          {errors.auth}
        </p>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-indigo-200 mb-2">
            Email Address
          </label>
          <input 
            type="email" name="email" value={formData.email} onChange={handleChange}
            disabled={loading}
            className={`w-full px-4 py-3 bg-white/5 border rounded-xl outline-none transition-all text-white placeholder-slate-500 focus:ring-2 focus:ring-indigo-500/50 ${errors.email ? 'border-red-500/50' : 'border-white/10'}`}
            placeholder="name@company.com"
          />
          {errors.email && <p className="text-red-400 text-xs mt-2 font-medium">{errors.email}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-indigo-200 mb-2">
            Password
          </label>
          <input 
            type="password" name="password" value={formData.password} onChange={handleChange}
            disabled={loading}
            className={`w-full px-4 py-3 bg-white/5 border rounded-xl outline-none transition-all text-white placeholder-slate-500 focus:ring-2 focus:ring-indigo-500/50 ${errors.password ? 'border-red-500/50' : 'border-white/10'}`}
            placeholder="••••••••"
          />
          {errors.password && <p className="text-red-400 text-xs mt-2 font-medium">{errors.password}</p>}
        </div>

        <button 
          disabled={loading}
          className="w-full bg-indigo-600 text-white py-3 rounded-xl font-bold hover:bg-indigo-500 hover:shadow-[0_0_20px_rgba(79,70,229,0.3)] transition-all duration-300 disabled:opacity-50 mt-2">
          {loading ? "Signing in..." : "Login"}
        </button>
      </form>
    </div>
  );
}

export default LoginForm;