import { useState } from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    alert('Thank you for your message! We will get back to you soon.');
    setFormData({ name: '', email: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 text-gray-900 dark:text-white">Contact Us</h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">We'd love to hear from you</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white dark:bg-gray-800 p-10 rounded-2xl border border-gray-200 dark:border-gray-800">
            <h2 className="text-3xl font-bold mb-8 text-primary">Get in Touch</h2>
            <div className="space-y-6">
              <div className="flex items-start gap-4 p-4 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors">
                <div className="flex-shrink-0 w-12 h-12 bg-teal-50 dark:bg-teal-900/20 rounded-xl flex items-center justify-center border border-teal-100 dark:border-teal-800/50">
                  <Mail className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-gray-900 dark:text-white mb-1">Email</h3>
                  <p className="text-gray-600 dark:text-gray-400">info@ayurveda.com</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors">
                <div className="flex-shrink-0 w-12 h-12 bg-teal-50 dark:bg-teal-900/20 rounded-xl flex items-center justify-center border border-teal-100 dark:border-teal-800/50">
                  <Phone className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-gray-900 dark:text-white mb-1">Phone</h3>
                  <p className="text-gray-600 dark:text-gray-400">+977 98794 32101</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors">
                <div className="flex-shrink-0 w-12 h-12 bg-teal-50 dark:bg-teal-900/20 rounded-xl flex items-center justify-center border border-teal-100 dark:border-teal-800/50">
                  <MapPin className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-gray-900 dark:text-white mb-1">Address</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Bhalupahad
                    <br />
                    Pokhara
                    <br />
                    India
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-800 p-10">
              <div className="mb-6">
                <label className="block font-semibold mb-2 text-gray-900 dark:text-white">Name</label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors"
                />
              </div>
              <div className="mb-6">
                <label className="block font-semibold mb-2 text-gray-900 dark:text-white">Email</label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors"
                />
              </div>
              <div className="mb-6">
                <label className="block font-semibold mb-2 text-gray-900 dark:text-white">Message</label>
                <textarea
                  name="message"
                  required
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors resize-none"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-primary text-white py-3 rounded-xl font-semibold hover:bg-secondary transition-all duration-200 shadow-md hover:shadow-lg"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;







