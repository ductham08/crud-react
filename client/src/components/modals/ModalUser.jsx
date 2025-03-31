import { Modal, Form, Input, message, Select, DatePicker } from 'antd';
import React, { useEffect, useState } from 'react'

const ModalUser = ({ isOpen, onClose, onSubmit, data, title }) => {
    const [form] = Form.useForm();
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        setIsModalOpen(isOpen);
        if (data) {
            form.setFieldsValue(data);
        } else {
            form.resetFields();
        }
    }, [isOpen, data, form]);

    const handleOk = async () => {
        try {
            const values = await form.validateFields();
            onSubmit(values);
            setIsModalOpen(false);
            form.resetFields();
        } catch (error) {
            console.error('Validation failed:', error);
        }
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        onClose();
        form.resetFields();
    };

    return (
        <Modal 
            title={title || "User Information"} 
            open={isModalOpen} 
            onOk={handleOk} 
            onCancel={handleCancel}
            destroyOnClose
        >
            <Form
                form={form}
                layout="vertical"
                initialValues={data}
            >
                <Form.Item
                    name="name"
                    label="Name"
                    rules={[{ required: true, message: 'Please input the name!' }]}
                >
                    <Input placeholder="Enter name" />
                </Form.Item>

                <Form.Item
                    name="age"
                    label="Age"
                    rules={[
                        { required: true, message: 'Please input the date of birth!' }
                    ]}
                >
                    <DatePicker placeholder="Select date of birth" />
                </Form.Item>

                <Form.Item
                    name="email"
                    label="Email"
                    rules={[
                        { required: true, message: 'Please input the email!' }
                    ]}
                >
                    <Input placeholder="Enter email" />
                </Form.Item>

                <Form.Item
                    name="gender"
                    label="Gender"
                    rules={[
                        { required: true, message: 'Please input the gender!' }
                    ]}
                >
                    <Select placeholder="Select gender">
                        <Select.Option value="male">Male</Select.Option>
                        <Select.Option value="female">Female</Select.Option>
                    </Select>
                </Form.Item>

                <Form.Item
                    name="address"
                    label="Address"
                    rules={[{ required: true, message: 'Please input the address!' }]}
                >
                    <Input.TextArea placeholder="Enter address" />
                </Form.Item>
            </Form>
        </Modal>
    )
}

export default ModalUser
