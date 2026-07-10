import { test, expect } from "@playwright/test";

const BASE_URL = "https://eventhub.rahulshettyacademy.com";
const email = "abcefg@yopmail.com";
const password = "Abcefg123$$$";
const fullName = "TestName";
const phoneNumber = "1234567890";
const testDescription = "DescriptionAbc";
const testCity = "CityAbc";
const testVenue = "VenueAbc";

// Reusable helper: login function
async function login(page) {
  await page.goto(`${BASE_URL}/login`);
  await page.getByPlaceholder("you@email.com").fill(email);
  await page.getByLabel("Password").fill(password);
  await page.locator("#login-btn").click();
  await expect(
    page.getByRole("link", { name: "Browse Events →" }),
  ).toBeVisible();
}

//Reusable helper: futureDateValue function
function futureDateValue(daysFromToday) {
  const date = new Date();
  date.setDate(date.getDate() + daysFromToday);
  return date.toISOString().slice(0, 16);
}

test("Full Booking with Event Creation", async ({ page }) => {
  const eventTitle = `Test Event ${Date.now()}`;

  //Step 1: log in
  await login(page);

  //Step 2: Create a new eventhub
  await page.goto(`${BASE_URL}/admin/events`);
  await page.locator("#event-title-input").fill(eventTitle);
  await page.locator("#admin-event-form textarea").fill(testDescription);
  await page.getByLabel("City").fill(testCity);
  await page.getByLabel("Venue").fill(testVenue);
  const futureDate = futureDateValue(28);
  console.log(`Future date: ${futureDate}`);
  await page.getByLabel("Event Date & Time").fill(futureDate);
  await page.getByLabel("Price").fill("100");
  await page.getByLabel("Total Seats").fill("50");
  await page.locator("#add-event-btn").click();
  // Check loading better than waitForLoadState("networkidle")
  await expect(page.getByText("Event created!")).toBeVisible();
  console.log(`Event Title: ${eventTitle}`);

  // Find event card and capture seats
  await page.goto(`${BASE_URL}/events`);
  const allEvents = await page.locator("#event-card");
  // check loading
  await expect(allEvents.first()).toBeVisible();
  // scan all visible events for one matching our event title
  const myEvent = await allEvents.filter({ hasText: eventTitle });
  // “Wait up to 5 seconds for the element myEvent to become visible on the page.
  // If it becomes visible, the test passes. If not, the test fails.”
  await expect(myEvent).toBeVisible({ timeout: 5000 });
  const seatCount = await myEvent.getByText("seat").textContent();
  const seatAvailable = parseInt(seatCount.split(" ")[0]);
  console.log(`Seat available: ${seatAvailable}`);

  // Step 4 - Start booking
  await myEvent.getByTestId("book-now-btn").click();

  // Step 5 - Fill booking form
  // Method #1
  // const bookingCount = await page.locator('#ticket-count').textContent();
  // await expect(bookingCount).toBe('1');
  // Method #2 - from instructor
  const bookingCount = await page.locator("#ticket-count");
  await expect(bookingCount).toHaveText("1");
  await page.getByLabel("Full Name").fill(fullName);
  await page.locator("#customer-email").fill(email);
  await page.getByPlaceholder("+91 98765 43210").fill(phoneNumber);
  await page.locator("#confirm-booking").click();

  // Step 6 - Verify booking confirmation
  await expect(page.locator(".booking-ref")).toBeVisible();
  const tempRef = await page.locator(".booking-ref").textContent();
  const bookingRef = tempRef.trim();
  console.log(`Booking Ref#: ${bookingRef}`);

  // Step 7 - verify in My Bookings
  /* await page.getByRole('button', {name:'View My Bookings'}).click();
   const newPageUrl  = page.url();
   console.log(`Bookings URL: ${newPageUrl}`); 
   await expect(newPageUrl).toBe(`${BASE_URL}/bookings`); */

  // From chatgpt - toHaveURL() automatically waits for navigation, while this does not:
  await page.getByRole("button", { name: "View My Bookings" }).click();
  await expect(page).toHaveURL(`${BASE_URL}/bookings`);
  console.log(`Bookings URL: ${page.url()}`);

  const test = page.locator("#booking-card");
  await expect(test.first()).toBeVisible();
  await expect(test.getByText(bookingRef)).toBeVisible();
  await expect(test.getByText(eventTitle)).toBeTruthy();

  // Step 8 - Verify seat reduction
  await page.goto(`${BASE_URL}/events`);
  await expect(page.getByTestId("event-card").first()).toBeVisible();
  const y = page.getByTestId("event-card");
  await expect(y.getByText(eventTitle)).toBeVisible();
  // Method #1
  // const newSeatCount = await myEvent.getByText("seat").textContent();
  // const newSeatAvailable = parseInt(newSeatCount.split(' ')[0]);
  // Method #2 - from instructor
  // parseInt() converts a string into an integer (whole number).
  // parseInt() reads from left to right until it hits a non-number.
  // innerText() gets the visible text inside an HTML element.
  // await locator.innerText()
  const newSeatCount = await myEvent.getByText("seat").innerText();
  const newSeatAvailable = parseInt(newSeatCount.split(" ")[0]);
  console.log(`New seat available: ${newSeatAvailable}`);
  // console.log(seatAvailable - 1);
  await expect(newSeatAvailable).toBe(seatAvailable - 1);

  // await page.pause();
});
