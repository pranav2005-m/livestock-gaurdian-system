import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MapContainer, TileLayer, Rectangle, useMapEvents, useMap } from "react-leaflet";
import api from "../api/axios";
import Navbar from "../components/Navbar";

// ✅ More precise km → lat/lng conversion
const kmToLatLng = (lat, km) => {
  const latOffset = km / 110.574; // Latitude degree ~110.574 km
  const lngOffset = km / (111.320 * Math.cos((lat * Math.PI) / 180)); // Longitude degree adjusts with cos(lat)
  return { latOffset, lngOffset };
};

// ✅ ZoneSelector with automatic resizing on zoom
function ZoneSelector({ zoneCenter, setZoneBounds }) {
  const map = useMap();

  const updateBounds = (lat, lng) => {
    const { latOffset, lngOffset } = kmToLatLng(lat, 2.5); // half of 5 km
    const sw = [lat - latOffset, lng - lngOffset];
    const ne = [lat + latOffset, lng + lngOffset];
    setZoneBounds([sw, ne]);
  };

  useMapEvents({
    click(e) {
      const { lat, lng } = e.latlng;
      updateBounds(lat, lng);
      map.setView([lat, lng], map.getZoom());
    },
    zoomend() {
      if (zoneCenter) updateBounds(zoneCenter[0], zoneCenter[1]);
    },
  });

  return null;
}

