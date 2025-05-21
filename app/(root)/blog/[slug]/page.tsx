export const revalidate = 100; //set to 0 in dev or on localhost (thats what dev means sir), 100 for prod.

import { notFound } from 'next/navigation';
import { getPosts } from '@/lib/getPosts';
import { getPageContent } from '@/lib/getPageContent';
import Footer from '@/components/shared/Footer';

export default async function PostPage({ params }: { params: { slug: string } }) {
  const posts = await getPosts();

  const post = posts.find((p: any) => {
    const slugProp = p.properties.Slug;
    return slugProp?.type === 'rich_text' && slugProp.rich_text[0]?.plain_text === params.slug;
  });

  if (!post) return notFound();

  const publishedProp = post.properties.Published;
  const isPublished = publishedProp?.type === 'checkbox' ? publishedProp.checkbox : false;
  if (!isPublished) return notFound();

  const content = await getPageContent(post.id);

  const titleProp = post.properties.Title;
  const title = titleProp?.type === 'title' ? titleProp.title[0]?.plain_text || 'Untitled' : 'Untitled';

  const authorProp = post.properties.Author;
  const author = authorProp?.type === 'rich_text' ? authorProp.rich_text[0]?.plain_text || 'Unknown' : 'Unknown';

  return (
    <>
    <main className="wrapper *:text-white mt-16">
      <h1 className="h1-bold text-center mt-12">{title}</h1>
      <p className="text-neutral-400 text-center mt-2 mb-2">By {author}</p>
      <div className="space-y-4 mt-8 items-center justify-center">
        {content.map((block: any) => (
          <div key={block.id}>{renderBlock(block)}</div>
        ))}
      </div>
    </main>

    <div className='text-white wrapper'>
        <Footer />
    </div>
    </>
  );
}

function renderBlock(block: any) {
  if (!block.type) return null;

  switch (block.type) {
    case 'paragraph':
      return (
        <p className="text-white leading-7 mb-4">
          {block.paragraph.rich_text.map((text: any, i: number) => (
            <span key={i}>{text.plain_text}</span>
          ))}
        </p>
      );

    case 'heading_1':
      return (
        <h2 className="text-white text-2xl font-bold mt-8 mb-4">
          {block.heading_1.rich_text.map((text: any, i: number) => (
            <span key={i}>{text.plain_text}</span>
          ))}
        </h2>
      );

    case 'heading_3':
      return (
        <h3 className="text-white text-2xl font-bold mt-8 mb-4">
          {block.heading_3.rich_text.map((text: any, i: number) => (
            <span key={i}>{text.plain_text}</span>
          ))}
        </h3>
      );

    case 'image':
      const src =
        block.image.type === 'external'
          ? block.image.external.url
          : block.image.file.url;
      return (
        <div className="relative left-1/2 -translate-x-1/2 w-screen md:max-w-96 md:max-h-svh">
        <img
            src={src}
            alt="Image"
            className="w-full"
        />
        </div>
      );

    default:
      return null;
  }
}
