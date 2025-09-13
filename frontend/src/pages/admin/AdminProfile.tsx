import { motion } from 'framer-motion';
import { Users, ShoppingCart, Package, TrendingUp, Calendar, DollarSign } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import ProfileDropdown from '../../components/admin/ProfileDropdown';

export default function AdminProfile() {
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  // Mock stats - replace with actual data from API
  const stats = [
    { label: 'Total Orders', value: '156', icon: ShoppingCart, color: 'bg-blue-500' },
    { label: 'Active Users', value: '89', icon: Users, color: 'bg-green-500' },
    { label: 'Meal Plans', value: '12', icon: Package, color: 'bg-purple-500' },
    { label: 'Revenue', value: '₹45,670', icon: DollarSign, color: 'bg-yellow-500' },
  ];

  return (
    <div className="pt-16 sm:pt-20 lg:pt-24 pb-8 sm:pb-16 lg:pb-20 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with Profile Dropdown */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <div className="flex justify-between items-center">
            <div>
              
              <p className="text-sm sm:text-lg text-gray-600">
                Welcome back, {user?.name}
              </p>
            </div>
            <ProfileDropdown />
          </div>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              className="bg-white rounded-xl shadow-lg p-6"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <stat.icon className="h-6 w-6 text-white" />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          <button
            onClick={() => navigate('/admin/meal-plans')}
            className="bg-white hover:bg-gray-50 border-2 border-blue-500 text-blue-600 p-8 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 group"
          >
            <Package className="h-12 w-12 mb-4 mx-auto group-hover:scale-110 transition-transform" />
            <span className="block text-lg">Manage Meal Plans</span>
            <span className="block text-sm text-gray-500 mt-2">Add, edit, or remove meal plans</span>
          </button>
          
          <button
            onClick={() => navigate('/admin/users')}
            className="bg-white hover:bg-gray-50 border-2 border-green-500 text-green-600 p-8 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 group"
          >
            <Users className="h-12 w-12 mb-4 mx-auto group-hover:scale-110 transition-transform" />
            <span className="block text-lg">Manage Users</span>
            <span className="block text-sm text-gray-500 mt-2">View and manage user accounts</span>
          </button>
          
          <button
            onClick={() => navigate('/admin/orders')}
            className="bg-white hover:bg-gray-50 border-2 border-purple-500 text-purple-600 p-8 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 group"
          >
            <ShoppingCart className="h-12 w-12 mb-4 mx-auto group-hover:scale-110 transition-transform" />
            <span className="block text-lg">View Orders</span>
            <span className="block text-sm text-gray-500 mt-2">Track and manage customer orders</span>
          </button>
        </motion.div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-8 bg-white rounded-xl shadow-lg p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900">Recent Activity</h2>
            <TrendingUp className="h-5 w-5 text-gray-400" />
          </div>
          <div className="space-y-4">
            {[
              { time: '2 hours ago', action: 'New order placed', user: 'John Doe', type: 'order' },
              { time: '5 hours ago', action: 'User registered', user: 'Jane Smith', type: 'user' },
              { time: '1 day ago', action: 'Meal plan updated', user: 'Admin', type: 'update' },
              { time: '2 days ago', action: 'Payment received', user: 'Mike Johnson', type: 'payment' },
            ].map((activity, index) => (
              <div key={index} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
                <div className="flex items-center space-x-3">
                  <div className={`w-2 h-2 rounded-full ${
                    activity.type === 'order' ? 'bg-blue-500' :
                    activity.type === 'user' ? 'bg-green-500' :
                    activity.type === 'update' ? 'bg-yellow-500' :
                    'bg-purple-500'
                  }`}></div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                    <p className="text-xs text-gray-500">{activity.user}</p>
                  </div>
                </div>
                <div className="flex items-center text-xs text-gray-400">
                  <Calendar className="h-3 w-3 mr-1" />
                  {activity.time}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}