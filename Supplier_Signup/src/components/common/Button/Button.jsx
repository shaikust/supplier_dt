import React from "react";
import { Button } from "antd";
import { PlusCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";


export const AddButton = ({ onClick }) => (
  <Button
    onClick={onClick}
    className="flex items-center justify-center bg-green-500 hover:bg-green-600 text-white rounded-md p-2"
    icon={<PlusCircleOutlined />}
  >
    Add
  </Button>
);

export const DeleteButton = ({ onClick, disabled }) => (
  <Button
    onClick={onClick}
    disabled={disabled}
    className="flex items-center justify-center bg-red-500 hover:bg-red-600 text-white rounded-md p-2"
    icon={<CloseCircleOutlined />}
  >
    Delete
  </Button>
);
