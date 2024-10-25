import React from 'react';
import { Button, Col, Dropdown, Row, Input, Menu } from 'antd';
import { DownOutlined, SearchOutlined } from '@ant-design/icons';

const menu = () => {
    <Menu>
        <Menu.Item key="1">Chọn khối</Menu.Item>
        <Menu.Item key="2">Chọn lớp</Menu.Item>
    </Menu>
}

const StudentSelect = () => {
    return (
        <div className="w-[1230px] p-[20px_0] mt-6 bg-[#EDEDEF] rounded-2xl overflow-hidden">
            <Row justify="space-between" align="middle" className="p-[0_24px] bg-[#EDEDEF]">
                <Col>
                    <Dropdown overlay={menu} trigger={["click"]}>
                        <Button type='text'>Tài khoản học sinh <DownOutlined/></Button>
                    </Dropdown>
                </Col>
                <Col>
                    <Button.Group>
                        <Button>New</Button>
                        <Button>Import</Button>
                    </Button.Group>
                </Col>
            </Row>
            <Row align="middle" className='p-[10px_24px]'>
                <Col>
                    <Dropdown overlay={menu} trigger={["click"]}>
                        <Button type='text' icon={<DownOutlined/>}>Chọn khối</Button>
                    </Dropdown>
                </Col>
                <Col>
                    <Dropdown overlay={menu} trigger={["click"]}>
                        <Button type='text' icon={<DownOutlined/>}>Chọn lớp</Button>
                    </Dropdown>
                </Col>
                <Col>
                    <Input placeholder='Tìm kiếm' prefix={<SearchOutlined/>}/>
                </Col>
            </Row>
        </div>
    );
}

export default StudentSelect;