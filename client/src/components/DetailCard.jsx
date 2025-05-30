import React from "react";

function DetailCard({ complaint }) {
  return (
    <div className="bg-gray-800 p-4 rounded-md shadow mb-4 w-full max-w-md">
      <h3 className="text-xl font-bold text-pink-400">{complaint.title}</h3>
      <p>Status: {complaint.status}</p>
      <p>Deskripsi: {complaint.description}</p>
      <p>
        Pelapor: {complaint.user.name} ({complaint.user.email})
      </p>
    </div>
  );
}

export default DetailCard;
