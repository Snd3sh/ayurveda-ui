import { Leaf, Heart, Shield, Users } from 'lucide-react';

const About = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-gray-900 dark:text-white">
            About Ayurveda
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Discover the ancient wisdom of Ayurveda and experience natural healing through our
            authentic products.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          <div className="bg-white dark:bg-gray-800 p-10 rounded-2xl border border-gray-200 dark:border-gray-800">
            <h2 className="text-3xl font-bold mb-6 text-primary">What is Ayurveda?</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
              Ayurveda is a 5,000-year-old system of natural healing that originated in India. The
              word "Ayurveda" is derived from Sanskrit and means "the science of life."
            </p>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              This holistic approach to wellness focuses on maintaining balance between the mind,
              body, and spirit through natural remedies, proper diet, and lifestyle practices.
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-10 rounded-2xl border border-gray-200 dark:border-gray-800">
            <h2 className="text-3xl font-bold mb-6 text-primary">Our Mission</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
              Our mission is to make authentic Ayurvedic products accessible to everyone, helping
              people achieve optimal health and wellness through nature's healing power.
            </p>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              We source our ingredients from trusted suppliers and ensure every product meets the
              highest standards of quality and purity.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="text-center p-8 bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-800 group hover:border-primary/30 dark:hover:border-primary/30 transition-all duration-200">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-teal-50 dark:bg-teal-900/20 rounded-2xl mb-6 group-hover:bg-teal-100 dark:group-hover:bg-teal-900/30 transition-colors">
              <Leaf className="w-8 h-8 text-primary" />
            </div>
            <h3 className="font-semibold mb-3 text-lg text-gray-900 dark:text-white">Natural Ingredients</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
              All products are made from 100% natural, organic ingredients.
            </p>
          </div>
          <div className="text-center p-8 bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-800 group hover:border-primary/30 dark:hover:border-primary/30 transition-all duration-200">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-teal-50 dark:bg-teal-900/20 rounded-2xl mb-6 group-hover:bg-teal-100 dark:group-hover:bg-teal-900/30 transition-colors">
              <Heart className="w-8 h-8 text-primary" />
            </div>
            <h3 className="font-semibold mb-3 text-lg text-gray-900 dark:text-white">Holistic Wellness</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
              Promoting balance and harmony in mind, body, and spirit.
            </p>
          </div>
          <div className="text-center p-8 bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-800 group hover:border-primary/30 dark:hover:border-primary/30 transition-all duration-200">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-teal-50 dark:bg-teal-900/20 rounded-2xl mb-6 group-hover:bg-teal-100 dark:group-hover:bg-teal-900/30 transition-colors">
              <Shield className="w-8 h-8 text-primary" />
            </div>
            <h3 className="font-semibold mb-3 text-lg text-gray-900 dark:text-white">Quality Assured</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
              Rigorous testing ensures purity and effectiveness.
            </p>
          </div>
          <div className="text-center p-8 bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-800 group hover:border-primary/30 dark:hover:border-primary/30 transition-all duration-200">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-teal-50 dark:bg-teal-900/20 rounded-2xl mb-6 group-hover:bg-teal-100 dark:group-hover:bg-teal-900/30 transition-colors">
              <Users className="w-8 h-8 text-primary" />
            </div>
            <h3 className="font-semibold mb-3 text-lg text-gray-900 dark:text-white">Expert Guidance</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
              Backed by centuries of Ayurvedic knowledge and expertise.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
