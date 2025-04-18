import ImageCard from '../imageCard/ImageCard';
import css from './ImageGallery.module.css';

export default function ImageGallery({ items, onModal, ref }) {
  return (
    <ul className={css.galleryList} ref={ref}>
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
