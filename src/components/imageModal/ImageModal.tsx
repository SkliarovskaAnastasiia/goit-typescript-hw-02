import Modal from 'react-modal';
import { IoDownloadOutline } from 'react-icons/io5';
import { getDownloadLink } from '../../unsplash-api';
import { Image } from '../../commonTypes';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import css from './ImageModal.module.css';

Modal.setAppElement('#root');

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  image: Image;
};

export default function ImageModal({
  isOpen,
  onClose,
  image: { urls, description, user, links },
}: ModalProps) {
  const [imgDownload, setImgDownload] = useState<string>('');

  useEffect(() => {
    if (links) {
      (async () => {
        try {
          const response = await getDownloadLink(links.download_location);
        } catch {
          toast.error('Something went wrong, try again', { duration: 3000 });
        }
      })();
    }
  }, [links]);

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      shouldCloseOnOverlayClick={true}
      className={css.modalContent}
      overlayClassName={{
        base: css.modalOverlay,
        afterOpen: css.modalOverlayAfterOpen,
        beforeClose: css.modalOverlayBeforeClose,
      }}
      closeTimeoutMS={500}
    >
      {isOpen && (
        <>
          <img src={urls.regular} alt={description} className={css.modalImg} />
          <div className={css.imgInfoWrapper}>
            <p>{user?.name}</p>
            <a
              className={css.downloadLink}
              href={imgDownload}
              download={description || 'downloaded-image'}
            >
              <IoDownloadOutline size={24} />
            </a>
          </div>
        </>
      )}
    </Modal>
  );
}
