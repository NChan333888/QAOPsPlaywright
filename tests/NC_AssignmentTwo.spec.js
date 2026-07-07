import{test, expect} from '@playwright/test';

const BASE_URL="https://eventhub.rahulshettyacademy.com";
const user_info = {email: 'abcefg@yopmail.com', password: 'Abcefg123$$$', fullName: 'TestName', phoneNumber: '1234567890' };

// Helper: loginAndGoToBookings() function
async function loginAndGoToBookings(page){

    await page.goto(`${BASE_URL}/login`);
    await page.locator('#email').fill(user_info.email);
    await page.locator('#password').fill(user_info.password);
    await page.locator('#login-btn').click();
    await expect(page.getByRole('link', {name: 'Browse Events →'})).toBeVisible();


}

test.skip('Refund Eligibility Check Test #1', async({page}) =>
{
    // Test 1 - Single ticket booking is eligible for refund
    
    // Step 1 - login
    await loginAndGoToBookings(page);

    // Step 2 - Book first event with 1 ticket (default)
    await page.goto(`${BASE_URL}/events`);
    const firstEvent = await page.getByTestId('event-card').first();
    await expect(firstEvent).toBeVisible();
    await firstEvent.getByTestId('book-now-btn').click();
    await page.locator('#customerName').fill(user_info.fullName);
    await page.getByLabel('Email').fill(user_info.email);
    await page.getByPlaceholder('+91 98765 43210').fill(user_info.phoneNumber);
    await page.getByRole('button', {name: 'Confirm Booking'}).click();

    // Step 3 - Navigate to booking detail
    await page.getByText('View My Bookings').click();
    const pageUrl = page.url();
    console.log(`Page URL: ${pageUrl}`);
    await expect(pageUrl).toBe(`${BASE_URL}/bookings`);
    const firstCard = await page.getByTestId('booking-card').first(); 
    await expect(firstCard).toBeVisible({timeout: 5000});
    await firstCard.getByRole('button', {name: 'View Details'}).click();
    await expect(page.getByText('Booking Information')).toBeVisible();

    // Step 4 - Validate booking ref
    const bookRef = await page.locator('.font-mono.font-bold.text-indigo-600').textContent();    
    console.log('First character at booking reference: ' + bookRef.charAt(0));
    const eventTit = await page.locator('h1').innerText();
    await expect(bookRef.charAt(0)).toBe(eventTit.charAt(0));
    console.log('First character at event title: ' + eventTit.charAt(0));

    // Step 5 - Check refund eligibility
    await page.getByTestId('check-refund-btn').click();
    const spinner = page.locator('#refund-spinner');
    await expect(spinner).toBeVisible();
    await expect(spinner).toHaveCount(0, { timeout: 6000 });

    // Step 6 - Validate result
    const refundRes = page.locator('#refund-result');
    await expect(refundRes).toBeVisible();
    await expect(refundRes).toContainText('Eligible for refund');
    await expect(refundRes).toContainText('Single-ticket bookings qualify for a full refund');
    await page.locator('#logout-btn').click();

});

test.skip('Refund Eligibility Check Test #2', async({page}) =>
{
    // Test 2 - Group ticket booking is NOT eligible for refund

    // Step 1 - login
    await loginAndGoToBookings(page);

    // Step 2 - Book first event with 1 ticket (default)
    await page.goto(`${BASE_URL}/events`);
    const firstEvent = await page.getByTestId('event-card').first();
    await expect(firstEvent).toBeVisible();
    await firstEvent.getByTestId('book-now-btn').click();
    await page.getByRole('button', {name: '+'}).click();
    await page.getByRole('button', {name: '+'}).click();
    const count = await page.locator('#ticket-count').innerText();
    console.log('Ticket count: ' + count);
    await expect(count).toBe('3');
    await page.locator('#customerName').fill(user_info.fullName);
    await page.getByLabel('Email').fill(user_info.email);
    await page.getByPlaceholder('+91 98765 43210').fill(user_info.phoneNumber);
    await page.getByRole('button', {name: 'Confirm Booking'}).click();
    
    // Step 3 - Navigate to booking detail
    await page.getByText('View My Bookings').click();
    await expect(page).toHaveURL(`${BASE_URL}/bookings`);
    const firstCard = await page.getByTestId('booking-card').first(); 
    await expect(firstCard).toBeVisible({timeout: 5000});
    await firstCard.getByRole('button', {name: 'View Details'}).click();
    await expect(page.getByText('Booking Information')).toBeVisible();

    // Step 4 - Validate booking ref
    const bookRef = await page.locator('.font-mono.font-bold.text-indigo-600').textContent();    
    console.log('First character at booking reference: ' + bookRef.charAt(0));
    const eventTit = await page.locator('h1').innerText();
    await expect(bookRef.charAt(0)).toBe(eventTit.charAt(0));
    console.log('First character at event title: ' + eventTit.charAt(0));

    // Step 5 - Check refund eligibility
    await page.getByTestId('check-refund-btn').click();
    const spinner = page.locator('#refund-spinner');
    await expect(spinner).toBeVisible();
    await expect(spinner).not.toBeVisible({timeout: 6000});
   
    // Step 6 - Validate result (different assertions)
    const refundRes = page.locator('#refund-result');
    await expect(refundRes).toBeVisible();
    await expect(refundRes).toContainText('Not eligible for refund');
    await expect(refundRes).toContainText('Group bookings (3 tickets) are non-refundable');
    await page.locator('#logout-btn').click();

    //await page.pause();

});