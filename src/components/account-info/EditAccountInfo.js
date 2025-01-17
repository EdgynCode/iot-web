import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Row,
  Col,
  Typography,
  Image,
  Form,
  Input,
  Button,
  Modal,
  message,
  Upload,
} from "antd";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import {
  getCurrentUser,
  updateUserInfo,
  sendLinkResetPassword,
} from "../../redux/actions/authAction";
import InforTab from "./InforTab";
import UpdateFormInput from "./UpdateFormInput";
import { PlusOutlined } from "@ant-design/icons";
const getBase64 = (img, callback) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
};
const beforeUpload = (file) => {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    message.error("Vui lòng chọn file với định dạng JPG/PNG!");
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error("Ảnh phải nhỏ hơn 2MB!");
  }
  return isJpgOrPng && isLt2M;
};
const EditAccountInfo = () => {
  let navigate = useNavigate();
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const [originalEmail, setOriginalEmail] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const data = [
    { key: "Họ", value: user.firstName },
    {
      key: "Tên",
      value: user.lastName,
    },
    { key: "Giới tính", value: user.gender },
    {
      key: "Ngày sinh",
      value: user.doB,
    },
    {
      key: "Email",
      value: user.email,
    },
    { key: "Số điện thoại", value: user.phoneNumber },
  ];

  useEffect(() => {
    dispatch(getCurrentUser());
  }, [dispatch]);

  // useEffect(() => {
  //   if (user) {
  //     form.setFieldsValue({
  //       id: user.id,
  //       firstName: user.firstName,
  //       lastName: user.lastName,
  //       // fullName not updating with changes
  //       gender: user.gender,
  //       doB: user.doB
  //         ? new Date(user.doB).toLocaleDateString("en-GB", {
  //             day: "2-digit",
  //             month: "2-digit",
  //             year: "numeric",
  //           })
  //         : null,
  //       email: user.email,
  //       phoneNumber: user.phoneNumber,
  //     });
  //     setOriginalEmail(user.email);
  //   }
  // }, [user, form]);

  const handleFinish = async (values) => {
    const requestBody = { ...values, id: user.id };

    // Include the email only if it has changed
    if (values.email === originalEmail) {
      delete requestBody.email;
    }

    dispatch(updateUserInfo(requestBody))
      .unwrap()
      .then(() => {
        message.success("Cập nhật thông tin thành công!");
        navigate("/account-detail");
      })
      .catch((error) => {
        message.error("Cập nhật thông tin thất bại: " + error);
      });
  };

  const handleResetPassword = () => {
    Modal.confirm({
      title: "Xác nhận đặt lại mật khẩu",
      content:
        "Bạn có chắc chắn muốn đặt lại mật khẩu? Một liên kết sẽ được gửi đến email của bạn.",
      okText: "Xác nhận",
      cancelText: "Hủy",
      onOk: () => {
        if (user && user.email) {
          const clientUri = "http://localhost:3000/reset-password";
          dispatch(sendLinkResetPassword({ email: user.email, clientUri }))
            .unwrap()
            .then(() => {
              message.success(
                "Liên kết đặt lại mật khẩu đã được gửi đến email của bạn."
              );
            })
            .catch((error) => {
              message.error(
                "Đã xảy ra lỗi khi gửi liên kết đặt lại mật khẩu: " +
                  error.message
              );
            });
        } else {
          message.error(
            "Không thể đặt lại mật khẩu vì thông tin email không khả dụng."
          );
        }
      },
    });
  };
  const handleChange = async (info) => {
    if (info.file.status === "done") {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, (url) => {
        setImageUrl(url);
      });
    }
  };

  if (!user) {
    return <div>Loading...</div>;
  }
  const uploadButton = (
    <button
      style={{
        border: 0,
        background: "none",
      }}
      type="button"
    >
      <PlusOutlined />
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </button>
  );
  return (
    // <Row
    //   justify="center"
    //   align="middle"
    //   className="w-full bg-[#EDEDEF] rounded-[50px] p-[46px_7px] overflow-hidden"
    // >
    //   <Col span={24}>
    //     <Title level={4} className="text-center">
    //       Chỉnh sửa thông tin tài khoản
    //     </Title>
    //   </Col>
    //   <Col span={6}>
    //     <Image
    //       src="/public/images/default.png"
    //       alt="Profile Picture"
    //       className="rounded-[50%]"
    //     />
    //   </Col>
    //   <Col span={18}>
    //     <Form
    //       form={form}
    //       layout="vertical"
    //       onFinish={handleFinish}
    //       initialValues={user}
    //       className="w-full"
    //     >
    //       <Row gutter={[16, 16]}>
    //         <Col span={9}>
    //           <Form.Item
    //             label="Họ"
    //             name="firstName"
    //             rules={[
    //               { required: true, message: "Please enter your first name" },
    //             ]}
    //           >
    //             <Input />
    //           </Form.Item>
    //           <Form.Item
    //             label="Tên"
    //             name="lastName"
    //             rules={[
    //               { required: true, message: "Please enter your last name" },
    //             ]}
    //           >
    //             <Input />
    //           </Form.Item>
    //           <Form.Item
    //             label="Giới tính"
    //             name="gender"
    //             rules={[
    //               { required: true, message: "Please specify your gender" },
    //             ]}
    //           >
    //             <Input />
    //           </Form.Item>
    //         </Col>
    //         <Col span={9}>
    //           <Form.Item
    //             label="Ngày sinh (dd/mm/yyyy)"
    //             name="doB"
    //             rules={[
    //               {
    //                 required: true,
    //                 message: "Please enter your date of birth",
    //               },
    //               {
    //                 validator: (_, value) => {
    //                   if (
    //                     value &&
    //                     !dayjs(value, "DD/MM/YYYY", true).isValid()
    //                   ) {
    //                     return Promise.reject(
    //                       "Invalid date format, use DD/MM/YYYY"
    //                     );
    //                   }
    //                   return Promise.resolve();
    //                 },
    //               },
    //             ]}
    //           >
    //             <Input placeholder="DD/MM/YYYY" />
    //           </Form.Item>
    //           <Form.Item
    //             label="Email"
    //             name="email"
    //             rules={[
    //               {
    //                 required: true,
    //                 type: "email",
    //                 message: "Please enter a valid email",
    //               },
    //             ]}
    //           >
    //             <Input />
    //           </Form.Item>
    //           <Form.Item
    //             label="Số điện thoại"
    //             name="phoneNumber"
    //             rules={[
    //               {
    //                 required: true,
    //                 message: "Please enter your phone number",
    //               },
    //             ]}
    //           >
    //             <Input />
    //           </Form.Item>
    //         </Col>
    //       </Row>
    //       <Col span={18} className="items-center text-center mt-6">
    //         <Button
    //           type="primary"
    //           htmlType="submit"
    //           className="mr-4 bg-blue-500 text-white"
    //         >
    //           Lưu
    //         </Button>
    //         <Button
    //           className="bg-blue-500 text-white"
    //           onClick={handleResetPassword}
    //         >
    //           Đặt lại mật khẩu
    //         </Button>
    //       </Col>
    //     </Form>
    //   </Col>
    // </Row>

    <div className="flex w-full items-start gap-6 pt-6">
      {/* Avatar */}
      <div className="flex flex-col gap-4 w-5/12 ">
        <div className="tab flex flex-col  justify-center items-center p-4 pb-6">
          <div className="m-2 max-w-[130px] max-h-[130px]">
            <Upload
              name="avatar"
              listType="picture-circle"
              className="avatar-uploader"
              showUploadList={false}
              action="https://api.allorigins.win/raw?url=https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
              beforeUpload={beforeUpload}
              onChange={handleChange}
            >
              {imageUrl ? (
                <img
                  src={imageUrl}
                  alt="avatar"
                  className="rounded-full w-[130px] h-[100px] object-cover hover:hidden"
                />
              ) : (
                uploadButton
              )}
            </Upload>
          </div>
          <p>{user.userName}</p>
        </div>
      </div>
      {/* Form */}
      <div className="flex flex-col gap-2 w-full">
        <UpdateFormInput
          title="Chỉnh sửa thông tin"
          data={data}
          onFinish={handleFinish}
        />
        <div className="flex justify-between w-full">
          <button className="buttonCustom w-1/2" onClick={handleFinish}>
            Lưu
          </button>
          <button
            className="buttonCustom w-1/2 !m-0"
            onClick={handleResetPassword}
          >
            Đổi mật khẩu
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditAccountInfo;
