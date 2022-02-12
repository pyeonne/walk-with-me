import { useState } from 'react';
import RequestModal from './components/Modal/RequestModal';

const Sss = () => {
  const [modal, setModal] = useState(false);
  const [content, setContent] = useState('');
  const onModal = () => {
    setModal((curr) => !curr);
  };
  const onSubmit = (event) => {
    event.preventDefault();
    console.log('온서브밋');
  };
  const onChange = (event) => {
    setContent(event.target.value);
  };
  console.log(content);
  return (
    <div>
      <button onClick={setModal}>클릭</button>
      <RequestModal
        isOpen={modal}
        onClick={onModal}
        onSubmit={onSubmit}
        value={content}
        onChange={onChange}
      />
    </div>
  );
};

export default Sss;
