# Influencer Data Fetcher Task List

This document details the specific tasks required to complete the Influencer Data Fetcher project. Each task is categorized by module and includes a brief description.

## Project Setup

1. **Initialize Project:**
   - Create a new directory and initialize a Node.js project.
   - Install TypeScript and necessary dependencies.

2. **Configure TypeScript:**
   - Create `tsconfig.json` with appropriate settings.

3. **Set Up Directory Structure:**
   - Create `src` and `dist` folders.
   - Initialize module files: `main.ts`, `googleSheets.ts`, `instagram.ts`, `youtube.ts`, `demographics.ts`.

## Google Sheets Integration

1. **Set Up Google Sheets API:**
   - Create a Google Cloud project and enable the Google Sheets API.
   - Generate a service account key and share the sheet with the service account.

2. **Implement Reading Function:**
   - Write `readCreators` function to fetch influencer data from the sheet.

3. **Implement Writing Function:**
   - Write `writeResults` function to update the sheet with processed data.

## Instagram Data Fetching

1. **Implement Profile Scraping:**
   - Use `puppeteer` to navigate to the influencer's profile and extract follower count.

2. **Implement Reel Scraping:**
   - Navigate to the reels tab and extract view counts for the last 15 reels.
   - Identify branded reels using keyword detection.

3. **Handle Location and Language:**
   - Attempt to scrape location from the bio or assume defaults.

4. **Error Handling:**
   - Implement try-catch blocks to handle scraping failures.

## YouTube Data Fetching

1. **Set Up YouTube API:**
   - Enable the YouTube Data API in Google Cloud Console.
   - Generate an API key and add it to the project.

2. **Fetch Channel Data:**
   - Use the API to retrieve subscriber count, location, and content language.

3. **Fetch Video Data:**
   - Retrieve the last 15 videos and calculate average views.

4. **Error Handling:**
   - Handle API errors and missing data.

## Demographic Estimation

1. **Set Up NLP Classifier:**
   - Use `natural` to create a Bayes classifier for content categorization.

2. **Define Demographic Estimates:**
   - Create a mapping of content categories to demographic splits.

3. **Implement Estimation Function:**
   - Classify content and return estimated demographic splits.

## Main Execution Logic

1. **Process Each Influencer:**
   - Fetch Instagram and YouTube data.
   - Estimate demographics.
   - Prepare data for output.

2. **Manage Concurrency:**
   - Use `p-limit` to limit concurrent requests to 5.

3. **Integrate All Components:**
   - Read influencers, process data, and write results in `main.ts`.

## Testing and Debugging

1. **Test Google Sheets Functions:**
   - Verify reading and writing with sample data.

2. **Test Instagram Scraping:**
   - Test with a few public profiles.

3. **Test YouTube API Calls:**
   - Test with known channel IDs.

4. **Test Demographic Estimation:**
   - Test with sample content descriptions.

5. **End-to-End Testing:**
   - Run the entire process with a small set of influencers.

## Documentation and Finalization

1. **Add Code Comments:**
   - Document key decisions and logic in the code.

2. **Create README.md:**
   - Provide setup instructions, features, and limitations.

3. **Verify Output:**
   - Ensure the Google Sheet is correctly updated with all data points.