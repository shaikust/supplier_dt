import React,{useState, useEffect } from 'react';
import { Typography, Select,Card, Input, Button, Form } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { Country, State } from "country-state-city";

import { fetchSuppliers, submitSupplierData, updateContactDetails, updateAssociatedSuppliers, updateSupplierInfo } from '../../redux/slices/supplierSlice'; 

const { Title, Paragraph } = Typography;

const AdditionalDetails = ({ onAdd,initialValues }) => {
  const { contactDetails, associatedSuppliers, supplierInfo, status, error } = useSelector((state) => state.suppliers);
  const [form] = Form.useForm();
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");

  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue(initialValues);
    }
  }, [initialValues, form]);

  const onFinish = (values) => {
    onAdd(values);
    form.resetFields();
  };

  const onCancel = () => {
    form.resetFields();
  };
  const handleOnChange = (index, field, value, type) => {
    // Trim the value to remove leading and trailing spaces
    const trimmedValue = value.trim();

    if (type === "contact") {
      // Create a new array with updated contact details
      const updatedContactDetails = contactDetails.map((contact, i) =>
        i === index ? { ...contact, [field]: trimmedValue } : contact
      );
      dispatch(updateContactDetails(updatedContactDetails));
    } else if (type === "associate") {
      // Create a new array with updated associated suppliers
      const updatedAssociatedSuppliers = associatedSuppliers.map((supplier, i) =>
        i === index ? { ...supplier, [field]: trimmedValue } : supplier
      );
      dispatch(updateAssociatedSuppliers(updatedAssociatedSuppliers));
    }
  };
 // Fetch countries when the component mounts
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
                      label="Supplier ID"
                      name={['associatedSuppliers', 'supplierId']}
                      rules={[
                        { required: true, message: "Supplier ID is required" },
                        { max: 10, message: "Supplier ID cannot exceed 10 characters" }
                      ]}
                    >
                      <Input
                        placeholder="Supplier ID"
                      />
                    </Form.Item> 

                    <Form.Item
                      label="Country Code"
                      className="form-item-left-align"
                      name={['associatedSuppliers',  'countryCode']}
                      rules={[{ required: true, message: "Country Code is required" }]}
                    >
                      <Select
                        placeholder="Select Country Code"
                        showSearch
                        filterOption={(input, option) =>
                          option?.label?.toLowerCase().includes(input.toLowerCase())
                        }
                       
                        optionLabelProp="label"
                      >
                        {countries.map((country) => (
                          <Option key={country.isoCode} value={country.isoCode} label={`${country.isoCode} - ${country.name}`}>
                            {country.isoCode} - {country.name}
                          </Option>
                        ))}
                      </Select>
                    </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Add
        </Button>
        <Button htmlType="button" onClick={onCancel} style={{ marginLeft: '8px' }}>
          Clear
        </Button>
      </Form.Item>
    </Form>
  );
};

export default AdditionalDetails