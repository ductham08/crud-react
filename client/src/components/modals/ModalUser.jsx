import { Modal, Form, Input, Select, DatePicker } from 'antd';
import React, { useEffect, useState } from 'react'
import dayjs from 'dayjs';

const ModalUser = ({ isOpen, onClose, onSubmit, data, title }) => {
    const [form] = Form.useForm();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const maxDate = dayjs().endOf('day');
    const dateFormat = 'YYYY/MM/DD';

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
            setLoading(true);
            const values = await form.validateFields();
            onSubmit(values);
            setIsModalOpen(false);
            form.resetFields();
        } catch (error) {
            console.error('Validation failed:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        onClose();
        form.resetFields();
    };

    return (
        <Modal 
            title={title || (data ? "Edit User" : "Add New User")} 
            open={isModalOpen} 
            onOk={handleOk} 
            onCancel={handleCancel}
            destroyOnClose
            confirmLoading={loading}
            width={600}
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
                    name="dateOfBirth"
                    label="Date of Birth"
                    rules={[
                        { required: true, message: 'Please select date of birth!' }
                    ]}
                >
                    <DatePicker 
                        placeholder="Select date of birth"
                        style={{ width: '100%' }}
                        maxDate={maxDate}
                        format={dateFormat}
                        defaultValue={dayjs(maxDate, dateFormat)}
                    />
                </Form.Item>

                <Form.Item
                    name="email"
                    label="Email"
                    rules={[
                        { required: true, message: 'Please input the email!' },
                        { type: 'email', message: 'Please enter a valid email!' }
                    ]}
                >
                    <Input placeholder="Enter email" />
                </Form.Item>

                <Form.Item
                    name="gender"
                    label="Gender"
                    rules={[
                        { required: true, message: 'Please select gender!' }
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
                    <Input.TextArea placeholder="Enter address" rows={3} />
                </Form.Item>
            </Form>
        </Modal>
    )
}

export default ModalUser
