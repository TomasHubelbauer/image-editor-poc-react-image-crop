import React, { useRef, useState } from 'react';
import ReactCrop, { type Crop } from 'react-image-crop';

export default function App() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [original, setOriginal] = useState(null);

  const handleUseSampleImageButtonClick = () => {
    setOriginal('sample.jpg');
    dialogRef.current?.showModal();
  };


  return (
    <div>
      <input type="file" accept="image/*" style={{ display: 'none' }} />
      <img src="sample.jpg" style={{ display: 'none' }} />
      <button id="openImageFileButton">Open image file</button>
      <button onClick={handleUseSampleImageButtonClick}>Use sample image</button>
      <dialog ref={dialogRef}>
        {original && (
          <ReactCrop src={original} onChange={() => { }}>
            <img src={original} />
          </ReactCrop>
        )}
      </dialog>
    </div>
  );
}
