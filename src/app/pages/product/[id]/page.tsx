import Gallery from "@/app/components/gallery/Gallery";
import AddToCart from "@/app/components/add-to-cart/AddToCart";
import styles from "./styles.module.scss";
import Image from "next/image";
import { getProduct } from "@/app/api/utils";

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
            {product.features.map((feature: string, index: number) => (
              <li key={index}>{feature}</li>
            ))}
          </ul>
        </div>
        <div>
          <Image
            src={`/desktop/products/rect/product-${product.id}/3.png`}
            alt={`${product.name} secondary style`}
            className="image-format"
            width={500}
            height={400}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
