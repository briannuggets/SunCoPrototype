// Uncomment the following line to run test cases:
// const fetch = require("node-fetch");

// @desc Fetch an array of all products from the API
// @route GET /api/products
// @access Public
const getProducts = async () => {
  const data = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products`)
    .then((res: Response) => {
      return res.json();
    })
    .catch((err: Error) => {
      console.log(err.message);
      return null;
    });
  return data;
};

// @desc Fetch a single product from the API
// @route GET /api/products/:id
// @access Public
const getProduct = async (id: string) => {
  const product = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/products/${id}`
  )
    .then((res: Response) => {
      return res.json();
    })
    .catch((err: Error) => {
      console.log(err.message);
      return null;
    });
  return product;
};

export { getProducts, getProduct };
