import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { message, Upload } from "antd";
import { useNavigate } from "react-router-dom";
import { getCurrentUser, updateUserInfo } from "../../redux/actions/authAction";
import UpdateFormInput from "./UpdateFormInput";
import { getBase64, beforeUpload } from "../../utils/UploadImage";
import uploadButton from "./UploadButton";
import getUserFormData from "../../datas/edit-account-info";

const EditAccountInfo = () => {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const [originalEmail, setOriginalEmail] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const data = getUserFormData(user);

  useEffect(() => {
    dispatch(getCurrentUser());
  }, [dispatch]);

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

  return (
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
        <UpdateFormInput data={data} onFinish={handleFinish} />
      </div>
    </div>
  );
};

export default EditAccountInfo;
