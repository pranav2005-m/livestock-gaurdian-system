export default function Card({ title, children }) {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition duration-300">
      <h2 className="text-xl font-bold mb-3">{title}</h2>
      <div className="space-y-2">{children}</div>
    </div>
  );
}
