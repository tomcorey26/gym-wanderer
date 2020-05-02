import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { CloudinaryImg } from '../types';

interface CloudinaryUploadSingleProps {
  onUpload: (img: CloudinaryImg) => void;
  folderName: string;
}

export const CloudinaryUploadSingle: React.FC<CloudinaryUploadSingleProps> = ({
  onUpload,
  folderName,
}) => {
  const onDrop = useCallback(
    async ([file]) => {
      const noSpacesFolderName = folderName.split(' ').join('_');
      const data = new FormData();
      data.append('file', file);
      data.append('upload_preset', process.env.REACT_APP_CLOUDINARY_PRESET!);
      data.append('folder', `gym_pics/${noSpacesFolderName}`);
      const upload = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_NAME}/image/upload`,
        {
          method: 'POST',
          body: data,
        }
      );
      const image = await upload.json();
      onUpload(image);
    },
    [folderName, onUpload]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div>
      <img src="" alt="" />
      <div
        style={
          isDragActive
            ? { width: 300, height: 300, backgroundColor: 'green' }
            : { width: 300, height: 300, backgroundColor: 'blue' }
        }
        {...getRootProps()}
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the files here ...</p>
        ) : (
          <p>Drag 'n' drop some files here, or click to select files</p>
        )}
      </div>
    </div>
  );
};
