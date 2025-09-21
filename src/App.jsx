import React from "react";
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import ShortnerApi from './components/ShortnerApi';

const App = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 dark:from-gray-900 dark:to-gray-800">
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <main className="flex-grow flex items-center justify-center px-4 py-20">
        <div className="w-full max-w-3xl"> {/* ✅ Control max width */}
          <ShortnerApi />
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  )
}

export default App;
