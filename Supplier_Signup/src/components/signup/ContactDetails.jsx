import React, { useEffect, useState } from 'react';
import { Typography, Input, Button, Form, Row, Col, Select } from 'antd';
import { PlusCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';

const { Title } = Typography;
const { Option } = Select;

const ContactDetails = ({ initialValues, onAdd }) => {
  const [form] = Form.useForm();
   const [contactDetails, setContactDetails] = useState(initialValues || []);

  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue(initialValues);
    }
  }, [initialValues, form]);


  const handleOnChange = ( field, value) => {
    const updatedContacts = [...contactDetails];
    updatedContacts[index] = { ...updatedContacts[index], [field]: value };
    setContactDetails(updatedContacts);
  };

  const addContactDetail = () => {
    setContactDetails([...contactDetails, {}]);
  };

  const removeContactDetail = (index) => {
    const updatedContacts = [...contactDetails];
    updatedContacts.splice(index, 1);
    setContactDetails(updatedContacts);
  };

  const onFinish = (values) => {
    onAdd(values);
    console.log(values)
    form.resetFields();
  };

  const onCancel = () => {
    form.resetFields();
    setContactDetails(initialValues || []);
  };

  return (
    <>
     
      <Form form={form} layout="vertical" onFinish={onFinish} initialValues={initialValues}>
       
              <div className="contact-detail-fields">
                    <Form.Item
                      label="First Name"
                      name={['contactDetails',  'firstName']}
                      rules={[
                        { required: true, message: 'First Name is required' },
                        { max: 100, message: 'First Name cannot exceed 100 characters' },
                        { pattern: /^[a-zA-Z\s]+$/, message: 'First Name should only contain letters' },
                      ]}
                    >
                      <Input
                        placeholder="First Name"
                      
                       
                      />
                    </Form.Item>
            

                    <Form.Item
                      label="Last Name"
                      name={['contactDetails',  'lastName']}
                      rules={[
                        { required: true, message: 'Last Name is required' },
                        { max: 100, message: 'Last Name cannot exceed 100 characters' },
                        { pattern: /^[a-zA-Z\s]+$/, message: 'Last Name should only contain letters' },
                      ]}
                    >
                      <Input
                        placeholder="Last Name"
                       
                      
                      />
                    </Form.Item>
              
                    <Form.Item
                      label="Email ID"
                      name={['contactDetails',  'email']}
                      rules={[
                        { required: true, message: 'Email ID is required' },
                        { type: 'email', message: 'Please enter a valid email address' },
                        { max: 100, message: 'Email ID cannot exceed 100 characters' },
                      ]}
                    >
                      <Input
                        placeholder="Email ID"
                       
                       
                      />
                    </Form.Item>
               
                    <Form.Item
                      label="Phone Number"
                      name={['contactDetails',  'phoneNumber']}
                      rules={[
                        { required: true, message: 'Phone Number is required' },
                        { pattern: /^[0-9]+$/, message: 'Phone Number should only contain numbers' },
                        { len: 10, message: 'Phone Number should be exactly 10 digits' },
                      ]}
                    >
                      <Input
                        placeholder="Phone Number"
                       
                       
                      />
                    </Form.Item>
                 
                    <Form.Item
                      label="User Type"
                      name={['contactDetails',  'userType']}
                      rules={[{ required: true, message: 'User Type is required' }]}
                    >
                      <Select
                        placeholder="Select User Type"
                       
                        
                      >
                        <Option value="Admin">Admin</Option>
                        <Option value="User">User</Option>
                      </Select>
                    </Form.Item>
                 
                    <Form.Item
                      label="Designation"
                      name={['contactDetails',  'designation']}
                      rules={[
                        { required: true, message: 'Designation is required' },
                        { max: 100, message: 'Designation cannot exceed 100 characters' },
                      ]}
                    >
                      <Input
                        placeholder="Designation"
                      
                       
                      />
                    </Form.Item>
                
        </div>
        
        <Button type="primary" htmlType="submit">Add</Button>
      <Button style={{ marginLeft: '8px' }} onClick={onCancel}>Clear</Button>
      </Form>
    </>
  );
};

export default ContactDetails;

