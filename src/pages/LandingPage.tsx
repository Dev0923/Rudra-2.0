import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mountain, Shield, Activity, TrendingUp, ArrowRight, MapPin } from 'lucide-react';

const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="relative z-10 pb-8 bg-transparent sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
            <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
              <div className="sm:text-center lg:text-left">
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  className="text-4xl tracking-tight font-extrabold text-gray-100 sm:text-5xl md:text-6xl"
                >
                  <span className="block xl:inline">Rockfall Risk</span>{' '}
                  <span className="block text-blue-400 xl:inline">Monitoring Platform</span>
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="mt-3 text-base text-gray-300 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0"
                >
                  Real-time AI-powered site risk prediction with actionable insights. 
                  Monitor geological hazards, predict rockfall events, and protect infrastructure with cutting-edge technology.
                </motion.p>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start"
                >
                  <div className="rounded-md shadow">
                    <Link
                      to="/dashboard"
                      className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 md:py-4 md:text-lg md:px-10 transition-colors duration-200"
                    >
                      Go to Dashboard
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </div>
                </motion.div>
              </div>
            </main>
          </div>
        </div>
        
        {/* Animated Map Preview */}
        <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="h-56 w-full sm:h-72 md:h-96 lg:w-full lg:h-full relative bg-gray-800 rounded-lg lg:rounded-none"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-gray-900/40 rounded-lg lg:rounded-none" />
            
            {/* Mock Map with Blinking Sites */}
            <div className="relative h-full w-full flex items-center justify-center">
              <div className="grid grid-cols-3 gap-8">
                {[
                  { color: 'bg-red-500', delay: 0 },
                  { color: 'bg-yellow-500', delay: 0.5 },
                  { color: 'bg-green-500', delay: 1 },
                  { color: 'bg-orange-500', delay: 1.5 },
                  { color: 'bg-red-500', delay: 2 },
                  { color: 'bg-green-500', delay: 2.5 },
                ].map((site, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0.3 }}
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{
                      duration: 2,
                      delay: site.delay,
                      repeat: Infinity,
                      repeatType: 'loop',
                    }}
                    className={`w-4 h-4 rounded-full ${site.color} shadow-lg`}
                  />
                ))}
              </div>
              
              {/* Map Labels */}
              <div className="absolute bottom-4 left-4 text-gray-300 text-sm">
                <div className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4" />
                  <span>Live Risk Monitoring</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-12 bg-gray-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-base text-blue-400 font-semibold tracking-wide uppercase"
            >
              Platform Features
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-100 sm:text-4xl"
            >
              Advanced Risk Assessment Technology
            </motion.p>
          </div>

          <div className="mt-10">
            <div className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
              {[
                {
                  icon: Shield,
                  title: 'Real-time Monitoring',
                  description: 'Continuous surveillance of geological conditions with AI-powered risk assessment algorithms.',
                },
                {
                  icon: Activity,
                  title: 'Multi-sensor Integration',
                  description: 'Combines data from rainfall, vibration, soil moisture, and slope sensors for comprehensive analysis.',
                },
                {
                  icon: TrendingUp,
                  title: 'Predictive Analytics',
                  description: 'Machine learning models predict rockfall events before they occur, enabling proactive measures.',
                },
                {
                  icon: Mountain,
                  title: 'Interactive Dashboard',
                  description: 'Intuitive map-based interface with customizable alerts and detailed site information.',
                },
              ].map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="relative"
                >
                  <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
                    <feature.icon className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <div className="ml-16">
                    <h3 className="text-lg leading-6 font-medium text-gray-100">{feature.title}</h3>
                    <p className="mt-2 text-base text-gray-300">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-blue-700">
        <div className="max-w-2xl mx-auto text-center py-16 px-4 sm:py-20 sm:px-6 lg:px-8">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl font-extrabold text-white sm:text-4xl"
          >
            <span className="block">Start monitoring your sites today.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-4 text-lg leading-6 text-blue-200"
          >
            Join infrastructure managers worldwide who trust our platform for geological risk assessment.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Link
              to="/dashboard"
              className="mt-8 w-full inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-blue-700 bg-white hover:bg-blue-50 sm:w-auto transition-colors duration-200"
            >
              Access Dashboard
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;