import { useState, useRef, useEffect } from 'react';
import { User, LogOut, Mail, Calendar, Shield } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function ProfileDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = async () => {
    await logout();
    navigate('/admin/login');
  };

  if (!user) return null;

  const joinDate = new Date(user.created_at || Date.now()).toLocaleDateString('en-US', {
    month: 'short',
    year: 'numeric'
  });

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Profile Icon Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        onMouseEnter={() => setIsOpen(true)}
        className="flex items-center justify-center w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full hover:shadow-lg transition-all duration-300 group"
      >
        <User className="h-5 w-5 text-white" />
        <span className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></span>
      </button>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            onMouseEnter={() => setIsOpen(true)}
            onMouseLeave={() => setIsOpen(false)}
            className="absolute right-0 mt-2 w-72 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden z-50"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                  <User className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="text-white font-semibold">{user.name}</p>
                  <p className="text-white/80 text-xs">Administrator</p>
                </div>
              </div>
            </div>

            {/* User Info */}
            <div className="p-4 space-y-3 border-b border-gray-100">
              <div className="flex items-center space-x-2 text-sm">
                <Mail className="h-4 w-4 text-gray-400" />
                <span className="text-gray-600 truncate">{user.email}</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <Calendar className="h-4 w-4 text-gray-400" />
                <span className="text-gray-600">Joined {joinDate}</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <Shield className="h-4 w-4 text-gray-400" />
                <span className="text-gray-600">Admin Role</span>
              </div>
            </div>

            {/* Actions */}
            <div className="p-2">
              <button
                onClick={handleLogout}
                className="w-full flex items-center space-x-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
              >
                <LogOut className="h-4 w-4" />
                <span>Logout</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}