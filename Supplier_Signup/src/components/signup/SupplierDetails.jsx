import React, { useEffect,useState } from 'react';
import { Typography, Input, Button, Form, Select } from 'antd';
import { Country, State } from "country-state-city";

const { Title } = Typography;
const { Option } = Select;


const SupplierDetails = ({ onAdd, initialValues }) => {
  const [form] = Form.useForm();
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [selectedCountry, setSelectedCountry] = React.useState(initialValues?.country || '');

  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue(initialValues);
    }
  }, [initialValues, form]);

  const onFinish = (values) => {
    onAdd(values);  // Pass form values to parent component
  };

  const onCancel = () => {
    form.resetFields();
  };

  useEffect(() => {
    setCountries(Country.getAllCountries());
  }, []);

  // Fetch states when a country is selected
  const handleCountryChange = (value) => {
    setSelectedCountry(value);
    setStates(State.getStatesOfCountry(value));
  };

  return (
    <Form form={form} layout="vertical" onFinish={onFinish} initialValues={initialValues}>
      <Form.Item
                  name="companyName"
                  label="Company Name"
                  rules={[
                    { required: true, message: "Company Name is required" },
                    { max: 100, message: "Company Name cannot exceed 100 characters" }
                  ]}
                >
                  <Input placeholder="Company Name" />
                </Form.Item>
            
      
                <Form.Item
                  name="addressLine1"
                  label="Address Line 1"
                  rules={[
                    { required: true, message: "Address Line 1 is required" },
                    { max: 100, message: "Address Line 1 cannot exceed 100 characters" }
                  ]}
                >
                  <Input placeholder="Address Line 1" />
                </Form.Item>
             
              
                <Form.Item
                  name="addressLine2"
                  label="Address Line 2"
                  rules={[{ max: 100, message: "Address Line 2 cannot exceed 100 characters" }]}
                >
                  <Input placeholder="Address Line 2" />
                </Form.Item>
              
            
                <Form.Item
                  name="country"
                  label="Country"
                  className="form-item-left-align"
                  rules={[{ required: true, message: "Country is required" }]}
                >
                  <Select
                    placeholder="Select country"
                    onChange={handleCountryChange}
                    showSearch
                    filterOption={(input, option) =>
                      option.children.toLowerCase().includes(input.toLowerCase())
                    }
                  >
                    {countries.map((country) => (
                      <Option key={country.isoCode} value={country.isoCode}>
                        {country.name}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
         
           
                <Form.Item
                  name="state"
                  label="State"
                  className="form-item-left-align"
                  rules={[{ required: true, message: "State is required" }]}
                >
                  <Select
                    placeholder="Select state"
                    showSearch
                    filterOption={(input, option) =>
                      option.children.toLowerCase().includes(input.toLowerCase())
                    }
                  >
                    {states.map((state) => (
                      <Option key={state.isoCode} value={state.isoCode}>
                        {state.name}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
          
         
                <Form.Item
                  name="zipcode"
                  label="Zipcode"
                  rules={[
                    { required: true, message: "Zipcode is required" },
                    { pattern: /^[0-9]{5,6}$/, message: "Zipcode must be 5 or 6 digits" },
                  ]}
                >
                  <Input placeholder="Zipcode" />
                </Form.Item>

      <Button type="primary" htmlType="submit">Add</Button>
      <Button className="ml-2" onClick={onCancel}>Clear</Button>
    </Form>
  );
};

export default SupplierDetails;

