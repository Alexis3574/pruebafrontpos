'use client';

import HeaderView from '../components/HeaderView';
import HeroCard from '../components/cards/HeroCard';
import BenefitsCard from '../components/cards/BenefitsCard';
import Footer from '../components/Footer';

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <HeaderView />
      <main className="flex flex-col items-center px-4 py-8 gap-10">
        <div className="flex flex-col md:flex-row gap-6 max-w-6xl w-full">
          <div className="bg-gray-100 w-full md:w-1/2 h-64 flex items-center justify-center text-center">
            imagen llamativa
          </div>
          <HeroCard />
        </div>
        <BenefitsCard />
      </main>
      <Footer />
    </div>
  );
}
