// import { useState } from 'react';
// import { createUserWithEmailAndPassword } from 'firebase/auth';
// import { auth } from '../config/firebase';

// function SignupForm() {
//   const [formData, setFormData] = useState({
//     email: '',
//     password: ''
//   });
  
//   const [errors, setErrors] = useState({});
//   const [firebaseError, setFirebaseError] = useState('');

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setFirebaseError('');

//     let newErrors = {};
//     const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!formData.email) {
//       newErrors.email = "Email is required";
//     } else if (!emailValid.test(formData.email)) {
//       newErrors.email = "Invalid email format";
//     }

//     if (!formData.password) {
//       newErrors.password = "Password is required";
//     } else if (formData.password.length < 6) {
//       newErrors.password = "Password must be at least 6 characters";
//     }

//     setErrors(newErrors);

//     if (Object.keys(newErrors).length === 0) {
//       try {
//         await createUserWithEmailAndPassword(auth, formData.email, formData.password);
//         alert("Your account is created successfully");
//       } catch (err) {
//         setFirebaseError(err.message);
//       }
//     }
//   };

//   return (
//     <div className="w-full max-w-sm sm:max-w-md bg-white p-6 sm:p-8 rounded-2xl shadow-xl border border-gray-100">
//       <h2 className="text-3xl font-bold text-slate-900 mb-6 text-center">Join NoteTaker Today!!</h2>

//       <form onSubmit={handleSubmit} className="space-y-4">
//         <div>
//           <label className="block text-sm font-semibold text-gray-700 mb-1">Email</label>
//           <input 
//             type="email" name="email" value={formData.email} onChange={handleChange} placeholder=""
//             className={`w-full px-4 py-2 border rounded-lg outline-none transition-all ${errors.email ? 'border-red-500' : 'border-gray-300'}`}/>
//           {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
//         </div>
//         <div>
//           <label className="block text-sm font-semibold text-gray-700 mb-1">Password</label>
//           <input 
//             type="password" name="password" value={formData.password} onChange={handleChange}placeholder=""
//             className={`w-full px-4 py-2 border rounded-lg outline-none transition-all ${errors.password ? 'border-red-500' : 'border-gray-300'}`}
//           />
//           {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
//         </div>

//         <button
//           type="submit"
//           className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 transition-all shadow-md"
//         >
//           Sign Up
//         </button>

//         {firebaseError && (
//           <p className="text-red-500 text-xs mt-3 text-center">
//             {firebaseError}
//           </p>
//         )}
//       </form>
//     </div>
//   );
// }

// export default SignupForm


import { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/firebase';

function SignupForm() {
  const [formData, setFormData] = useState({ email: '', password: '' });
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
    
    if (!formData.email) newErrors.email = "Email is required";
    else if (!emailValid.test(formData.email)) newErrors.email = "Invalid email format";

    if (!formData.password) newErrors.password = "Password is required";
    else if (formData.password.length < 6) newErrors.password = "Password must be at least 6 characters";

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
    // --- KEY CHANGE: Added bg-white/5, backdrop-blur-xl, and border-white/10 ---
    <div className="w-full max-w-md bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-3xl shadow-2xl">
      <h2 className="text-3xl font-bold text-white mb-2 text-center">Join Syntheia</h2>
      <p className="text-indigo-200/60 text-center mb-10">Get started with your AI meeting assistant</p>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-indigo-200 mb-2">Email Address</label>
          <input 
            type="email" name="email" value={formData.email} onChange={handleChange}
            // --- KEY CHANGE: Added bg-white/5 and border-white/5 for inputs ---
            className={`w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl outline-none transition-all text-white placeholder-slate-500 focus:ring-2 focus:ring-indigo-500/50 ${errors.email ? 'border-red-500/50' : ''}`}
            placeholder="name@company.com"
          />
          {errors.email && <p className="text-red-400 text-xs mt-2">{errors.email}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-indigo-200 mb-2">Password</label>
          <input 
            type="password" name="password" value={formData.password} onChange={handleChange}
            className={`w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl outline-none transition-all text-white placeholder-slate-500 focus:ring-2 focus:ring-indigo-500/50 ${errors.password ? 'border-red-500/50' : ''}`}
            placeholder="••••••••"
          />
          {errors.password && <p className="text-red-400 text-xs mt-2">{errors.password}</p>}
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-3 rounded-xl font-semibold hover:bg-indigo-500 hover:shadow-[0_0_20px_rgba(79,70,229,0.3)] transition-all duration-300 mt-2"
        >
          Create Account
        </button>

        {firebaseError && (
          <p className="text-red-400 text-sm mt-3 text-center bg-red-950/30 p-2 rounded-lg">
            {firebaseError}
          </p>
        )}
      </form>
    </div>
  );
}

export default SignupForm;