import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import SubscriptionPlans from './pages/SubscriptionPlans';
import PlanDetail from './pages/PlanDetail';
import Products from './pages/Products';
import TransformationChallenge from './pages/TransformationChallenge';
import Coaching from './pages/Coaching';
import About from './pages/About';
import Blog from './pages/Blog';
import FAQ from './pages/FAQ';
import HygieneQuality from './pages/HygieneQuality';
import Testimonials from './pages/Testimonials';
import Contact from './pages/Contact';
import ShippingPolicy from './pages/ShippingPolicy';
import ReturnPolicy from './pages/ReturnPolicy';
import MealPlansAdmin from './pages/admin/MealPlansAdmin';
import AdminLogin from './pages/admin/AdminLogin';
import AdminProfile from './pages/admin/AdminProfile';
import AdminProtectedRoute from './components/AdminProtectedRoute';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/subscription-plans" element={<SubscriptionPlans />} />
          <Route path="/subscription-plans/:planId" element={<PlanDetail />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:category" element={<Products />} />
          <Route path="/transformation-challenge" element={<TransformationChallenge />} />
          <Route path="/coaching" element={<Coaching />} />
          <Route path="/about" element={<About />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/hygiene-quality" element={<HygieneQuality />} />
          <Route path="/testimonials" element={<Testimonials />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/shipping-policy" element={<ShippingPolicy />} />
          <Route path="/return-policy" element={<ReturnPolicy />} />
          <Route path="/admin/login" element={<AdminLogin />} />

          <Route path="/admin" element={<AdminProtectedRoute />}>
            <Route path="profile" element={<AdminProfile />} />
            <Route path="meal-plans" element={<MealPlansAdmin />} />
          </Route>

        </Routes>
      </Layout>
    </Router>
  );
}

export default App;