import React from "react";

const StatCard = ({ title, value, icon, color = "blue" }) => {
  const colorStyles = {
    blue: {
      card: "border-blue-100",
      iconBg: "bg-blue-100",
      iconText: "text-blue-600",
    },
    yellow: {
      card: "border-yellow-100",
      iconBg: "bg-yellow-100",
      iconText: "text-yellow-600",
    },
    red: {
      card: "border-red-100",
      iconBg: "bg-red-100",
      iconText: "text-red-600",
    },
    orange: {
      card: "border-orange-100",
      iconBg: "bg-orange-100",
      iconText: "text-orange-600",
    },
    green: {
      card: "border-green-100",
      iconBg: "bg-green-100",
      iconText: "text-green-600",
    },
  };

  const selected = colorStyles[color] || colorStyles.blue;

  return (
    <div
      className={`bg-white rounded-2xl shadow-md p-5 flex items-center justify-between border ${selected.card} hover:shadow-lg transition`}
    >
      <div>
        <p className="text-gray-500 text-sm">{title}</p>
        <h2 className="text-2xl font-bold text-gray-800">{value}</h2>
      </div>

      <div
        className={`w-12 h-12 rounded-full flex items-center justify-center ${selected.iconBg} ${selected.iconText}`}
      >
        {icon}
      </div>
    </div>
  );
};

export default StatCard;