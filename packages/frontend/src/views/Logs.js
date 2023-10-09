import React ,{ useEffect, useState} from "react";
import {  Col, Row, Space, Table, Typography } from "antd";


const columns = [
    {
      title: 'Message',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Time',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: 'Level',
      dataIndex: 'address',
      key: 'address',
    },
  ];



const Logs = () => {

   const [data, setfirst] = useState([

  ])

  useEffect(() => {
    
    fetch('http://localhost:3000/logs/logs').then(res=>res.json()).then((res)=>{
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
                name:  element.message,
                 age: new Date(element.timestamp).toLocaleDateString('en-us',options),
                 address: element.level,
            }
            data.push(object)
        });
        setfirst(data)

    })
  }, [])
  

  return (
    <>
      
      <Row gutter={[16, 16]} justify="center " align="middle ">
        <Col span={12}>
        <>
        <Space
          style={{
            marginTop: 50,
            marginBottom: 20,
          }}
        >
          <Typography>List of Logs: </Typography>
        </Space>
        <Table columns={columns} dataSource={data}  />
      </>
        </Col>
      </Row>
    </>
  );
};

export default Logs
