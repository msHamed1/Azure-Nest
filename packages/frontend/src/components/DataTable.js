import React, { useState ,useEffect } from 'react';
import { Button, Space, Table } from 'antd';

const data = [
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
    },
    {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
    },
    {
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: 'Sydney No. 1 Lake Park',
    },
    {
      key: '4',
      name: 'Jim Red',
      age: 32,
      address: 'London No. 2 Lake Park',
    },
  ];
const DataTable = () => {
  const [datas, setfirst] = useState([])
  const columns = [
    {
      title: 'imme',
      dataIndex: 'imme',
      key: 'imme',
    },
    {
      title: 'time',
      dataIndex: 'time',
      key: 'time',
    },
    {
      title: 'name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'price',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'tax',
      dataIndex: 'tax',
      key: 'tax',
    },
    {
      title: 'type',
      dataIndex: 'type',
      key: 'type',
    },
  ];

  useEffect(() => {
    
    fetch('http://localhost:3000/mobile/reports').then(res=>res.json()).then((res)=>{
        const data=[];
        const options = {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            timeZoneName: "short",
            timeZone: "Asia/Dubai",
          };
        res.forEach(element => {
            const object ={
                 key: element.id,
                 name:  element.name,
                 time: new Date(element.time).toLocaleDateString('en-us',options),
                 price: element.price,
                 tax: element.tax,
                 type: element.type,
                 price: element.price,
                 imme:element.imme
                 
            }
            data.push(object)
        });
        setfirst(data)

    })
  }, [])
    
    return (
      <>
        <Space
          style={{
            marginBottom: 50,
          }}
        >
          
        </Space>
        <Table columns={columns} dataSource={datas}  />
      </>
    );
  };
export default DataTable;