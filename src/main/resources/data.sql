-- 确保表存在
CREATE TABLE IF NOT EXISTS department (
    id BIGINT PRIMARY KEY,
    name VARCHAR(255),
    code VARCHAR(255),
    description VARCHAR(255)
);

-- 插入数据
INSERT INTO department (id, name, code, description) VALUES 
(1, '技术部', 'TECH', '负责公司技术研发'),
(2, '市场部', 'MKT', '负责公司市场推广'),
(3, '人事部', 'HR', '负责公司人力资源管理'),
(4, '财务部', 'FIN', '负责公司财务管理'),
(5, '产品部', 'PD', '负责公司产品规划');

-- 重置自增ID序列
ALTER SEQUENCE IF EXISTS department_seq RESTART WITH 6;