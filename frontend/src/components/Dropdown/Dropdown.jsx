import React, { forwardRef, useContext } from 'react';
import { Context } from '../../context';
import classes from './Dropdown.module.css';

const Dropdown = forwardRef((props, ref) => {
  const optionsObj = {
    status: [
      { value: 'true', text: '모집 중' },
      { value: 'false', text: '모집 완료' },
    ],
    gender: [
      { value: '', text: '성별' },
      { value: '남', text: '남자' },
      { value: '여', text: '여자' },
    ],
    category: [
      { value: '', text: '카테고리' },
      { value: '달리기', text: '달리기' },
      { value: '걷기', text: '걷기' },
      { value: '자전거', text: '자전거' },
      { value: '등산', text: '등산' },
    ],
    age: [
      { value: '', text: '나이' },
      { value: '10', text: '10대' },
      { value: '20', text: '20대' },
      { value: '30', text: '30대' },
      { value: '40', text: '40대' },
      { value: '50', text: '50대' },
      { value: '60', text: '60대' },
    ],
  };

  const options = optionsObj[props.type];

  const [state, dispatch] = useContext(Context);

  return (
    <select
      name='filter'
      style={{ width: props.width, height: props.height }}
      className={
        state.darkMode
          ? `${classes.select} ${classes[props.type]} ${classes.dark}`
          : `${classes.select} ${classes[props.type]}`
      }
      ref={ref}
      onChange={props.onChange}
      required={props.required}
      data-type={props.type}
      value={props.value}
    >
      {options.map((option, idx) => (
        <option key={idx} value={option.value}>
          {option.text}
        </option>
      ))}
    </select>
  );
});

export default Dropdown;
