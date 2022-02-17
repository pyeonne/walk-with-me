import React, { memo, useRef } from 'react';
import Camera from './icons/Camera';
import styles from './ImageFileInput.module.css';
import DEFAULT_IMAGE from '../Avatar/images/defaultAvatar.svg';

const ImageFileInput = memo(({ name, imgURL, onFileChange }) => {
  const inputRef = useRef();
  const url = imgURL || DEFAULT_IMAGE;

  const onImageClick = (event) => {
    event.preventDefault();
    inputRef.current.click();
  };

  return (
    <div className={styles.container}>
      <input
        ref={inputRef}
        className={styles.input}
        type='file'
        accept='image/*'
        name='img'
        onChange={onFileChange}
      />
      <div className={styles.wrapper} onClick={onImageClick}>
        <img
          className={`${styles.profile} ${name ? styles.pink : styles.grey}`}
          src={url}
          alt='profile'
        />
        {!imgURL && (
          <div className={styles.camera}>
            <Camera />
          </div>
        )}
      </div>
    </div>
  );
});

export default ImageFileInput;
