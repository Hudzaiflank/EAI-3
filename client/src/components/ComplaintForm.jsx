import React from "react";

function ComplaintForm({ form, users, onChange, onSubmit }) {
  return (
    <form
      onSubmit={onSubmit}
      className="bg-[#2b2b2b] text-white p-6 rounded-md shadow-md mb-6 w-full max-w-md"
    >
      <h2 className="text-xl font-bold mb-4 text-center text-blue-300">
        Form Tambah Pengaduan
      </h2>

      <select
        name="user_id"
        value={form.user_id}
        onChange={onChange}
        className="w-full p-2 border border-gray-600 bg-[#1e1e1e] rounded mb-3"
        required
      >
        <option value="">Pilih User</option>
        {users.map((user) => (
          <option key={user.id} value={user.id}>
            {user.name}
          </option>
        ))}
      </select>

      <input
        type="text"
        name="title"
        placeholder="Judul"
        value={form.title}
        onChange={onChange}
        className="w-full p-2 border border-gray-600 bg-[#1e1e1e] rounded mb-3"
        required
      />
      <textarea
        name="description"
        placeholder="Deskripsi"
        value={form.description}
        onChange={onChange}
        className="w-full p-2 border border-gray-600 bg-[#1e1e1e] rounded mb-3"
        required
      ></textarea>
      <select
        name="status"
        value={form.status}
        onChange={onChange}
        className="w-full p-2 border border-gray-600 bg-[#1e1e1e] rounded mb-3"
      >
        <option value="open">Open</option>
        <option value="closed">Closed</option>
      </select>
      <button
        type="submit"
        className="bg-fuchsia-700 hover:bg-fuchsia-800 w-full py-2 rounded text-white font-semibold"
      >
        Tambahkan
      </button>
    </form>
  );
}

export default ComplaintForm;
