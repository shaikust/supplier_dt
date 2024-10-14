//form validation and other validation logic
// src/utils/validation.js
export default class Validation {
    static companyName() {
      return [
        { required: true, message: "Company Name is required" },
        { max: 100, message: "Company Name cannot exceed 100 characters" },
      ];
    }
  
    static addressLine1() {
      return [
        { required: true, message: "Address Line 1 is required" },
        { max: 100, message: "Address Line 1 cannot exceed 100 characters" },
      ];
    }
  
    static addressLine2() {
      return [
        { max: 100, message: "Address Line 2 cannot exceed 100 characters" },
      ];
    }
  
    static country() {
      return [{ required: true, message: "Country is required" }];
    }
  
    static state() {
      return [{ required: true, message: "State is required" }];
    }
  
    static zipcode() {
      return [
        { required: true, message: "Zipcode is required" },
        { len: 6, message: "Zipcode must be 6 digits" },
      ];
    }
  
    static firstName() {
      return [
        { required: true, message: "First Name is required" },
        { max: 100, message: "First Name cannot exceed 100 characters" },
        { pattern: /^[a-zA-Z\s]+$/, message: "First Name should only contain letters" },
      ];
    }
  
    static lastName() {
      return [
        { required: true, message: "Last Name is required" },
        { max: 100, message: "Last Name cannot exceed 100 characters" },
        { pattern: /^[a-zA-Z\s]+$/, message: "Last Name should only contain letters" },
      ];
    }
  
    static email() {
      return [
        { required: true, message: "Email ID is required" },
        { type: 'email', message: "Please enter a valid email address" },
        { max: 100, message: "Email ID cannot exceed 100 characters" },
      ];
    }
  
    static phoneNumber() {
      return [
        { required: true, message: "Phone Number is required" },
        { pattern: /^[0-9]+$/, message: "Phone Number should only contain numbers" },
        { len: 10, message: "Phone Number must be 10 digits" },
      ];
    }
  
    static userType() {
      return [{ required: true, message: "User Type is required" }];
    }
  
    static designation() {
      return [
        { required: true, message: "Designation is required" },
        { max: 100, message: "Designation cannot exceed 100 characters" },
      ];
    }
  
    static supplierId() {
      return [
        { required: true, message: "Supplier ID is required" },
        { max: 10, message: "Supplier ID cannot exceed 10 characters" },
      ];
    }
  
    static countryCode() {
      return [{ required: true, message: "Country Code is required" }];
    }
  }
  