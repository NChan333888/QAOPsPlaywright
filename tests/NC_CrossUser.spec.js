import { test, expect, request } from "@playwright/test";

const BASE_URL = "https://eventhub.rahulshettyacademy.com";
const API_URL = "https://api.eventhub.rahulshettyacademy.com/api";

const USER_ONE = { email: "abcefg@yopmail.com", password: "Abcefg123$$$" };
const USER_TWO = {
  email: "abcefg2@yopmail.com",
  password: "Abcefg123$$$",
  name: "Tommy",
  phone: "1234567890",
};

async function loginAsOther(page, user) {
  await page.goto(`${BASE_URL}/login`);
  await page.getByPlaceholder("you@email.com").fill(user.email);
  await page.getByLabel("Password").fill(user.password);
  await page.locator("#login-btn").click();
  await expect(
    page.getByRole("link", { name: "Browse Events →" }),
  ).toBeVisible();
  await page.goto(`${BASE_URL}/events`);
}

test.skip("Cross-user booking access denied", async ({ page }) => {
  // Step 1 = login as USR_ONE via API
  // Create API context
  const apiContext = await request.newContext();

  // Send POST request
  const loginResponse = await apiContext.post(`${API_URL}/auth/login`, {
    data: {
      email: USER_ONE.email,
      password: USER_ONE.password,
    },
  });

  // Verify response status
  // expect(response.status()).toBe(200);
  await expect(loginResponse.ok()).toBeTruthy();

  // Convert response body to JSON
  const loginResponseBody = await loginResponse.json();

  console.log(loginResponseBody);

  // Example: extract token
  const token = loginResponseBody.token;

  console.log(token);

  // Step 2 - Fetch event via API
  const eventResponse = await apiContext.get(`${API_URL}/events`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  await expect(eventResponse.ok()).toBeTruthy();

  // Convert response body to JSON
  const eventResponseBody = await eventResponse.json();
  const eventId = eventResponseBody.data[0].id;

  console.log(eventResponseBody.data[0].id);

  // Step 3 - Create a booking via API
  const bookingResponse = await apiContext.post(`${API_URL}/bookings`, {
    headers: { Authorization: `Bearer ${token}` },
    data: {
      eventId,
      customerName: USER_TWO.name,
      customerEmail: USER_TWO.email,
      customerPhone: USER_TWO.phone,
      quantity: 1,
    },
  });

  await expect(bookingResponse.ok()).toBeTruthy();
  const bookingResponseBody = await bookingResponse.json();
  const bookingId = bookingResponseBody.data.id;

  console.log(bookingResponseBody.data.id);
  console.log(bookingResponseBody.data.customerName);

// Step 4: Login as another user
await loginAsOther(page, USER_TWO);

// Step 5: Navigate to USER_ONE booking URL as USER_TWO
await page.goto(`${BASE_URL}/bookings/${bookingId}`, {waitUntil: 'networkidle'});

// Step 6: Validate Access Denied
await expect(page.getByText('Access Denied')).toBeVisible();
await expect(page.getByText('You are not authorized to view this booking.')).toBeVisible();
// await page.pause();

});
