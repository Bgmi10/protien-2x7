import { motion } from 'framer-motion';
import { Heart, Target, Users, Award, Utensils, Shield } from 'lucide-react';

export default function About() {
  return (
    <div className="lg:pt-32 sm: pt-20 pb-8 sm:pb-16 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-6 sm:mb-12 lg:mb-16"
        >
          <h1 className="text-xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 sm:mb-4 lg:mb-6">
            The Story of
            <span className="block bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
              protein2x7
            </span>
          </h1>
          <p className="text-sm sm:text-lg lg:text-xl text-gray-600 max-w-xs sm:max-w-2xl lg:max-w-4xl mx-auto leading-relaxed px-2">
            Born from a passion for balanced nutrition and the belief that everyone deserves access to 
            fresh, protein-rich meals that fuel their fitness journey and transform their lives.
          </p>
        </motion.div>

        {/* Mission & Vision */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-8 lg:gap-12 mb-8 sm:mb-16 lg:mb-20">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg sm:rounded-2xl p-4 sm:p-6 lg:p-8"
          >
            <div className="flex items-center mb-3 sm:mb-4 lg:mb-6">
              <Target className="h-4 w-4 sm:h-6 sm:w-6 lg:h-8 lg:w-8 text-blue-600 mr-2 sm:mr-3" />
              <h2 className="text-lg sm:text-2xl lg:text-3xl font-bold text-gray-900">Our Mission</h2>
            </div>
            <p className="text-sm sm:text-base lg:text-lg text-gray-700 leading-relaxed mb-2 sm:mb-3 lg:mb-4">
              To revolutionize how people approach nutrition by delivering fresh, hygienic, and 
              scientifically-balanced protein meals twice daily, seven days a week.
            </p>
            <p className="text-sm sm:text-sm lg:text-base text-gray-600">
              We believe that consistent, high-quality protein intake is the foundation of physical 
              fitness, mental well-being, and long-term health success.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="bg-gradient-to-r from-green-50 to-green-100 rounded-lg sm:rounded-2xl p-4 sm:p-6 lg:p-8"
          >
            <div className="flex items-center mb-3 sm:mb-4 lg:mb-6">
              <Heart className="h-4 w-4 sm:h-6 sm:w-6 lg:h-8 lg:w-8 text-green-600 mr-2 sm:mr-3" />
              <h2 className="text-lg sm:text-2xl lg:text-3xl font-bold text-gray-900">Our Vision</h2>
            </div>
            <p className="text-sm sm:text-base lg:text-lg text-gray-700 leading-relaxed mb-2 sm:mb-3 lg:mb-4">
              To create a world where balanced nutrition is accessible, convenient, and enjoyable 
              for everyone pursuing a healthier lifestyle.
            </p>
            <p className="text-sm sm:text-sm lg:text-base text-gray-600">
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
          className="bg-white rounded-lg sm:rounded-2xl shadow-xl p-4 sm:p-6 lg:p-8 mb-6 sm:mb-12 lg:mb-16"
        >
          <h2 className="text-lg sm:text-2xl lg:text-3xl font-bold text-center text-gray-900 mb-4 sm:mb-6 lg:mb-8">
            Why Balanced Nutrition Matters
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            <div className="text-center">
              <div className="w-8 h-8 sm:w-12 sm:h-12 lg:w-16 lg:h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-3 lg:mb-4">
                <Utensils className="h-4 w-4 sm:h-6 sm:w-6 lg:h-8 lg:w-8 text-blue-600" />
              </div>
              <h3 className="text-sm sm:text-lg lg:text-xl font-bold text-gray-900 mb-2 sm:mb-3">The Silent Crisis</h3>
              <p className="text-sm sm:text-sm lg:text-base text-gray-600">
                In today's diet, 80-90% of our intake comes from carbohydrates while protein remains 
                dangerously low. This imbalance silently affects body composition and energy levels.
              </p>
            </div>
            <div className="text-center">
              <div className="w-8 h-8 sm:w-12 sm:h-12 lg:w-16 lg:h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-3 lg:mb-4">
                <Award className="h-4 w-4 sm:h-6 sm:w-6 lg:h-8 lg:w-8 text-green-600" />
              </div>
              <h3 className="text-sm sm:text-lg lg:text-xl font-bold text-gray-900 mb-2 sm:mb-3">The 1:3 Rule</h3>
              <p className="text-sm sm:text-sm lg:text-base text-gray-600">
                Our approach follows the optimal 1:3 protein-to-carb ratio. You need 1 gram of protein 
                per kg of body weight, with carbs limited to 3x your protein intake per meal.
              </p>
            </div>
            <div className="text-center">
              <div className="w-8 h-8 sm:w-12 sm:h-12 lg:w-16 lg:h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-3 lg:mb-4">
                <Shield className="h-4 w-4 sm:h-6 sm:w-6 lg:h-8 lg:w-8 text-red-600" />
              </div>
              <h3 className="text-sm sm:text-lg lg:text-xl font-bold text-gray-900 mb-2 sm:mb-3">Long-term Health</h3>
              <p className="text-sm sm:text-sm lg:text-base text-gray-600">
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
          className="mb-6 sm:mb-12 lg:mb-16"
        >
          <h2 className="text-lg sm:text-2xl lg:text-3xl font-bold text-center text-gray-900 mb-6 sm:mb-10 lg:mb-12">Our Core Values</h2>
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
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
              <div key={index} className="bg-gray-50 rounded-lg sm:rounded-xl p-3 sm:p-4 lg:p-6 text-center hover:shadow-lg transition-shadow">
                <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-3 lg:mb-4">
                  <value.icon className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6 text-blue-600" />
                </div>
                <h3 className="text-sm sm:text-sm lg:text-lg font-bold text-gray-900 mb-1 sm:mb-1.5 lg:mb-2">{value.title}</h3>
                <p className="text-sm sm:text-xs lg:text-sm text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* The protein2x7 Difference */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
          className="bg-gradient-to-r from-blue-600 to-green-600 rounded-lg sm:rounded-2xl p-4 sm:p-6 lg:p-8 text-white text-center"
        >
          <h2 className="text-lg sm:text-2xl lg:text-3xl font-bold mb-3 sm:mb-4 lg:mb-6">The protein2x7 Difference</h2>
          <div className="grid grid-cols-3 md:grid-cols-3 gap-3 sm:gap-6 lg:gap-8 mb-4 sm:mb-6 lg:mb-8">
            <div>
              <div className="text-lg sm:text-3xl lg:text-4xl font-bold mb-1 sm:mb-2">2x</div>
              <p className="text-sm sm:text-sm lg:text-base text-blue-100">Protein-rich meals delivered twice daily</p>
            </div>
            <div>
              <div className="text-lg sm:text-3xl lg:text-4xl font-bold mb-1 sm:mb-2">7</div>
              <p className="text-sm sm:text-sm lg:text-base text-blue-100">Days a week, consistent nutrition</p>
            </div>
            <div>
              <div className="text-lg sm:text-3xl lg:text-4xl font-bold mb-1 sm:mb-2">100%</div>
              <p className="text-sm sm:text-sm lg:text-base text-blue-100">Fresh, hygienic, dietitian-approved</p>
            </div>
          </div>
          <p className="text-sm sm:text-lg lg:text-xl mb-3 sm:mb-4 lg:mb-6 text-blue-100">
            We're not just a meal service - we're your partners in achieving sustainable health and fitness goals.
          </p>
          <button className="bg-white text-blue-600 hover:bg-gray-100 px-4 py-2 sm:px-6 sm:py-2.5 lg:px-8 lg:py-3 rounded-lg font-bold text-sm sm:text-sm lg:text-lg transition-colors">
            Start Your Transformation
          </button>
        </motion.div>
      </div>
    </div>
  );
}