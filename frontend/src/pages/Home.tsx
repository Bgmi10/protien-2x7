import Hero from '../components/home/Hero';
import WhyProtein2x7 from '../components/home/WhyProtein2x7';
import SubscriptionPlans from '../components/home/SubscriptionPlans';

export default function Home() {
  return (
    <div className="pt-16"> {/* Account for fixed header */}
      <Hero />
      <WhyProtein2x7 />
      <SubscriptionPlans />
    </div>
  );
}