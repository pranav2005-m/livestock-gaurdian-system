// // import { useState } from "react";
// // import { useNavigate } from "react-router-dom";
// // import api from "../api/axios";

// // export default function Signup() {
// //   const [name, setName] = useState("");
// //   const [email, setEmail] = useState("");
// //   const [password, setPassword] = useState("");
// //   const [isLoading, setIsLoading] = useState(false);
// //   const [showPassword, setShowPassword] = useState(false);
// //   const navigate = useNavigate();

// //   const handleSignup = async (e) => {
// //     e.preventDefault();
// //     setIsLoading(true);

// //     try {
// //       const res = await api.post("/auth/signup", { name, email, password });

// //       // Save userId and name
// //       localStorage.setItem("userId", res.data.userId);
// //       localStorage.setItem("name", res.data.name);

// //       navigate("/dashboard");
// //     } catch (err) {
// //       alert(err.response?.data?.msg || "Signup failed");
// //     } finally {
// //       setIsLoading(false);
// //     }
// //   };

// //   return (
// //     <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-100 flex items-center justify-center p-6">
// //       {/* Background Decorations */}
// //       <div className="absolute inset-0 overflow-hidden">
// //         <div className="absolute top-20 left-20 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
// //         <div className="absolute top-20 right-20 w-72 h-72 bg-green-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse animation-delay-2000"></div>
// //         <div className="absolute -bottom-8 left-20 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse animation-delay-4000"></div>
// //       </div>

// //       <div className="relative z-10 w-full max-w-md">
// //         {/* Header Section */}
// //         <div className="text-center mb-8">
// //           <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl shadow-lg mb-6">
// //             <span className="text-4xl">🚜</span>
// //           </div>
// //           <h1 className="text-4xl font-bold text-slate-800 mb-2">
// //             Join Farm Monitor
// //           </h1>
// //           <p className="text-lg text-slate-600">
// //             Create your account and start monitoring your livestock
// //           </p>
// //         </div>

// //         {/* Signup Form */}
// //         <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
// //           <div className="bg-gradient-to-r from-green-600 to-emerald-600 p-6">
// //             <h2 className="text-2xl font-bold text-white text-center flex items-center justify-center gap-3">
// //               <span className="text-3xl">✨</span>
// //               Create New Account
// //             </h2>
// //           </div>

// //           <form onSubmit={handleSignup} className="p-8 space-y-6">
// //             {/* Name Field */}
// //             <div className="space-y-2">
// //               <label className="text-sm font-bold text-slate-700 uppercase tracking-wider flex items-center gap-2">
// //                 <span className="text-lg">👤</span>
// //                 Full Name
// //               </label>
// //               <div className="relative">
// //                 <input
// //                   type="text"
// //                   placeholder="Enter your full name"
// //                   value={name}
// //                   onChange={(e) => setName(e.target.value)}
// //                   className="w-full p-4 pl-12 border-2 border-slate-200 rounded-xl bg-white/50 backdrop-blur-sm focus:border-green-500 focus:outline-none transition-all duration-300 hover:border-slate-300 text-lg placeholder-slate-400"
// //                   required
// //                 />
// //                 <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 text-xl">
// //                   🧑‍🌾
// //                 </div>
// //               </div>
// //             </div>

// //             {/* Email Field */}
// //             <div className="space-y-2">
// //               <label className="text-sm font-bold text-slate-700 uppercase tracking-wider flex items-center gap-2">
// //                 <span className="text-lg">✉️</span>
// //                 Email Address
// //               </label>
// //               <div className="relative">
// //                 <input
// //                   type="email"
// //                   placeholder="Enter your email address"
// //                   value={email}
// //                   onChange={(e) => setEmail(e.target.value)}
// //                   className="w-full p-4 pl-12 border-2 border-slate-200 rounded-xl bg-white/50 backdrop-blur-sm focus:border-green-500 focus:outline-none transition-all duration-300 hover:border-slate-300 text-lg placeholder-slate-400"
// //                   required
// //                 />
// //                 <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 text-xl">
// //                   📧
// //                 </div>
// //               </div>
// //             </div>

