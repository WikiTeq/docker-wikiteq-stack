import "expect-puppeteer"

describe('/Main_Page', () => {
    beforeAll(async () => {
        await page.goto( ( process.env.URL || 'http://localhost' ) )
    })

    it('should display "MediaWiki" text on page', async () => {
        await expect(page).toMatch('MediaWiki')
    })

    it('should have "Log in" link on page', async () => {
        await expect(page).toMatchElement('a', { text: 'Log in' })
    })
})
