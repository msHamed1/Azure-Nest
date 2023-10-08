import React from "react";
import BlueHeader from "../components/Headers";
import { Col, Row } from "antd";
import DataTable from "../components/DataTable";

const Main = () => {
  return (
    <>
      
      <Row gutter={[16, 16]} justify="center " align="middle ">
        <Col span={12}>
          <DataTable />
        </Col>
      </Row>
    </>
  );
};

export default Main
