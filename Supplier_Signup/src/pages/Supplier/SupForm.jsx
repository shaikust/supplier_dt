import React, { useState, useEffect } from "react";
import { Form, Input, Select, Button,Card, Image, Row, Col, Typography, message } from "antd";
import Head from "../../components/layout/navbar/Head";
import { PlusCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { Country, State } from "country-state-city";
import { useSelector, useDispatch } from 'react-redux';
import { fetchSuppliers, submitSupplierData, updateContactDetails, updateAssociatedSuppliers, updateSupplierInfo } from '../../redux/slices/supplierSlice'; // Adjust path accordingly
import "../Supplier/supform.css";

import { EditOutlined, DeleteOutlined, UserOutlined } from '@ant-design/icons';
import loginImage from '../../../src/assets/loginImage.jpg';
import SupplierDetails from '../../components/signup/SupplierDetails';
import ContactDetails from '../../components/signup/ContactDetails';
import AdditionalDetails from '../../components/signup/AdditionalDetails';

const { Option } = Select;
const { Title, Paragraph } = Typography;


const SupForm1 = () => {
  const [form] = Form.useForm();
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");

  const [step, setStep] = useState(1); // Step 1: SupplierDetails, Step 2: ContactDetails, Step 3: AdditionalDetails
  const [supplierInfo, setSupplierInfo] = useState(null); // Store supplier details
  const [contactInfo, setContactInfo] = useState([]); // Store contact details
  const [additionalInfo, setAdditionalInfo] = useState([]); // Store additional details
  const [editing, setEditing] = useState(false); // Track if editing mode is on
  const [editIndex, setEditIndex] = useState(null);

  const dispatch = useDispatch();
  const { contactDetails, associatedSuppliers, status, error } = useSelector((state) => state.suppliers);

  // Fetch countries when the component mounts
  useEffect(() => {
    setCountries(Country.getAllCountries());
  }, []);

  // Fetch states when a country is selected
  const handleCountryChange = (value) => {
    setSelectedCountry(value);
    setStates(State.getStatesOfCountry(value));
  };

  useEffect(() => {
    dispatch(fetchSuppliers());
  }, [dispatch]);

  useEffect(() => {
    if (status === 'succeeded') {
      form.setFieldsValue({
        companyName: supplierInfo.companyName,
        addressLine1: supplierInfo.addressLine1,
        addressLine2: supplierInfo.addressLine2,
        state: supplierInfo.state,
        country: supplierInfo.country,
        zipcode: supplierInfo.zipcode
      });
    } else if (status === 'failed') {
      message.error(`Error: ${error}`);
    }
  }, [status, supplierInfo, error, form]);

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


  const addContactDetail = () => {
    const newContactDetails = [...contactDetails, { firstName: "", lastName: "", email: "", phoneNumber: "", userType: "", designation: "" }];
    dispatch(updateContactDetails(newContactDetails));
  };

  const removeContactDetail = (index) => {
    if (contactDetails.length > 1) {
      const updatedContactDetails = contactDetails.filter((_, i) => i !== index);
      dispatch(updateContactDetails(updatedContactDetails));
    }
  };

  const addSupplierId = () => {
    const newAssociatedSuppliers = [...associatedSuppliers, { supplierId: "", countryCode: "" }];
    dispatch(updateAssociatedSuppliers(newAssociatedSuppliers));
  };

  const removeSupplierId = (index) => {
    if (associatedSuppliers.length > 1) {
      const updatedAssociatedSuppliers = associatedSuppliers.filter((_, i) => i !== index);
      dispatch(updateAssociatedSuppliers(updatedAssociatedSuppliers));
    }
  };

  const onFinish = async (values) => {
    const formattedData = {
      companyName: values.companyName.trim(), // Trim value
      addressLine1: values.addressLine1.trim(), // Trim value
      addressLine2: values.addressLine2.trim(), // Trim value
      state: values.state,
      country: values.country,
      zipcode: values.zipcode.trim(), // Trim value
      contactDetails: contactDetails,
      associatedSuppliers: associatedSuppliers,
    };

    try {
      await dispatch(submitSupplierData(formattedData)).unwrap();
      message.success("Form submitted successfully!");
    } catch (error) {
      message.error(`Error: ${error}`);
    }
  };
const handleAddSupplierDetails = (details) => {
    setSupplierInfo(details);
    setEditing(false); // Exit editing mode after saving
  };

  // Handle adding contact details
  const handleAddContactDetails = (details) => {
    if (editing && editIndex !== null) {
      // If editing, update the contact at the specified index
      const updatedContacts = contactInfo.map((contact, index) =>
        index === editIndex ? details : contact
      );
      setContactInfo(updatedContacts);
    } else {
      // If not editing, append a new contact
      setContactInfo([...contactInfo, details]);
    }
    setEditing(false);
    setEditIndex(null);
    setStep(2);
  };

  const handleDeleteContact = (index) => {
    const updatedContacts = contactInfo.filter((_, i) => i !== index);
    setContactInfo(updatedContacts);
  };

  // Handle adding additional details
  // const handleAddAdditionalDetails = (details) => {
  //   if (editing && editIndex !== null) {
  //     // If editing, update the additional details at the specified index
  //     const updatedAdditional = additionalInfo.map((additional, index) =>
  //       index === editIndex ? details : additional
  //     );
  //     setAdditionalInfo(updatedAdditional);
  //   } else {
  //     // If not editing, append a new additional info
  //     setAdditionalInfo([...additionalInfo, details]);
  //   }
  //   setEditing(false);
  //   setEditIndex(null);
  //   setStep(3);
  // };
  const handleAddAdditionalDetails = (details) => {
    // Check for duplicate supplier IDs
    const isDuplicate = additionalInfo.some(
      (additional) => additional.associatedSuppliers?.supplierId === details.associatedSuppliers?.supplierId
    );
  
    if (isDuplicate && (!editing || (editing && additionalInfo[editIndex]?.associatedSuppliers?.supplierId !== details.associatedSuppliers?.supplierId))) {
      // Show an alert or notification if duplicate is found
      alert("This supplier ID already exists. Please provide a unique supplier ID.");
      return;
    }
  
    // If editing, update the additional details at the specified index
    if (editing && editIndex !== null) {
      const updatedAdditional = additionalInfo.map((additional, index) =>
        index === editIndex ? details : additional
      );
      setAdditionalInfo(updatedAdditional);
    } else {
      // If not editing, append a new additional info
      setAdditionalInfo([...additionalInfo, details]);
    }
  
    // Reset editing state
    setEditing(false);
    setEditIndex(null);
    setStep(3);
  };
  

  const handleDeleteAdditional = (index) => {
    const updatedAdditional = additionalInfo.filter((_, i) => i !== index);
    setAdditionalInfo(updatedAdditional);
  };

  const handlePrevious = (prevStep) => {
    setStep(prevStep);
    setEditing(true); // Switch to edit mode on previous navigation
  };

  // Final submit to store all data
  const handleSubmit = () => {
    const finalData = {
      supplierInfo,
      contactInfo,
      additionalInfo,
    };
    console.log('Final Submission Data:', finalData);
    handleClearData(); // Clear the form data after submission if needed
  };

  // Reset the form for editing
  const handleEdit = (type, index) => {
    setEditing(true); // Enable editing mode
    setEditIndex(index);

    if (type === 'supplier') {
      setStep(1);
    } else if (type === 'contact') {
      setStep(2);
    } else if (type === 'additional') {
      setStep(3);
    }
  };

  // Clear all form data (used when Cancel is clicked)
  const handleClearData = () => {
    setSupplierInfo(null);
    setContactInfo([]);
    setAdditionalInfo([]);
    setEditing(false); // Exit editing mode if Cancel is clicked
  };

  return (
  
    <div className="flex h-auto w-screen">
    {/* Left section */}
    <div className="bg-[#1F405A] p-8 w-1/3 flex flex-col justify-center gap-4">
      <div>
        <Title class="text-[50px] text-white">Sustainability Program</Title>
        <Paragraph className="text-white text-xl">
          Welcome to Sustainability Portal, your destination for accessing sustainability reports.
        </Paragraph>
      </div>
      <div className="mt-auto flex justify-center">
        <Image
          src={loginImage}
          alt="Person working on computer"
          className="w-[300px] h-auto"
          preview={false}
        />
      </div>
    </div>

    {/* Right section */}
    <div className="flex-grow h-auto bg-gray-100 flex items-center justify-center p-8">
      <Card className="w-full h-full max-w-md shadow-lg rounded-lg" style={{ textAlign: 'center' }}>
        <Title level={2}>
          {step === 1 ? 'Supplier Details' : step === 2 ? 'Contact Details' : 'Additional Details'}
        </Title>
        <div className="mb-4">
          <Button
            type={step === 1 ? 'primary' : 'default'}
            className="mr-2"
            onClick={() => setStep(1)}
          >
            1
          </Button>
          <Button
            type={step === 2 ? 'primary' : 'default'}
            className="mr-2"
            onClick={() => setStep(2)}
          >
            2
          </Button>
          <Button
            type={step === 3 ? 'primary' : 'default'}
            onClick={() => setStep(3)}
          >
            3
          </Button>
        </div>

        {step === 1 && (
          <>
            {/* Supplier Details Form */}
            {!supplierInfo || editing ? (
              <SupplierDetails onAdd={handleAddSupplierDetails} initialValues={supplierInfo} />
            ) : (
              <div className="flex flex-col items-center gap-4">
                <div className="flex gap-4 h-[125px] w-[300px]">
                  <div className="flex items-center bg-[#E6F4F1] p-4 rounded-lg w-full">
                    <UserOutlined className="text-4xl mr-4" />
                    <div className="flex-grow text-left">
                      <div className="mb-0 font-bold">{supplierInfo?.companyName}</div>
                      <div className="mb-0">
                        {supplierInfo?.addressLine1}, {supplierInfo?.addressLine2}
                      </div>
                      <div className="mb-0">
                        {supplierInfo?.country}, {supplierInfo?.state}
                      </div>
                      <div className="mb-0 font-bold">{supplierInfo?.zipcode}</div>
                    </div>
                    <div className="flex flex-col items-center ml-4">
                      <EditOutlined
                        className="text-4xl mb-8 cursor-pointer"
                        onClick={() => handleEdit('supplier')}
                      />
                      <DeleteOutlined
                        className="text-4xl mt-4 cursor-pointer"
                        onClick={() => setSupplierInfo(null)}
                      />
                    </div>
                  </div>
                </div>
                <Button type="primary" onClick={() => setStep(2)}>
                  Next
                </Button>
              </div>
            )}
          </>
        )}

        {step === 2 && (
          <>
            {/* Contact Details Form */}
            <div className="flex flex-col items-center gap-4 mt-4">
              {(contactInfo || []).map((contact, index) => (
                <div key={index} className="flex gap-4 h-[125px] w-[300px]">
                  <div className="flex items-center bg-[#E6F4F1] p-4 rounded-lg w-full">
                    <UserOutlined className="text-4xl mr-4" />
                    <div className="flex-grow text-left">
                      <div className="mb-0 font-bold">
                        {contact.contactDetails?.firstName} {contact.contactDetails?.lastName}
                      </div>
                      <div className="mb-0">{contact.contactDetails?.emailId}</div>
                      <div className="mb-0">{contact.contactDetails?.userType}</div>
                      <div className="mb-0">{contact?.country}</div>
                      <div className="mb-0 font-bold">{contact.contactDetails?.designation}</div>
                    </div>
                    <div className="flex flex-col items-center ml-4">
                      <EditOutlined
                        className="text-2xl mb-2 cursor-pointer"
                        onClick={() => handleEdit('contact', index)}
                      />
                      <DeleteOutlined
                        className="text-2xl cursor-pointer"
                        onClick={() => handleDeleteContact(index)}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <ContactDetails
              onAdd={handleAddContactDetails}
              initialValues={editing ? contactInfo[editIndex] : {}}
            />
            <br />
            <Button onClick={() => handlePrevious(1)} className='mr-[5px]'>Previous</Button>
            <Button type="primary" onClick={() => setStep(3)}>
              Next
            </Button>
          </>
        )}

        {step === 3 && (
          <>
            {/* Additional Details Form */}
            <div className="flex flex-col items-center gap-4 mt-4">
              {(additionalInfo || []).map((additional, index) => (
                <div key={index} className="flex gap-4 h-[125px] w-[300px]">
                  <div className="flex items-center bg-[#E6F4F1] p-4 rounded-lg w-full">
                    <UserOutlined className="text-4xl mr-4" />
                    <div className="flex-grow text-left">
                      <div className="mb-0 font-bold">{additional.associatedSuppliers?.supplierId}</div>
                      <div className="mb-0">{additional.associatedSuppliers?.countryCode}</div>
                    </div>
                    <div className="flex flex-col items-center ml-4">
                      <EditOutlined
                        className="text-2xl mb-2 cursor-pointer"
                        onClick={() => handleEdit('additional', index)}
                      />
                      <DeleteOutlined
                        className="text-2xl cursor-pointer"
                        onClick={() => handleDeleteAdditional(index)}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <AdditionalDetails
              onAdd={handleAddAdditionalDetails}
              initialValues={editing ? additionalInfo[editIndex] : {}}
            />
            <br />
            <Button onClick={() => handlePrevious(2)} className='mr-[5px]'>Previous</Button>
            <Button type="primary" onClick={handleSubmit}>
              Submit
            </Button>
          </>
        )}
      </Card>
    </div>
  </div>
  );
};

export default SupForm1;
