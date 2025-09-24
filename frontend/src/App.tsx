import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Typography, Button, Space, Statistic } from 'antd';

const { Title, Text } = Typography;

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

const App: React.FC = () => {
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
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <header style={{ padding: '20px 0', background: '#282c34', color: 'white' }}>
        <Title level={2} style={{ color: 'white', textAlign: 'center' }}>部门信息展示</Title>
      </header>
      <main style={{ flex: 1, padding: '20px' }}>
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
      </main>
    </div>
  );
};

export default App;