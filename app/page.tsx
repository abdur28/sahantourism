import Navbar from '@/components/Navbar';
import Hero from '@/components/Home/Hero';

export default function Home() {
  return (
    <main className="relative">
      <Navbar />
      <Hero />
      
      {/* Add other sections here as you build them */}
      <div className="h-96 bg-gray-100 flex items-center justify-center">
        <p className="text-2xl text-gray-600">More sections coming soon...</p>
      </div>
    </main>
  );
}