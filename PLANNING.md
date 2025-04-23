# Influencer Data Fetcher Planning Document

This document outlines the planning phase for developing the Influencer Data Fetcher, an AI agent designed to retrieve and analyze data from Instagram and YouTube influencers listed in a Google Sheet. The project aims to fetch specific data points, estimate unavailable metrics using AI, and output the results back to the Google Sheet.

## Project Overview

The Influencer Data Fetcher will:
- Read influencer details from a Google Sheet.
- Fetch data from Instagram and YouTube using APIs and web scraping.
- Estimate demographic data using natural language processing (NLP).
- Write the fetched and estimated data back to the Google Sheet.

## Key Objectives

1. **Data Retrieval:**
   - Fetch Instagram data: follower count, average views on last 15 reels, average reach on last 15 reels, average views on last 7 branded reels, location, content language.
   - Fetch YouTube data: subscriber count, average views on last 15 videos, location, content language.
   
2. **Demographic Estimation:**
   - Estimate gender split, state split, and age split using AI based on content analysis.

3. **Integration:**
   - Read from and write to a Google Sheet using the Google Sheets API.

4. **Error Handling and Concurrency:**
   - Implement robust error handling and manage concurrent requests to avoid rate limiting.

## Approach

### 1. Project Setup
- **Environment:** Use TypeScript for type safety and modern JavaScript features.
- **Dependencies:** Install necessary libraries like `axios`, `googleapis`, `puppeteer`, `natural`, and `p-limit`.

### 2. Google Sheets Integration
- **Authentication:** Use a service account for secure access to the Google Sheets API.
- **Reading Data:** Retrieve influencer details from specified columns in the sheet.
- **Writing Data:** Update the sheet with fetched and estimated data in designated columns.

### 3. Instagram Data Fetching
- **Web Scraping:** Utilize `puppeteer` to scrape Instagram profile and reel data due to limitations of the official API.
- **Data Points:** Extract follower count, reel views, and attempt to infer location and content language.
- **Branded Reels:** Identify reels with branded content using keyword detection in captions.

### 4. YouTube Data Fetching
- **API Usage:** Leverage the YouTube Data API to fetch channel statistics and video views.
- **Data Points:** Retrieve subscriber count, average video views, location, and content language.

### 5. Demographic Estimation
- **NLP Classification:** Use `natural` library to classify content and estimate demographic splits.
- **Predefined Estimates:** Assign demographic splits based on content categories like fitness, gaming, etc.

### 6. Main Execution Logic
- **Concurrency Control:** Use `p-limit` to manage concurrent requests and avoid rate limiting.
- **Data Processing:** Process each influencer, fetch data, estimate demographics, and prepare data for output.

<!-- ## Challenges and Solutions

- **Instagram Data Access:** Official APIs lack detailed metrics; web scraping is used but may face rate limiting. Solution: Implement delays and concurrency limits.
- **Demographic Data:** Not publicly available; estimation is speculative. Solution: Use NLP for basic categorization and acknowledge limitations.
- **Error Handling:** Ensure the agent handles API failures and missing data gracefully. Solution: Implement try-catch blocks and log errors. -->


## Success Criteria

- The agent successfully reads from and writes to the Google Sheet.
- Data points are accurately fetched and estimated where possible.
- The agent handles errors and rate limits effectively.
- The solution is well-documented and easy to understand.