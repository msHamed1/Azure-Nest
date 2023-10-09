import React from 'react';
import { Layout } from 'antd';
import { Button } from 'antd';
import { Col, Row } from "antd";

const { Header } = Layout;

const BlueHeader = ({nav,showLogs ,showMobiles}) => {
  return (
    <Header style={{ background: 'blue', color: 'white', textAlign: 'center', fontSize: '24px' }}>
      <Row justify={"end"}>
        <Col span={2}>   <Button type={nav ? "primary":"default"} onClick={()=>showMobiles(true)} > Mobiles </Button> </Col>
        <Col span={2}> 
         <Button type={nav ? "default":"primary"} onClick={()=>showLogs(false)} >
         Log list
        </Button></Col>
      </Row>
    
    
    </Header>
  );
};

export default BlueHeader;