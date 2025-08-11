import { test, expect } from '@playwright/test';

// These tests assume the Next.js dev server is started by Playwright's webServer
// in playwright.config.ts and baseURL is set to http://localhost:3000.

test.describe('Home page (/)', () => {
  test('renders hero section and texts', async ({ page }) => {
    await page.goto('/');

    // Hero
    await expect(page.getByText('AI-Powered Opportunity Matching')).toBeVisible();
  });

  test('renders sponsor section', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/');
    await expect(page.getByText('Thanks to our sponsors')).toBeVisible();
  });

  test('renders feature section', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByText('What we offer')).toBeVisible();
    await expect(page.getByText('Powerful Features for Your Success')).toBeVisible();
  });

  test('How it works section', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/');

    const howItWorks = page.locator('#how-it-works');

    // Section heading and description
    await expect(howItWorks.getByRole('heading', { name: 'How It Works' })).toBeVisible();

    // Step pills (exact text with step numbers)
    await expect(howItWorks.getByText('#1 SIGN UP')).toBeVisible();
    await expect(howItWorks.getByText('#2 ANALYSIS')).toBeVisible();
    await expect(howItWorks.getByText('#3 RECOMMENDATIONS')).toBeVisible();
    await expect(howItWorks.getByText('#4 TAKE ACTION')).toBeVisible();

    // Card titles
    await expect(howItWorks.getByText('Create Your Profile')).toBeVisible();
    await expect(howItWorks.getByText('AI Analysis')).toBeVisible();
    await expect(howItWorks.getByText('Get Matched')).toBeVisible();
    await expect(howItWorks.getByText('Succeed')).toBeVisible();
  });

  test('Academic section (#students)', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/');

    const students = page.locator('#students');

    // Pill label
    await expect(students.getByText('For Students')).toBeVisible();

    // Heading text (spans inside are fine as long as visible)
    await expect(students.getByRole('heading', { name: /Launch Your Academic Journey/i })).toBeVisible();
    await expect(students.getByText('Confidence')).toBeVisible();

    // Bullet items
    await expect(students.getByText('Access to exclusive student discounts and scholarships')).toBeVisible();
    await expect(students.getByText('Personalized learning path recommendations')).toBeVisible();
    await expect(students.getByText('Early access to internship and job opportunities')).toBeVisible();

    // Image by alt text
    await expect(students.getByAltText('Students collaborating')).toBeVisible();

    // Support cards
    await expect(students.getByText('Course Discovery')).toBeVisible();
    await expect(students.getByText('Find courses from top universities')).toBeVisible();
    await expect(students.getByText('Career Guidance')).toBeVisible();
    await expect(students.getByText('Get personalized career advice')).toBeVisible();
  });

  test('Professional section (#professionals)', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/');

    const pros = page.locator('#professionals');

    // Pill label
    await expect(pros.getByText('For Professionals')).toBeVisible();

    // Heading text and emphasized span
    await expect(pros.getByRole('heading', { name: /Accelerate your/i })).toBeVisible();
    await expect(pros.getByText('Career Growth')).toBeVisible();

    // Body copy excerpt to ensure content rendered
    await expect(
      pros.getByText(/our platform connects you with opportunities that propel your career forward/i),
    ).toBeVisible();

    // Bullet items
    await expect(pros.getByText('Confidential job search with privacy controls')).toBeVisible();
    await expect(pros.getByText('Salary insights and other important details')).toBeVisible();
    await expect(pros.getByText('Executive coaching and leadership development')).toBeVisible();

    // Image by alt text (note: alt is "Students collaborating" in this component, assert as-is)
    await expect(pros.getByAltText('Students collaborating')).toBeVisible();

    // Support cards
    await expect(pros.getByText('Job Opportunities')).toBeVisible();
    await expect(pros.getByText('Discover exclusive job openings')).toBeVisible();
    await expect(pros.getByText('Industry Events')).toBeVisible();
    await expect(pros.getByText('Connect with industry leaders')).toBeVisible();
  });

  test('events carousel: single visible slide and next navigation updates active dot', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/');

    // Ensure exactly one visible card (aria-hidden=false on the center slide)
    const visibleSlides = page.locator('[aria-hidden="false"]');
    await expect(visibleSlides).toHaveCount(1);

    // Dots: buttons with aria-label="Go to slide X"
    const dotButtons = page.getByRole('button', { name: /Go to slide \d+/ });
    const dotCount = await dotButtons.count();
    expect(dotCount).toBeGreaterThan(0);

    // Helper to get active dot index based on Tailwind classes
    const getActiveDotIndex = async () => {
      const count = await dotButtons.count();
      for (let i = 0; i < count; i++) {
        const cls = (await dotButtons.nth(i).getAttribute('class')) || '';
        if (cls.includes('w-6') && cls.includes('bg-orange-500')) return i;
      }
      return -1;
    };

    const beforeIndex = await getActiveDotIndex();
    expect(beforeIndex).toBeGreaterThanOrEqual(0);

    // Click the next arrow
    const nextButton = page.getByRole('button', { name: 'Next event' });
    await nextButton.click();

    // Active dot should change; poll to allow animation/state updates
    await expect.poll(async () => getActiveDotIndex()).not.toEqual(beforeIndex);

    // Still exactly one visible slide
    await expect(visibleSlides).toHaveCount(1);
  });
});
