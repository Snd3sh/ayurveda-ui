import { Link } from 'react-router-dom';
import { ArrowRight, Leaf, Heart, Shield, Sparkles } from 'lucide-react';
import { useEffect } from 'react';
import { clearAuthCache } from '../utils/adminAuth';

const Home = () => {
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

  return (
    <div className="animate-fade-in">
      {/* Hero Section - Clean & Minimal */}
      <section className="relative min-h-[85vh] flex items-center bg-gradient-to-b from-white via-teal-50/20 to-white dark:from-gray-900 dark:via-gray-900 dark:to-gray-900 overflow-hidden">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full py-20">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal-50 dark:bg-teal-900/20 border border-teal-100 dark:border-teal-800/50 text-sm text-primary font-medium">
              <Sparkles className="w-4 h-4" />
              <span>Authentic Ayurvedic Products</span>
            </div>

            {/* Main Heading */}
            <div className="space-y-6">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-tight">
                <span className="text-gray-900 dark:text-white">Natural Wellness</span>
                <br />
                <span className="text-primary">Rooted in Tradition</span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 leading-relaxed max-w-2xl mx-auto">
                Experience the healing power of nature with our premium collection of authentic Ayurvedic products, 
                backed by <span className="text-primary font-semibold">5,000 years</span> of traditional wisdom.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Link
                to="/products"
                className="group inline-flex items-center justify-center bg-primary text-white px-8 py-4 rounded-xl font-semibold hover:bg-secondary transition-all duration-200 shadow-md hover:shadow-lg"
              >
                <span>Explore Products</span>
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/about"
                className="inline-flex items-center justify-center bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 px-8 py-4 rounded-xl font-semibold hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-all duration-200"
              >
                Learn More
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 pt-12 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-1">500+</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Products</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-1">4.9</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Rating</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-1">50K+</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Customers</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
              Why Choose Us
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              We are committed to bringing you the finest Ayurvedic products
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-10 bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-800 hover:border-primary/20 dark:hover:border-primary/20 transition-all duration-200 group">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-teal-50 dark:bg-teal-900/20 rounded-2xl mb-6 group-hover:bg-teal-100 dark:group-hover:bg-teal-900/30 transition-colors">
                <Leaf className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">100% Natural</h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                All our products are made from pure, natural ingredients sourced from trusted suppliers.
              </p>
            </div>
            <div className="text-center p-10 bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-800 hover:border-primary/20 dark:hover:border-primary/20 transition-all duration-200 group">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-teal-50 dark:bg-teal-900/20 rounded-2xl mb-6 group-hover:bg-teal-100 dark:group-hover:bg-teal-900/30 transition-colors">
                <Heart className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">Wellness Focused</h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Designed to promote holistic health and well-being through ancient Ayurvedic wisdom.
              </p>
            </div>
            <div className="text-center p-10 bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-800 hover:border-primary/20 dark:hover:border-primary/20 transition-all duration-200 group">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-teal-50 dark:bg-teal-900/20 rounded-2xl mb-6 group-hover:bg-teal-100 dark:group-hover:bg-teal-900/30 transition-colors">
                <Shield className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">Quality Assured</h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
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
