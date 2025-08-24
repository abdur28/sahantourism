"use client";

import React from "react";
import { motion } from "framer-motion";
import { Award, MapPin, Shield, CheckCircle } from "lucide-react";

const features = [
  {
    icon: Award,
    title: "Award winning company",
    description: "We've received Certificate of Excellence award from TripAdvisor.",
    iconColor: "text-yellow-500",
    bgColor: "bg-yellow-50"
  },
  {
    icon: MapPin,
    title: "Local Experts",
    description: "When you book with us, you get the best price and a local expert guide.",
    iconColor: "text-green-500",
    bgColor: "bg-green-50"
  },
  {
    icon: Shield,
    title: "Trusted Payments",
    description: "Book via our secure payment platform. Enjoy flexible payment options.",
    iconColor: "text-blue-500",
    bgColor: "bg-blue-50"
  }
];

export default function Info() {
  return (
    <section className="pb-20 pt-10 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          
          {/* Main Content */}
          <div className="text-center mb-16">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-base text-gray-700 leading-relaxed max-w-3xl mx-auto"
            >
              As a dedicated tour operator, we provide customized travel experiences across Somalia and the Horn of Africa, ensuring seamless journeys. Our packages highlight top destinations, optimize routes, and offer affordable arrangements—always prioritizing reasonable pricing to make exploration accessible for all.
            </motion.p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 + (index * 0.1) }}
                  className="text-center group hover:scale-105 transition-transform duration-300"
                >
                  {/* Icon */}
                  <div className={`inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 ${feature.bgColor} rounded-2xl mb-6 group-hover:shadow-lg transition-shadow duration-300`}>
                    <IconComponent className={`w-6 h-6 md:w-8 md:h-8 ${feature.iconColor}`} />
                  </div>

                  {/* Title */}
                  <h3 className="text-base md:text-xl font-bold text-gray-800 mb-4 group-hover:text-blue-600 transition-colors duration-300">
                    {feature.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-600 leading-relaxed text-sm md:text-base">
                    {feature.description}
                  </p>
                </motion.div>
              );
            })}
          </div>

          {/* Trust Indicators */}
          {/* <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-16 pt-12 border-t border-gray-200"
          >
            <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
              <div className="flex items-center gap-3 text-gray-600">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span className="font-medium">Fully Licensed</span>
              </div>
              <div className="flex items-center gap-3 text-gray-600">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span className="font-medium">24/7 Support</span>
              </div>
              <div className="flex items-center gap-3 text-gray-600">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span className="font-medium">Best Price Guarantee</span>
              </div>
              <div className="flex items-center gap-3 text-gray-600">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span className="font-medium">Safe & Secure</span>
              </div>
            </div>
          </motion.div> */}

          {/* Call to Action */}
          {/* <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.0 }}
            className="text-center mt-12"
          >
            <div className="bg-white rounded-2xl shadow-lg p-8 max-w-2xl mx-auto">
              <h4 className="text-xl md:text-2xl font-bold text-gray-800 mb-4">
                Ready to Start Your Adventure?
              </h4>
              <p className="text-gray-600 mb-6">
                Let our local experts create the perfect journey for you across the Horn of Africa.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-full hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-lg hover:shadow-xl">
                  Contact Our Experts
                </button>
                <button className="px-6 py-3 border-2 border-blue-600 text-blue-600 font-semibold rounded-full hover:bg-blue-600 hover:text-white transition-all duration-300">
                  View All Tours
                </button>
              </div>
            </div>
          </motion.div> */}
        </div>
      </div>
    </section>
  );
}