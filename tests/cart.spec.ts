import { test, expect } from "@playwright/test";

const API = "https://api.practicesoftwaretesting.com";
const headers = { Accept: "application/json" };

let cartId: string | undefined;

test.beforeEach(() => {
  cartId = undefined;
});

test.afterEach(async ({ request }) => {
  if (cartId) {
    const response = await request.delete(`${API}/carts/${cartId}`, { headers });
    expect(response.ok()).toBeTruthy();
  }
});

test("create a cart, add a product and check the cart fields", async ({
  request,
}) => {
  const productsResponse = await request.get(`${API}/products`, { headers });
  const products = (await productsResponse.json()).data;
  const product = products.find((p: { in_stock: boolean }) => p.in_stock) ?? products[0];

  const createResponse = await request.post(`${API}/carts`, { headers });
  expect(createResponse.status()).toBe(201);
  cartId = (await createResponse.json()).id;
  expect(cartId).toBeTruthy();

  const addResponse = await request.post(`${API}/carts/${cartId}`, {
    headers,
    data: { product_id: product.id, quantity: 2 },
  });
  expect(addResponse.ok()).toBeTruthy();

  const cartResponse = await request.get(`${API}/carts/${cartId}`, { headers });
  expect(cartResponse.status()).toBe(200);
  const cart = await cartResponse.json();
  expect(cart.cart_items).toHaveLength(1);
  expect(cart.cart_items[0].product_id).toBe(product.id);
  expect(cart.cart_items[0].quantity).toBe(2);
});

test("requesting a cart that does not exist returns 404", async ({ request }) => {
  const response = await request.get(`${API}/carts/does-not-exist`, { headers });

  expect(response.status()).toBe(404);
});