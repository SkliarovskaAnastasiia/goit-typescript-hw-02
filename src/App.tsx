import { AiOutlineInfoCircle } from 'react-icons/ai';
import React, { useState, useRef, RefObject } from 'react';
import { getImagesByQuery } from './unsplash-api';
import toast, { Toaster } from 'react-hot-toast';
import { Image } from './commonTypes';

import SearchBar from './components/searchBar/SearchBar';
import ImageGallery from './components/imageGallery/ImageGallery';
import Loader from './components/loader/Loader';
import LoadMoreBtn from './components/loadMoreBtn/LoadMoreBtn';
import ImageModal from './components/imageModal/ImageModal';

function App() {
  const [query, setQuery] = useState<string>('');
  const [images, setImages] = useState<Image[]>([]);
  const [loader, setLoader] = useState<boolean>(false);
  const [loadMoreBtn, setLoadMoreBtn] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [imageModal, setImageModal] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<Image | null>(null);
  const galleryRef = useRef<HTMLUListElement>(null);

  const fetchImages = async () => {
    try {
      setImages([]);
      setLoader(true);

      const { results, total, total_pages } = await getImagesByQuery(
        query,
        page
      );

      if (total === 0) {
        toast('Nothing found', {
          duration: 3000,
          icon: <AiOutlineInfoCircle size={24} />,
        });
        setQuery('');
      } else {
        setImages(results);
      }

      if (total_pages === 1) {
        toast('End of collection', {
          duration: 3000,
          icon: <AiOutlineInfoCircle size={24} />,
        });
      } else {
        setLoadMoreBtn(true);
      }
    } catch {
      toast.error('Something went wrong, try again', { duration: 3000 });
    } finally {
      setLoader(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setQuery(e.target.value.trim());
    setPage(1);
  };

  const loadMoreImages = async () => {
    try {
      const nextPage = page + 1;
      setPage(nextPage);
      setLoadMoreBtn(false);
      setLoader(true);

      const { results, total_pages } = await getImagesByQuery(query, nextPage);
      setImages(prevImages => [...prevImages, ...results]);

      setTimeout(() => {
        const firstChild = galleryRef.current?.children[0];
        if (firstChild) {
          const { height } = firstChild.getBoundingClientRect();
          window.scrollBy({ top: height * 2.1, behavior: 'smooth' });
        }
      }, 100);

      total_pages === nextPage
        ? toast('End of collection', {
            duration: 3000,
            icon: <AiOutlineInfoCircle size={24} />,
          })
        : setLoadMoreBtn(true);
    } catch {
      toast.error('Something went wrong, try again', { duration: 3000 });
    } finally {
      setLoader(false);
    }
  };

  const onOpenModal = (image: Image): void => {
    setImageModal(true);
    setSelectedImage(image);
  };
  const onCloseModal = () => {
    setImageModal(false);
    setSelectedImage(null);
  };

  return (
    <>
      <SearchBar
        onSubmit={fetchImages}
        value={query}
        onChange={handleInputChange}
      />

      {images.length > 0 && (
        <ImageGallery
          items={images}
          onModal={onOpenModal}
          galleryRef={galleryRef}
        />
      )}

      {loadMoreBtn && images.length > 0 && (
        <LoadMoreBtn onClick={loadMoreImages} />
      )}

      {loader && <Loader />}

      {selectedImage && (
        <ImageModal
          isOpen={imageModal}
          onClose={onCloseModal}
          image={selectedImage}
        />
      )}

      <Toaster />
    </>
  );
}

export default App;
