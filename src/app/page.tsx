'use client';

import Header from '../components/Header';
import LeftSidebar from '../components/LeftSidebar';
import MainContent from '../components/MainContent';
import RightSidebar from '../components/RightSidebar';
import Footer from '../components/Footer';
import MobileNav from '../components/MobileNav';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="hidden lg:block w-64 flex-shrink-0">
            <LeftSidebar />
          </div>
          <div className="flex-1 min-w-0">
            <MainContent />
          </div>
          <div className="hidden xl:block w-64 flex-shrink-0">
            <RightSidebar />
          </div>
        </div>
      </div>

      <Footer />
      <MobileNav />
    </div>
  );
}
