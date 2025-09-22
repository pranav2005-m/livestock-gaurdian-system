// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import api from "../api/axios";

// export default function Login() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);
//   const navigate = useNavigate();

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setIsLoading(true);

//     try {
//       const res = await api.post("/auth/login", { email, password });

//       localStorage.setItem("userId", res.data?.userId || "");
//       localStorage.setItem("name", res.data?.name || "");

//       navigate("/dashboard");
//     } catch (err) {
//       alert(err.response?.data?.msg || "Login failed");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-100 flex items-center justify-center p-6">
//       {/* Background Decorations */}
//       <div className="absolute inset-0 overflow-hidden">
//         <div className="absolute top-20 left-20 w-72 h-72 bg-green-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
//         <div className="absolute top-20 right-20 w-72 h-72 bg-emerald-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
//         <div className="absolute -bottom-8 left-20 w-72 h-72 bg-lime-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
//       </div>

//       <div className="relative z-10 w-full max-w-md">
//         {/* Header Section */}
//         <div className="text-center mb-8">
//           <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl shadow-lg mb-6">
//             <span className="text-4xl">🚜</span>
//           </div>
//           <h1 className="text-4xl font-bold text-slate-800 mb-2">Farm Monitor</h1>
//           <p className="text-lg text-slate-600">
//             Welcome back to your livestock management system
//           </p>
//         </div>

//         {/* Login Form */}
//         <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
//           <div className="bg-gradient-to-r from-green-600 to-emerald-600 p-6">
//             <h2 className="text-2xl font-bold text-white text-center flex items-center justify-center gap-3">
//               <span className="text-3xl">🔐</span>
//               Login to Your Account
//             </h2>
//           </div>

//           <form onSubmit={handleLogin} className="p-8 space-y-6">
//             {/* Email Field */}
//             <div className="space-y-2">
//               <label className="text-sm font-bold text-slate-700 uppercase tracking-wider flex items-center gap-2">
//                 <span className="text-lg">✉️</span>
//                 Email Address
//               </label>
//               <div className="relative">
//                 <input
//                   type="email"
//                   placeholder="Enter your email address"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   className="w-full p-4 pl-12 border-2 border-slate-200 rounded-xl bg-white/50 backdrop-blur-sm focus:border-green-500 focus:outline-none transition-all duration-300 hover:border-slate-300 text-lg placeholder-slate-400"
//                   required
//                 />
//                 <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 text-xl">
//                   📧
//                 </div>
//               </div>
//             </div>

//             {/* Password Field */}
//             <div className="space-y-2">
//               <label className="text-sm font-bold text-slate-700 uppercase tracking-wider flex items-center gap-2">
//                 <span className="text-lg">🔒</span>
//                 Password
//               </label>
//               <div className="relative">
//                 <input
//                   type={showPassword ? "text" : "password"}
//                   placeholder="Enter your password"
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   className="w-full p-4 pl-12 pr-12 border-2 border-slate-200 rounded-xl bg-white/50 backdrop-blur-sm focus:border-green-500 focus:outline-none transition-all duration-300 hover:border-slate-300 text-lg placeholder-slate-400"
//                   required
//                 />
//                 <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 text-xl">
//                   🔑
//                 </div>
//                 <button
//                   type="button"
//                   onClick={() => setShowPassword(!showPassword)}
//                   className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors duration-200"
//                 >
//                   <span className="text-xl">{showPassword ? "🙈" : "👁️"}</span>
//                 </button>
//               </div>
//             </div>

//             {/* Login Button */}
//             <button
//               type="submit"
//               disabled={isLoading}
//               className={`w-full py-4 px-6 rounded-xl font-bold text-lg transition-all duration-300 flex items-center justify-center gap-3 ${
//                 isLoading
//                   ? "bg-slate-300 text-slate-500 cursor-not-allowed"
//                   : "bg-gradient-to-r from-green-600 to-emerald-600 text-white hover:from-green-700 hover:to-emerald-700 hover:scale-[1.02] shadow-lg hover:shadow-xl"
//               }`}
//             >
//               {isLoading ? (
//                 <>
//                   <div className="animate-spin rounded-full h-6 w-6 border-2 border-white border-t-transparent"></div>
//                   Logging in...
//                 </>
//               ) : (
//                 <>
//                   <span className="text-2xl">🚀</span>
//                   Login to Dashboard
//                 </>
//               )}
//             </button>

//             {/* Home Page Link */}
//             <div className="text-center mt-4">
//               <button
//                 type="button"
//                 onClick={() => navigate("/")}
//                 className="text-green-600 font-semibold hover:text-green-700 transition-colors"
//               >
//                 🏠 Go to Home Page
//               </button>
//             </div>

//             {/* Additional Options */}
//             {/* <div className="text-center mt-6"> */}
//               <p className="text-sm text-slate-500">
//                 Don&apos;t have an account?{" "}
//                 <span
//                   className="text-green-600 font-semibold ml-1 cursor-pointer hover:text-green-700 transition-colors"
//                   onClick={() => navigate("/signup")}
//                 >
//                   Sign Up
//                 </span>
//               </p>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await api.post("/auth/login", { email, password });

      localStorage.setItem("userId", res.data?.userId || "");
      localStorage.setItem("username", res.data?.username || "");

      navigate("/dashboard");
    } catch (err) {
      alert(err.response?.data?.msg || "Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-100 flex items-center justify-center p-6">
      {/* Background Decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-72 h-72 bg-green-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
        <div className="absolute top-20 right-20 w-72 h-72 bg-emerald-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-lime-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* Header Section */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl shadow-lg mb-6">
            <span className="text-4xl">🚜</span>
          </div>
          <h1 className="text-4xl font-bold text-slate-800 mb-2">Farm Monitor</h1>
          <p className="text-lg text-slate-600">
            Welcome back to your livestock management system
          </p>
        </div>

        {/* Login Form */}
        <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
          <div className="bg-gradient-to-r from-green-600 to-emerald-600 p-6">
            <h2 className="text-2xl font-bold text-white text-center flex items-center justify-center gap-3">
              <span className="text-3xl">🔐</span>
              Login to Your Account
            </h2>
          </div>

          <form onSubmit={handleLogin} className="p-8 space-y-6">
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
                  placeholder="Enter your password"
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
                  <span className="text-xl">{showPassword ? "🙈" : "👁️"}</span>
                </button>
              </div>
            </div>

            {/* Login Button */}
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
                  Logging in...
                </>
              ) : (
                <>
                  <span className="text-2xl">🚀</span>
                  Login to Dashboard
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

            {/* Additional Options */}
            <div className="text-center mt-6">
              <p className="text-sm text-slate-500">
                Don&apos;t have an account?{" "}
                <span
                  className="text-green-600 font-semibold ml-1 cursor-pointer hover:text-green-700 transition-colors"
                  onClick={() => navigate("/signup")}
                >
                  Sign Up
                </span>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
