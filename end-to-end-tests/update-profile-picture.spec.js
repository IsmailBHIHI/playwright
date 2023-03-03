// @ts-check
const { test, expect } = require('@playwright/test');

test.describe('Welcome to the ', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://www.welcometothejungle.com/fr/signin');
  });


  test('update profile picture', async ({ page }) => {

    const email = page.locator('[data-testid=\"login-field-email\"]')
    const password = page.locator('[data-testid=\"login-field-password\"]')
    const seConnecter = page.locator('[data-testid=\"login-button-submit\"]');
    const userCard = page.locator('[data-testid=\"home-connected-user-card\"]')
    const save = page.locator('[data-testid="account-edit-button-submit\"]')
    const fileInput = page.locator('input[type=\"file\"]').first()
    const status = page.locator('#avatar > div > img')

    // Expect a title "to contain" a substring.
    await expect(page).toHaveURL('https://www.welcometothejungle.com/fr/signin');

    await email.fill('inqom.qaautomationapplicant@gmail.com')
    await password.fill('o5N,d5ZR@R7^')
    await seConnecter.click()

    await expect(page).toHaveURL('https://www.welcometothejungle.com/fr/')

    await userCard.click()

    await expect(page).toHaveURL('https://www.welcometothejungle.com/fr/me/settings/account')

    await fileInput.setInputFiles('./playwright-main/end-to-end-tests/fixtures/profile.png')

    await save.click()
    
    await page.pause()

  })
});
