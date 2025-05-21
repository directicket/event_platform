import { Client } from '@notionhq/client';

const notion = new Client({ auth: process.env.NOTION_API_KEY });

export async function getPosts() {
  const databaseId = process.env.NOTION_DATABASE_ID!;

  const response = await notion.databases.query({
    database_id: databaseId,
    filter: {
      property: 'Published',
      checkbox: {
        equals: true,
      },
    },
    sorts: [
      {
        property: 'Publication Date',
        direction: 'descending',
      },
    ],
  });

  // force TypeScript to treat results as full pages
  return response.results as import('@notionhq/client').PageObjectResponse[];
}
