import React, { useContext, useState, useEffect } from "react";
import "../Coverpic/Coverpic.scss";
import { EditOutlined } from "@ant-design/icons";
import Badge from "react-bootstrap/Badge";
import Button from "react-bootstrap/Button";
import ImgCrop from "antd-img-crop";
import { Upload } from "antd";
import { Data } from "../../App";
import { PhotoIcon } from "@heroicons/react/24/solid";
import "antd/dist/antd.less";
import Axios from "axios";
import Container from "react-bootstrap/Container";
const EditProfileApi =
  process.env.REACT_BASE_API_URL + process.env.REACT_APP_EDIT_PROFILE;
function Coverpic({ city, state, country }) {
  const [fileListProfilePic, setFileListProfilePic] = useState([]);
  const [fileListCoverPic, setFileListCoverPic] = useState([]);
  const [images, setImages] = useState([]);

  const { loginState, setLoginState, profileData, setProfileData } =
    useContext(Data);

  const onChangeProfilePic = async ({ fileList: newFileList, file }) => {
    const getSrcFromFile = (file) => {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    };

    const src = file.url || (await getSrcFromFile(file));

    setFileListProfilePic(newFileList);
  };

  const onChangeCoverPic = async ({ fileList: newFileList, file }) => {
    const getSrcFromFile = (file) => {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    };

    const src = file.url || (await getSrcFromFile(file));

    setFileListCoverPic(newFileList);
  };

  useEffect(() => {
    var currentTime = Date.now();
    if (fileListProfilePic.length > 0) {
      var formData = new FormData();

      formData.append("userName", profileData._id);
      let imageNames = [];
      if (fileListProfilePic) {
        fileListProfilePic.forEach((ele, index) => {
          if (ele.originFileObj) {
            formData.append(
              "image",
              ele.originFileObj,
              profileData._id + "." + ele.originFileObj.name.split(".")[1]
            );
            return false;
          }
        });
      }

      Axios.post(EditProfileApi, formData, { withCredentials: true }).then(
        (response) => {
          if (response.statusText === "OK") {
            setProfileData(response.data.data);
          }
        }
      );
    }
  }, [fileListProfilePic]);

  useEffect(() => {
    var currentTime = Date.now();
    if (fileListCoverPic.length > 0) {
      var formData2 = new FormData();

      formData2.append("userName", profileData._id);
      formData2.append("coverPic", true);
      let imageNames = [];
      if (fileListCoverPic) {
        fileListCoverPic.forEach((ele, index) => {
          if (ele.originFileObj) {
            formData2.append(
              "image",
              ele.originFileObj,
              profileData._id + "." + ele.originFileObj.name.split(".")[1]
            );
            return false;
          }
        });
      }

      var coverPic = true;
      Axios.post(EditProfileApi, formData2, { withCredentials: true }).then(
        (response) => {
          if (response.statusText === "OK") {
            setProfileData(response.data.data);
          }
        }
      );
    }
  }, [fileListCoverPic]);

  return (
    <>
      <Container
        className='coverPic shadow-sm p-0'
        style={{
          backgroundImage: `url('${
            process.env.REACT_BASE_API_URL +
            profileData?.coverpic?.destination +
            "/" +
            profileData?.coverpic?.filename
          }')`,
        }}>
        <div className='coverpic-icon'>
          <ImgCrop
            shape='rect'
            aspect={16 / 9}
            rotate
            quality={1}
            grid={true}>
            <Upload fileList={fileListCoverPic} onChange={onChangeCoverPic}>
              <label class='iconEdit'>
                <PhotoIcon class='h-6 w-6 text-blue-500' />
              </label>
            </Upload>
          </ImgCrop>
        </div>
        <div className='coverContent'>
          <div className='userProfile'>
  
            <div className='profile-image'>
            <ImgCrop rotate quality={1} grid={true}>
              <Upload
                fileList={fileListProfilePic}
                onChange={onChangeProfilePic}>
                <label class='iconEdit'>
                  <PhotoIcon class='h-6 w-6 text-blue-500' />
                </label>
              </Upload>
            </ImgCrop>
              {profileData?.profilepic && (
                <img
                  src={
                    process.env.REACT_BASE_API_URL +
                    profileData?.profilepic?.destination +
                    "/" +
                    profileData?.profilepic?.filename
                  }
                />
              )}
            </div>
            <div className='profile-name'>
              <h4>
                {profileData?.name} ({profileData?.username}){" "}
                <p style={{ fontSize: 14 + "px" }}> {city}</p>
              </h4>
              <p></p>
            </div>
          </div>
          <div className='user-info'>
            <div className='mn-btn'>
              <Button variant='primary'>Message</Button>
              <Button variant='outline-light'>Follow Now</Button>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}

export default Coverpic;
