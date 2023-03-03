// @ts-check
const { test, expect } = require('@playwright/test');

test.describe('Welcome to the Jungle https://www.inqom.com/solutions/cabinet-comptable ', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://www.welcometothejungle.com/fr/signin');
  });


  test('update profile picture', async ({ page }) => {

    // Define the selectors we can use them on the page object model .
    const email = page.locator('[data-testid=\"login-field-email\"]')
    const password = page.locator('[data-testid=\"login-field-password\"]')
    const seConnecter = page.locator('[data-testid=\"login-button-submit\"]');
    const userCard = page.locator('[data-testid=\"home-connected-user-card\"]')
    const save = page.locator('[data-testid="account-edit-button-submit\"]')
    const fileInput = page.locator('input[type=\"file\"]').first()

    // Expect a title "to contain" a substring.
    await expect(page).toHaveURL('https://www.welcometothejungle.com/fr/signin');
    // fill the login page
    await email.fill('inqom.qaautomationapplicant@gmail.com')
    await password.fill('o5N,d5ZR@R7^')
    await seConnecter.click()

    // Assert that we are on right page
    await expect(page).toHaveURL('https://www.welcometothejungle.com/fr/')

    await userCard.click()

    //Assertion the to make sur we are on the right page.

    await expect(page).toHaveURL('https://www.welcometothejungle.com/fr/me/settings/account')
    await expect(page.getByText('Mes informations')).toBeVisible()
    await expect(page.getByText('Mon parcours')).toBeVisible()
    await expect(page.getByText('Ma présence sur internet')).toBeVisible()

    // update profile picture and save.
    await fileInput.setInputFiles('./end-to-end-tests/fixtures/profile.png')
    await save.click()
    await page.waitForTimeout(3000)

    //Assertions that the new profile picture is here and we the old data are present.
    await expect(page.getByLabel('Je suis un homme')).toBeChecked();
    await expect(page.getByLabel('Je suis non-binaire')).not.toBeChecked();
    await expect(page.getByLabel('Je suis une femme')).not.toBeChecked();
    await expect(page.getByTestId('account-edit-field-avatar').locator('img')).toBeEnabled();

    //await page.pause()

  })
});
