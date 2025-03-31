import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import { Layout, Menu } from 'antd'
import { HomeOutlined, UserOutlined, SettingOutlined } from '@ant-design/icons'
import Home from './pages/Home'
import About from './pages/About'
import './App.css'
import Users from './pages/Users'

const { Header, Content, Footer } = Layout

function App() {
  return (
    <Router>
      <Layout className="layout">
        <Header>
          <div className="logo" />
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={['1']}
            items={[
              {
                key: '1',
                icon: <HomeOutlined />,
                label: <Link to="/">Home</Link>,
              },
              {
                key: '2',
                icon: <UserOutlined />,
                label: <Link to="/users">Users</Link>,
              },
              {
                key: '3',
                icon: <SettingOutlined />,
                label: <Link to="/about">About</Link>,
              },
            ]}
          />
        </Header>
        <Content style={{ padding: '50px' }}>
          <div className="site-layout-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/users" element={<Users />} />
            </Routes>
          </div>
        </Content>
      </Layout>
    </Router>
  )
}

export default App
