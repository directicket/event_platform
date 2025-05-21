// lib/getPageContent.ts
import notion from './notion';

export async function getPageContent(pageId: string) {
  const blocks = await notion.blocks.children.list({
    block_id: pageId,
  });

  return blocks.results;
}
