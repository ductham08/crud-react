import React, { useState } from 'react';
import { Button, Input, Table, Space, message } from 'antd';
import MainLayout from './layouts/MainLayout';
import { SearchOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import ModalUser from './modals/ModalUser';
import dayjs from 'dayjs';

const Dashboard = () => {
    const [data, setData] = useState([]);

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
        },
        {
            title: 'Date of Birth',
            dataIndex: 'dateOfBirth',
            render: (date) => dayjs(date, 'YYYY/MM/DD').format('DD/MM/YYYY')
        },
        {
            title: 'Email',
            dataIndex: 'email',
        },
        {
            title: 'Gender',
            dataIndex: 'gender',
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
                    <Button
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
                    </Button>
                </Space>
            ),
        },
    ];

    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editingUser, setEditingUser] = useState(null);

    const handleAddUser = () => {
        setIsCreateModalOpen(true);
    };

    const handleEditUser = (user) => {
        setEditingUser({
            ...user,
            dateOfBirth: dayjs(user.dateOfBirth, 'YYYY/MM/DD')
        });
        setIsEditModalOpen(true);
    };

    const handleDeleteUser = (id) => {
        setData(data.filter(item => item.id !== id));
        message.success('User deleted successfully');
    };

    const handleCreateModalClose = () => {
        setIsCreateModalOpen(false);
    };

    const handleEditModalClose = () => {
        setIsEditModalOpen(false);
        setEditingUser(null);
    };

    const handleCreateSubmit = (values) => {
        const newUser = {
            id: data.length + 1,
            ...values,
            dateOfBirth: values.dateOfBirth.format('YYYY/MM/DD')
        };
        setData([...data, newUser]);
        message.success('User added successfully');
        setIsCreateModalOpen(false);
    };

    const handleEditSubmit = (values) => {
        setData(data.map(user =>
            user.id === editingUser.id 
                ? { ...user, ...values, dateOfBirth: values.dateOfBirth.format('YYYY/MM/DD') } 
                : user
        ));
        message.success('User updated successfully');
        setIsEditModalOpen(false);
        setEditingUser(null);
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

                    {/* Create Modal */}
                    <ModalUser 
                        isOpen={isCreateModalOpen}
                        onClose={handleCreateModalClose}
                        onSubmit={handleCreateSubmit}
                        title="Add New User"
                    />

                    {/* Edit Modal */}
                    <ModalUser 
                        isOpen={isEditModalOpen}
                        onClose={handleEditModalClose}
                        onSubmit={handleEditSubmit}
                        data={editingUser}
                        title="Edit User"
                    />
                </div>
            </div>
        </MainLayout>
    );
};

export default Dashboard; 