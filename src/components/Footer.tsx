import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 py-16 mt-auto border-t border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="md:col-span-2">
            <img 
              src="/logo.png" 
              alt="Logo" 
              className="h-24 w-auto max-w-[200px] object-contain mb-4"
              onError={(e) => {
                console.error('Logo failed to load');
                e.currentTarget.style.display = 'none';
              }}
            />
            <p className="text-gray-600 dark:text-gray-400 max-w-md leading-relaxed">
              Your trusted source for authentic Ayurvedic products and wellness solutions. 
              Experience natural healing through traditional wisdom.
            </p>
          </div>
          <div>
            <h4 className="text-base font-semibold mb-4 text-gray-900 dark:text-white">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/products" className="text-gray-600 dark:text-gray-400 hover:text-primary transition-colors text-sm">
                  Products
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-600 dark:text-gray-400 hover:text-primary transition-colors text-sm">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-600 dark:text-gray-400 hover:text-primary transition-colors text-sm">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/track-order" className="text-gray-600 dark:text-gray-400 hover:text-primary transition-colors text-sm">
                  Track Order
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-base font-semibold mb-4 text-gray-900 dark:text-white">Contact</h4>
            <ul className="space-y-3 text-sm">
              <li className="text-gray-600 dark:text-gray-400">
                <span className="font-medium">Email:</span> info@ayurveda.com
              </li>
              <li className="text-gray-600 dark:text-gray-400">
                <span className="font-medium">Phone:</span> +1 234 567 8900
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-200 dark:border-gray-800 mt-12 pt-8 text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            &copy; 2024 Ayurveda. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
