import { getAllPosts, getPagesCount, getPaginatedPosts } from 'lib/posts';

import TemplateArchive from 'templates/archive';

export default function Posts({ posts, pagination }) {
  const title = 'All Posts';
  const slug = 'posts';

  return <TemplateArchive title={title} posts={posts} slug={slug} pagination={pagination} />;
}

export async function getStaticProps({ params = {} } = {}) {
  const { posts, pagination } = await getPaginatedPosts(params?.page);
  return {
    props: {
      posts,
      pagination: {
        ...pagination,
        basePath: '/posts',
      },
    },
  };
}

export async function getStaticPaths() {
  const { posts } = await getAllPosts();
  const pagesCount = getPagesCount(posts);
  const paths = [...new Array(pagesCount)].map((_, i) => {
    return { params: { page: String(i + 1) } };
  });
  return {
    paths,
    fallback: false,
  };
}
