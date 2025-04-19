import { RefObject } from 'react';
import { Image } from '../../commonTypes';
import ImageCard from '../imageCard/ImageCard';
import css from './ImageGallery.module.css';

type GalleryProps = {
  items: Image[];
  onModal: (image: Image) => void;
  galleryRef: RefObject<HTMLUListElement | null>;
};

export default function ImageGallery({
  items,
  onModal,
  galleryRef,
}: GalleryProps) {
  return (
    <ul className={css.galleryList} ref={galleryRef}>
      {items.map(item => (
        <li
          className={css.galerryItem}
          key={item.id}
          onClick={() => onModal(item)}
        >
          <ImageCard image={item} />
        </li>
      ))}
    </ul>
  );
}
