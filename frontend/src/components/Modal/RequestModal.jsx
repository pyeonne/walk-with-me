import React from 'react';
import Button from '../Button/Button';
import styles from './RequestModal.module.css';
import Input from '../Input/Input';

// left: 37, up: 38, right: 39, down: 40,
// spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36
var keys = { 37: 1, 38: 1, 39: 1, 40: 1 };

function preventDefault(e) {
  e.preventDefault();
}

function preventDefaultForScrollKeys(e) {
  if (keys[e.keyCode]) {
    preventDefault(e);
    return false;
  }
}

// modern Chrome requires { passive: false } when adding event
var supportsPassive = false;
try {
  window.addEventListener(
    'test',
    null,
    Object.defineProperty({}, 'passive', {
      get: function () {
        supportsPassive = true;
      },
    })
  );
} catch (e) {}

var wheelOpt = supportsPassive ? { passive: false } : false;
var wheelEvent =
  'onwheel' in document.createElement('div') ? 'wheel' : 'mousewheel';

// call this to Disable
function disableScroll() {
  window.addEventListener('DOMMouseScroll', preventDefault, false); // older FF
  window.addEventListener(wheelEvent, preventDefault, wheelOpt); // modern desktop
  window.addEventListener('touchmove', preventDefault, wheelOpt); // mobile
  window.addEventListener('keydown', preventDefaultForScrollKeys, false);
}

// call this to Enable
function enableScroll() {
  console.log('called ! ');
  window.removeEventListener('DOMMouseScroll', preventDefault, false);
  window.removeEventListener(wheelEvent, preventDefault, wheelOpt);
  window.removeEventListener('touchmove', preventDefault, wheelOpt);
  window.removeEventListener('keydown', preventDefaultForScrollKeys, false);
}

const RequestModal = (props) => {
  const { onClick } = props;
  React.useEffect(() => {
    disableScroll();
    return () => {
      enableScroll();
    };
  }, []);
  return (
    <div
      onClick={() => {
        // close modal when outside of modal is clicked
        onClick();
      }}
      style={{
        overflow: 'hidden',
      }}
      className={styles.overlay}
    >
      <div
        onClick={(e) => {
          // do not close modal if anything inside modal content is clicked
          e.stopPropagation();
        }}
        className={styles['modal__window']}
      >
        <div className={styles['modal__container']}>
          <div className={styles['modal__header']}>
            <h2>자기소개를 입력해주세요!</h2>
          </div>
          <form method='POST' onSubmit={props.onSubmit}>
            <div className={styles['form__group']}>
              <Input
                name='content'
                height='20rem'
                minLength={5}
                maxLength={250}
                placeholder='자기소개를 통해 자신을 어필해보세요! (최대 250글자)'
                value={props.value}
                onChange={props.onChange}
                required
              />
              <div className={styles['btn__group']}>
                <Button
                  type='button'
                  text='닫기'
                  height='5rem'
                  width='18.2rem'
                  onClick={props.onClick}
                />
                <Button
                  type='submit'
                  text='참가 신청'
                  height='5rem'
                  width='18.2rem'
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RequestModal;
