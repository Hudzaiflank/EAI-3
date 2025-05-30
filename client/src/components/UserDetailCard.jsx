import React from "react";

function UserDetailCard({ user }) {
  return (
    <div className="bg-gray-800 p-4 rounded-md shadow mb-4 w-full max-w-md">
      <h3 className="text-xl font-bold text-pink-400">Nama: {user.name}</h3>
      <p>Email: {user.email}</p>
      <h4 className="mt-3 font-semibold text-white">Daftar Pengaduan:</h4>
      <ul className="list-disc ml-5 text-white">
        {user.complaints.map((comp, idx) => (
          <li key={idx}>
            <span className="font-medium">{comp.title}</span> ({comp.status})
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UserDetailCard;
