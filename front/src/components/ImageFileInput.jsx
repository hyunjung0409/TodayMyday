/* eslint-disable */
import React from 'react';

function ImageFileInput({ imageUploader, onFileChange }) {
    return (
        <div>
            <input type='file' accept='image/*' name='file' />
        </div>
    );
}

export default ImageFileInput;