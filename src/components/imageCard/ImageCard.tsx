import { Image } from '../../commonTypes';
import css from './ImageCard.module.css';

type ImgCardProps = {
  image: Pick<Image, 'urls' | 'description'>;
};

export default function ImageCard({
  image: { urls, description },
}: ImgCardProps) {
  return (
    <div>
      <img className={css.galleryImg} src={urls.small} alt={description} />
    </div>
  );
}
