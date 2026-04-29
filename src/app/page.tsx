'use client';

import Header from '../components/Header';
import LeftSidebar from '../components/LeftSidebar';
import MainContent from '../components/MainContent';
import RightSidebar from '../components/RightSidebar';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex gap-6 items-start">
          <div className="w-64 flex-shrink-0">
            <LeftSidebar />
          </div>
          <div className="flex-1">
            <MainContent />
          </div>
          <div className="w-64 flex-shrink-0">
            <RightSidebar />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
