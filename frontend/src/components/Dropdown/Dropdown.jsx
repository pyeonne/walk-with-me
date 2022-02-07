import React from 'react';
import classes from './Dropdown.module.css';

const Dropdown = ({ type }) => {
  const optionsObj = {
    status: [
      { value: 'ing', text: '모집 중' },
      { value: 'end', text: '모집 완료' },
    ],
    category: [
      { value: '', text: '카테고리' },
      { value: 'running', text: '달리기' },
      { value: 'walking', text: '걷기' },
      { value: 'bicycle', text: '자전거' },
      { value: 'mountain', text: '등산' },
    ],
    age: [
      { value: '', text: '나이' },
      { value: '10', text: '10대' },
      { value: '10', text: '10대' },
      { value: '20', text: '20대' },
      { value: '30', text: '30대' },
      { value: '40', text: '40대' },
      { value: '50', text: '50대' },
      { value: '60', text: '60대' },
    ],
  };

  const options = optionsObj[type];

  return (
    <select name='filter' className={`${classes.select} ${classes[type]}`}>
      {options.map((option, idx) => (
        <option key={idx} value={option.value}>
          {option.text}
        </option>
      ))}
    </select>
  );
};

export default Dropdown;
