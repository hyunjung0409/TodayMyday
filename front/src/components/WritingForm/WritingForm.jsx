/* eslint-disable */
import React from 'react';
import styled from 'styled-components';
import { Row, Col, Button } from 'antd';
import ImageFileInput from '../ImageFileInput';

const Word = styled.h1`
  margin: 10px auto;
  width: 150px;
  background-color: #ffff
`;

const ImageLayout = styled.div`
  border: 1px solid blue;
  margin-right: 10px;
  background-color: #ffff;
  height: 150px;
`;
const WritingLayout = styled.div` 
  border: 1px solid red;
  background-color: #ffff;
  height: 150px;
`;

const Submit = styled(Button)`
  margin-top: 10px;
`;

function WritingForm({ imageUploader }) {

  return (
    <div style={{ width: '80%', margin: '0 auto', backgroundColor: '#EEA7BB', padding: '20px' }}>
      <Word>단어</Word>
      <Row>
        <Col span={8}>
          <ImageLayout>
            <ImageFileInput />
          </ImageLayout>
        </Col>
        <Col span={16}><WritingLayout>일기 내용</WritingLayout></Col>
      </Row>
      <Submit type="primary">등록</Submit>
    </div>
  );
}

export default WritingForm;