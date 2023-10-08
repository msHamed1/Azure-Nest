import React from 'react';
import { Layout } from 'antd';
import { Button, Space } from 'antd';
import { Col, Row } from "antd";

const { Header } = Layout;

const BlueHeader = ({showLogs ,showMobiles}) => {
  return (
    <Header style={{ background: 'blue', color: 'white', textAlign: 'center', fontSize: '24px' }}>
      <Row justify={"space-between"}>
        <Col span={2}>   <Button type="primary" onClick={()=>showMobiles(true)} > Mobiles</Button> </Col>
        <Col span={2}> 
         <Button type="primary" onClick={()=>showLogs(false)} >
         Logs
        </Button></Col>
      </Row>
    
    
    </Header>
  );
};

export default BlueHeader;