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

test("C4 Add to a cart", async ({ request }) => {
  const productsResponse = await request.get(`${API}/products`, { headers });
  const productId = (await productsResponse.json()).data[0].id;

  const cartResponse = await request.post(`${API}/carts`, { headers });
  expect(cartResponse.status()).toBe(201);
  cartId = (await cartResponse.json()).id;

  const addResponse = await request.post(`${API}/carts/${cartId}`, {
    headers,
    data: { product_id: productId, quantity: 1 },
  });
  expect(addResponse.status()).toBe(200);

  const cart = await (await request.get(`${API}/carts/${cartId}`, { headers })).json();
  expect(cart.cart_items).toHaveLength(1);
  expect(cart.cart_items[0].product_id).toBe(productId);
  expect(cart.cart_items[0].quantity).toBe(1);
});