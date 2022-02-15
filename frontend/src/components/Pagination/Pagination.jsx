import React, { useState } from 'react';
import styles from './Pagination.module.css';

const Pagination = ({ currPage, pageCount, onClickPage }) => {
  const MAX_PAGE_COUNT = 9;

  const getPageNumbers = (currPage, total) => {
    // 페이지네이션 숫자 버튼 목록을 리턴하는 함수를 작성하세요.
    const resultList = [currPage];

    let idx = 1;
    while (resultList.length < Math.min(MAX_PAGE_COUNT, total)) {
      if (currPage + idx < pageCount) resultList.push(currPage + idx);
      if (currPage - idx > -1) resultList.unshift(currPage - idx);
      idx++;
    }
    return resultList;
  };
  return (
    <div className={styles.container}>
      <button
        className={`${styles.arrow} ${styles.left}`}
        onClick={() => onClickPage(currPage - 1)}
        disabled={currPage <= 0}
      >
        <span>&lt;</span>
      </button>
      {getPageNumbers(currPage, pageCount).map((page) => {
        return (
          <button
            className={styles.page}
            onClick={() => onClickPage(page)}
            key={`pagination-button-${page}`}
            active={(page === currPage).toString()}
          >
            {page + 1}
          </button>
        );
      })}
      <button
        className={`${styles.arrow} ${styles.right}`}
        onClick={() => onClickPage(currPage + 1)}
        disabled={currPage >= pageCount - 1}
      >
        <span>&gt;</span>
      </button>
    </div>
  );
};

Pagination.defaultProps = {
  currPage: 0,
  pageCount: 5,
  onClickPage: () => {},
};

export default Pagination;
