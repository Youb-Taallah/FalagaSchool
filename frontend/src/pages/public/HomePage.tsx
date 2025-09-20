import HeroSection from '../../components/public/home/HeroSection';
import AboutSection from '../../components/public/home/AboutSection';
import FeatureSection from '../../components/public/home/FeatureSection';
// import SubscriptionPlans from '../../components/public/SubscriptionPlans';
import FAQ from '../../components/public/home/FAQ';
// import CourseSection from '../../components/public/home/CourseSection';

const HomePage = () => {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <FeatureSection />
      {/* <CourseSection /> */}
      {/* <SubscriptionPlans /> */}
      <FAQ />
    </>
  );
};

export default HomePage;