import { google } from 'googleapis';

   const auth = new google.auth.GoogleAuth({
     keyFile: './service-account-key.json',
     scopes: ['https://www.googleapis.com/auth/spreadsheets'],
   });

   const sheets = google.sheets({ version: 'v4', auth });

   export interface Creator {
     name: string;
     instagramHandle: string;
     youtubeChannelId: string;
   }

   export async function readCreators(spreadsheetId: string): Promise<Creator[]> {
     const response = await sheets.spreadsheets.values.get({
       spreadsheetId,
       range: 'Sheet1!A2:C', // Adjust range based on your sheet
     });
     const rows = response.data.values || [];
     return rows.map(row => ({
       name: row[0] || '',
       instagramHandle: row[1] || '',
       youtubeChannelId: row[2] || '',
     }));
   }

   export async function writeResults(spreadsheetId: string, data: any[]) {
     const request = {
       spreadsheetId,
       range: 'Sheet1!D2', // Adjust range for output
       valueInputOption: 'RAW',
       resource: { values: data },
     };
     await sheets.spreadsheets.values.update(request);
   }