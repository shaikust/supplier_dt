// import React, { useState } from "react";
// import { Form, Button, Row, Col, Typography, message } from "antd";
// import Head from "../../components/layout/navbar/Head";
// import FormInput from "../../components/common/FormInput/FormInput";
// import FormSelect from "../../components/common/FormInput/FormSelect";
// import "../Supplier/supform.css";

// const { Title } = Typography;

// const SupplierSignUp = () => {
//   const [form] = Form.useForm();
//   const [contactDetails, setContactDetails] = useState([{ key: Date.now() }]);
//   const [supplierIds, setSupplierIds] = useState([{ key: Date.now() }]);

//   const onFinish = (values) => {
//     const formData = {
//       ...values,
//       contactDetails,
//       supplierIds,
//     };

//     const jsonData = JSON.stringify(formData);
//     console.log("Form Data in JSON format:", jsonData);
//     message.success("Form submitted successfully!");
//   };

//   const addContactDetail = () => {
//     setContactDetails([...contactDetails, { key: Date.now() }]);
//   };

//   const removeContactDetail = (index) => {
//     if (contactDetails.length > 1) {
//       setContactDetails(contactDetails.filter((_, i) => i !== index));
//     }
//   };

//   const addSupplierId = () => {
//     setSupplierIds([...supplierIds, { key: Date.now() }]);
//   };

//   const removeSupplierId = (index) => {
//     if (supplierIds.length > 1) {
//       setSupplierIds(supplierIds.filter((_, i) => i !== index));
//     }
//   };

//   return (
//     <>
//       <Head />
//       <div style={{ padding: "20px" }}>
//         <Form form={form} name="supplier_form" onFinish={onFinish} layout="vertical">
//           <Title level={4} id="test">Supplier Details</Title>
//           <div className="form-container">
//             <Row gutter={16}>
//               <Col span={8}>
//                 <FormInput
//                   name="companyName"
//                   label="Company Name"
//                   rules={[{ required: true, message: "Company Name is required" }]}
//                   placeholder="Company Name"
//                 />
//               </Col>
//               <Col span={8}>
//                 <FormInput
//                   name="addressLine1"
//                   label="Address Line 1"
//                   rules={[{ required: true, message: "Address Line 1 is required" }]}
//                   placeholder="Address Line 1"
//                 />
//               </Col>
//               <Col span={8}>
//                 <FormInput
//                   name="addressLine2"
//                   label="Address Line 2"
//                   placeholder="Address Line 2"
//                 />
//               </Col>
//               <Col span={8}>
//                 <FormSelect
//                   name="state"
//                   label="State"
//                   rules={[{ required: true, message: "State is required" }]}
//                   placeholder="Select state"
//                   options={[
//                     { label: "State 1", value: "state1" },
//                     { label: "State 2", value: "state2" },
//                   ]}
//                 />
//               </Col>
//               <Col span={8}>
//                 <FormSelect
//                   name="country"
//                   label="Country"
//                   rules={[{ required: true, message: "Country is required" }]}
//                   placeholder="Select country"
//                   options={[
//                     { label: "Country 1", value: "country1" },
//                     { label: "Country 2", value: "country2" },
//                   ]}
//                 />
//               </Col>
//               <Col span={8}>
//                 <FormInput
//                   name="zipcode"
//                   label="Zipcode"
//                   rules={[
//                     { required: true, message: "Zipcode is required" },
//                     { len: 6, message: "Zipcode must be 6 digits" },
//                   ]}
//                   placeholder="Zipcode"
//                 />
//               </Col>
//             </Row>
//           </div>

