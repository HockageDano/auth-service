export default function AdminPage() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-gradient-to-b from-black via-[#14022b] to-black">
      <div className="bg-white/5 backdrop-blur p-6 rounded-xl border border-fuchsia-500/30 w-[42rem] shadow-[0_0_40px_#a855f7aa] text-cyan-100">
        <h2 className="text-3xl font-semibold mb-4 text-fuchsia-300">Admin Panel</h2>
        <p>Тут будемо реєструвати користувачів і показувати QR після створення. (Додамо окремо)</p>
      </div>
    </div>
  );
}
