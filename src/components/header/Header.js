import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Col, Row } from "antd";
import { getCurrentUser } from "../../redux/actions/authAction";

const Header = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    dispatch(getCurrentUser());
  }, [dispatch]);

  return (
    <Row className="flex items-center justify-between mb-5">
      <Col>
        <Row>
          <Col>
            <div className="text-5xl font-medium">Chào {user.userName}</div>
          </Col>
        </Row>

        <Row>
          <Col>
            <p className="text-xl text-[#818181] font-medium">
              Let's make this day productive.
            </p>
          </Col>
        </Row>
      </Col>

      <Col>
        <Button className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
          + Add Task
        </Button>
      </Col>
    </Row>
  );
};

export default Header;