//           <Title level={4} style={{ color: "#004481", marginLeft: "99px" }}>
//             Contact Details
//           </Title>
//           <div className="form-container">
//             {contactDetails.map((_, index) => (
//               <div className="contact-detail" key={index}>
//                 <Row gutter={16}>
//                   <Col span={8}>
//                     <FormInput
//                       name={[`contactDetails[${index}]`, "firstName"]}
//                       label="First Name"
//                       rules={[{ required: true, message: "First Name is required" }]}
//                       placeholder="First Name"
//                     />
//                   </Col>
//                   <Col span={8}>
//                     <FormInput
//                       name={[`contactDetails[${index}]`, "lastName"]}
//                       label="Last Name"
//                       rules={[{ required: true, message: "Last Name is required" }]}
//                       placeholder="Last Name"
//                     />
//                   </Col>
//                   <Col span={8}>
//                     <FormInput
//                       name={[`contactDetails[${index}]`, "email"]}
//                       label="Email ID"
//                       rules={[{ required: true, type: "email", message: "Valid Email ID is required" }]}
//                       placeholder="Email ID"
//                     />
//                   </Col>
//                 </Row>
//                 <Row gutter={16}>
//                   <Col span={8}>
//                     <FormInput
//                       name={[`contactDetails[${index}]`, "phoneNumber"]}
//                       label="Phone Number"
//                       rules={[{ required: true, message: "Phone Number is required" }]}
//                       placeholder="Phone Number"
//                     />
//                   </Col>
//                   <Col span={8}>
//                     <FormSelect
//                       name={[`contactDetails[${index}]`, "adminUser"]}
//                       label="Admin User"
//                       rules={[{ required: true, message: "Admin User is required" }]}
//                       placeholder="Select admin user"
//                       options={[
//                         { label: "Admin 1", value: "admin1" },
//                         { label: "Admin 2", value: "admin2" },
//                       ]}
//                     />
//                   </Col>
//                   <Col span={8}>
//                     <FormInput
//                       name={[`contactDetails[${index}]`, "designation"]}
//                       label="Designation"
//                       placeholder="Designation"
//                     />
//                   </Col>
//                 </Row>
//                 {contactDetails.length > 1 && (
//                   <Button
//                     type="link"
//                     danger
//                     onClick={() => removeContactDetail(index)}
//                     style={{ position: "absolute", bottom: "20px", right: "20px", top: "10px" }}
//                   >
//                     Delete
//                   </Button>
//                 )}
//               </div>
//             ))}
//             <Button type="dashed" onClick={addContactDetail} style={{ width: "100%" }}>
//               Add Contact Detail
//             </Button>
//           </div>

//           <Title level={4} style={{ color: "#004481", marginLeft: "99px" }}>
//             Supplier ID
//           </Title>
//           <div className="form-container">
//             {supplierIds.map((_, index) => (
//               <div className="supplier-id" key={index}>
//                 <Row gutter={16}>
//                   <Col span={8}>
//                     <FormInput
//                       name={[`supplierIds[${index}]`, "supplierId"]}
//                       label="Supplier ID"
//                       rules={[{ required: true, message: "Supplier ID is required" }]}
//                       placeholder="Supplier ID"
//                     />
//                   </Col>
//                   <Col span={8}>
//                     <FormInput
//                       name={[`supplierIds[${index}]`, "countryCode"]}
//                       label="Country Code"
//                       placeholder="Country Code"
//                     />
//                   </Col>
//                 </Row>
//                 {supplierIds.length > 1 && (
//                   <Button
//                     type="link"
//                     danger
//                     onClick={() => removeSupplierId(index)}
//                     style={{ position: "absolute", bottom: "20px", right: "20px" }}
//                   >
//                     Remove
//                   </Button>
//                 )}
//               </div>
//             ))}
//             <Button type="dashed" onClick={addSupplierId} style={{ width: "100%" }}>
//               Add Supplier ID
//             </Button>
//           </div>

//           <Form.Item>
//             <Button
//               type="primary"
//               htmlType="submit"
//               style={{ marginTop: "20px" }}
//             >
//               Submit
//             </Button>
//           </Form.Item>
//         </Form>
//       </div>
//     </>
//   );
// };

// export default SupplierSignUp;
