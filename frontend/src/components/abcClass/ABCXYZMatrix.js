import React from "react";

const ABCXYZMatrix = ({ matrix }) => {
  const matrixData = [
    { class: "AX", count: matrix.AX, priority: "high" },
    { class: "AY", count: matrix.AY, priority: "high" },
    { class: "AZ", count: matrix.AZ, priority: "medium" },

    { class: "BX", count: matrix.BX, priority: "medium" },
    { class: "BY", count: matrix.BY, priority: "medium" },
    { class: "BZ", count: matrix.BZ, priority: "low" },

    { class: "CX", count: matrix.CX, priority: "low" },
    { class: "CY", count: matrix.CY, priority: "low" },
    { class: "CZ", count: matrix.CZ, priority: "low" },
  ];

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "bg-green-100 border-green-300 text-green-700";
      case "medium":
        return "bg-orange-100 border-orange-300 text-orange-700";
      default:
        return "bg-gray-100 border-gray-300 text-gray-700";
    }
  };

  const getClassColor = (className) => {
    const abc = className[0];

    if (className === "AX") return "bg-gradient-to-br from-blue-100 to-green-100 border-blue-400 text-blue-700";
    if (className === "CZ") return "bg-gradient-to-br from-gray-100 to-red-100 border-red-300 text-gray-700";

    if (abc === "A") return "bg-blue-50 border-blue-200 text-blue-700";
    if (abc === "B") return "bg-purple-50 border-purple-200 text-purple-700";
    return "bg-gray-50 border-gray-200 text-gray-700";
  };

  const renderCell = (cell) => (
    <div
      key={cell.class}
      className={`border-2 rounded-xl p-4 transition-all hover:scale-105 hover:shadow-md ${getClassColor(cell.class)}`}
    >
      <div className="text-center">
        <p className="text-lg font-bold mb-1">{cell.class}</p>
        <p className="text-2xl font-semibold mb-2">{cell.count}</p>
        <div
          className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(cell.priority)}`}
        >
          <span>●</span>
          <span className="capitalize">{cell.priority}</span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-4 gap-3">
        {/* Header Row */}
        <div></div>
        <div className="text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-green-100 rounded-lg">
            <span className="text-sm font-semibold text-green-700">X - Stable</span>
          </div>
        </div>
        <div className="text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-orange-100 rounded-lg">
            <span className="text-sm font-semibold text-orange-700">Y - Moderate</span>
          </div>
        </div>
        <div className="text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-red-100 rounded-lg">
            <span className="text-sm font-semibold text-red-700">Z - Variable</span>
          </div>
        </div>

        {/* A Row */}
        <div className="flex items-center justify-end pr-4">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-100 rounded-lg">
            <span className="text-sm font-semibold text-blue-700">A - High Value</span>
          </div>
        </div>
        {matrixData.slice(0, 3).map(renderCell)}

        {/* B Row */}
        <div className="flex items-center justify-end pr-4">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-purple-100 rounded-lg">
            <span className="text-sm font-semibold text-purple-700">B - Medium Value</span>
          </div>
        </div>
        {matrixData.slice(3, 6).map(renderCell)}

        {/* C Row */}
        <div className="flex items-center justify-end pr-4">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-gray-100 rounded-lg">
            <span className="text-sm font-semibold text-gray-700">C - Low Value</span>
          </div>
        </div>
        {matrixData.slice(6, 9).map(renderCell)}
      </div>
    </div>
  );
};

export default ABCXYZMatrix;