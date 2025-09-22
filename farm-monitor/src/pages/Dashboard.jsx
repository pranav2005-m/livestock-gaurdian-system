import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios";
import Navbar from "../components/Navbar";
import Card from "../components/Card";

export default function Dashboard() {
  const [animals, setAnimals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      navigate("/"); // redirect to login
      return;
    }

    const fetchAnimals = async () => {
      try {
        const res = await api.get(`/animals/my/${userId}`);
        setAnimals(res.data);
      } catch (err) {
        console.error("Error fetching animals:", err);
        setError(err.response?.data?.msg || "Failed to fetch animals");
      } finally {
        setLoading(false);
      }
    };

    fetchAnimals();
  }, [navigate]);

  const getAnimalEmoji = (type) => {
    const emojis = {
      cow: "🐄",
      goat: "🐐",
      buffalo: "🐃"
    };
    return emojis[type?.toLowerCase()] || "🐄";
  };

  const getStatusColor = () => {
    // You can enhance this later with real status logic
    const colors = ['from-green-500 to-emerald-600', 'from-blue-500 to-indigo-600', 'from-purple-500 to-pink-600'];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  if (loading) return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-100 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-200 border-t-blue-600 mx-auto mb-6"></div>
        <div className="text-2xl font-bold text-slate-700 mb-2">Loading animals...</div>
        <div className="text-slate-500">Fetching your farm data</div>
      </div>
    </div>
  );

  if (error) return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-100 flex items-center justify-center">
      <div className="text-center bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/20 p-12">
        <div className="text-6xl mb-4">❌</div>
        <div className="text-2xl font-bold text-red-600 mb-2">Error</div>
        <p className="text-slate-600">{error}</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-100">
      <Navbar />
      
      {/* Header Section */}
      <div className="max-w-7xl mx-auto px-6 pt-8 pb-6">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-slate-800 mb-4 flex items-center justify-center gap-3">
            <span className="text-5xl">🚜</span>
            Farm Dashboard
          </h1>
          <p className="text-lg text-slate-600">Monitor and manage your livestock</p>
          
          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 max-w-2xl mx-auto">
            <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-lg border border-white/20 p-6">
              <div className="text-3xl mb-2">🐄</div>
              <div className="text-2xl font-bold text-slate-800">{animals.length}</div>
              <div className="text-sm text-slate-600">Total Animals</div>
            </div>
            
            <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-lg border border-white/20 p-6">
              <div className="text-3xl mb-2">🥛</div>
              <div className="text-2xl font-bold text-slate-800">
                {animals.reduce((sum, animal) => sum + parseFloat(animal.milkLitre || 0), 0).toFixed(1)}L
              </div>
              <div className="text-sm text-slate-600">Daily Production</div>
            </div>
            
            <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-lg border border-white/20 p-6">
              <div className="text-3xl mb-2">🟢</div>
              <div className="text-2xl font-bold text-green-600">{animals.length}</div>
              <div className="text-sm text-slate-600">Active Monitors</div>
            </div>
          </div>
        </div>

        {/* Add Animal Button */}
        <div className="text-center mb-8">
          <Link
            to="/add-animal"
            className="inline-flex items-center gap-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:from-indigo-700 hover:to-purple-700 hover:scale-[1.02] transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            <span className="text-2xl">➕</span>
            Add New Animal
          </Link>
        </div>
      </div>

      {/* Animals Grid */}
      <div className="max-w-7xl mx-auto px-6 pb-8">
        {animals.length === 0 ? (
          <div className="text-center">
            <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/20 p-16 max-w-md mx-auto">
              <div className="text-8xl mb-6">🐄</div>
              <h3 className="text-2xl font-bold text-slate-700 mb-4">No Animals Yet</h3>
              <p className="text-slate-600 mb-8">
                Start building your farm by adding your first animal to monitor.
              </p>
              <Link
                to="/add-animal"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-green-700 hover:to-emerald-700 transition-all duration-300"
              >
                <span className="text-xl">🐄</span>
                Add First Animal
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {animals.map((a) => (
              <div
                key={a._id}
                className="group bg-white/80 backdrop-blur-lg rounded-3xl shadow-xl border border-white/20 overflow-hidden hover:shadow-2xl transition-all duration-500 hover:scale-[1.02]"
              >
                {/* Card Header */}
                <div className={`bg-gradient-to-r ${getStatusColor()} p-6 relative`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-4xl">{getAnimalEmoji(a.type)}</span>
                      <div>
                        <h3 className="text-2xl font-bold text-white drop-shadow-lg">
                          {a.name}
                        </h3>
                        <p className="text-white/90 capitalize font-medium">
                          {a.type}
                        </p>
                      </div>
                    </div>
                    <div className="w-4 h-4 bg-green-400 rounded-full animate-pulse shadow-lg"></div>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-6 space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-xl border border-blue-200">
                      <div className="text-blue-600 text-sm font-bold uppercase tracking-wider mb-1 flex items-center gap-1">
                        <span>🥛</span>
                        Milk
                      </div>
                      <div className="text-xl font-bold text-blue-900">
                        {a.milkLitre}L
                      </div>
                    </div>
                    
                    <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-xl border border-green-200">
                      <div className="text-green-600 text-sm font-bold uppercase tracking-wider mb-1 flex items-center gap-1">
                        <span>💉</span>
                        Status
                      </div>
                      <div className="text-sm font-bold text-green-900">
                        {a.vaccination}
                      </div>
                    </div>
                  </div>

                  {/* Health Status Indicators */}
                  <div className="flex justify-center space-x-4 py-2">
                    <div className="flex items-center gap-1">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span className="text-xs font-medium text-slate-600">Health</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                      <span className="text-xs font-medium text-slate-600">Location</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                      <span className="text-xs font-medium text-slate-600">Sensors</span>
                    </div>
                  </div>

                  {/* Delete Animal Button */}
                  <div className="grid grid-cols-2 gap-3">
                    <Link
                      to={`/animal/${a._id}`}
                      className="text-center bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 rounded-xl font-bold hover:from-blue-700 hover:to-blue-800 transition-all duration-300 hover:scale-[1.02] shadow-md hover:shadow-lg"
                    >
                      <div className="flex items-center justify-center gap-2">
                        <span className="text-lg">👁️</span>
                        View
                      </div>
                    </Link>
                    
                    <button
                      onClick={async () => {
                        if (window.confirm('Are you sure you want to delete this animal?')) {
                          try {
                            const userId = localStorage.getItem("userId");
                            console.log('Attempting to delete animal:', a._id, 'for user:', userId);
                            
                            await api.delete(`/animals/delete/${a._id}`, {
                              data: { userId }
                            });
                            
                            // Refresh the animals list by removing the deleted animal from state
                            setAnimals(animals.filter(animal => animal._id !== a._id));
                            alert('Animal deleted successfully!');
                          } catch (err) {
                            console.error('Delete error:', err);
                            alert(err.response?.data?.msg || 'Error deleting animal');
                          }
                        }
                      }}
                      className="text-center bg-gradient-to-r from-red-500 to-red-600 text-white py-3 rounded-xl font-bold hover:from-red-600 hover:to-red-700 transition-all duration-300 hover:scale-[1.02] shadow-md hover:shadow-lg"
                    >
                      <div className="flex items-center justify-center gap-2">
                        <span className="text-lg">🗑️</span>
                        Delete
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}