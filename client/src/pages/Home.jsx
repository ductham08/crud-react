import React from 'react'
import { Card, Row, Col, Button } from 'antd'
import { UserOutlined, SettingOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'

function Home() {
  return (
    <div>
      <h1 style={{ marginBottom: '2rem' }}>Welcome to CRUD Application</h1>
      
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <Card
            title="User Management"
            extra={<Link to="/users"><Button type="primary" icon={<UserOutlined />}>Go to Users</Button></Link>}
          >
            <p>Manage your users with our CRUD operations. Add, edit, and delete users easily.</p>
          </Card>
        </Col>
        
        <Col span={12}>
          <Card
            title="About"
            extra={<Link to="/about"><Button type="primary" icon={<SettingOutlined />}>Learn More</Button></Link>}
          >
            <p>Learn more about our application and the technologies we use.</p>
          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default Home 