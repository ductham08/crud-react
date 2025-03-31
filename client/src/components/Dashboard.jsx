import React, { useState } from 'react';
import { Button, Input, Table, Space, message } from 'antd';
import MainLayout from './layouts/MainLayout';
import { SearchOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import ModalUser from './modals/ModalUser';

const columns = [
    {
        title: 'Name',
        dataIndex: 'name',
    },
    {
        title: 'Age',
        dataIndex: 'age',
    },
    {
        title: 'Address',
        dataIndex: 'address',
    },
    {
        title: 'Actions',
        key: 'actions',
        render: (_, record) => (
            <Space>
                {/* <Button
                    type="primary"
                    icon={<EditOutlined />}
                    onClick={() => handleEditUser(record)}
                >
                    Edit
                </Button>
                <Button
                    danger
                    icon={<DeleteOutlined />}
                    onClick={() => handleDeleteUser(record.id)}
                >
                    Delete
                </Button> */}
            </Space>
        ),
    },
];

const Dashboard = () => {
    const [data, setData] = useState([
        { id: 1, name: 'John Doe', age: 32, address: 'New York' },
        { id: 2, name: 'Jane Smith', age: 28, address: 'London' },
    ]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingUser, setEditingUser] = useState(null);

    const handleAddUser = () => {
        setEditingUser(null);
        setIsModalOpen(true);
    };

    const handleEditUser = (user) => {
        setEditingUser(user);
        setIsModalOpen(true);
    };

    const handleDeleteUser = (id) => {
        setData(data.filter(item => item.id !== id));
        message.success('User deleted successfully');
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
        setEditingUser(null);
    };

    const handleModalSubmit = (values) => {
        if (editingUser) {
            setData(data.map(user =>
                user.id === editingUser.id ? { ...user, ...values } : user
            ));
            message.success('User updated successfully');
        } else {
            const newUser = {
                id: data.length + 1,
                ...values
            };
            setData([...data, newUser]);
            message.success('User added successfully');
        }
    };

    return (
        <MainLayout>
            <div className="dashboard-page">
                <div className="dashboard-heading">
                    <h3>Dashboard</h3>
                    <div className='heading-actions'>
                        <Button type='primary' onClick={handleAddUser}>Thêm mới</Button>
                    </div>
                </div>
                <div className="dashboard-content">
                    <div className="search-box">
                        <Input
                            placeholder="Tìm kiếm"
                            prefix={<SearchOutlined />}
                        />
                    </div>
                    <div className='dashboard-data-table'>
                        <Table
                            columns={columns}
                            dataSource={data}
                            rowKey="id"
                            showSorterTooltip={{ target: 'sorter-icon' }}
                        />
                    </div>

                    <ModalUser 
                        isOpen={isModalOpen}
                        onClose={handleModalClose}
                        onSubmit={handleModalSubmit}
                        data={editingUser}
                        title={editingUser ? "Edit User" : "Add User"}
                    />
                </div>
            </div>
        </MainLayout>
    );
};

export default Dashboard; 