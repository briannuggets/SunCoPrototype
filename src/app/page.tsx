import Hero from "./components/hero/Hero";
import Carousel from "./components/carousel/Carousel";
import { getProducts } from "./api/utils";

const Home = async () => {
  const products = await getProducts();
  return (
    <div className="page">
      <Hero />
      <Carousel products={products} />
    </div>
  );
};

export default Home;
