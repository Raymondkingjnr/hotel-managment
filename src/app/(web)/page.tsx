import FeatureRoom from "@/components/FeatureRoom/FeatureRoom";
import Gallery from "@/components/Gallary/Gallary";
import HeroSection from "@/components/HeroSection/HeroSection";
import NewsLetter from "@/components/NewsLetter/NewsLetter";
import PageSearch from "@/components/PageSearch/PageSearch";
import { getFeaturedRoom } from "@/libs/apis";

const Home = async () => {
  const featuredRoom = await getFeaturedRoom();

  return (
    <main>
      <HeroSection />
      <PageSearch />
      <FeatureRoom featuredRoom={featuredRoom} />
      <Gallery />
      <NewsLetter />
    </main>
  );
};

export default Home;
