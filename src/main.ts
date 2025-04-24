import pLimit from 'p-limit';
   import { readCreators, writeResults, Creator } from './googleSheets';
   import { fetchInstagramData, InstagramData } from './instagram';
   import { fetchYouTubeData, YouTubeData } from './youtube';
   import { estimateDemographics, DemographicSplits } from './demographics';

   const SPREADSHEET_ID = ''; // Replace with your spreadsheet ID

   interface Result {
     name: string;
     instagram: InstagramData | null;
     youtube: YouTubeData | null;
     demographics: DemographicSplits;
   }

   async function processCreator(creator: Creator): Promise<any[]> {
     const instagram = await fetchInstagramData(creator.instagramHandle);
     const youtube = await fetchYouTubeData(creator.youtubeChannelId);
     const demographics = estimateDemographics(`${creator.name}'s content`); // Placeholder content description

     const result: Result = { name: creator.name, instagram, youtube, demographics };

     return [
       creator.name,
       instagram?.followerCount || 0,
       instagram?.avgReelViews || 0,
       instagram?.avgBrandedReelViews || 0,
       instagram?.location || 'Unknown',
       instagram?.contentLanguage || 'Unknown',
       youtube?.subscriberCount || 0,
       youtube?.avgVideoViews || 0,
       youtube?.location || 'Unknown',
       youtube?.contentLanguage || 'Unknown',
       `${demographics.genderSplit.male}:${demographics.genderSplit.female}`,
       Object.entries(demographics.ageSplit).map(([range, pct]) => `${range}:${pct}`).join(','),
     ];
   }

   async function main() {
     try {
       const creators = await readCreators(SPREADSHEET_ID);
       console.log(`Found ${creators.length} creators to process.`);

       const limit = pLimit(5); // Limit to 5 concurrent requests
       const promises = creators.map(creator => limit(() => processCreator(creator)));
       const results = await Promise.all(promises);

       await writeResults(SPREADSHEET_ID, results);
       console.log('Data processing complete. Results written to Google Sheet.');
     } catch (error) {
       console.error('Error in main execution:', error);
     }
   }

   main();