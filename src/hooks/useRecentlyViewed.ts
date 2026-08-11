import { useEffect } from 'react';
import { useAppStore } from '@/store/useAppStore';
import type { ContentType } from '@/types/content';

export const useRecentlyViewed = (
  item: { type: ContentType; title: string; description: string; url: string } | undefined,
) => {
  const addRecent = useAppStore((state) => state.addRecent);
  const type = item?.type;
  const title = item?.title;
  const description = item?.description;
  const url = item?.url;

  useEffect(() => {
    if (type && title && description && url) addRecent({ type, title, description, url });
  }, [addRecent, description, title, type, url]);
};
