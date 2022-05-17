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

    Modal.success({
      content: '회원가입이 완료되었습니다.',
      onOk: () => {
        navigate('/')
      },
    })

    console.log('Success')
  }

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo.errorFields)

    const render = () => {
      const result = []
      for (let index = 0; index < errorInfo.errorFields.length; index++) {
        result.push(<div>{errorInfo.errorFields[index].errors}</div>)
      }
      return result
    }

    Modal.error({
      title: '회원가입이 완료되지 않았습니다.',
      content: render(),
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
            message: '아이디를 입력하세요!',
          },
        ]}>
        <Input />
      </Form.Item>

      <Form.Item
        label="비밀번호"
        name="password"
        tooltip="비밀번호는 문자, 숫자, 특수기호를 포함하며 8자 이상이어야 합니다.'"
        rules={[
          {
            required: true,
            message: '비밀번호를 입력하세요!',
          },
          {
            pattern: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/,
            message: '비밀번호는 문자, 숫자, 특수기호를 포함하며 8자 이상이어야 합니다.',
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
            message: '비밀번호가 일치하지 않습니다!',
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve()
              }

              return Promise.reject(new Error('비밀번호가 일치하지 않습니다!'))
            },
          }),
        ]}>
        <Input.Password />
      </Form.Item>

      <Form.Item
        label="닉네임"
        name="nickname"
        rules={[
          {
            required: true,
            message: '닉네임을 입력하세요!',
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
            required: true,
            message: '성별을 선택하세요!',
          },
        ]}>
        <Select placeholder="성별을 선택하세요">
          <Option value="male">남성</Option>
          <Option value="female">여성</Option>
        </Select>
      </Form.Item>

      <Form.Item
        label="연령대"
        name="ageRange"
        rules={[
          {
            required: true,
            message: '연령대를 선택하세요!',
          },
        ]}>
        <Select placeholder="연령대를 선택하세요">
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
