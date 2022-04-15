import React from 'react';
import { Form, Input, Button, Select } from 'antd';

const { Option } = Select;

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 8,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 16,
    },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

function SignupForm() {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

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
      {...formItemLayout}
      form={form}
      name="signup"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        label="아이디"
        name="id"
        rules={[
          {
            required: true,
            message: 'Please input your id!',
          },
        ]}
      >
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
        ]}
      >
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
                return Promise.resolve();
              }

              return Promise.reject(new Error('The two passwords that you entered do not match!'));
            },
          }),
        ]}
      >
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
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
          label="성별"
          name="gender"
          rules={[
            {
              required: true,
              message: 'Please select gender!',
            },
          ]}
        >
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
              required: true,
              message: 'Please select ageRange!',
            },
          ]}
        >
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
    
      <Form.Item {...tailFormItemLayout}>
        <Button type="primary" htmlType="submit">
          Register
        </Button>
      </Form.Item>
    </Form>
  );
}

export default SignupForm;