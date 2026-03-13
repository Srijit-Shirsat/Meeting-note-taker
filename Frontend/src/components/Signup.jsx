import { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/firebase';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const ConnectionNode = ({ delay, x, y }) => (
  <motion.div
    initial={{ opacity: 0, left: `${x}vw`, top: `${y}vh` }}
    animate={{ 
      opacity: [0, 1, 0], 
      y: [0, -40, 0],       
      scale: [1, 1.3, 1]    
    }}
    transition={{ 
      duration: 7 + Math.random() * 3, 
      repeat: Infinity, 
      delay: delay, 
      ease: "easeInOut" 
    }}
    className="fixed w-[3px] h-[3px] bg-indigo-400 rounded-full shadow-[0_0_10px_#818cf8] z-0"
  />
);

function SignupForm() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [firebaseError, setFirebaseError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();
  const nodes = [...Array(40)].map((_, i) => ({
    id: i,
    delay: Math.random() * 0,
    x: Math.random() * 100, 
    y: Math.random() * 100 
  }));

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setFirebaseError('');
    setErrors({});

    let newErrors = {};
    const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!formData.email) newErrors.email = "Email is required";
    else if (!emailValid.test(formData.email)) newErrors.email = "Invalid email format";

    if (!formData.password) newErrors.password = "Password is required";
    else if (formData.password.length < 6) newErrors.password = "Password must be at least 6 characters";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setLoading(false);
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      navigate('/dashboard'); 
    } catch (err) {
      if (err.code === 'auth/email-already-in-use') {
        setFirebaseError("This email is already registered.");
      } else {
        setFirebaseError(err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex items-center justify-center h-screen w-full overflow-hidden bg-slate-950">

      <div className="fixed inset-0 z-0 pointer-events-none">
        {nodes.map(node => (
          <ConnectionNode key={node.id} delay={node.delay} x={node.x} y={node.y} />
        ))}
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative z-10 w-full max-w-md bg-slate-900/40 backdrop-blur-3xl border border-white/10 p-10 rounded-[40px] shadow-2xl mx-4"
      >
        <h2 className="text-4xl font-bold text-white mb-2 text-center tracking-tight">Join Syntheia</h2>
        <p className="text-indigo-200/40 text-center mb-10 text-[10px] font-bold uppercase tracking-[0.3em]">
          AI Meeting Intelligence
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-black text-indigo-300 uppercase tracking-widest px-1">Email</label>
            <input 
              type="email" name="email" value={formData.email} onChange={handleChange}
              disabled={loading}
              className={`w-full px-5 py-4 bg-white/5 border border-white/10 rounded-2xl outline-none text-white focus:ring-1 focus:ring-indigo-500/50 transition-all placeholder:text-slate-600 ${errors.email ? 'border-red-500/50' : ''}`}
              placeholder="name@company.com"
            />
            {errors.email && <p className="text-red-400 text-[10px] mt-1 ml-1">{errors.email}</p>}
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black text-indigo-300 uppercase tracking-widest px-1">Password</label>
            <input 
              type="password" name="password" value={formData.password} onChange={handleChange}
              disabled={loading}
              className={`w-full px-5 py-4 bg-white/5 border border-white/10 rounded-2xl outline-none text-white focus:ring-1 focus:ring-indigo-500/50 transition-all placeholder:text-slate-600 ${errors.password ? 'border-red-500/50' : ''}`}
              placeholder="••••••••"
            />
            {errors.password && <p className="text-red-400 text-[10px] mt-1 ml-1">{errors.password}</p>}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 text-white py-4 rounded-2xl font-bold shadow-lg shadow-indigo-600/30 hover:bg-indigo-500 hover:shadow-indigo-500/50 transition-all active:scale-95 disabled:opacity-50"
          >
            {loading ? "Initializing..." : "Create Account"}
          </button>

          {firebaseError && (
            <p className="text-red-400 text-[10px] text-center mt-4 bg-red-950/20 p-2 rounded-lg border border-red-500/10 animate-pulse">
              {firebaseError}
            </p>
          )}
        </form>
      </motion.div>
    </div>
  );
}

export default SignupForm;