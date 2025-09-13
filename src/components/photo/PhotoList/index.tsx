'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { type ListBlobResultBlob } from '@vercel/blob';
import { getPhotos } from '../../../app/archive/photo/actions';
import { AiOutlineClose } from 'react-icons/ai';
import { twMerge } from 'tailwind-merge';
import { FocusTrap } from 'focus-trap-react';

const DURATION = 300;
const IMAGE_MODAL_ID = 'image-modal';

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

const LazyImage = ({ selected, image, onClick }: { selected: boolean; image: Image; onClick: () => void }) => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <button
      type="button"
      aria-label="画像を拡大表示"
      aria-controls={IMAGE_MODAL_ID}
      aria-expanded={selected}
      onClick={onClick}
      className="relative aspect-square w-full cursor-pointer transition-all ease-in hover:scale-105 hover:opacity-70"
    >
      {isLoading ? <span className="block h-full w-full animate-pulse bg-stone-100" /> : null}
      <Image
        src={image.url}
        alt=""
        quality={50}
        fill={true}
        className={twMerge('object-contain', isLoading ? 'invisible' : 'visible')}
        onLoadingComplete={() => setIsLoading(false)}
      />
    </button>
  );
};

const PhotoModal = ({
  isModalVisible,
  selectedImage,
  handleClose,
}: {
  isModalVisible: boolean;
  selectedImage: Image;
  handleClose: () => void;
}) => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <FocusTrap active={isModalVisible} focusTrapOptions={{ clickOutsideDeactivates: true }}>
      <div
        id={IMAGE_MODAL_ID}
        role="dialog"
        aria-modal="true"
        aria-label="画像拡大表示モーダル"
        className={twMerge(
          `fixed inset-0 z-50 flex items-center justify-center transition-colors duration-${DURATION} ease-in-out`,
          isModalVisible ? 'bg-black/75' : 'bg-black/0',
        )}
        onClick={handleClose}
      >
        <button
          type="button"
          aria-label="画像拡大表示モーダルを閉じる"
          onClick={handleClose}
          className={twMerge(
            `absolute top-4 right-4 z-10 cursor-pointer rounded-full p-2 text-white transition-opacity hover:opacity-50 duration-${DURATION}`,
            isModalVisible ? 'bg-stone-800' : 'bg-black/0',
          )}
        >
          <AiOutlineClose />
        </button>
        <div
          className={twMerge(
            `relative grid h-full max-h-[90vh] w-full max-w-[90vw] transform place-items-center transition-all duration-${DURATION} ease-in-out`,
            isModalVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0',
          )}
        >
          {isLoading ? (
            <span className="aspect-square w-full animate-pulse bg-stone-100 md:h-full md:w-auto"></span>
          ) : null}
          <Image
            src={selectedImage.url}
            alt="拡大された画像"
            fill={true}
            onLoadingComplete={() => setIsLoading(false)}
            className={twMerge('object-contain', isLoading ? 'invisible' : 'visible')}
          />
        </div>
      </div>
    </FocusTrap>
  );
};

export const PhotoList = () => {
  const searchParams = useSearchParams();
  const paramCategory = parseCategory(searchParams.get('category'));

  const [images, setImages] = useState<Image[]>([]);
  const [selectedImage, setSelectedImage] = useState<Image | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const isFetching = useRef(false);

  useEffect(() => {
    // モーダルのアニメーショントリガー
    if (selectedImage) {
      const timer = setTimeout(() => setIsModalVisible(true), 10);
      return () => clearTimeout(timer);
    }
  }, [selectedImage]);

  const handleClose = () => {
    setIsModalVisible(false);
    setTimeout(() => {
      setSelectedImage(null);
    }, DURATION);
  };

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
      <div className="sticky top-[168px] z-10 flex flex-wrap gap-2 md:top-[80px]">
        {Object.values(PHOTO_CATEGORY).map((category) => (
          <Link
            key={category}
            href={`?category=${category}`}
            className={twMerge(
              'grid min-w-[80px] place-items-center rounded-full border border-stone-600 bg-white/50 px-4 py-2 font-serif text-xs tracking-widest text-stone-600 transition-opacity ease-in hover:opacity-50',
              category === paramCategory ? 'bg-stone-600 text-white' : '',
            )}
          >
            {category.toUpperCase()}
          </Link>
        ))}
      </div>
      <ul className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {images.length
          ? images
              .filter((image) => image.category === paramCategory)
              .filter((image) => image.size)
              .map((image, index) => (
                <li key={index}>
                  <LazyImage selected={selectedImage === image} image={image} onClick={() => setSelectedImage(image)} />
                </li>
              ))
          : Array.from({ length: 9 }).map((_, index) => (
              <div key={index} role="status" className="relative aspect-square w-full">
                <div className="h-full w-full animate-pulse bg-stone-100" />
              </div>
            ))}
      </ul>
      {selectedImage ? (
        <PhotoModal isModalVisible={isModalVisible} selectedImage={selectedImage} handleClose={handleClose} />
      ) : null}
    </div>
  );
};
