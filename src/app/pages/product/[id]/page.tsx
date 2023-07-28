import Gallery from "@/app/components/gallery/Gallery";
import AddToCart from "@/app/components/add-to-cart/AddToCart";
import styles from "./styles.module.scss";

const getProduct = async (id: string) => {
  "use server";

  const product = await fetch(`http://localhost:3000/api/products/${id}`).then(
    (res) => {
      return res.json();
    }
  );
  return product;
};

const ProductPage = async ({ params }: { params: { id: string } }) => {
  const product = await getProduct(params.id);
  return (
    <div className="page">
      <div className={styles.productInteractable}>
        <Gallery {...product} />
        <AddToCart {...product} />
      </div>
    </div>
  );
};

export default ProductPage;
