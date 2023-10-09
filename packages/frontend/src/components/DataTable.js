import React, { useState ,useEffect } from 'react';
import {  Space, Table, Typography } from 'antd';


const DataTable = () => {
  const [datas, setfirst] = useState([])
  const columns = [
    {
      title: 'imme',
      dataIndex: 'imme',
      key: 'imme',
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
    {
      title: 'time',
      dataIndex: 'time',
      key: 'time',
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
            marginTop: 50,
            marginBottom: 20,
          }}
        >
          <Typography>List of Products we've imported: </Typography>
        </Space>
        <Table columns={columns} dataSource={datas}  />
      </>
    );
  };
export default DataTable;