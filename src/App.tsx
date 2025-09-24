import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Input, Space, message } from 'antd';
import type { ColumnsType } from 'antd/es/table';

interface Department {
  id: number;
  name: string;
  code: string;
  description: string;
}

const App: React.FC = () => {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentDepartment, setCurrentDepartment] = useState<Department | null>(null);
  const [form] = Form.useForm();

  const fetchDepartments = () => {
    fetch('/api/departments')
      .then(res => res.json())
      .then(data => setDepartments(data))
      .catch(error => {
        console.error('获取部门数据失败:', error);
        message.error('获取部门数据失败');
      });
  };

  useEffect(() => {
    fetchDepartments();
  }, []);

  const columns: ColumnsType<Department> = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
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
    {
      title: '操作',
      key: 'action',
      render: (_, record) => (
        <Button type="link" onClick={() => handleEdit(record)}>
          编辑
        </Button>
      ),
    },
  ];

  const handleEdit = (department: Department) => {
    setCurrentDepartment(department);
    setIsEditMode(true);
    form.setFieldsValue({
      name: department.name,
      code: department.code,
      description: department.description
    });
    setIsModalOpen(true);
  };

  const resetModal = () => {
    setIsModalOpen(false);
    setIsEditMode(false);
    setCurrentDepartment(null);
    form.resetFields();
  };

  const handleOk = () => {
    form.validateFields().then(values => {
      if (isEditMode && currentDepartment) {
        // 更新部门
        fetch(`/api/departments/${currentDepartment.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(values),
        })
          .then(res => {
            if (!res.ok) {
              throw new Error('更新部门失败');
            }
            return res.json();
          })
          .then(data => {
            setDepartments(departments.map(dept => 
              dept.id === currentDepartment.id ? data : dept
            ));
            message.success('部门信息更新成功');
            resetModal();
          })
          .catch(error => {
            console.error('更新部门失败:', error);
            message.error('更新部门失败');
          });
      } else {
        // 创建新部门
        fetch('/api/departments', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(values),
        })
          .then(res => {
            if (!res.ok) {
              throw new Error('创建部门失败');
            }
            return res.json();
          })
          .then(data => {
            setDepartments([...departments, data]);
            message.success('部门创建成功');
            resetModal();
          })
          .catch(error => {
            console.error('创建部门失败:', error);
            message.error('创建部门失败');
          });
      }
    });
  };

  return (
    <div style={{ padding: 24 }}>
      <Button 
        type="primary" 
        onClick={() => {
          setIsEditMode(false);
          setIsModalOpen(true);
        }}
        style={{ marginBottom: 16 }}
      >
        新增部门
      </Button>
      
      <Table 
        columns={columns} 
        dataSource={departments} 
        rowKey="id" 
      />

      <Modal 
        title={isEditMode ? "编辑部门" : "新增部门"} 
        open={isModalOpen} 
        onOk={handleOk}
        onCancel={resetModal}
        okText={isEditMode ? "保存" : "创建"}
        cancelText="取消"
      >
        <Form form={form} layout="vertical">
          <Form.Item name="name" label="部门名称" rules={[{ required: true, message: '请输入部门名称' }]}>
            <Input placeholder="请输入部门名称" />
          </Form.Item>
          <Form.Item name="code" label="部门代码" rules={[{ required: true, message: '请输入部门代码' }]}>
            <Input placeholder="请输入部门代码" />
          </Form.Item>
          <Form.Item name="description" label="描述">
            <Input.TextArea placeholder="请输入部门描述" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default App;