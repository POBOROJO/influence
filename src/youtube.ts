import { google } from 'googleapis';

   const youtube = google.youtube({ version: 'v3', auth: 'YOUR_YOUTUBE_API_KEY' }); // Replace with your API key

   export interface YouTubeData {
     subscriberCount: number;
     avgVideoViews: number;
     location?: string;
     contentLanguage?: string;
   }

   export async function fetchYouTubeData(channelId: string): Promise<YouTubeData | null> {
     try {
       // Fetch channel data
       const channelResponse = await youtube.channels.list({
         part: ['statistics', 'snippet'],
         id: [channelId],
       });
       const channel = channelResponse.data.items?.[0];
       if (!channel) throw new Error('Channel not found');

       const subscriberCount = parseInt(channel.statistics?.subscriberCount || '0');
       const location = channel.snippet?.country || 'Unknown';
       const contentLanguage = channel.snippet?.defaultLanguage || 'English';

       // Fetch recent videos
       const searchResponse = await youtube.search.list({
         part: ['id'],
         channelId,
         maxResults: 15,
         order: 'date',
         type: ['video'],
       });
       const videoIds = searchResponse.data.items?.map(item => item.id?.videoId) || [];

       const videosResponse = await youtube.videos.list({
         part: ['statistics'],
         id: videoIds as string[],
       });
       const viewCounts = videosResponse.data.items?.map(video => parseInt(video.statistics?.viewCount || '0')) || [];
       const avgVideoViews = viewCounts.length ? viewCounts.reduce((a, b) => a + b, 0) / viewCounts.length : 0;

       return { subscriberCount, avgVideoViews, location, contentLanguage };
     } catch (error) {
       console.error(`Error fetching YouTube data for ${channelId}:`, error);
       return null;
     }
   }