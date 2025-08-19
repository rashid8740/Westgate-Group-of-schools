'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Users, Award, TrendingUp, Clock } from 'lucide-react';

const stats = [
  { 
    icon: Users, 
    number: '1,200+', 
    label: 'Students',
    color: 'text-blue-600'
  },
  { 
    icon: Clock, 
    number: '28+', 
    label: 'Years',
    color: 'text-green-600'
  },
  { 
    icon: TrendingUp, 
    number: '98%', 
    label: 'Success Rate',
    color: 'text-purple-600'
  },
];

export const QuickStats: React.FC = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="font-display font-bold text-2xl md:text-3xl text-charcoal-black mb-4">
            Excellence in Numbers
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Over two decades of academic excellence and character development
          </p>
        </motion.div>

        <div className="grid grid-cols-3 gap-6 text-center">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group"
              >
                <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100">
                  <div className={`w-12 h-12 ${stat.color} bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                  <div className="text-2xl md:text-3xl font-bold text-charcoal-black mb-2">
                    {stat.number}
                  </div>
                  <div className="text-gray-600 text-sm font-medium">
                    {stat.label}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Trust Indicators */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-12 text-center"
        >
          <div className="flex justify-center items-center space-x-8 text-sm text-gray-500">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>Cambridge Certified</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span>IGCSE Centre</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <span>A-Level Programme</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default QuickStats;
