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
      <div className={styles.productDescription}>
        <div>
          <h2>Description</h2>
          <p>{product.description}</p>
          <ul>
            {product.features.map((feature: string) => (
              <li>{feature}</li>
            ))}
          </ul>
        </div>
        <div>
          <img
            src={`/desktop/products/rect/product-${product.id}/3.png`}
            alt={`${product.name} secondary style`}
            className="image-format"
          />
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
