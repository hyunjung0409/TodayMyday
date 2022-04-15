/*eslint-disable */
import React from 'react';
import WritingForm from '../components/WritingForm/WritingForm';
import ImageUploader from '../service/image_uploader';

function Writing() {

  return (
    <div>
      <WritingForm ImageUploader={ImageUploader} />
    </div >
  );
}

export default Writing;
