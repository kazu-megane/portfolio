'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { type ListBlobResultBlob } from '@vercel/blob';
import { getPhotos } from '../../../app/archive/photo/actions';
import { twMerge } from 'tailwind-merge';

export const PHOTO_CATEGORY = {
  SNAP: 'snap',
  PORTRAIT: 'portrait',
} as const;
export type PhotoCategory = (typeof PHOTO_CATEGORY)[keyof typeof PHOTO_CATEGORY];

type Image = ListBlobResultBlob & {
  category: PhotoCategory;
};

function parseCategory(category: string | null) {
  switch (category) {
    case 'snap':
      return PHOTO_CATEGORY.SNAP;
    case 'portrait':
      return PHOTO_CATEGORY.PORTRAIT;
    default:
      return PHOTO_CATEGORY.SNAP;
  }
}

function getFileName(pathname: string) {
  return pathname.split('/').pop() || '';
}

export const PhotoList = () => {
  const searchParams = useSearchParams();
  const paramCategory = parseCategory(searchParams.get('category'));

  const [images, setImages] = useState<Image[]>([]);
  const isFetching = useRef(false);

  useEffect(() => {
    const currentImages = images.filter((image) => image.category === paramCategory);
    if (currentImages.length || isFetching.current) {
      return;
    }

    isFetching.current = true;
    getPhotos(paramCategory).then((response) => {
      const categorizedImages = response.blobs
        .filter((blob) => blob.size)
        .map((blob) => {
          return { ...blob, category: paramCategory };
        });
      setImages((prevImages) => [...prevImages, ...categorizedImages]);
      isFetching.current = false;
    });
  }, [paramCategory]);

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-wrap gap-2">
        {Object.values(PHOTO_CATEGORY).map((category) => (
          <Link
            key={category}
            href={`?category=${category}`}
            className={twMerge(
              'grid min-w-[80px] place-items-center rounded-full border border-stone-600 px-4 py-2 font-serif text-xs tracking-widest text-stone-600',
              category === paramCategory ? 'bg-stone-600 text-white' : '',
            )}
          >
            {category.toUpperCase()}
          </Link>
        ))}
      </div>
      <div className="grid grid-cols-3 gap-4 lg:grid-cols-4">
        {images.length
          ? images
              .filter((image) => image.category === paramCategory)
              .filter((image) => image.size)
              .map((image, index) => (
                <div key={index} className="relative aspect-square w-full">
                  <Image src={image.url} alt={getFileName(image.pathname)} fill={true} className="object-cover" />
                </div>
              ))
          : Array.from({ length: 9 }).map((_, index) => (
              <div key={index} role="status" className="relative aspect-square w-full">
                <div className="h-full w-full animate-pulse bg-stone-100" />
              </div>
            ))}
      </div>
    </div>
  );
};
