import React, {useState} from 'react';
import axios from 'axios';
import '../CreatePost/createPost.scss'
import { UploadOutlined } from '@ant-design/icons';
import { CameraIcon , VideoCameraIcon, PencilSquareIcon, ArrowUpTrayIcon ,PaperAirplaneIcon } from "@heroicons/react/24/outline";
import { Tabs, Upload, Alert , Result   } from 'antd';
import { Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import { Spinner } from "react-bootstrap";
import ImgCrop from 'antd-img-crop';
import { SmileOutlined } from '@ant-design/icons';

const updatePost = process.env.REACT_BASE_API_URL + process.env.REACT_APP_EDIT_POST
function CreatePost(profileData) {
    const [activeTab, setActiveTab] = useState('post');
    const [error, setError] = useState('');
    const [postDetails, setPostDetails] = useState();
    const [postTitle, setPostTitle] = useState('');
    const [fileList, setFileList] = useState([]);
    const [loader, setLoader] = useState(false);
    const [sucess, setSucess] = useState(false);
      const onChange = ({ fileList: newFileList }) => {
        setFileList(newFileList);
      };
      const onPreview = async (file) => {
        let src = file.url;
        if (!src) {
          src = await new Promise((resolve) => {
            const reader = new FileReader();
            reader.readAsDataURL(file.originFileObj);
            reader.onload = () => resolve(reader.result);
          });
        }
        const image = new Image();
        image.src = src;
        const imgWindow = window.open(src);
        imgWindow?.document.write(image.outerHTML);
      };






    const onChangeText = (key) => {
        setActiveTab(key);
      };
    const items = [
        {
          key: 'post',
          label: (
            <span> <PencilSquareIcon /> Post Story </span>
          ),
          children: (
            <div className='postUpload-container'>
             
               <Form.Control  id="title" type="text" value={postTitle} className='postTitle' onChange={(e)=> setPostTitle(e.target.value)}  placeholder='Post Title' />
               <Form.Control as="textarea" rows={3} value={postDetails} onChange={(e)=> setPostDetails(e.target.value)} placeholder='Write Your Story' />
                
              
            </div>
          ),
        },
        {
          key: 'photos',
          label: (
            <span> <CameraIcon /> Photos </span>
          ),
          children: `Upload Your Photos`,
        },
        {
          key: 'videos',
          label: (
            <span> <VideoCameraIcon /> Videos </span>
          ),
          children: `Content of Tab Pane 3`,
        },
      ];

    const submitPost = (()=>{
        if(activeTab == 'post') {
            if(postDetails.length > 0 && postTitle.length > 0) {
           
                setLoader(true)
                  var formData = new FormData();
                  formData.append('postType', 'post')
                  formData.append('postData', postDetails);
                  formData.append('postTitle', postTitle);
                  
                  // Iterate over all selected files
                  Array.from(fileList).forEach(file => {
                      formData.append('uploadImages',
                      file.originFileObj);
                     
                  });
                 
                  axios.post(updatePost, formData , {withCredentials: true}
                  ).then(
                      (response) => {
                        if (response.statusText === "OK") {
                          setLoader(false);
                          setSucess(true);
                         setPostDetails('');
                        setPostTitle('');
                          setFileList([]);
                        }
                      }
                    );
              
            } else {
                setError('Please Provide Some Post Details')
            }
        }
        if(activeTab == 'photos') {
            if(fileList.length > 0) {
              setLoader(true)
                var formData = new FormData();
                formData.append('postType', 'photos')
                // Iterate over all selected files
                Array.from(fileList).forEach(file => {
                    formData.append('uploadImages',
                    file.originFileObj);
                   
                });
               
                axios.post(updatePost, formData , {withCredentials: true}
                ).then(
                    (response) => {
                      if (response.statusText === "OK") {
                        setLoader(false);
                        setSucess(true);
                        setPostDetails('');
                        setPostTitle('');
                          setFileList([]);
                      }
                    }
                  );
            } else {
                setError('you are on Photos Tab, Please Add Some Photos to you posts')
            }
        }

    })
 const setOprations = (()=>{
  setSucess(false);
 })
  return (
    <div className='postContainer'>
        <h4>Post About Your Latest Ride</h4>
<div className='postDiv'>
{sucess && <div className='loder_overlay sucessp'>
    <Result
    icon={<SmileOutlined />}
    title="Great, Your post is uploaded"
    extra={<Button onClick={setOprations} type="primary">Close</Button>}
  />
 
  </div>}
{loader && <div className='loder_overlay'>
  <Spinner animation="border" role="status">
      <span className="visually-hidden">Loading...</span>
    </Spinner>
  </div> }

    <Tabs defaultActiveKey="1" items={items} onChange={onChangeText} />
    <div className='btm-contnr'><ImgCrop rotate>
      <Upload
        
        listType="picture-card"
        fileList={fileList}
        onChange={onChange}
        onPreview={onPreview}
      >
      
       {fileList.length < 5 && <CameraIcon /> }
      </Upload>
    </ImgCrop>
   
<Button variant='primary' onClick={submitPost}><PaperAirplaneIcon/></Button></div>
    <div>  {error.length > 0 && <><Alert
      message="Error"
      description= {error}
      type="error"
      showIcon
    /></>}
    
   
    </div>
    </div>
    </div>
  )
}

export default CreatePost