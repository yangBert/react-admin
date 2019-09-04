import React from 'react';
import { Table } from 'antd';

import Oper from './components/Oper';
import Add from './components/Add';

const columns = [
  { title: 'Name', dataIndex: 'name', key: 'name' },
  { title: 'Age', dataIndex: 'age', key: 'age' },
  { title: '地址', dataIndex: 'address', key: 'address' },
  { title: '手机号', dataIndex: 'phone', key: 'phone' },
  { title: '居民身份证号', dataIndex: 'idcard', key: 'idcard' },
  {
    title: '操作',
    dataIndex: '',
    key: 'x',
    render: () => <Oper />,
  },
];
const data = [
  {
    key: 1,
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    phone: '15286006751',
    idcard: '52262819890829503X',
    description: 'My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.',
  },
  {
    key: 2,
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    phone: '15286006751',
    idcard: '52262819890829503X',
    description: 'My name is Jim Green, I am 42 years old, living in London No. 1 Lake Park.',
  },
  {
    key: 3,
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    phone: '15286006751',
    idcard: '52262819890829503X',
    description: 'My name is Joe Black, I am 32 years old, living in Sidney No. 1 Lake Park.',
  },
  {
    key: 4,
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    phone: '15286006751',
    idcard: '52262819890829503X',
    description: 'My name is Joe Black, I am 32 years old, living in Sidney No. 1 Lake Park.',
  },
  {
    key: 5,
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    phone: '15286006751',
    idcard: '52262819890829503X',
    description: 'My name is Joe Black, I am 32 years old, living in Sidney No. 1 Lake Park.',
  },
  {
    key: 6,
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    phone: '15286006751',
    idcard: '52262819890829503X',
    description: 'My name is Joe Black, I am 32 years old, living in Sidney No. 1 Lake Park.',
  },
  {
    key:7,
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    phone: '15286006751',
    idcard: '52262819890829503X',
    description: 'My name is Joe Black, I am 32 years old, living in Sidney No. 1 Lake Park.',
  },
  {
    key: 8,
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    phone: '15286006751',
    idcard: '52262819890829503X',
    description: 'My name is Joe Black, I am 32 years old, living in Sidney No. 1 Lake Park.',
  },
  {
    key: 9,
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    phone: '15286006751',
    idcard: '52262819890829503X',
    description: 'My name is Joe Black, I am 32 years old, living in Sidney No. 1 Lake Park.',
  },
  {
    key: 10,
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    phone: '15286006751',
    idcard: '52262819890829503X',
    description: 'My name is Joe Black, I am 32 years old, living in Sidney No. 1 Lake Park.',
  },
  {
    key: 11,
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    phone: '15286006751',
    idcard: '52262819890829503X',
    description: 'My name is Joe Black, I am 32 years old, living in Sidney No. 1 Lake Park.',
  },
];
function UserList() {
  return (
    <div>
      <Add></Add>
      <Table
        columns={columns}
        dataSource={data} size="small"
        expandedRowRender={record => <p style={{ margin: 0 }}>{record.description}</p>}
      />
    </div>
  )
}
export default UserList;