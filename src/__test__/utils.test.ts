import { getProducts, getProduct } from "@/app/api/utils";

// @test getProducts() returns an array of 4 products
// @test getProducts() returns an array of products with the correct properties
// @test getProducts() returns an array of products with the correct order
it("Gets all products", async () => {
  const products = await getProducts();

  expect(products).toHaveLength(4);

  expect(Object.keys(products[0])).toHaveLength(6);
  expect(Object.keys(products[0])).toEqual([
    "id",
    "brand",
    "name",
    "price",
    "description",
    "features",
  ]);

  expect(products[0].id).toBe(0);
  expect(products[1].id).toBe(1);
  expect(products[2].id).toBe(2);
  expect(products[3].id).toBe(3);
});

// @test getProduct() returns a single object
// @test getProduct() returns an object with the correct properties
it("Gets a product by id", async () => {
  const product = await getProduct("2");

  expect(product).toBeInstanceOf(Object);

  expect(Object.keys(product)).toHaveLength(6);
  expect(Object.keys(product)).toEqual([
    "id",
    "brand",
    "name",
    "price",
    "description",
    "features",
  ]);
  expect(product.id).toBe(2);
});

// @test getProduct() returns null when a product is not found
it("Returns null when a product is not found", async () => {
  const product5 = await getProduct("5");
  const productABC = await getProduct("abc");
  const productNeg = await getProduct("-1");

  expect(product5).toBeNull();
  expect(productABC).toBeNull();
  expect(productNeg).toBeNull();
});
