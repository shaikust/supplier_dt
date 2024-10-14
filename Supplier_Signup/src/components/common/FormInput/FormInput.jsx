import React from "react";
import { Form, Input } from "antd";

const FormInput = ({ name, label, rules, placeholder }) => (
  <Form.Item name={name} label={label} rules={rules}>
    <Input placeholder={placeholder} />
  </Form.Item>
);

export default FormInput;
