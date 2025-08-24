import Hero from '@/components/home/Hero';
import SearchBox from '@/components/SearchBox';
import Info from '@/components/home/Info';
import PopularDestinations from '@/components/home/PopularDestinations';
import PopularPackages from '@/components/home/PopularPackages';

export default function Home() {
  return (
    <main className="relative">
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