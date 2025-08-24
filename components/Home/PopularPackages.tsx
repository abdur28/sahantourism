"use client";

import React from "react";
import { motion } from "framer-motion";
import { MapPin, Clock, Users, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import CustomButton from "../CustomButton";

const packages = [
  {
    id: "mogadishu-3days",
    title: "EXPLORE MOGADISHU 3 DAYS/2 NIGHTS",
    location: "MOGADISHU",
    duration: "3D/2N",
    description: "Mogadishu, the \"White Pearl of the Indian Ocean,\" offers adventurous travelers vibrant markets, rich history, and scenic beaches—all in one unforgettable experience.",
    originalPrice: 1200,
    currentPrice: 980,
    discount: 18,
    image: "https://images.unsplash.com/photo-1571771019784-3ff35f4f4277?q=80&w=2070&auto=format&fit=crop",
    rating: 4.5,
    reviews: 25
  },
  {
    id: "kooyame-bajuni",
    title: "OFF THE BEATEN PATH: EXPLORE KOOYAME IN THE BAJUNI ISLANDS",
    location: "KISMAYO, MOGADISHU",
    duration: "5D/4N",
    description: "Discover the unspoiled beauty of Kooyame, a hidden gem among Somalia's Bajuni Islands, recognized by NomadMania's DARE regions. Sahan Tourism's exclusive adventure awaits.",
    originalPrice: 3000,
    currentPrice: 2300,
    discount: 23,
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=2070&auto=format&fit=crop",
    rating: 4.8,
    reviews: 20
  },
  {
    id: "mogadishu-garowe-eyl",
    title: "EXPLORE MOGADISHU, GAROWE-EYL 5 DAYS, 4 NIGHTS",
    location: "MOGADISHU, PUNTLAND",
    duration: "5D/4N",
    description: "Enjoy a comprehensive trip through Somalia and Puntland. Visit Mogadishu, Garowe, and Eyl, exploring rich history, vibrant culture, and unique landscapes.",
    originalPrice: 2200,
    currentPrice: 2000,
    discount: 9,
    image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=2070&auto=format&fit=crop",
    rating: 4.3,
    reviews: 18
  }
];

const PackageCard = ({ pkg, index }: { pkg: any; index: number }) => {
  const handleBookNow = () => {
    // Navigate to booking page
    window.open(`/packages/${pkg.id}/book`, '_blank');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-white rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group"
    >
      <div className="flex flex-col md:flex-row md:h-80">
        {/* Image Section - Left */}
        <div className="relative md:w-[35%] h-44 md:h-full overflow-hidden">
          <img
            src={pkg.image}
            alt={pkg.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          
          {/* Discount Badge */}
          {pkg.discount && (
            <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded-full text-sm lg:text-sm font-bold">
              {pkg.discount}% Off
            </div>
          )}
        </div>

        {/* Content Section - Middle */}
        <div className=" md:w-[35%] h-44 md:h-full p-4 md:p-6 flex flex-col justify-between">
          {/* Title */}
          <div>
            <h3 className="font-bold text-sm md:text-base lg:text-base text-gray-800 mb-2 md:mb-3 leading-tight">
              {pkg.title}
            </h3>

            {/* Description */}
            <p className="text-gray-600 text-xs md:text-sm lg:text-sm line-clamp-2 md:line-clamp-3 mb-3 md:mb-4">
              {pkg.description}
            </p>
          </div>

          {/* Bottom Info */}
          <div className="flex items-center gap-3 md:gap-4 text-xs  text-gray-600">
            <div className="flex items-center gap-1">
              <Clock className="w-3 h-3 md:w-4 md:h-4 text-blue-500" />
              <span>{pkg.duration}</span>
            </div>
            <div className="flex items-center gap-1">
              <Users className="w-3 h-3 md:w-4 md:h-4 text-blue-500" />
              <span>pax: 10</span>
            </div>
            <div className="flex items-center gap-1">
              <MapPin className="w-3 h-3 md:w-4 md:h-4 text-blue-500" />
              <span>{pkg.location}</span>
            </div>
          </div>
        </div>

        {/* Price Section - Right */}
        <div className="md:w-[30%] h-48 md:h-full bg-gradient-to-br from-yellow-400 via-blue-500 to-blue-600 p-4 md:p-6 flex flex-col justify-between text-white shadow-lg">
          {/* Reviews and Rating */}
          <div className="text-center">
            <div className="text-xs md:text-sm opacity-90 mb-1">({pkg.reviews} reviews)</div>
            <div className="flex justify-center items-center gap-1 mb-3 md:mb-4">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`w-3 h-3 md:w-4 md:h-4 ${
                    star <= Math.floor(pkg.rating)
                      ? 'fill-yellow-300 text-yellow-300'
                      : 'fill-white/30 text-white/30'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Price */}
          <div className="text-center">
            {pkg.originalPrice && (
              <div className="text-xs  line-through opacity-75 mb-1">
                ${pkg.originalPrice.toLocaleString()}
              </div>
            )}
            <div className="text-xl md:text-3xl font-bold mb-1">
              ${pkg.currentPrice.toLocaleString()}
            </div>
            <div className="text-xs  opacity-90 mb-4">/ per person</div>

            {/* Book Now Button */}
            <Button
              onClick={handleBookNow}
              className="w-full bg-transparent  text-white border-2 border-white/30 hover:border-white/50 py-2 md:py-3 rounded-full font-semibold text-xs md:text-sm transition-all duration-300 backdrop-blur-sm shadow-lg hover:shadow-xl transform hover:scale-105"
              variant="outline"
            >
              BOOK NOW
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default function PopularPackages() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-blue-600 font-semibold text-xs uppercase tracking-wider mb-2"
          >
            Popular Packages
          </motion.p>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-2xl md:text-4xl font-bold text-gray-800 mb-6"
          >
            Checkout Our Packages
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-gray-600 max-w-2xl mx-auto text-base leading-relaxed"
          >
            Explore Somalia and the Horn of Africa with expertly crafted tours, featuring top destinations, 
            efficient routes, and affordable arrangements for a seamless travel experience.
          </motion.p>
        </div>

        {/* Package Cards */}
        <div className="space-y-6 md:space-y-8 mb-12 max-w-6xl mx-auto">
          {packages.map((pkg, index) => (
            <PackageCard key={pkg.id} pkg={pkg} index={index} />
          ))}
        </div>

        {/* View All Packages Button */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="text-center"
        >
          <CustomButton>
            View All Packages
          </CustomButton>
        </motion.div>
      </div>
    </section>
  );
}