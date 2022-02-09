import React, { memo } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './reset.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import ImageUploader from './service/image_uploader';
import ImageFileInput from './components/image_file_input/image_file_input';

const imageUploader = new ImageUploader();
const FileInput = memo((props) => (
  <ImageFileInput {...props} imageUploader={imageUploader} />
));

ReactDOM.render(
  <BrowserRouter>
    <App FileInput={FileInput} />
  </BrowserRouter>,
  document.getElementById('root')
);
