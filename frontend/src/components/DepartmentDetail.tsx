import React, { useState, useEffect } from 'react';
import { Card, Select, Typography, Spin, Empty, Descriptions } from 'antd';

const { Option } = Select;
const { Title } = Typography;

interface Department {
  id: number;
  name: string;
  code: string;
  description: string;
}

const DepartmentDetail: React.FC = () => {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [selectedDepartment, setSelectedDepartment] = useState<Department | null>(null);
  const [loading, setLoading] = useState(false);

  // 获取所有部门名称用于下拉选择
  useEffect(() => {
    setLoading(true);
    fetch('http://localhost:8080/api/departments')
      .then(response => response.json())
      .then((data: Department[]) => {
        setDepartments(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching departments:', error);
        setLoading(false);
      });
  }, []);

  // 根据选择的部门名称获取详细信息
  const handleDepartmentChange = (departmentName: string) => {
    setLoading(true);
    fetch(`http://localhost:8080/api/departments/byName?name=${encodeURIComponent(departmentName)}`)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data: Department) => {
        setSelectedDepartment(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching department details:', error);
        setSelectedDepartment(null);
        setLoading(false);
      });
  };

  return (
    <Card title={<Title level={4}>部门明细查询</Title>} style={{ width: '100%' }}>
      <Select
        placeholder="请选择部门"
        style={{ width: 200, marginBottom: 20 }}
        onChange={handleDepartmentChange}
        loading={loading}
      >
        {departments.map(dept => (
          <Option key={dept.id} value={dept.name}>{dept.name}</Option>
        ))}
      </Select>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '20px 0' }}>
          <Spin />
        </div>
      ) : selectedDepartment ? (
        <Descriptions bordered>
          <Descriptions.Item label="部门ID" span={3}>{selectedDepartment.id}</Descriptions.Item>
          <Descriptions.Item label="部门名称" span={3}>{selectedDepartment.name}</Descriptions.Item>
          <Descriptions.Item label="部门代码" span={3}>{selectedDepartment.code}</Descriptions.Item>
          <Descriptions.Item label="部门描述" span={3}>{selectedDepartment.description}</Descriptions.Item>
        </Descriptions>
      ) : (
        <Empty description="请选择一个部门查看详细信息" />
      )}
    </Card>
  );
};

export default DepartmentDetail;