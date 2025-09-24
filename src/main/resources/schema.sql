-- 创建部门表
CREATE TABLE IF NOT EXISTS department (
    id BIGINT PRIMARY KEY,
    name VARCHAR(255),
    code VARCHAR(255),
    description VARCHAR(255)
);