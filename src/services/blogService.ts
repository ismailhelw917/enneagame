import { BlogPost } from '../types';
import { mockPosts } from '../data/mockPosts';

export const getBlogPosts = async (): Promise<BlogPost[]> => {
  return mockPosts;
};
