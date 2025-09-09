import { motion } from 'framer-motion';
import { Calendar, User, ArrowRight, Clock } from 'lucide-react';

const blogPosts = [
  {
    id: 1,
    title: "The Silent Protein Deficiency: Why Your Body Shape is Changing Without You Noticing",
    excerpt: "Unlike vitamin or mineral deficiencies, protein deficiency doesn't show immediate symptoms. Learn how it silently affects your body tone and waistline.",
    content: "Unlike vitamin or mineral deficiencies (like Vitamin B12 deficiency causing tingling in hands and feet, or sodium deficiency causing cramps), protein deficiency doesn't show immediate symptoms. Instead, it develops silently over time — your body tone decreases, your waistline increases, even though your overall weight may remain the same. That's why it's essential to maintain daily protein intake to keep your body's shape and strength intact.",
    author: "Dr. Nutritionist",
    date: "2025-01-15",
    readTime: "3 min read",
    category: "Nutrition",
    image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=800"
  },
  {
    id: 2,
    title: "The 1:3 Protein-to-Carb Rule: Transforming Your Daily Diet",
    excerpt: "In our current diet, nearly 80–90% comes from carbs while protein is very low. Discover the optimal balance for fitness and strength.",
    content: "In our current diet, nearly 80–90% of what we eat comes from carbohydrates, while protein intake is very low. Fats are often avoided, and carbs are sometimes even deep-fried, making the imbalance worse. To maintain physical fitness and strength, we need to stop this practice and aim for a healthier balance — keeping a 1:3 ratio of protein to carbs in every meal.",
    author: "Fitness Expert",
    date: "2025-01-12",
    readTime: "4 min read", 
    category: "Diet",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800"
  },
  {
    id: 3,
    title: "Your Daily Protein & Carb Calculator: The Simple Formula",
    excerpt: "Learn the rule of thumb for calculating your exact protein and carb needs based on your body weight.",
    content: "You need 1 gram of protein per kg of body weight. Carbs should be limited to 3x your protein intake (per meal). This simple formula helps maintain the perfect balance for muscle preservation and energy without excess fat storage.",
    author: "Sports Nutritionist", 
    date: "2025-01-10",
    readTime: "2 min read",
    category: "Calculator",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800"
  },
  {
    id: 4,
    title: "The Happiness Hormones Journey: From Dopamine to Oxytocin",
    excerpt: "When you begin eating right and exercising consistently, your brain chemistry transforms through four distinct phases of happiness.",
    content: "When you begin eating right and exercising consistently, the journey starts with a surge of dopamine — that initial excitement of setting a goal, like wanting to run a marathon. As you start working out, endorphins kick in, giving you that natural \"high\" that lasts for hours. After a few weeks, serotonin levels rise, bringing a sense of overall happiness and well-being. And as you continue, oxytocin emerges, leading to self-love and appreciation for the person you've become. It's not just about being fit; it's about loving yourself through the process!",
    author: "Psychology Expert",
    date: "2025-01-08",
    readTime: "5 min read",
    category: "Psychology", 
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800"
  },
  {
    id: 5,
    title: "5 Simple Steps to Transform Your Body in One Year",
    excerpt: "Follow these systematic steps and within a year you'll see sustainable weight loss, better energy, and a fitter body.",
    content: "Step 1: Cut the Junk (Month 1) - Say goodbye to oily, processed, and additive-loaded foods. Your body will feel lighter and cleaner within weeks. Step 2: Halve Your Carbs (Month 2) - Reduce your carb intake by 50%. This lowers insulin spikes, keeps hunger in check, and supports steady fat loss. Step 3: Eat When Hungry (Month 3) - Listen to your body. Adopt mindful eating or intermittent fasting. Expect to shed another 8–10 kg naturally. Step 4: Build Muscle (Month 4) - Start gym or strength training. More muscle = higher metabolism = faster fat burn. Step 5: Stay Athletic (Month 5+) - Pick a sport or activity you love—running, cycling, swimming. This helps burn the last few kilos and keeps you motivated long term.",
    author: "Transformation Coach",
    date: "2025-01-05",
    readTime: "6 min read",
    category: "Transformation",
    image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800"
  }
];

