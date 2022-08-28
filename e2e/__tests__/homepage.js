/**
 * @jest-environment puppeteer
 */

const timeout = 5000

describe('Google', () => {
    beforeAll(async () => {
        await page.goto( ( process.env.URL || 'http://localhost' ) )
    })

    it('should display "google" text on page', async () => {
        await expect(page).toMatch('MediaWiki')
    })
})
