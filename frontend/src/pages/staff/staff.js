import React, { useState } from 'react';
import NavBar from '../../components/navbar/Navbar';

const Staff = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <main className="flex flex-col h-screen w-full overflow-hidden">
      <nav className="fixed top-0 left-0 w-full h-16 z-50 bg-white shadow">
        <NavBar toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
      </nav>

      <section className="pt-20 p-6 bg-gray-50 min-h-screen">
        <h1 className="text-3xl font-bold">Staff Dashboard</h1>
        <p className="text-gray-600 mt-2">Welcome to the staff panel.</p>
      </section>
    </main>
  );
};

export default Staff;