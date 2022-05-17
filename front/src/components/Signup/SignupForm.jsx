import React, { useState } from 'react'
import { Form, Input, Button, Select, Modal } from 'antd'
import ImageFileInput from '../ImageFileInput'
import { getAxios } from '../../api'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'

const { Option } = Select

function SignupForm({ imageUploader, data }) {
  const [form] = Form.useForm()
  const [image, setImage] = useState({
    fileURL: '/images/기본사진.png',
  })
  const [file, setFile] = useState({ fileName: '기본사진', fileURL: image.fileURL })
  const navigate = useNavigate()

  const onFileChange = (file) => {
    setFile({
      fileName: file.name,
      fileURL: file.url,
    })
  }

  const onFinish = async (values) => {
    const axios = getAxios()
    await axios.post('user/signup', {
      image: file.fileURL,
      nickname: values.nickname,
      password: values.password,
      userId: values.id,
      age: values.ageRange,
      gender: values.gender,
    })
    console.log('Success')
  }

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo)
  }

  const handleMove = () => {
    navigate('/')
  }

  const success = () => {
    Modal.success({
      content: '회원가입이 완료되었습니다.',
      onOk: handleMove,
    })
  }

  return (
    <Form
      form={form}
      name="signup"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
      layout="vertical">
      <Form.Item
        label="프로필 이미지"
        name="image"
        rules={[
          {
            required: false,
            message: 'Please upload your profile picture!',
          },
        ]}>
        <StyledImage className="image-file-input">
          <ImageFileInput
            name={file.fileName}
            imageUploader={imageUploader}
            onFileChange={onFileChange}
            file={file}
            data={data}
            setFile={setFile}
          />
        </StyledImage>
      </Form.Item>

      <Form.Item
        label="아이디"
        name="id"
        rules={[
          {
            required: true,
            message: 'Please input your id!',
          },
        ]}>
        <Input />
      </Form.Item>

      <Form.Item
        label="비밀번호"
        name="password"
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
        ]}>
        <Input.Password />
      </Form.Item>
      <Form.Item
        label="비밀번호 확인"
        name="confirm"
        dependencies={['password']}
        hasFeedback
        rules={[
          {
            required: true,
            message: 'Please confirm your password!',
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve()
              }

              return Promise.reject(new Error('The two passwords that you entered do not match!'))
            },
          }),
        ]}>
        <Input.Password />
      </Form.Item>

      <Form.Item
        label="닉네임"
        name="nickname"
        tooltip="What do you want others to call you?"
        rules={[
          {
            required: true,
            message: 'Please input your nickname!',
            whitespace: true,
          },
        ]}>
        <Input />
      </Form.Item>

      <Form.Item
        label="성별"
        name="gender"
        rules={[
          {
            required: false,
            message: 'Please select gender!',
          },
        ]}>
        <Select placeholder="Select your gender">
          <Option value="male">남성</Option>
          <Option value="female">여성</Option>
        </Select>
      </Form.Item>

      <Form.Item
        label="연령대"
        name="ageRange"
        rules={[
          {
            required: false,
            message: 'Please select ageRange!',
          },
        ]}>
        <Select placeholder="Select your ageRange">
          <Option value="1">어린이 (0~9)</Option>
          <Option value="2">청소년 (10~19)</Option>
          <Option value="3">청년 (20~29)</Option>
          <Option value="4">중/장년 (30~59)</Option>
          <Option value="5">노년 (60~)</Option>
        </Select>
      </Form.Item>

      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          // onClick={success}
        >
          Register
        </Button>
      </Form.Item>
    </Form>
  )
}

const StyledImage = styled.div`
  width: 10rem;
  height: 10rem;
  border: 1px solid rgba(100, 100, 100, 0.3);
  border-radius: 50%;
  overflow: hidden;
  margin: auto;
`

export default SignupForm
