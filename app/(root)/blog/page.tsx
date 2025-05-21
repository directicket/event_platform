// app/(root)/blog/page.tsx

import React from 'react';



type NotionPost = {
  id: string;
  title: string;
  cover: string | null;
  category: string | null;
  created_time: string;
  slug: string;
  author: string;
  published: boolean;
};

async function fetchNotionDatabase() {
  const databaseId = '1f98340c599c8069aa9fc21a3f3877f3';

  const res = await fetch(
  `https://notion-api.splitbee.io/v1/table/${databaseId}`,
  { cache: 'no-store' } // <-- this disables caching
);

  if (!res.ok) throw new Error('Failed to fetch Notion database');

  const data: any[] = await res.json();

//   console.log('Cover:', JSON.stringify(data.map(post => post.Cover), null, 2));
//   console.log('RAW POST DATA:', JSON.stringify(data, null, 2)); 

  // Map and normalize
    return data.map((post) => ({
    id: post.id,
    title: post.Title,
    cover:
        post["Cover (Image)"] && post["Cover (Image)"].length > 0
        ? post["Cover (Image)"][0].url
        : null,
    category: post.Category || null,
    created_time: post["Publication Date"],
    slug: post.Slug,
    author: post.Author,
    published: post.Published === true,
    }));
}


export default async function BlogPage() {
  const posts: NotionPost[] = await fetchNotionDatabase();

  return (
    <main className="*:text-white items-center justify-center h-fit -mb-16 md:wrapper">
  {/* <h1 className="text-3xl font-bold mb-6 text-white">Blog</h1> */}
  <div className="h-screen overflow-y-scroll snap-y snap-mandatory rounded-md md:mt-16">
    <div className="grid gap-8 grid-cols-[repeat(auto-fill,minmax(280px,1fr))] text-white">
        {posts
        .filter(post => post.published)
        .sort((a, b) => new Date(b.created_time).getTime() - new Date(a.created_time).getTime())
        .map(({ id, title, cover, category, created_time, slug, author }) => (
            <a
            key={id}
            href={`/blog/${slug}`}
            className="relative block overflow-hidden no-underline text-inherit bg-black hover:shadow-lg transition rounded-md min-h-screen md:min-h-96 snap-start"
            >
            {cover && (
                <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${cover})` }}
                />
            )}
            <div className="relative z-10 p-4 flex flex-col justify-between h-full bg-black/30">
                <div className='mt-16 md:mt-0'>
                <h2 className="h2-bold text-xl font-medium text-white">{title}</h2>
                </div>
                <div className="flex flex-col gap-1 mb-28 md:mb-12 lg:mb-0">
                <p className={`${
                    category === 'OPINION' ? 'text-red-600 bg-red-600/30' : 
                    category === 'INFORMATIVE' ? 'text-green-600 bg-green-600/30' :
                    category === 'NEWS' ? 'text-yellow-400 bg-yellow-400/30' :
                    category === 'CULTURE' ? 'text-neutral-300 bg-neutral-400/30' : ''
                } px-2 py-1 w-fit ibm-12 rounded-sm`}>
                    {category}
                </p>
                <p className="text-sm text-neutral-300">By {author}</p>
                </div>
            </div>
            </a>
        ))}
    </div>
    </div>
</main>
  );
}
