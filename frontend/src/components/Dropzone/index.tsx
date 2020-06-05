import React, { useState, useCallback } from 'react';
import {useDropzone} from 'react-dropzone';
import { FiUpload } from 'react-icons/fi';

import './styles.css';

interface Props {
  onFileUploaded: (file: File) => void;
}

const Dropzone: React.FC<Props> = ({ onFileUploaded }) => {
  const [selectedImageUrl, setSelectedImageUrl] = useState('');

  const onDrop = useCallback(acceptedFiles => {
    const file = acceptedFiles[0];
    const fileURL = URL.createObjectURL(file);

    setSelectedImageUrl(fileURL);
    onFileUploaded(file);
  }, [onFileUploaded])
  const {getRootProps, getInputProps} = useDropzone({
    onDrop,
    accept: 'image/*'
  })

  return (
    <div className='dropzone' {...getRootProps()}>
      <input {...getInputProps()} accept='image/*' />

      {selectedImageUrl
        ? <img src={selectedImageUrl} alt='Point' />
        : (
          <p>
            <FiUpload />
            Arraste uma imagem ou clique aqui
          </p>
        )
      }

    </div>
  )
}

export default Dropzone;
