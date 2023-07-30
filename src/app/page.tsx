import Hero from "./components/hero/Hero";
import Carousel from "./components/carousel/Carousel";

const getProducts = async () => {
  "use server";
  const data = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/products`
  ).then((res) => {
    return res.json();
  });
  return data;
};

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
