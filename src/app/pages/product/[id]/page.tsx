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
  return <h1>{product.name}</h1>;
};

export default ProductPage;
