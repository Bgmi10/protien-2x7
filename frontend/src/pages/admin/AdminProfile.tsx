import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Phone, Calendar, Shield, LogOut, Users, ShoppingCart, Package, DollarSign } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

interface AdminData {
  id: number;
  email: string;
  name: string;
  phone: string;
  role: string;
  last_login: string;
  created_at: string;
}

interface Statistics {
  totalUsers: number;
  totalOrders: number;
  activeSubscriptions: number;
  totalRevenue: number;
}

export default function AdminProfile() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [adminData, setAdminData] = useState<AdminData | null>(null);
  const [statistics, setStatistics] = useState<Statistics | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchAdminProfile();
  }, []);

  const fetchAdminProfile = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_BASE_URL}/api/v1/auth/admin/profile`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // Send cookies with request
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          setAdminData(data.admin);
          setStatistics(data.statistics);
        }
      }
    } catch (error) {
      console.error('Failed to fetch admin profile:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate('/admin/login');
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-IN', {
      dateStyle: 'medium',
      timeStyle: 'short',
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
    }).format(amount);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="pt-16 sm:pt-20 lg:pt-24 pb-8 sm:pb-16 lg:pb-20 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-2">
                Admin Dashboard
              </h1>
              <p className="text-sm sm:text-lg text-gray-600">
                Welcome back, {adminData?.name || user?.name}
              </p>
            </div>
            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 sm:px-6 sm:py-3 rounded-lg font-semibold flex items-center space-x-2 transition-all duration-300"
            >
              <LogOut className="h-5 w-5" />
              <span>Logout</span>
            </button>
          </div>
        </motion.div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="bg-blue-100 rounded-full p-3">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <span className="text-sm text-gray-500">Total</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900">{statistics?.totalUsers || 0}</h3>
            <p className="text-sm text-gray-600 mt-1">Registered Users</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="bg-green-100 rounded-full p-3">
                <ShoppingCart className="h-6 w-6 text-green-600" />
              </div>
              <span className="text-sm text-gray-500">Total</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900">{statistics?.totalOrders || 0}</h3>
            <p className="text-sm text-gray-600 mt-1">Orders Placed</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="bg-purple-100 rounded-full p-3">
                <Package className="h-6 w-6 text-purple-600" />
              </div>
              <span className="text-sm text-gray-500">Active</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900">{statistics?.activeSubscriptions || 0}</h3>
            <p className="text-sm text-gray-600 mt-1">Subscriptions</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="bg-yellow-100 rounded-full p-3">
                <DollarSign className="h-6 w-6 text-yellow-600" />
              </div>
              <span className="text-sm text-gray-500">Total</span>
            </div>
            <h3 className="text-xl font-bold text-gray-900">{formatCurrency(statistics?.totalRevenue || 0)}</h3>
            <p className="text-sm text-gray-600 mt-1">Revenue</p>
          </motion.div>
        </div>

        {/* Admin Profile Info */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="bg-white rounded-xl shadow-lg p-6 sm:p-8"
        >
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">Admin Information</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <User className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">Name</p>
                  <p className="font-medium text-gray-900">{adminData?.name}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="font-medium text-gray-900">{adminData?.email}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">Phone</p>
                  <p className="font-medium text-gray-900">{adminData?.phone}</p>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Shield className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">Role</p>
                  <p className="font-medium text-gray-900 capitalize">{adminData?.role}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Calendar className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">Last Login</p>
                  <p className="font-medium text-gray-900">
                    {adminData?.last_login ? formatDate(adminData.last_login) : 'Never'}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Calendar className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">Account Created</p>
                  <p className="font-medium text-gray-900">
                    {adminData?.created_at ? formatDate(adminData.created_at) : 'Unknown'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          <button
            onClick={() => navigate('/admin/meal-plans')}
            className="bg-blue-600 hover:bg-blue-700 text-white p-6 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105"
          >
            <Package className="h-8 w-8 mb-3 mx-auto" />
            <span className="block">Manage Meal Plans</span>
          </button>
          
          <button
            onClick={() => navigate('/admin/users')}
            className="bg-green-600 hover:bg-green-700 text-white p-6 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105"
          >
            <Users className="h-8 w-8 mb-3 mx-auto" />
            <span className="block">Manage Users</span>
          </button>
          
          <button
            onClick={() => navigate('/admin/orders')}
            className="bg-purple-600 hover:bg-purple-700 text-white p-6 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105"
          >
            <ShoppingCart className="h-8 w-8 mb-3 mx-auto" />
            <span className="block">View Orders</span>
          </button>
        </motion.div>
      </div>
    </div>
  );
}