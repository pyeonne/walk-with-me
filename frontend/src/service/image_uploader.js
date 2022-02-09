class ImageUploader {
  async upload(file) {
    const data = new FormData();
    data.append('file', file);
    data.append('upload_preset', 'ml_default');

    const result = await fetch(
      'https://api.cloudinary.com/v1_1/dw1ty62qi/image/upload',
      {
        method: 'POST',
        body: data,
      }
    );
    return await result.json();
  }
}

export default ImageUploader;
