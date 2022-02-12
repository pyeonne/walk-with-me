import React, { useEffect, useRef, useState } from 'react';
import RequestModal from './components/Modal/RequestModal';

const ModalEx = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [content, setContent] = React.useState('');

  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
  }, [isOpen]);
  const setModal = () => {
    console.log('called ');
    setIsOpen((prev) => !prev);
  };
  const onChange = (e) => setContent(e.target.value);
  return (
    <div>
      <button onClick={setModal} style={{ width: '30rem', height: '30rem' }}>
        클릭
      </button>
      <p style={{ fontSize: '3.2rem' }}>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptate
        aspernatur autem, distinctio eum ipsam veniam modi quibusdam eos amet
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptate
        aspernatur autem, distinctio eum ipsam veniam modi quibusdam eos amet
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptate
        aspernatur autem, distinctio eum ipsam veniam modi quibusdam eos amet
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptate
        aspernatur autem, distinctio eum ipsam veniam modi quibusdam eos amet
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptate
        aspernatur autem, distinctio eum ipsam veniam modi quibusdam eos amet
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptate
        aspernatur autem, distinctio eum ipsam veniam modi quibusdam eos amet
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptate
        aspernatur autem, distinctio eum ipsam veniam modi quibusdam eos amet
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptate
        aspernatur autem, distinctio eum ipsam veniam modi quibusdam eos amet
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptate
        aspernatur autem, distinctio eum ipsam veniam modi quibusdam eos amet
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptate
        aspernatur autem, distinctio eum ipsam veniam modi quibusdam eos amet
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptate
        aspernatur autem, distinctio eum ipsam veniam modi quibusdam eos amet
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptate
        aspernatur autem, distinctio eum ipsam veniam modi quibusdam eos amet
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptate
        aspernatur autem, distinctio eum ipsam veniam modi quibusdam eos amet
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptate
        aspernatur autem, distinctio eum ipsam veniam modi quibusdam eos amet
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptate
        aspernatur autem, distinctio eum ipsam veniam modi quibusdam eos amet
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptate
        aspernatur autem, distinctio eum ipsam veniam modi quibusdam eos amet
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptate
        aspernatur autem, distinctio eum ipsam veniam modi quibusdam eos amet
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptate
        aspernatur autem, distinctio eum ipsam veniam modi quibusdam eos amet
      </p>

      {isOpen && (
        <RequestModal isOpen={isOpen} onClick={setModal} onChange={onChange} />
      )}
    </div>
  );
};

export default ModalEx;
