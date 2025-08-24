import Navbar from '@/components/Navbar';
import Hero from '@/components/Home/Hero';
import SearchBox from '@/components/SearchBox';
import Info from '@/components/Home/Info';
import PopularDestinations from '@/components/Home/PopularDestinations';
import PopularPackages from '@/components/Home/PopularPackages';

export default function Home() {
  return (
    <main className="relative">
      <Navbar />
      <Hero />
      <SearchBox />
      <Info />
      <PopularDestinations />
      <PopularPackages />
      
      {/* Add other sections here as you build them */}
      <div className="h-96 bg-gray-100 flex items-center justify-center">
        <p className="text-2xl text-gray-600">More sections coming soon...</p>
      </div>
    </main>
  );
}