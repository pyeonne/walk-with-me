import React, { memo, useRef, useState } from 'react';
import Camera from './icons/Camera';
import styles from './image_file_input.module.css';

const DEFAULT_IMAGE = '/images/default_profile.jpg';

const ImageFileInput = memo(
  ({ imageUploader, name, fileURL, onFileChange }) => {
    const [loading, setLoading] = useState(false);
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
          name='file'
          onChange={onFileChange}
        />
        <div className={styles.wrapper} onClick={onImageClick}>
          <img
            className={`${styles.profile} ${name ? styles.pink : styles.grey}`}
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
  }
);

export default ImageFileInput;
