import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Card, Row, Col, Typography, Button, Space, Statistic, Layout, Menu } from 'antd';
import DepartmentDetail from './components/DepartmentDetail';

const { Title, Text } = Typography;
const { Header, Content, Footer } = Layout;

interface Department {
  id: number;
  name: string;
  code: string;
  description: string;
}

interface Stats {
  count: number;
  lastUpdated: string;
}

// 部门列表组件
const DepartmentList: React.FC = () => {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchDepartments = () => {
    setLoading(true);
    fetch('http://localhost:8080/api/departments')
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data: Department[]) => {
        setDepartments(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching departments:', error);
        setDepartments([]);
        setLoading(false);
      });
  };

  const fetchStats = () => {
    setLoading(true);
    fetch('http://localhost:8080/api/departments/stats')
      .then(response => response.json())
      .then(data => {
        setStats(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  useEffect(() => {
    fetchDepartments();
  }, []);

  return (
    <Space direction="vertical" size="large" style={{ width: '100%' }}>
      <Space>
        <Button 
          type="primary" 
          onClick={fetchDepartments}
          loading={loading}
        >
          刷新部门数据
        </Button>
        <Button 
          onClick={fetchStats}
          loading={loading}
        >
          获取数据统计
        </Button>
      </Space>

      {stats && (
        <Card>
          <Space size="large">
            <Statistic title="部门总数" value={stats.count} />
            <Statistic title="最后更新时间" value={stats.lastUpdated} />
          </Space>
        </Card>
      )}

      <Row gutter={[16, 16]}>
        {departments.map(dept => (
          <Col key={dept.id} xs={24} sm={12} md={8} lg={6}>
            <Card 
              title={dept.name}
              bordered={false}
              style={{ height: '100%' }}
            >
              <Text strong>部门代码: </Text>
              <Text>{dept.code}</Text>
              <br />
              <Text strong>描述: </Text>
              <Text>{dept.description}</Text>
            </Card>
          </Col>
        ))}
      </Row>
    </Space>
  );
};

// 主应用组件
const App: React.FC = () => {
  return (
    <Router>
      <Layout style={{ minHeight: '100vh' }}>
        <Header style={{ background: '#282c34', padding: '0 20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Title level={3} style={{ color: 'white', margin: '0' }}>部门管理系统</Title>
            <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']} style={{ background: 'transparent' }}>
              <Menu.Item key="1">
                <Link to="/">部门列表</Link>
              </Menu.Item>
              <Menu.Item key="2">
                <Link to="/detail">部门明细查询</Link>
              </Menu.Item>
            </Menu>
          </div>
        </Header>
        <Content style={{ padding: '20px' }}>
          <Routes>
            <Route path="/" element={<DepartmentList />} />
            <Route path="/detail" element={<DepartmentDetail />} />
          </Routes>
        </Content>
        <Footer style={{ textAlign: 'center' }}>部门管理系统 ©2025</Footer>
      </Layout>
    </Router>
  );
};

export default App;