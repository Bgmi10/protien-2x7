import { motion } from 'framer-motion';
import { Heart, Target, Users, Award, Utensils, Shield } from 'lucide-react';

export default function About() {
  return (
    <div className="pt-20 pb-16 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
            The Story of
            <span className="block bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
              Protein2x7
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Born from a passion for balanced nutrition and the belief that everyone deserves access to 
            fresh, protein-rich meals that fuel their fitness journey and transform their lives.
          </p>
        </motion.div>

        {/* Mission & Vision */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-2xl p-8"
          >
            <div className="flex items-center mb-6">
              <Target className="h-8 w-8 text-blue-600 mr-3" />
              <h2 className="text-3xl font-bold text-gray-900">Our Mission</h2>
            </div>
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              To revolutionize how people approach nutrition by delivering fresh, hygienic, and 
              scientifically-balanced protein meals twice daily, seven days a week.
            </p>
            <p className="text-gray-600">
              We believe that consistent, high-quality protein intake is the foundation of physical 
              fitness, mental well-being, and long-term health success.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="bg-gradient-to-r from-green-50 to-green-100 rounded-2xl p-8"
          >
            <div className="flex items-center mb-6">
              <Heart className="h-8 w-8 text-green-600 mr-3" />
              <h2 className="text-3xl font-bold text-gray-900">Our Vision</h2>
            </div>
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              To create a world where balanced nutrition is accessible, convenient, and enjoyable 
              for everyone pursuing a healthier lifestyle.
            </p>
            <p className="text-gray-600">
              We envision communities where optimal protein intake becomes as natural as drinking 
              water, leading to stronger bodies, sharper minds, and happier lives.
            </p>
          </motion.div>
        </div>

        {/* Why Balanced Nutrition */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="bg-white rounded-2xl shadow-xl p-8 mb-16"
        >
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
            Why Balanced Nutrition Matters
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Utensils className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">The Silent Crisis</h3>
              <p className="text-gray-600">
                In today's diet, 80-90% of our intake comes from carbohydrates while protein remains 
                dangerously low. This imbalance silently affects body composition and energy levels.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">The 1:3 Rule</h3>
              <p className="text-gray-600">
                Our approach follows the optimal 1:3 protein-to-carb ratio. You need 1 gram of protein 
                per kg of body weight, with carbs limited to 3x your protein intake per meal.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-red-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Long-term Health</h3>
              <p className="text-gray-600">
                Consistent protein intake maintains muscle mass, supports metabolism, and prevents 
                the gradual body composition changes that happen silently over time.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Our Values */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Our Core Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Shield,
                title: "100% Hygienic",
                description: "Every meal prepared in certified kitchens with the highest food safety standards"
              },
              {
                icon: Heart,
                title: "Freshly Cooked",
                description: "No packaged powders or processed foods - only fresh, wholesome ingredients"
              },
              {
                icon: Award,
                title: "Dietitian Approved",
                description: "All recipes reviewed by certified nutritionists for optimal macro balance"
              },
              {
                icon: Users,
                title: "Customer First",
                description: "Your health goals and satisfaction drive every decision we make"
              }
            ].map((value, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-6 text-center hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <value.icon className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{value.title}</h3>
                <p className="text-gray-600 text-sm">{value.description}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* The Protein2x7 Difference */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
          className="bg-gradient-to-r from-blue-600 to-green-600 rounded-2xl p-8 text-white text-center"
        >
          <h2 className="text-3xl font-bold mb-6">The Protein2x7 Difference</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="text-4xl font-bold mb-2">2x</div>
              <p className="text-blue-100">Protein-rich meals delivered twice daily</p>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">7</div>
              <p className="text-blue-100">Days a week, consistent nutrition</p>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">100%</div>
              <p className="text-blue-100">Fresh, hygienic, dietitian-approved</p>
            </div>
          </div>
          <p className="text-xl mb-6 text-blue-100">
            We're not just a meal service - we're your partners in achieving sustainable health and fitness goals.
          </p>
          <button className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 rounded-lg font-bold text-lg transition-colors">
            Start Your Transformation
          </button>
        </motion.div>
      </div>
    </div>
  );
}