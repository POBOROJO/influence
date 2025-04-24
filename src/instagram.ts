import puppeteer from 'puppeteer';

   export interface InstagramData {
     followerCount: number;
     avgReelViews: number;
     avgReelReach?: number; // Optional, may not be scrapable
     avgBrandedReelViews: number;
     location?: string;
     contentLanguage?: string;
   }

   export async function fetchInstagramData(username: string): Promise<InstagramData | null> {
     const browser = await puppeteer.launch({ headless: true });
     const page = await browser.newPage();
     try {
       await page.goto(`https://www.instagram.com/${username}/`, { waitUntil: 'networkidle2' });

       // Extract follower count
       const followerCount = await page.evaluate(() => {
         const followerElement = document.querySelector('header [title]');
         return followerElement ? parseInt(followerElement.getAttribute('title')!.replace(/,/g, '')) : 0;
       });

       // Navigate to reels tab (may require clicking if URL alone doesn't work)
       await page.goto(`https://www.instagram.com/${username}/reels/`, { waitUntil: 'networkidle2' });
       await page.waitForSelector('article');

       // Extract reel view counts (simplified, assumes reels are loaded)
       const reelViews = await page.evaluate(() => {
         const views = Array.from(document.querySelectorAll('span')).filter(el =>
           el.textContent?.includes('views')
         ).slice(0, 15).map(el => {
           const text = el.textContent || '';
           return parseInt(text.replace(/[^\d]/g, '')) || 0;
         });
         return views;
       });

       // Assume branded reels have "#ad" or "#sponsored" (simplified detection)
       const brandedReelViews = reelViews.slice(0, 7); // Placeholder logic

       const avgReelViews = reelViews.length ? reelViews.reduce((a, b) => a + b, 0) / reelViews.length : 0;
       const avgBrandedReelViews = brandedReelViews.length ? brandedReelViews.reduce((a, b) => a + b, 0) / brandedReelViews.length : 0;

       // Location and language might require bio scraping or assumptions
       const location = 'Unknown'; // Extend scraping if needed
       const contentLanguage = 'English'; // Extend with NLP if needed

       await browser.close();
       return {
         followerCount,
         avgReelViews,
         avgBrandedReelViews,
         location,
         contentLanguage,
       };
     } catch (error) {
       console.error(`Error fetching Instagram data for ${username}:`, error);
       await browser.close();
       return null;
     }
   }