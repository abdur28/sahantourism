"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Carousel } from "@/components/ui/apple-cards-carousel";
import { motion } from "framer-motion";
import { MapPin, Users, Star, Camera } from "lucide-react";

// Custom Card component for destinations with navigation
const DestinationCard = ({
  destination,
  index,
}: {
  destination: any;
  index: number;
}) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/destinations/${destination.id}`);
  };

  return (
    <motion.button
      onClick={handleClick}
      className="relative z-10 flex h-80 w-56 flex-col items-start justify-start overflow-hidden rounded-3xl bg-gray-100 md:h-[40rem] md:w-96 dark:bg-neutral-900 hover:scale-105 transition-transform duration-300"
      whileHover={{ y: -5 }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Gradient overlay */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-30 h-full bg-gradient-to-b from-black/50 via-transparent to-transparent" />
      
      {/* Content */}
      <div className="relative z-40 p-6 md:p-8 h-full flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <MapPin className="w-4 h-4 text-white/80" />
            <p className="text-left font-sans text-sm font-medium text-white/80 md:text-base">
              {destination.country}
            </p>
          </div>
          <h3 className="text-left font-sans text-xl font-bold text-white md:text-3xl mb-2">
            {destination.title}
          </h3>
          <p className="text-left text-sm text-white/90 md:text-base line-clamp-3">
            {destination.description}
          </p>
        </div>
      </div>

      {/* Background image */}
      <img
        src={destination.src}
        alt={destination.title}
        className="absolute inset-0 z-10 h-full w-full object-cover"
      />
    </motion.button>
  );
};

export default function PopularDestinations() {
  const destinations = [
    {
      id: "djibouti",
      country: "East Africa",
      title: "Djibouti",
      description: "Discover the unique landscapes of the Horn of Africa, from salt lakes to volcanic formations and pristine coastlines.",
      src: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?q=80&w=2070&auto=format&fit=crop",
    },
    {
      id: "eritrea",
      country: "East Africa", 
      title: "Eritrea",
      description: "Explore ancient architecture, beautiful highlands, and the stunning Red Sea coastline in this hidden gem.",
      src: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?q=80&w=2070&auto=format&fit=crop",
    },
    {
      id: "kismayo",
      country: "Somalia",
      title: "Kismayo",
      description: "Experience the coastal charm of southern Somalia with pristine beaches and rich maritime heritage.",
      src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=2070&auto=format&fit=crop",
    },
    {
      id: "mogadishu",
      country: "Somalia",
      title: "Mogadishu",
      description: "Discover the capital's resilient spirit, historic landmarks, and beautiful Indian Ocean beaches.",
      src: "https://images.unsplash.com/photo-1571771019784-3ff35f4f4277?q=80&w=2070&auto=format&fit=crop",
    },
    {
      id: "puntland",
      country: "Somalia",
      title: "Puntland",
      description: "Journey through dramatic coastlines, ancient trade routes, and traditional Somali culture in the northeast.",
      src: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=2070&auto=format&fit=crop",
    },
    {
      id: "somaliland",
      country: "East Africa",
      title: "Somaliland",
      description: "Explore cave paintings, mountain ranges, and vibrant markets in this self-declared republic with rich heritage.",
      src: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=2070&auto=format&fit=crop",
    },
    {
      id: "south-sudan",
      country: "East Africa",
      title: "South Sudan",
      description: "Adventure through untouched wilderness, diverse wildlife, and the majestic White Nile in Africa's newest nation.",
      src: "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?q=80&w=2070&auto=format&fit=crop",
    },
  ];

  const cards = destinations.map((destination, index) => (
    <DestinationCard
      key={destination.id}
      destination={destination}
      index={index}
    />
  ));

  return (
    <div className="w-full h-full py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <p className="text-blue-600 font-semibold text-sm uppercase tracking-wider mb-2">
            Uncover Places
          </p>
          <h2 className="text-3xl md:text-5xl font-bold text-gray-800 dark:text-neutral-200 font-sans mb-4">
            Popular Destinations
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            {`Discover Somalia’s rich history, South Sudan’s culture, Djibouti’s landscapes, Eritrea’s charm, and Kenya’s wildlife. Adventure awaits!`}
          </p>
        </div>
      </div>
      <Carousel items={cards} />
    </div>
  );
}