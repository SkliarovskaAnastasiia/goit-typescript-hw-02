import css from './LoadMoreBtn.module.css';

type ButtonProps = {
  onClick: () => void;
};

export default function LoadMoreBtn({ onClick }: ButtonProps) {
  return (
    <button className={css.loadMoreBtn} type="button" onClick={onClick}>
      Load more
    </button>
  );
}
