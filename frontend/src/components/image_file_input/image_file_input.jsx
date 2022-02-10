import React, { memo, useRef, useState } from 'react';
import Camera from './icons/Camera';
import styles from './image_file_input.module.css';

const DEFAULT_IMAGE = '/images/default_profile.jpg';

const ImageFileInput = memo(({ name, fileURL, onFileChange }) => {
  const inputRef = useRef();
  const url = fileURL || DEFAULT_IMAGE;

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
          // src='/Users/dinomoon/dev/walk-with-me/backend/uploads/1644477402293.png'
          src={url}
          alt='profile'
        />
        {!fileURL && (
          <div className={styles.camera}>
            <Camera />
          </div>
        )}
      </div>
    </div>
  );
});

export default ImageFileInput;
