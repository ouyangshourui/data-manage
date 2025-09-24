import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import { Table } from 'antd';

interface Department {
  id: number;
  name: string;
  code: string;
  description: string;
}

function App() {
  const [departments, setDepartments] = useState<Department[]>([]);

  useEffect(() => {
    fetch('http://localhost:8080/api/departments')
      .then(response => {
        console.log('Response status:', response.status);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data: unknown) => {
        const departments = data as Department[];
        console.log('Received data:', departments);
        setDepartments(departments);
        return departments;
      })
      .catch(error => {
        console.error('Error fetching departments:', error);
        return [] as Department[];
      })
      .then(data => setDepartments(data));
  }, []);

  const columns = [
    {
      title: '部门名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '部门代码',
      dataIndex: 'code',
      key: 'code',
    },
    {
      title: '描述',
      dataIndex: 'description',
      key: 'description',
    },
  ];
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <header style={{ padding: '20px 0', background: '#282c34', color: 'white' }}>
        <h1>部门管理系统</h1>
      </header>
      <main style={{ flex: 1, padding: '20px' }}>
        <Table 
          dataSource={departments} 
          columns={columns} 
          rowKey="id"
          style={{ width: '100%' }}
          scroll={{ y: 'calc(100vh - 180px)' }}
        />
      </main>
    </div>
  );
}

export default App;