// //             {/* Password Field */}
// //             <div className="space-y-2">
// //               <label className="text-sm font-bold text-slate-700 uppercase tracking-wider flex items-center gap-2">
// //                 <span className="text-lg">🔒</span>
// //                 Password
// //               </label>
// //               <div className="relative">
// //                 <input
// //                   type={showPassword ? "text" : "password"}
// //                   placeholder="Create a strong password"
// //                   value={password}
// //                   onChange={(e) => setPassword(e.target.value)}
// //                   className="w-full p-4 pl-12 pr-12 border-2 border-slate-200 rounded-xl bg-white/50 backdrop-blur-sm focus:border-green-500 focus:outline-none transition-all duration-300 hover:border-slate-300 text-lg placeholder-slate-400"
// //                   required
// //                 />
// //                 <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 text-xl">
// //                   🔑
// //                 </div>
// //                 <button
// //                   type="button"
// //                   onClick={() => setShowPassword(!showPassword)}
// //                   className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors duration-200"
// //                 >
// //                   <span className="text-xl">
// //                     {showPassword ? "🙈" : "👁️"}
// //                   </span>
// //                 </button>
// //               </div>
// //             </div>

// //             {/* Signup Button */}
// //             <button
// //               type="submit"
// //               disabled={isLoading}
// //               className={`w-full py-4 px-6 rounded-xl font-bold text-lg transition-all duration-300 flex items-center justify-center gap-3 ${
// //                 isLoading
// //                   ? "bg-slate-300 text-slate-500 cursor-not-allowed"
// //                   : "bg-gradient-to-r from-green-600 to-emerald-600 text-white hover:from-green-700 hover:to-emerald-700 hover:scale-[1.02] shadow-lg hover:shadow-xl"
// //               }`}
// //             >
// //               {isLoading ? (
// //                 <>
// //                   <div className="animate-spin rounded-full h-6 w-6 border-2 border-white border-t-transparent"></div>
// //                   Creating Account...
// //                 </>
// //               ) : (
// //                 <>
// //                   <span className="text-2xl">🎯</span>
// //                   Create Farm Account
// //                 </>
// //               )}
// //             </button>

// //             {/* Home Page Link */}
// //             <div className="text-center mt-4">
// //               <button
// //                 type="button"
// //                 onClick={() => navigate("/")}
// //                 className="text-green-600 font-semibold hover:text-green-700 transition-colors"
// //               >
// //                 🏠 Go to Home Page
// //               </button>
// //             </div>

// //             {/* Already have account */}
// //             <div className="text-center mt-4">
// //               <p className="text-sm text-slate-500">
// //                 Already have an account?{" "}
// //                 <span
// //                   onClick={() => navigate("/login")}
// //                   className="text-green-600 font-semibold cursor-pointer hover:text-green-700 transition-colors"
// //                 >
// //                   Login here
// //                 </span>
// //               </p>
// //             </div>
// //           </form>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import api from "../api/axios";

// export default function Signup() {
//   const [username, setUsername] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);
//   const navigate = useNavigate();

//   const handleSignup = async (e) => {
//     e.preventDefault();
//     setIsLoading(true);

//     try {
//       const res = await api.post("/auth/signup", { username, email, password });

//       // Save userId and username
//       localStorage.setItem("userId", res.data.userId);
//       localStorage.setItem("username", res.data.username);

//       navigate("/dashboard");
//     } catch (err) {
//       alert(err.response?.data?.msg || "Signup failed");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-100 flex items-center justify-center p-6">
//       <div className="relative z-10 w-full max-w-md">
//         <div className="text-center mb-8">
//           <h1 className="text-4xl font-bold text-slate-800 mb-2">
//             Join Farm Monitor
//           </h1>
//           <p className="text-lg text-slate-600">
//             Create your account and start monitoring your livestock
//           </p>
//         </div>

//         <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
//           <div className="bg-gradient-to-r from-green-600 to-emerald-600 p-6 text-center">
//             <h2 className="text-2xl font-bold text-white">
//               Create New Account
//             </h2>
//           </div>

//           <form onSubmit={handleSignup} className="p-8 space-y-6">
//             <input
//               type="text"
//               placeholder="Username"
//               value={username}
//               onChange={(e) => setUsername(e.target.value)}
//               required
//               className="w-full p-4 border-2 rounded-xl text-lg"
//             />
//             <input
//               type="email"
//               placeholder="Email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//               className="w-full p-4 border-2 rounded-xl text-lg"
//             />
//             <div className="relative">
//               <input
//                 type={showPassword ? "text" : "password"}
//                 placeholder="Password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 required
//                 className="w-full p-4 border-2 rounded-xl text-lg"
//               />
//               <button
//                 type="button"
//                 onClick={() => setShowPassword(!showPassword)}
//                 className="absolute right-4 top-1/2 transform -translate-y-1/2"
//               >
//                 {showPassword ? "🙈" : "👁️"}
//               </button>
//             </div>
//             <button
//               type="submit"
//               disabled={isLoading}
//               className="w-full py-4 bg-green-600 text-white rounded-xl font-bold"
//             >
//               {isLoading ? "Creating..." : "Create Account"}
//             </button>
//           </form>