export default function Blog() {
  return (
    <div className="lg:pt-32 sm: pt-20 pb-8 sm:pb-16 min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-6 sm:mb-12 lg:mb-16"
        >
          <h1 className="text-xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-2 sm:mb-3 lg:mb-4">
            Nutrition & Fitness
            
          </h1>
          <p className="text-sm sm:text-lg lg:text-xl text-gray-600 max-w-xs sm:max-w-2xl lg:max-w-3xl mx-auto px-2">
            Tips, guides, and insights on protein nutrition, fitness, and healthy living from our experts
          </p>
        </motion.div>

        {/* Featured Post */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-6 sm:mb-12 lg:mb-16"
        >
          <div className="bg-white rounded-lg sm:rounded-2xl shadow-xl overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="relative h-32 sm:h-48 lg:h-auto">
                <img
                  src={blogPosts[0].image}
                  alt={blogPosts[0].title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 left-2 sm:top-3 sm:left-3 lg:top-4 lg:left-4">
                  <span className="bg-blue-600 text-white px-2 py-1 sm:px-2.5 sm:py-1 lg:px-3 lg:py-1 rounded-full text-sm sm:text-xs lg:text-sm font-semibold">
                    Featured
                  </span>
                </div>
              </div>
              <div className="p-4 sm:p-6 lg:p-8 flex flex-col justify-center">
                <div className="flex items-center space-x-2 sm:space-x-3 lg:space-x-4 text-sm sm:text-xs lg:text-sm text-gray-500 mb-2 sm:mb-3 lg:mb-4">
                  <span className="bg-blue-100 text-blue-600 px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-full text-sm sm:text-xs font-medium">
                    {blogPosts[0].category}
                  </span>
                  <div className="flex items-center space-x-1">
                    <Calendar className="h-3 w-3 sm:h-4 sm:w-4" />
                    <span>{new Date(blogPosts[0].date).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="h-3 w-3 sm:h-4 sm:w-4" />
                    <span>{blogPosts[0].readTime}</span>
                  </div>
                </div>
                <h2 className="text-sm sm:text-xl lg:text-2xl font-bold text-gray-900 mb-2 sm:mb-3 lg:mb-4">
                  {blogPosts[0].title}
                </h2>
                <p className="text-sm sm:text-sm lg:text-base text-gray-600 mb-3 sm:mb-4 lg:mb-6 leading-relaxed">
                  {blogPosts[0].excerpt}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 sm:space-x-3">
                    <User className="h-3 w-3 sm:h-4 sm:w-4 lg:h-5 lg:w-5 text-gray-400" />
                    <span className="text-sm sm:text-xs lg:text-sm text-gray-600">{blogPosts[0].author}</span>
                  </div>
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 sm:px-4 sm:py-2 lg:px-6 lg:py-2 rounded-lg font-semibold flex items-center space-x-1 sm:space-x-2 transition-colors text-sm sm:text-xs lg:text-sm">
                    <span>Read More</span>
                    <ArrowRight className="h-3 w-3 sm:h-4 sm:w-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {blogPosts.slice(1).map((post, index) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: (index + 1) * 0.1 }}
              className="bg-white rounded-lg sm:rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group cursor-pointer"
            >
              <div className="relative h-20 sm:h-24 lg:h-32 overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-1.5 left-1.5 sm:top-2 sm:left-2 lg:top-3 lg:left-3">
                  <span className="bg-white/90 backdrop-blur-sm px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-full text-sm sm:text-xs font-semibold text-gray-800">
                    {post.category}
                  </span>
                </div>
              </div>
              
              <div className="p-3 sm:p-4 lg:p-6">
                <div className="flex items-center space-x-2 sm:space-x-3 lg:space-x-4 text-sm sm:text-xs text-gray-500 mb-2 sm:mb-3">
                  <div className="flex items-center space-x-1">
                    <Calendar className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
                    <span>{new Date(post.date).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
                    <span>{post.readTime}</span>
                  </div>
                </div>
                
                <h3 className="text-sm sm:text-sm lg:text-lg font-bold text-gray-900 mb-2 sm:mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
                  {post.title}
                </h3>
                
                <p className="text-sm sm:text-xs lg:text-sm text-gray-600 mb-2 sm:mb-3 lg:mb-4 line-clamp-3">
                  {post.excerpt}
                </p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-1 sm:space-x-2">
                    <User className="h-3 w-3 sm:h-4 sm:w-4 text-gray-400" />
                    <span className="text-sm sm:text-xs text-gray-600">{post.author}</span>
                  </div>
                  <button className="text-blue-600 hover:text-blue-700 font-semibold text-sm sm:text-xs lg:text-sm flex items-center space-x-1 transition-colors">
                    <span>Read</span>
                    <ArrowRight className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
                  </button>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Newsletter Signup */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mt-8 sm:mt-12 lg:mt-16"
        >
          <div className="bg-gradient-to-r from-blue-600 to-green-600 rounded-lg sm:rounded-2xl p-4 sm:p-6 lg:p-8 text-center text-white">
            <h3 className="text-lg sm:text-2xl lg:text-3xl font-bold mb-2 sm:mb-3 lg:mb-4">
              Get Weekly Nutrition Tips
            </h3>
            <p className="text-sm sm:text-base lg:text-lg mb-3 sm:mb-4 lg:mb-6 opacity-90">
              Subscribe to our newsletter for the latest protein and fitness insights
            </p>
            <div className="flex flex-col sm:flex-row max-w-xs sm:max-w-sm lg:max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-3 py-2 sm:px-4 sm:py-2.5 lg:px-4 lg:py-3 rounded-l-lg sm:rounded-r-none rounded-r-lg text-gray-900 text-sm sm:text-sm lg:text-base focus:outline-none focus:ring-2 focus:ring-white/50"
              />
              <button className="bg-white text-blue-600 hover:bg-gray-100 px-3 py-2 sm:px-4 sm:py-2.5 lg:px-6 lg:py-3 rounded-r-lg sm:rounded-l-none rounded-l-lg font-semibold text-sm sm:text-sm lg:text-base transition-colors mt-2 sm:mt-0">
                Subscribe
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}