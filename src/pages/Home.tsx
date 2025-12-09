import { Link } from 'react-router-dom';
import { ArrowRight, Leaf, Heart, Shield, Play, Zap } from 'lucide-react';
import { useState, useEffect } from 'react';
import { clearAuthCache } from '../utils/adminAuth';

const Home = () => {
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });

  // Check for token in URL (from OAuth callback for non-admin users)
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const tokenFromUrl = urlParams.get('token');
    
    if (tokenFromUrl) {
      console.log('[Home] 🔑 Token found in URL, storing in localStorage');
      localStorage.setItem('auth_token', tokenFromUrl);
      console.log('[Home] ✅ Token stored in localStorage');
      
      // Remove token from URL
      window.history.replaceState({}, '', '/');
      
      // Clear auth cache to force fresh check
      clearAuthCache();
    }
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 100;
      const y = (e.clientY / window.innerHeight) * 100;
      setMousePosition({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="animate-fade-in">
      {/* Hero Section - Professional Medical Design */}
      <section className="relative bg-gradient-to-br from-slate-50 via-white to-teal-50/30 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 min-h-[90vh] flex items-center overflow-hidden">
        {/* Interactive Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Mouse-following gradient */}
          <div 
            className="absolute w-[800px] h-[800px] bg-primary/5 dark:bg-primary/10 rounded-full blur-3xl transition-all duration-700 ease-out"
            style={{
              left: `${mousePosition.x - 40}%`,
              top: `${mousePosition.y - 40}%`,
              transform: 'translate(-50%, -50%)',
            }}
          />

          {/* Animated Grid Pattern */}
          <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]">
            <div className="absolute inset-0" style={{
              backgroundImage: `linear-gradient(rgba(20, 184, 166, 0.1) 1px, transparent 1px),
                                linear-gradient(90deg, rgba(20, 184, 166, 0.1) 1px, transparent 1px)`,
              backgroundSize: '50px 50px',
              animation: 'gridMove 20s linear infinite'
            }}></div>
          </div>

          {/* Animated Pulse Rings */}
          <div className="absolute top-1/4 right-1/4 w-96 h-96 border border-primary/10 rounded-full animate-pulse-ring"></div>
          <div className="absolute bottom-1/4 left-1/4 w-72 h-72 border border-primary/10 rounded-full animate-pulse-ring" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] border border-primary/5 rounded-full animate-pulse-ring" style={{ animationDelay: '2s' }}></div>

          {/* Gradient Orbs */}
          <div 
            className="absolute top-0 right-0 w-[600px] h-[600px] bg-teal-200/20 dark:bg-teal-900/10 rounded-full blur-3xl transition-all duration-1000 scale-100 opacity-20"
            style={{ animation: 'float 20s ease-in-out infinite' }}
          />
          <div 
            className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-3xl transition-all duration-1000 scale-100 opacity-15"
            style={{ animationDelay: '2s', animation: 'float 25s ease-in-out infinite' }}
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Interactive Content */}
            <div className="space-y-8 animate-fade-in-up">
              {/* Interactive Main Heading */}
              <div className="space-y-4">
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
                  <span 
                    className="text-gray-900 dark:text-white block hover:text-primary transition-colors duration-300 cursor-default"
                    style={{
                      transform: `translate(${(mousePosition.x - 50) * 0.01}px, ${(mousePosition.y - 50) * 0.01}px)`,
                      transition: 'transform 0.1s ease-out'
                    }}
                  >
                    Authentic
                  </span>
                  <span 
                    className="text-primary block bg-gradient-to-r from-primary via-teal-400 to-primary bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient hover:scale-105 transition-transform duration-300 cursor-default"
                    style={{
                      transform: `translate(${(mousePosition.x - 50) * -0.01}px, ${(mousePosition.y - 50) * -0.01}px)`,
                      transition: 'transform 0.1s ease-out'
                    }}
                  >
                    Ayurvedic Wellness
                  </span>
                </h1>
                <div className="w-24 h-1.5 bg-gradient-to-r from-primary to-teal-400 rounded-full animate-pulse hover:w-32 transition-all duration-300"></div>
              </div>

              {/* Enhanced Description */}
              <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 leading-relaxed max-w-xl">
                Experience the healing power of nature with our premium collection of authentic Ayurvedic products, 
                backed by <span className="text-primary font-semibold">5,000 years</span> of traditional wisdom and modern quality assurance.
              </p>

              {/* Interactive Stats Cards */}
              <div className="grid grid-cols-3 gap-4 pt-6">
                <div className="group bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-xl p-4 border border-primary/10 hover:border-primary/30 hover:shadow-lg transition-all duration-300 cursor-pointer hover:scale-105">
                  <div className="text-2xl font-bold text-primary mb-1 group-hover:scale-110 transition-transform">500+</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">Products</div>
                </div>
                <div className="group bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-xl p-4 border border-primary/10 hover:border-primary/30 hover:shadow-lg transition-all duration-300 cursor-pointer hover:scale-105">
                  <div className="text-2xl font-bold text-primary mb-1 group-hover:scale-110 transition-transform">
                    4.9
                  </div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">Rating</div>
                </div>
                <div className="group bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-xl p-4 border border-primary/10 hover:border-primary/30 hover:shadow-lg transition-all duration-300 cursor-pointer hover:scale-105">
                  <div className="text-2xl font-bold text-primary mb-1 group-hover:scale-110 transition-transform">50K+</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">Customers</div>
                </div>
              </div>

              {/* Enhanced CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link
                  to="/products"
                  className="group relative inline-flex items-center justify-center bg-primary text-white px-8 py-4 rounded-lg font-semibold hover:bg-secondary transition-all duration-300 shadow-lg hover:shadow-2xl hover:scale-105 transform overflow-hidden"
                >
                  <span className="relative z-10 flex items-center">
                    Explore Products
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-primary via-teal-400 to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </Link>
                <Link
                  to="/about"
                  className="group inline-flex items-center justify-center bg-white dark:bg-gray-800 text-primary border-2 border-primary px-8 py-4 rounded-lg font-semibold hover:bg-primary hover:text-white dark:hover:bg-primary transition-all duration-300 hover:scale-105 transform shadow-md hover:shadow-lg"
                >
                  <Play className="mr-2 w-4 h-4 group-hover:scale-110 transition-transform" />
                  Learn More
                </Link>
              </div>

              {/* Trust Indicators */}
              <div className="flex flex-wrap items-center gap-6 pt-4 text-sm">
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                  <Zap className="w-4 h-4 text-primary" />
                  <span>Fast Delivery</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                  <Shield className="w-4 h-4 text-primary" />
                  <span>Secure Payment</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                  <Heart className="w-4 h-4 text-primary" />
                  <span>100% Natural</span>
                </div>
              </div>
            </div>

            {/* Right Column - Interactive Visual */}
            <div className="hidden lg:block relative h-[600px]">
              {/* Floating Cards with Hover Effects */}
              <div className="relative w-full h-full">
                {/* Main Card */}
                <div 
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-80 bg-gradient-to-br from-primary/20 to-teal-400/20 dark:from-primary/30 dark:to-teal-400/30 rounded-3xl backdrop-blur-md border border-primary/20 shadow-2xl hover:scale-105 transition-all duration-500 cursor-pointer group"
                  style={{
                    transform: `translate(-50%, -50%) rotate(${(mousePosition.x - 50) * 0.1}deg)`,
                    transition: 'transform 0.3s ease-out'
                  }}
                >
                  <div className="p-8 h-full flex flex-col justify-center items-center">
                    <Leaf className="w-20 h-20 text-primary mb-4 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300" />
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Natural Healing</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 text-center">Ancient wisdom meets modern wellness</p>
                  </div>
                </div>

                {/* Floating Icon Cards */}
                <div 
                  className="absolute top-10 right-10 w-20 h-20 bg-white dark:bg-gray-800 rounded-2xl shadow-xl flex items-center justify-center border border-primary/10 hover:scale-110 hover:rotate-12 transition-all duration-300 cursor-pointer group"
                  style={{
                    animation: 'float 4s ease-in-out infinite',
                    animationDelay: '0s'
                  }}
                >
                  <Heart className="w-10 h-10 text-primary group-hover:scale-125 transition-transform" />
                </div>

                <div 
                  className="absolute bottom-20 left-10 w-24 h-24 bg-white dark:bg-gray-800 rounded-2xl shadow-xl flex items-center justify-center border border-primary/10 hover:scale-110 hover:-rotate-12 transition-all duration-300 cursor-pointer group"
                  style={{
                    animation: 'float 5s ease-in-out infinite',
                    animationDelay: '1s'
                  }}
                >
                  <Shield className="w-12 h-12 text-primary group-hover:scale-125 transition-transform" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
              Why Choose Us
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              We are committed to bringing you the finest Ayurvedic products
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 dark:border-gray-700 hover:scale-105 transform group">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-teal-100 dark:bg-teal-900 rounded-full mb-6 group-hover:bg-teal-200 dark:group-hover:bg-teal-800 transition-colors">
                <Leaf className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">100% Natural</h3>
              <p className="text-gray-600 dark:text-gray-400">
                All our products are made from pure, natural ingredients sourced from trusted suppliers.
              </p>
            </div>
            <div className="text-center p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 dark:border-gray-700 hover:scale-105 transform group">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-teal-100 dark:bg-teal-900 rounded-full mb-6 group-hover:bg-teal-200 dark:group-hover:bg-teal-800 transition-colors">
                <Heart className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">Wellness Focused</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Designed to promote holistic health and well-being through ancient Ayurvedic wisdom.
              </p>
            </div>
            <div className="text-center p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 dark:border-gray-700 hover:scale-105 transform group">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-teal-100 dark:bg-teal-900 rounded-full mb-6 group-hover:bg-teal-200 dark:group-hover:bg-teal-800 transition-colors">
                <Shield className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">Quality Assured</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Every product undergoes rigorous quality testing to ensure purity and effectiveness.
              </p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;
