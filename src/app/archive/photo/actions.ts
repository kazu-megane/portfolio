'use server';
import { list } from '@vercel/blob';

export async function getPhotos(category: string) {
  'use cache';
  const response = await list({
    mode: 'folded',
    prefix: `photo/${category}/`,
  });
  return response;
}
