import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ShoppingCart, Menu, X, Sun, Moon, User, LogOut, ChevronDown } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useCart } from '../hooks/useCart';
import { useTheme } from '../contexts/ThemeContext';
import { checkAdminAuth, logout, clearAuthCache } from '../utils/adminAuth';


const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [authState, setAuthState] = useState<{ authenticated: boolean; isAdmin?: boolean; user?: any } | null>(null);
  const { itemCount } = useCart();
  const { theme, toggleTheme } = useTheme();

  const isActive = (path: string) => location.pathname === path;

  useEffect(() => {
    const loadAuth = async () => {
      const auth = await checkAdminAuth();
      setAuthState(auth);
    };
    loadAuth();
    
    // Refresh auth state when location changes (e.g., after login)
    const handleLocationChange = () => {
      loadAuth();
    };
    window.addEventListener('focus', handleLocationChange);
    
    // Refresh auth state periodically
    const interval = setInterval(loadAuth, 30000); // Check every 30 seconds
    return () => {
      clearInterval(interval);
      window.removeEventListener('focus', handleLocationChange);
    };
  }, [location.pathname]);

  // Close user menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuOpen && !(event.target as Element).closest('.user-menu-container')) {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [userMenuOpen]);

  const handleLogout = async () => {
    await logout();
    clearAuthCache();
    setAuthState({ authenticated: false });
    setUserMenuOpen(false);
    navigate('/');
  };

  return (
    <nav className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md sticky top-0 z-50 border-b border-gray-200/50 dark:border-gray-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group hover:opacity-80 transition-opacity">
            <img 
              src="/logo.png" 
              alt="Logo" 
              className="h-24 w-auto max-w-[200px] object-contain"
              onError={(e) => {
                console.error('Logo failed to load');
                e.currentTarget.style.display = 'none';
              }}
            />
          </Link>

          {/* Centered Navigation Links */}
          <div className="hidden md:flex items-center space-x-1 absolute left-1/2 transform -translate-x-1/2">
            <Link
              to="/"
              className={`px-4 py-2 rounded-lg transition-colors font-medium text-sm ${
                isActive('/') 
                  ? 'text-primary bg-teal-50 dark:bg-teal-900/20' 
                  : 'text-gray-700 dark:text-gray-300 hover:text-primary hover:bg-gray-50 dark:hover:bg-gray-800/50'
              }`}
            >
              Home
            </Link>
            <Link
              to="/products"
              className={`px-4 py-2 rounded-lg transition-colors font-medium text-sm ${
                isActive('/products') 
                  ? 'text-primary bg-teal-50 dark:bg-teal-900/20' 
                  : 'text-gray-700 dark:text-gray-300 hover:text-primary hover:bg-gray-50 dark:hover:bg-gray-800/50'
              }`}
            >
              Shop
            </Link>
            <Link
              to="/track-order"
              className={`px-4 py-2 rounded-lg transition-colors font-medium text-sm ${
                isActive('/track-order') 
                  ? 'text-primary bg-teal-50 dark:bg-teal-900/20' 
                  : 'text-gray-700 dark:text-gray-300 hover:text-primary hover:bg-gray-50 dark:hover:bg-gray-800/50'
              }`}
            >
              Track Order
            </Link>
            <Link
              to="/about"
              className={`px-4 py-2 rounded-lg transition-colors font-medium text-sm ${
                isActive('/about') 
                  ? 'text-primary bg-teal-50 dark:bg-teal-900/20' 
                  : 'text-gray-700 dark:text-gray-300 hover:text-primary hover:bg-gray-50 dark:hover:bg-gray-800/50'
              }`}
            >
              About
            </Link>
            <Link
              to="/contact"
              className={`px-4 py-2 rounded-lg transition-colors font-medium text-sm ${
                isActive('/contact') 
                  ? 'text-primary bg-teal-50 dark:bg-teal-900/20' 
                  : 'text-gray-700 dark:text-gray-300 hover:text-primary hover:bg-gray-50 dark:hover:bg-gray-800/50'
              }`}
            >
              Contact
            </Link>
          </div>

          {/* Right-aligned Icons */}
          <div className="hidden md:flex items-center space-x-3">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-gray-700 dark:text-gray-300"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </button>
            <Link
              to="/cart"
              className="relative p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-gray-700 dark:text-gray-300"
            >
              <ShoppingCart className="w-5 h-5" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-semibold">
                  {itemCount}
                </span>
              )}
            </Link>
            
            {/* User Menu or Sign In Button */}
            {authState?.authenticated ? (
              <div className="relative user-menu-container">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center space-x-2 bg-gray-50 dark:bg-gray-800 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors border border-gray-200 dark:border-gray-700"
                >
                  {authState.user?.picture ? (
                    <img
                      src={authState.user.picture}
                      alt={authState.user.name || 'User'}
                      className="w-6 h-6 rounded-full"
                    />
                  ) : (
                    <User className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                  )}
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300 hidden sm:block">
                    {authState.user?.name || 'User'}
                  </span>
                  <ChevronDown className="w-4 h-4 text-gray-700 dark:text-gray-300" />
                </button>
                
                {userMenuOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 py-2 z-50">
                    <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                      <p className="text-sm font-semibold text-gray-900 dark:text-white">
                        {authState.user?.name || 'User'}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        {authState.user?.email}
                      </p>
                      {authState.isAdmin && (
                        <span className="inline-block mt-2 text-xs bg-primary text-white px-2 py-1 rounded-md font-medium">
                          Admin
                        </span>
                      )}
                    </div>
                    {authState.isAdmin && (
                      <Link
                        to="/admin/dashboard"
                        className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                        onClick={() => setUserMenuOpen(false)}
                      >
                        Admin Dashboard
                      </Link>
                    )}
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 flex items-center space-x-2 transition-colors"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Logout</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className="bg-primary text-white px-5 py-2 rounded-lg font-medium hover:bg-secondary transition-colors shadow-sm hover:shadow"
              >
                Sign In
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-gray-700 dark:text-gray-300"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </button>
            <button
              className="p-2 text-gray-700 dark:text-gray-300"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 space-y-3 animate-slide-up border-t border-gray-100 dark:border-gray-800">
            <Link
              to="/"
              className="block text-gray-700 dark:text-gray-300 hover:text-primary transition-colors px-2 py-1"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/products"
              className="block text-gray-700 dark:text-gray-300 hover:text-primary transition-colors px-2 py-1"
              onClick={() => setIsOpen(false)}
            >
              Shop
            </Link>
            <Link
              to="/track-order"
              className="block text-gray-700 dark:text-gray-300 hover:text-primary transition-colors px-2 py-1"
              onClick={() => setIsOpen(false)}
            >
              Track Order
            </Link>
            <Link
              to="/about"
              className="block text-gray-700 dark:text-gray-300 hover:text-primary transition-colors px-2 py-1"
              onClick={() => setIsOpen(false)}
            >
              About
            </Link>
            <Link
              to="/contact"
              className="block text-gray-700 dark:text-gray-300 hover:text-primary transition-colors px-2 py-1"
              onClick={() => setIsOpen(false)}
            >
              Contact
            </Link>
            <Link
              to="/cart"
              className="flex items-center space-x-2 text-gray-700 dark:text-gray-300 hover:text-primary transition-colors px-2 py-1"
              onClick={() => setIsOpen(false)}
            >
              <ShoppingCart className="w-5 h-5" />
              <span>Cart {itemCount > 0 && `(${itemCount})`}</span>
            </Link>
            
            {/* Mobile User Menu or Sign In */}
            {authState?.authenticated ? (
              <>
                <div className="px-2 py-2 border-t border-gray-200 dark:border-gray-700 mt-2">
                  <div className="flex items-center space-x-2 mb-2">
                    {authState.user?.picture ? (
                      <img
                        src={authState.user.picture}
                        alt={authState.user.name || 'User'}
                        className="w-8 h-8 rounded-full"
                      />
                    ) : (
                      <User className="w-6 h-6 text-gray-700 dark:text-gray-300" />
                    )}
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        {authState.user?.name || 'User'}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {authState.user?.email}
                      </p>
                    </div>
                  </div>
                  {authState.isAdmin && (
                    <Link
                      to="/admin/dashboard"
                      className="block text-gray-700 dark:text-gray-300 hover:text-primary transition-colors px-2 py-1 mb-2"
                      onClick={() => setIsOpen(false)}
                    >
                      Admin Dashboard
                    </Link>
                  )}
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsOpen(false);
                    }}
                    className="w-full text-left text-red-600 dark:text-red-400 px-2 py-1 flex items-center space-x-2"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Logout</span>
                  </button>
                </div>
              </>
            ) : (
              <Link
                to="/login"
                className="block bg-primary text-white px-4 py-2 rounded-lg font-medium text-center mt-4"
                onClick={() => setIsOpen(false)}
              >
                Sign In
              </Link>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
