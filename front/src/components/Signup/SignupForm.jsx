import React, { useRef, useState } from 'react'
import { Form, Input, Button, Select, Upload } from 'antd'
import { UploadOutlined, InboxOutlined } from '@ant-design/icons'
import ImageFileInput from '../ImageFileInput'
import { getAxios } from '../../api'

const { Option } = Select

function SignupForm(imageUploader) {
  const formRef = useRef()
  const messageRef = useRef()
  const [form] = Form.useForm()
  const [file, setFile] = useState({ fileName: null, fileURL: null })

  const onFileChange = (file) => {
    setFile({
      fileName: file.name,
      fileURL: file.url,
    })
  }

  const onSubmit = (event) => {
    event.preventDefault()
    const data = {
      id: Date.now(), // uuid
      message: messageRef.current.value || '',
      fileName: file.fileName || '',
      fileURL: file.fileURL || '',
    }
    formRef.current.reset()
    console.log(data)
  }

  const onFinish = async (values) => {
    const axios = getAxios()
    await axios.post('user/signup', {
      image: values.image,
      nickname: values.nickname,
      password: values.password,
      userId: values.id,
    })
    console.log('Success:', values)
  }

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo)
  }

  const normFile = (e) => {
    console.log('Upload event:', e)

    if (Array.isArray(e)) {
      return e
    }

    return e && e.fileList
  }

  // const onGenderChange = (value) => {
  //   // eslint-disable-next-line default-case
  //   switch (value) {
  //     case 'male':
  //       this.formRef.current.setFieldsValue({
  //         note: 'Hi, man!',
  //       });
  //       return;

  //     case 'female':
  //       this.formRef.current.setFieldsValue({
  //         note: 'Hi, lady!',
  //       });
  //       return;

  //     case 'other':
  //       this.formRef.current.setFieldsValue({
  //         note: 'Hi there!',
  //       });
  //   }
  // };

  return (
    <Form
      // ref={formRef}
      form={form}
      name="signup"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
      layout="vertical">
      <ImageFileInput
        name={file.fileName}
        imageUploader={imageUploader}
        onFileChange={onFileChange}
        file={file}
        // form={form}
        setFile={setFile}
      />

      {/* <Form.Item
        name="upload"
        label="Upload"
        valuePropName="fileList"
        getValueFromEvent={normFile}
        extra="longgggggggggggggggggggggggggggggggggg">
        <Upload name="logo" action="/upload.do" listType="picture">
          <Button icon={<UploadOutlined />}>Click to upload</Button>
        </Upload>
      </Form.Item> */}

      <Form.Item
        label="프로필 이미지"
        name="image"
        rules={[
          {
            required: false,
            message: 'Please input your id!',
          },
        ]}>
        <Input />
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
        <Select
          placeholder="Select your gender"
          // onChange={onGenderChange}
        >
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
        <Select
          placeholder="Select your ageRange"
          // onChange={onGenderChange}
        >
          <Option value="1">어린이 (0~9)</Option>
          <Option value="2">청소년 (10~19)</Option>
          <Option value="3">청년 (20~29)</Option>
          <Option value="4">중/장년 (30~59)</Option>
          <Option value="5">노년 (60~)</Option>
        </Select>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Register
        </Button>
      </Form.Item>
    </Form>
  )
}

export default SignupForm
