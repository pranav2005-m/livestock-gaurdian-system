import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios";
import Navbar from "../components/Navbar";

export default function AnimalDetails() {
  const { id } = useParams();
  const [animal, setAnimal] = useState(null);
  const [sensors, setSensors] = useState([]);
  const [showHistory, setShowHistory] = useState(false);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const res = await api.get(`/animals/details/${id}`);
        setAnimal(res.data.animal);
        setSensors(res.data.sensors.slice(-10)); // last 10 records
      } catch (err) {
        console.error(err);
      }
    };

    fetchDetails();
    const interval = setInterval(fetchDetails, 5000); // Realtime every 5s
    return () => clearInterval(interval);
  }, [id]);

  if (!animal)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-200 border-t-blue-600 mx-auto mb-6"></div>
          <div className="text-2xl font-bold text-slate-700 mb-2">Loading...</div>
          <div className="text-slate-500">Fetching animal details</div>
        </div>
      </div>
    );

  const isOutOfZone = (location, zone) => {
    if (!zone?.northEast || !zone?.southWest || !location) return false;
    const [neLat, neLng] = zone.northEast;
    const [swLat, swLng] = zone.southWest;
    return location.lat > neLat || location.lat < swLat || location.lng > neLng || location.lng < swLng;
  };

  // latest sensor is the **last record**
  const latestSensor = sensors[sensors.length - 1];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-100 relative">
      <Navbar />
      <div className="max-w-5xl mx-auto p-6">
        {/* Animal Info */}
        <div className="mb-8 transform hover:scale-[1.02] transition-transform duration-300">
          <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 p-8">
              <h1 className="text-4xl font-bold text-white mb-2 drop-shadow-lg">🐄 {animal.name}</h1>
              <div className="flex items-center gap-2 text-blue-100">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-lg">Live Monitoring Active</span>
              </div>
            </div>

            <div className="p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Type */}
              <div className="group bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-2xl border-2 border-blue-200 hover:shadow-lg transition-all">
                <div className="text-sm font-bold text-blue-600 mb-2 flex items-center gap-2">
                  <span>🏷️</span> Type
                </div>
                <div className="text-2xl font-bold text-blue-900">{animal.type}</div>
              </div>
              {/* Milk */}
              <div className="group bg-gradient-to-br from-emerald-50 to-emerald-100 p-6 rounded-2xl border-2 border-emerald-200 hover:shadow-lg transition-all">
                <div className="text-sm font-bold text-emerald-600 mb-2 flex items-center gap-2">
                  <span>🥛</span> Milk
                </div>
                <div className="text-2xl font-bold text-emerald-900">{animal.milkLitre}</div>
              </div>
              {/* Vaccination */}
              <div className="group bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-2xl border-2 border-green-200 hover:shadow-lg transition-all">
                <div className="text-sm font-bold text-green-600 mb-2 flex items-center gap-2">
                  <span>💉</span> Vaccination
                </div>
                <div className="text-2xl font-bold text-green-900">{animal.vaccination}</div>
              </div>
              {/* Zone */}
              <div className="group bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-2xl border-2 border-purple-200 hover:shadow-lg transition-all">
                <div className="text-sm font-bold text-purple-600 mb-2 flex items-center gap-2">
                  <span>📍</span> Zone
                </div>
                {animal.zoneLocation?.northEast && animal.zoneLocation?.southWest ? (
                  <div className="text-sm font-medium text-purple-900 space-y-1">
                    <div>
                      <span className="font-bold">NE:</span> {animal.zoneLocation.northEast[0]}, {animal.zoneLocation.northEast[1]}
                    </div>
                    <div>
                      <span className="font-bold">SW:</span> {animal.zoneLocation.southWest[0]}, {animal.zoneLocation.southWest[1]}
                    </div>
                  </div>
                ) : (
                  <div className="text-gray-500 font-bold">Not Set</div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Live Sensor */}
        {latestSensor && (
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-slate-800 mb-4 flex items-center gap-3">
              <span>📡 Live Sensor Data</span>
              <div className="w-4 h-4 bg-green-500 rounded-full animate-pulse"></div>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className={`p-6 rounded-2xl border-2 ${latestSensor.temperature > 40 ? "bg-red-100 border-red-300" : "bg-orange-50 border-orange-300"}`}>
                <div className="font-bold text-sm mb-2 flex items-center gap-2">🌡️ Temperature</div>
                <div className="text-3xl font-bold">{latestSensor.temperature}°C</div>
              </div>

              <div className={`p-6 rounded-2xl border-2 ${latestSensor.heartRate > 120 ? "bg-red-100 border-red-300" : "bg-pink-50 border-pink-300"}`}>
                <div className="font-bold text-sm mb-2 flex items-center gap-2">❤️ Heart Rate</div>
                <div className="text-3xl font-bold">{latestSensor.heartRate} bpm</div>
              </div>

              <div className={`p-6 rounded-2xl border-2 ${latestSensor.pressure > 200 ? "bg-red-100 border-red-300" : "bg-cyan-50 border-cyan-300"}`}>
                <div className="font-bold text-sm mb-2 flex items-center gap-2">📊 Pressure</div>
                <div className="text-3xl font-bold">{latestSensor.pressure} Pa</div>
              </div>

              <div className="p-6 rounded-2xl border-2 bg-indigo-50 border-indigo-300">
                <div className="font-bold text-sm mb-2 flex items-center gap-2">🗺️ Location</div>
                <div className="text-lg font-bold">{latestSensor.location ? `Lat: ${latestSensor.location.lat}, Lng: ${latestSensor.location.lng}` : "Not Available"}</div>
              </div>
            </div>
          </div>
        )}

        {/* History Button */}
        <div className="fixed bottom-6 right-6 z-50">
          <button
            onClick={() => setShowHistory(!showHistory)}
            className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-full font-bold shadow-lg hover:scale-105 transition-transform"
          >
            {showHistory ? "Close History" : "Show Last 10 Records"}
          </button>
        </div>

        {/* Floating History Panel */}
        {showHistory && (
          <div className="fixed inset-0 z-40 flex justify-center items-start pt-24 px-4 overflow-y-auto">
            <div className="bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/20 w-full max-w-4xl p-6 space-y-4">
              <h3 className="text-2xl font-bold text-slate-800 mb-4 text-center">🗃️ Last 10 Sensor Records</h3>
              {sensors.map((s) => (
                <div key={s._id} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 bg-white/80 rounded-2xl p-4 border border-gray-200 shadow hover:shadow-lg transition">
                  <div className="text-sm font-bold text-red-700">🌡️ Temp</div>
                  <div className="text-lg font-bold">{s.temperature}°C</div>

                  <div className="text-sm font-bold text-pink-600">❤️ HR</div>
                  <div className="text-lg font-bold">{s.heartRate} bpm</div>

                  <div className="text-sm font-bold text-cyan-600">📊 Pressure</div>
                  <div className="text-lg font-bold">{s.pressure} Pa</div>

                  <div className="text-sm font-bold text-indigo-700">🗺️ Location</div>
                  <div className="text-lg font-bold">{s.location ? `Lat: ${s.location.lat}, Lng: ${s.location.lng}` : "N/A"}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
