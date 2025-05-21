// lib/notion.ts
import { Client } from '@notionhq/client';

const notion = new Client({
  auth: process.env.NOTION_API_KEY, // make sure this is set in .env.local
});

export default notion;