//           <div className="text-center mt-4">
//             <p>
//               Already have an account?{" "}
//               <span
//                 onClick={() => navigate("/login")}
//                 className="text-green-600 cursor-pointer"
//               >
//                 Login here
//               </span>
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

export default function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await api.post("/auth/signup", { username, email, password });

      // Save userId and username
      localStorage.setItem("userId", res.data.userId);
      localStorage.setItem("username", res.data.username);

      navigate("/dashboard");
    } catch (err) {
      alert(err.response?.data?.msg || "Signup failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-100 flex items-center justify-center p-6">
      {/* Background Decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
        <div className="absolute top-20 right-20 w-72 h-72 bg-green-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse animation-delay-4000"></div>
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* Header Section */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl shadow-lg mb-6">
            <span className="text-4xl">🚜</span>
          </div>
          <h1 className="text-4xl font-bold text-slate-800 mb-2">
            Join Farm Monitor
          </h1>
          <p className="text-lg text-slate-600">
            Create your account and start monitoring your livestock
          </p>
        </div>

        {/* Signup Form */}
        <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
          <div className="bg-gradient-to-r from-green-600 to-emerald-600 p-6">
            <h2 className="text-2xl font-bold text-white text-center flex items-center justify-center gap-3">
              <span className="text-3xl">✨</span>
              Create New Account
            </h2>
          </div>

          <form onSubmit={handleSignup} className="p-8 space-y-6">
            {/* Username Field */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 uppercase tracking-wider flex items-center gap-2">
                <span className="text-lg">👤</span>
                Username
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Enter your username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full p-4 pl-12 border-2 border-slate-200 rounded-xl bg-white/50 backdrop-blur-sm focus:border-green-500 focus:outline-none transition-all duration-300 hover:border-slate-300 text-lg placeholder-slate-400"
                  required
                />
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 text-xl">
                  🧑‍🌾
                </div>
              </div>
            </div>

            {/* Email Field */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 uppercase tracking-wider flex items-center gap-2">
                <span className="text-lg">✉️</span>
                Email Address
              </label>
              <div className="relative">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-4 pl-12 border-2 border-slate-200 rounded-xl bg-white/50 backdrop-blur-sm focus:border-green-500 focus:outline-none transition-all duration-300 hover:border-slate-300 text-lg placeholder-slate-400"
                  required
                />
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 text-xl">
                  📧
                </div>
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 uppercase tracking-wider flex items-center gap-2">
                <span className="text-lg">🔒</span>
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a strong password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-4 pl-12 pr-12 border-2 border-slate-200 rounded-xl bg-white/50 backdrop-blur-sm focus:border-green-500 focus:outline-none transition-all duration-300 hover:border-slate-300 text-lg placeholder-slate-400"
                  required
                />
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 text-xl">
                  🔑
                </div>
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors duration-200"
                >
                  <span className="text-xl">
                    {showPassword ? "🙈" : "👁️"}
                  </span>
                </button>
              </div>
            </div>

            {/* Signup Button */}
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-4 px-6 rounded-xl font-bold text-lg transition-all duration-300 flex items-center justify-center gap-3 ${
                isLoading
                  ? "bg-slate-300 text-slate-500 cursor-not-allowed"
                  : "bg-gradient-to-r from-green-600 to-emerald-600 text-white hover:from-green-700 hover:to-emerald-700 hover:scale-[1.02] shadow-lg hover:shadow-xl"
              }`}
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-6 w-6 border-2 border-white border-t-transparent"></div>
                  Creating Account...
                </>
              ) : (
                <>
                  <span className="text-2xl">🎯</span>
                  Create Farm Account
                </>
              )}
            </button>

            {/* Home Page Link */}
            <div className="text-center mt-4">
              <button
                type="button"
                onClick={() => navigate("/")}
                className="text-green-600 font-semibold hover:text-green-700 transition-colors"
              >
                🏠 Go to Home Page
              </button>
            </div>

            {/* Already have account */}
            <div className="text-center mt-4">
              <p className="text-sm text-slate-500">
                Already have an account?{" "}
                <span
                  onClick={() => navigate("/login")}
                  className="text-green-600 font-semibold cursor-pointer hover:text-green-700 transition-colors"
                >
                  Login here
                </span>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
