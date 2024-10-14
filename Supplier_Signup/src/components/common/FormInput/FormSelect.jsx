import React from "react";
import { Form, Select } from "antd";

const { Option } = Select;

const FormSelect = ({ name, label, rules, placeholder, options }) => (
  <Form.Item name={name} label={label} rules={rules}>
    <Select placeholder={placeholder}>
      {options.map((option, index) => (
        <Option key={index} value={option.value}>
          {option.label}
        </Option>
      ))}
    </Select>
  </Form.Item>
);

export default FormSelect;
