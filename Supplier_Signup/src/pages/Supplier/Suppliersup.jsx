// import { Form, Button, Select } from 'antd';
// import React from 'react';
// import FormInput from '../../components/common/FormInput/FormInput';
// import FormSelect from '../../components/common/FormInput/FormSelect';
// import Head from '../../components/layout/navbar/Head';

// function Suppliersup() {
//   const [form] = Form.useForm();

//   const onFinish = (values) => {
//     console.log('Form Submitted: ', values);
//   };

//   const onReset = () => {
//     form.resetFields();
//   };
//   const { Option } = Select
//   return (
//     <>
//       <Head />
//       <div className='h-auto w-1115px bg-red-100 ml-20 mt-10 p-10 rounded-2xl shadow-lg'>
//         <Form
//           form={form}
//           layout="inline"
//           onFinish={onFinish}
//         >
//           <FormInput
//             name="companyName"
//             label="Company Name"
//             rules={[{ required: true, message: "Company Name is required" }]}
//             placeholder="Company Name"
//           />
//           <FormInput
//             name="addressLine1"
//             label="Address Line 1"
//             rules={[{ required: true, message: "Address Line 1 is required" }]}
//             placeholder="Address Line 1"
//           />
//           <FormInput
//             name="addressLine2"
//             label="Address Line 2"
//             placeholder="Address Line 2"
//           />
//           <div>

         
//           <Select 
//     showSearch
//     style={{ width: 200 }}
//     placeholder="Search to Select"
//     optionFilterProp="label"
//     filterSort={(optionA, optionB) =>
//       (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
//     }
//     options={[
//       {
//         value: '1',
//         label: 'Not Identified',
//       },
//       {
//         value: '2',
//         label: 'Closed',
//       },
//       {
//         value: '3',
//         label: 'Communicated',
//       },
//       {
//         value: '4',
//         label: 'Identified',
//       },
//       {
//         value: '5',
//         label: 'Resolved',
//       },
//       {
//         value: '6',
//         label: 'Cancelled',
//       },
//     ]}
//   />
//       </div>
//       <div>

         
// <Select
// showSearch
// style={{ width: 200 }}
// placeholder="Search to Select"
// optionFilterProp="label"
// filterSort={(optionA, optionB) =>
// (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
// }
// options={[
// {
// value: '1',
// label: 'Not Identified',
// },
// {
// value: '2',
// label: 'Closed',
// },
// {
// value: '3',
// label: 'Communicated',
// },
// {
// value: '4',
// label: 'Identified',
// },
// {
// value: '5',
// label: 'Resolved',
// },
// {
// value: '6',
// label: 'Cancelled',
// },
// ]}
// />
// </div>
//         </Form>
      
//       </div>
//     </>
//   );
// }

// export default Suppliersup;
