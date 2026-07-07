import { test, expect, request } from "@playwright/test";

const BASE_URL = "https://eventhub.rahulshettyacademy.com";
const email = "abcefg@yopmail.com";
const password = "Abcefg123$$$";
const SIX_EVENTS_RESPONSE = {
  data: [
    {
      id: 1,
      title: "Tech Summit 2025",
      category: "Conference",
      eventDate: "2025-06-01T10:00:00.000Z",
      venue: "HICC",
      city: "Hyderabad",
      price: "999",
      totalSeats: 200,
      availableSeats: 150,
      imageUrl: null,
      isStatic: false,
    },
    {
      id: 2,
      title: "Rock Night Live",
      category: "Concert",
      eventDate: "2025-06-05T18:00:00.000Z",
      venue: "Palace Grounds",
      city: "Bangalore",
      price: "1500",
      totalSeats: 500,
      availableSeats: 300,
      imageUrl: null,
      isStatic: false,
    },
    {
      id: 3,
      title: "IPL Finals",
      category: "Sports",
      eventDate: "2025-06-10T19:30:00.000Z",
      venue: "Chinnaswamy",
      city: "Bangalore",
      price: "2000",
      totalSeats: 800,
      availableSeats: 50,
      imageUrl: null,
      isStatic: false,
    },
    {
      id: 4,
      title: "UX Design Workshop",
      catego: "Workshop",
      eventDate: "2025-06-15T09:00:00.000Z",
      venue: "WeWork",
      city: "Mumbai",
      price: "500",
      totalSeats: 50,
      availableSeats: 20,
      imageUrl: null,
      isStatic: false,
    },
    {
      id: 5,
      title: "Lollapalooza India",
      category: "Festival",
      eventDate: "2025-06-20T12:00:00.000Z",
      venue: "Mahalaxmi Racecourse",
      city: "Mumbai",
      price: "3000",
      totalSeats: 5000,
      availableSeats: 2000,
      imageUrl: null,
      isStatic: false,
    },
    {
      id: 6,
      title: "AI & ML Expo",
      category: "Conference",
      eventDate: "2025-06-25T10:00:00.000Z",
      venue: "Bangalore International Exhibition Centre",
      city: "Bangalore",
      price: "750",
      totalSeats: 300,
      availableSeats: 180,
      imageUrl: null,
      isStatic: false,
    },
  ],
  pagination: { page: 1, totalPages: 1, total: 6, limit: 12 },
};

const FOUR_EVENTS_RESPONSE = {
  data: [
    {
      id: 1,
      title: "Tech Summit 2025",
      category: "Conference",
      eventDate: "2025-06-01T10:00:00.000Z",
      venue: "HICC",
      city: "Hyderabad",
      price: "999",
      totalSeats: 200,
      availableSeats: 150,
      imageUrl: null,
      isStatic: false,
    },
    {
      id: 2,
      title: "Rock Night Live",
      category: "Concert",
      eventDate: "2025-06-05T18:00:00.000Z",
      venue: "Palace Grounds",
      city: "Bangalore",
      price: "1500",
      totalSeats: 500,
      availableSeats: 300,
      imageUrl: null,
      isStatic: false,
    },
    {
      id: 3,
      title: "IPL Finals",
      category: "Sports",
      eventDate: "2025-06-10T19:30:00.000Z",
      venue: "Chinnaswamy",
      city: "Bangalore",
      price: "2000",
      totalSeats: 800,
      availableSeats: 50,
      imageUrl: null,
      isStatic: false,
    },
    {
      id: 4,
      title: "UX Design Workshop",
      category: "Workshop",
      eventDate: "2025-06-15T09:00:00.000Z",
      venue: "WeWork",
      city: "Mumbai",
      price: "500",
      totalSeats: 50,
      availableSeats: 20,
      imageUrl: null,
      isStatic: false,
    },
  ],
  pagination: { page: 1, totalPages: 1, total: 4, limit: 12 },
};

async function loginAndGoToEvents(page) {
  await page.goto(`${BASE_URL}/login`);
  await page.getByPlaceholder("you@email.com").fill(email);
  await page.getByLabel("Password").fill(password);
  await page.locator("#login-btn").click();
  await expect(
    page.getByRole("link", { name: "Browse Events →" }),
  ).toBeVisible();
  await page.goto(`${BASE_URL}/events`);
}

test("Banner IS visible when 6 events are returned", async ({ page }) => {
  // intercepting response - Api response->{playwright fakeresponse}->browser->render data on front end
  await page.route("**/api/events**", async (route) => {
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify(SIX_EVENTS_RESPONSE),
    });
  });

  await loginAndGoToEvents(page);

  const allEvent = await page.getByTestId('event-card');
  await expect(allEvent.first()).toBeVisible();
  expect(await allEvent.count()).toBe(6);
  const banner = page.getByText(/sandbox holds up to/i);
  console.log(await banner.allTextContents());
  await expect(banner).toBeVisible();
  await expect(banner).toContainText("9 bookings");
  await page.pause();
});


test('Banner is NOT visible when 4 events are returned', async({page})=> 
{
    await page.route("**/api/events**", async (route) => {
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify(FOUR_EVENTS_RESPONSE),
    });
  });

  await loginAndGoToEvents(page);

  const allEvent = await page.getByTestId('event-card');
  await expect(allEvent.first()).toBeVisible();
  expect(await allEvent.count()).toBe(4);
  const banner = page.getByText(/sandbox holds up to/i);
  await expect(banner).not.toBeVisible();
  // await page.pause();


});



