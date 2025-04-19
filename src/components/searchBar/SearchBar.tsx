import { AiOutlineInfoCircle } from 'react-icons/ai';
import { IoSearchSharp } from 'react-icons/io5';
import React, { FormEvent, useRef } from 'react';

import toast from 'react-hot-toast';
import css from './SearchBar.module.css';

type SearchBarProps = {
  onSubmit: () => void;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function SearchBar({
  onSubmit,
  value,
  onChange,
}: SearchBarProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    value === ''
      ? toast('Please enter your request', {
          duration: 3000,
          icon: <AiOutlineInfoCircle size={24} />,
        })
      : onSubmit();
    inputRef?.current?.blur();
  };
  return (
    <header className={css.header}>
      <form className={css.searchForm} onSubmit={handleSubmit}>
        <input
          className={css.inputField}
          type="text"
          autoComplete="off"
          placeholder="Search.."
          name="query"
          value={value}
          onChange={onChange}
          ref={inputRef}
        />
        <button className={css.searchBtn} type="submit">
          <IoSearchSharp size={24} />
        </button>
      </form>
    </header>
  );
}
