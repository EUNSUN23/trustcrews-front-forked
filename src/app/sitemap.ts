import { MetadataRoute } from 'next';
import { DEFAULT_SEARCH_POST_PARAM } from '@/app/InitialPostsDataProvider';
import {
  getPostList,
  PostInfoSummary,
} from '@/features/post/public/service/getPostList';
import { PageResponseBody } from '@/types/responseBody';

const DOMAIN = process.env.NEXT_PUBLIC_URL;
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  try {
    const res: PageResponseBody<PostInfoSummary[]> = await getPostList(
      DEFAULT_SEARCH_POST_PARAM,
    );
    const postSiteMap: MetadataRoute.Sitemap = res.data.content.map((post) => ({
      url: `${DOMAIN}/post?postId=${post.postId}&amp;projectId=${post.project.projectId}`,
      lastModified: new Date(post.updateDate),
      priority: 0.8,
    }));

    return [
      { url: `${DOMAIN}/`, lastModified: new Date(), priority: 1 },
      ...postSiteMap,
    ];
  } catch (e: unknown) {
    console.error(e as Error);
    return [{ url: `${DOMAIN}/`, lastModified: new Date(), priority: 1 }];
  }
}
