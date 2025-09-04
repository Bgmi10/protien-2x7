import Hero from '../components/home/Hero';
import Features from '../components/home/Features';
import SubscriptionPlans from '../components/home/SubscriptionPlans';
import Testimonials from '../components/home/Testimonials';

export default function Home() {
  return (
    <div className="pt-16"> {/* Account for fixed header */}
      <Hero />
      <Features />
      <SubscriptionPlans />
      <Testimonials />
    </div>
  );
}