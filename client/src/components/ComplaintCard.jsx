import React from "react";

function ComplaintCard({ complaint }) {
  return (
    <div className="bg-gray-800 p-4 rounded-md shadow mb-4 w-full max-w-md">
      <h3 className="text-lg font-bold text-pink-400">{complaint.title}</h3>
      <p className="text-white">
        Status: <span className="font-semibold">{complaint.status}</span>
      </p>
      <p className="text-white">Oleh: {complaint.user?.name || "Anonim"}</p>
    </div>
  );
}

export default ComplaintCard;