export default function AddAnimal() {
  const [type, setType] = useState("cow");
  const [name, setName] = useState("");
  const [milkLitre, setMilkLitre] = useState("");
  const [vaccination, setVaccination] = useState("");
  const [zoneBounds, setZoneBounds] = useState(null);
  const [zoneCenter, setZoneCenter] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!zoneBounds) {
      alert("Please click on the map to set the zone!");
      return;
    }

    setIsLoading(true);
    try {
      await api.post("/animals/create", {
        userId,
        type,
        name,
        milkLitre,
        vaccination,
        zoneLocation: { northEast: zoneBounds[1], southWest: zoneBounds[0] },
      });
      alert("Animal added with 5km zone!");
      navigate("/dashboard");
    } catch (err) {
      alert(err.response?.data?.msg || "Error adding animal");
    } finally {
      setIsLoading(false);
    }
  };

  const getAnimalEmoji = (animalType) => {
    const emojis = { cow: "🐄", goat: "🐐", buffalo: "🐃" };
    return emojis[animalType] || "🐄";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-100">
      <Navbar />

      <div className="max-w-4xl mx-auto p-6">
        {/* Header Section */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-slate-800 mb-4 flex items-center justify-center gap-3">
            <span className="text-5xl">🐄</span>
            Add New Animal
          </h1>
          <p className="text-lg text-slate-600">Register a new animal with monitoring zone</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form Section */}
          <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6">
              <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                <span className="text-3xl">📝</span>
                Animal Details
              </h2>
            </div>

            <form onSubmit={handleAdd} className="p-8 space-y-6">
              {/* Animal Type */}
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 uppercase tracking-wider flex items-center gap-2">
                  <span className="text-lg">{getAnimalEmoji(type)}</span>
                  Animal Type
                </label>
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  className="w-full p-4 border-2 border-slate-200 rounded-xl bg-white/50 backdrop-blur-sm focus:border-indigo-500 focus:outline-none transition-all duration-300 hover:border-slate-300 text-lg font-medium"
                >
                  <option value="cow">🐄 Cow</option>
                  <option value="goat">🐐 Goat</option>
                  <option value="buffalo">🐃 Buffalo</option>
                </select>
              </div>

              {/* Animal Name */}
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 uppercase tracking-wider flex items-center gap-2">
                  <span className="text-lg">🏷️</span>
                  Animal Name
                </label>
                <input
                  type="text"
                  placeholder="Enter animal name (e.g., Bella, Max)"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-4 border-2 border-slate-200 rounded-xl bg-white/50 backdrop-blur-sm focus:border-indigo-500 focus:outline-none transition-all duration-300 hover:border-slate-300 text-lg placeholder-slate-400"
                  required
                />
              </div>

              {/* Milk Production */}
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 uppercase tracking-wider flex items-center gap-2">
                  <span className="text-lg">🥛</span>
                  Daily Milk Production
                </label>
                <input
                  type="number"
                  placeholder="Enter daily milk production (liters)"
                  value={milkLitre}
                  onChange={(e) => setMilkLitre(e.target.value)}
                  className="w-full p-4 border-2 border-slate-200 rounded-xl bg-white/50 backdrop-blur-sm focus:border-indigo-500 focus:outline-none transition-all duration-300 hover:border-slate-300 text-lg placeholder-slate-400"
                  min="0"
                  step="0.1"
                  required
                />
              </div>

              {/* Vaccination Status */}
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 uppercase tracking-wider flex items-center gap-2">
                  <span className="text-lg">💉</span>
                  Vaccination Status
                </label>
                <input
                  type="text"
                  placeholder="Enter vaccination status (e.g., Up to date)"
                  value={vaccination}
                  onChange={(e) => setVaccination(e.target.value)}
                  className="w-full p-4 border-2 border-slate-200 rounded-xl bg-white/50 backdrop-blur-sm focus:border-indigo-500 focus:outline-none transition-all duration-300 hover:border-slate-300 text-lg placeholder-slate-400"
                  required
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading || !zoneBounds}
                className={`w-full py-4 px-6 rounded-xl font-bold text-lg transition-all duration-300 flex items-center justify-center gap-3 ${
                  isLoading || !zoneBounds
                    ? "bg-slate-300 text-slate-500 cursor-not-allowed"
                    : "bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700 hover:scale-[1.02] shadow-lg hover:shadow-xl"
                }`}
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-6 w-6 border-2 border-white border-t-transparent"></div>
                    Adding Animal...
                  </>
                ) : (
                  <>
                    <span className="text-2xl">➕</span>
                    Add Animal
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Map Section */}
          <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
            <div className="bg-gradient-to-r from-green-600 to-emerald-600 p-6">
              <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                <span className="text-3xl">🗺️</span>
                Monitoring Zone
              </h2>
            </div>

            <div className="p-8">
              <div className="mb-6">
                <div
                  className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                    zoneBounds
                      ? "bg-gradient-to-r from-green-50 to-emerald-50 border-green-300"
                      : "bg-gradient-to-r from-orange-50 to-yellow-50 border-orange-300"
                  }`}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-2xl">{zoneBounds ? "✅" : "🎯"}</span>
                    <span className="font-bold text-lg">
                      {zoneBounds ? "Zone Selected" : "Select Zone"}
                    </span>
                  </div>
                  <p className="text-sm text-slate-600">
                    {zoneBounds
                      ? "Click anywhere on the map to change the monitoring zone"
                      : "Click anywhere on the map to automatically set a 5km × 5km monitoring zone"}
                  </p>
                </div>
              </div>

              {/* Map Container */}
              <div className="h-[500px] md:h-[600px] rounded-2xl overflow-hidden border-2 border-slate-200 shadow-lg">
                <MapContainer
                  center={[10.005, 76.005]}
                  zoom={13}
                  className="h-full w-full"
                  style={{ borderRadius: "1rem" }}
                >
                  <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                  <ZoneSelector zoneCenter={zoneCenter} setZoneBounds={setZoneBounds} />
                  {zoneBounds && (
                    <Rectangle
                      bounds={zoneBounds}
                      pathOptions={{
                        color: "green",
                        weight: 3,
                        fillOpacity: 0.2,
                        dashArray: "10,10",
                      }}
                    />
                  )}
                </MapContainer>
              </div>

              {/* Zone Coordinates Display */}
              {zoneBounds && (
                <div className="mt-6 space-y-3">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-xl border border-blue-200">
                      <div className="text-blue-600 text-sm font-bold uppercase tracking-wider mb-1">
                        📍 South West
                      </div>
                      <div className="text-blue-900 font-mono text-sm">
                        {zoneBounds[0][0].toFixed(5)}, {zoneBounds[0][1].toFixed(5)}
                      </div>
                    </div>
                    <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-xl border border-purple-200">
                      <div className="text-purple-600 text-sm font-bold uppercase tracking-wider mb-1">
                        📍 North East
                      </div>
                      <div className="text-purple-900 font-mono text-sm">
                        {zoneBounds[1][0].toFixed(5)}, {zoneBounds[1][1].toFixed(5)}
                      </div>
                    </div>
                  </div>
                  <div className="text-center p-3 bg-gradient-to-r from-green-100 to-emerald-100 rounded-xl border border-green-200">
                    <span className="text-green-800 font-medium">
                      🟢 5km × 5km monitoring zone ready
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
