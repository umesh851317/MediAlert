import { useEffect, useState, useRef } from "react";
import {
  Search,
  Download,
  Eye,
  Printer,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import BillPreview from "./billPreview";

const BillingHistory = () => {
  const [bills, setBills] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedBill, setSelectedBill] = useState(null);

  const tableRef = useRef(null); // ✅ for scroll fix
  const itemsPerPage = 5;

  // 🔍 Filter
  const filteredBills = bills.filter((bill) => {
    const matchSearch =
      bill.billId?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      bill.customerName?.toLowerCase().includes(searchQuery.toLowerCase());

    const matchStatus =
      statusFilter === "all" || bill.paymentStatus === statusFilter;

    return matchSearch && matchStatus;
  });

  // 📄 Pagination
  const totalPages = Math.ceil(filteredBills.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;

  const paginatedBills = filteredBills.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  // 📡 Fetch API
  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const user = JSON.parse(sessionStorage.getItem("user"));

        const userId = user?.userId;
        const storeId = user?.storeId;

        const res = await fetch(
          "http://localhost:5000/api/billing/billHistory",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "user-id": userId,
              "store-id": storeId,
            },
          }
        );

        if (!res.ok) {
          throw new Error("API not found or server error");
        }

        const data = await res.json();

        // ✅ map backend data to UI format
        const formattedBills = (data?.bills || []).map((bill) => ({
          id: bill._id,
          billId: "INV-" + bill._id.slice(-4).toUpperCase(),
          customerName: "Walk-in",
          date: new Date(bill.createdAt).toLocaleDateString(),
          time: new Date(bill.createdAt).toLocaleTimeString(),
          amount: bill.totalAmount,
          paymentStatus: "paid",
          staffName: "Admin",
          items: bill.items || [],
        }));

        setBills(formattedBills);
      } catch (err) {
        console.error("Fetch error:", err);
      }
    };

    fetchHistory();
  }, []);

  // ✅ Scroll to table when page changes
  useEffect(() => {
    if (tableRef.current) {
      tableRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [currentPage]);

  return (
    <div className="space-y-6">
      {/* 🔍 Search + Filter */}
      <div className="bg-white p-4 rounded-xl shadow flex flex-col md:flex-row gap-3">
        <div className="flex items-center border rounded-lg px-3 w-full">
          <Search className="w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search bill or customer..."
            className="w-full p-2 outline-none"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <select
          className="border rounded-lg px-3 py-2"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="all">All</option>
          <option value="paid">Paid</option>
          <option value="pending">Pending</option>
        </select>

        <button className="border px-3 py-2 rounded-lg flex items-center gap-1">
          <Download size={16} /> Export
        </button>
      </div>

      {/* 📊 Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-xl shadow">
          <p className="text-sm text-gray-500">Total Bills</p>
          <p className="text-xl font-bold">{filteredBills.length}</p>
        </div>

        <div className="bg-white p-4 rounded-xl shadow">
          <p className="text-sm text-gray-500">Revenue</p>
          <p className="text-xl font-bold">
            ₹
            {filteredBills
              .reduce((sum, b) => sum + (b.amount || 0), 0)
              .toFixed(2)}
          </p>
        </div>

        <div className="bg-white p-4 rounded-xl shadow">
          <p className="text-sm text-gray-500">Pending</p>
          <p className="text-xl font-bold text-orange-500">
            {
              filteredBills.filter((b) => b.paymentStatus === "pending")
                .length
            }
          </p>
        </div>
      </div>

      {/* 📋 Table */}
      <div
        ref={tableRef}
        className="bg-white rounded-xl shadow overflow-x-auto"
      >
        <table className="w-full min-w-[700px]">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">Bill ID</th>
              <th className="text-left">Customer</th>
              <th className="text-left">Date</th>
              <th className="text-left">Amount</th>
              <th className="text-left">Status</th>
              <th className="text-left">Bill by</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {paginatedBills.length === 0 ? (
              <tr>
                <td colSpan="7" className="text-center py-10 text-gray-500">
                  No data found
                </td>
              </tr>
            ) : (
              paginatedBills.map((bill) => (
                <tr key={bill.id} className="border-t text-center">
                  <td className="text-left p-2 text-blue-600">
                    {bill.billId}
                  </td>
                  <td className="text-left">{bill.customerName}</td>
                  <td className="text-left">
                    {bill.date}
                    <br />
                    <span className="text-sm text-gray-500">
                      {bill.time}
                    </span>
                  </td>
                  <td className="text-left">₹{bill.amount}</td>
                  <td className="text-left">
                    <span className="px-2 py-1 rounded text-sm bg-green-100 text-green-600">
                      {bill.paymentStatus}
                    </span>
                  </td>
                  <td className="text-left">{bill.staffName}</td>
                  <td className="flex justify-center gap-2 py-2">
                    <Eye
                      className="cursor-pointer text-blue-600"
                      size={16}
                      onClick={() => setSelectedBill(bill)}
                    />
                    <Printer className="cursor-pointer" size={16} />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* 📄 Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-between items-center">
          <p className="text-sm">
            Showing {startIndex + 1} to{" "}
            {Math.min(startIndex + itemsPerPage, filteredBills.length)}
          </p>

          <div className="flex gap-2">
            <button
              onClick={() => setCurrentPage((prev) => prev - 1)}
              disabled={currentPage === 1}
              className="border px-2 py-1 rounded"
            >
              <ChevronLeft size={16} />
            </button>

            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`px-3 py-1 border rounded ${currentPage === i + 1 ? "bg-blue-600 text-white" : ""
                  }`}
              >
                {i + 1}
              </button>
            ))}

            <button
              onClick={() => setCurrentPage((prev) => prev + 1)}
              disabled={currentPage === totalPages}
              className="border px-2 py-1 rounded"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      )}
      {selectedBill &&
        (<div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center">
          <div className="bg-white p-6 rounded w-[600px] max-h-[90vh] overflow-y-auto"> <BillPreview bill={selectedBill} /> <button onClick={() => setSelectedBill(null)} className="mt-4 w-full bg-red-500 text-white py-2 rounded" > Close </button>
          </div> </div>)}
    </div>
  );
};

export default BillingHistory;