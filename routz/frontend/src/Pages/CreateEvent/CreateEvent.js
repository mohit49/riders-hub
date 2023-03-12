import React, { useState, useContext, useEffect, Suspense } from "react";

import "../CreateEvent/CreateEvent.scss";

import Button from "react-bootstrap/Button";
import ImgCrop from "antd-img-crop";
import { Input, Upload } from "antd";

import { CKEditor } from "@ckeditor/ckeditor5-react";

import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { Spinner } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { DatePicker } from "antd";
import { Data } from "../../App";
import axios from "axios";
import Banner3 from "../../assets/images/headingbanner.jpg";
import dayjs from "dayjs";

const ResultGrid = React.lazy(() =>
  import("../../Component/ResultGrid/ResultGrid")
);
const CountryStateCity = React.lazy(() =>
  import("../../Middleware/CountryStateCity/CountryStateCity")
);
const createEventAPI =
  process.env.REACT_BASE_API_URL + process.env.REACT_APP_EVENT_API;
const imageUpload =
  process.env.REACT_BASE_API_URL + process.env.REACT_APP_IMAGE_UPLOAD;

function CreateEvent() {
  const [eventTitle, setEventTitle] = useState();
  const [state, setState] = useState();
  const [city, setCity] = useState();
  const [refetchcity, SetRefetchcity] = useState(false);
  const [eventSubheading, setEventSubheading] = useState();
  const [eventDuration, setEventDuration] = useState({});
  const [loading, setLoading] = useState(false);
  const [eventDiscription, setEventDiscription] = useState(true);
  const [eventStatus, setEventStatus] = useState(false);
  const [eventLink, setEventLink] = useState();
  const { loginState, setLoginState, profileData, setProfileData } =
    useContext(Data);
  const { RangePicker } = DatePicker;

  const [eventCoverPic, setEventCoverPic] = useState([]);

  // image uoload method

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

  const onChangeEventPic = async ({ fileList: newFileList, file }) => {
    const getSrcFromFile = (file) => {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    };

    const src = file.url || (await getSrcFromFile(file));

    setEventCoverPic(newFileList);
  };

  const onRangeChange = (dates, dateStrings) => {
    if (dates) {
      setEventDuration({ From: dateStrings[0], to: dateStrings[1] });
    } else {
      console.log("Clear");
    }
  };

  const rangePresets = [
    {
      label: "Last 7 Days",
      value: [dayjs().add(-7, "d"), dayjs()],
    },
    {
      label: "Last 14 Days",
      value: [dayjs().add(-14, "d"), dayjs()],
    },
    {
      label: "Last 30 Days",
      value: [dayjs().add(-30, "d"), dayjs()],
    },
    {
      label: "Last 90 Days",
      value: [dayjs().add(-90, "d"), dayjs()],
    },
  ];

  const submitForm = async (e) => {
    e.preventDefault();
    setLoading(!loading);

    if (eventCoverPic.length > 0) {
      const reqData = {
        title: eventTitle,
        eventduration: eventDuration,
        eventDiscription: eventDiscription,
        eventSubheading: eventSubheading,
      };
      var formData = new FormData();
      formData.append("userName", profileData._id);
      formData.append("eventCoverPic", true);
      formData.append("title", reqData.title);
      formData.append("eventduration", JSON.stringify(eventDuration));
      formData.append("eventsubheading", eventSubheading);
      formData.append("eventDiscription", reqData.eventDiscription);
      formData.append("state", JSON.stringify(state));
      formData.append("city", JSON.stringify(city));
      let imageNames = [];
      if (eventCoverPic) {
        eventCoverPic.forEach((ele, index) => {
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
    }

    axios
      .post(
        createEventAPI,
        eventCoverPic.length
          ? formData
          : {
              title: eventTitle,
              eventduration: eventDuration,
              eventDiscription: eventDiscription,
              state: JSON.stringify(state),
              city: JSON.stringify(city),
            },
        { withCredentials: true }
      )
      .then(function (response) {
        if (!response.data.sucessStatus) {
        } else {
          setEventLink(`event/${response.data.data._id}`);
          setLoading(false);
          setEventStatus(true);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const onchangeState = (value) => {
    SetRefetchcity(true);
    setState(value);
  };
  const onchangeCity = (value) => {
    setCity(value);
  };

  return (
    <>
      <div className='create-event-page'>
        <div className='mainBanner' style={{ background: `url(${Banner3})` }}>
          <div className='innerContent'>
            <h2>Create Events</h2>
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy
            </p>
          </div>
        </div>
        <div className='creator-info'>
          <p>
            Event Creator <b>{profileData?.name}</b> from{" "}
            <b>{profileData?.companyinfo}</b>
          </p>
        </div>

        {loading && !eventStatus && (
          <div className='event-form'>
            <div className='mn-continer'>
              <Spinner
                as='span'
                animation='grow'
                size='xs'
                role='status'
                aria-hidden='true'
              />
            </div>
          </div>
        )}
        {!loading && !eventStatus && (
          <div className='event-form'>
            <div className='mn-continer'>
              <br />

              <Form
                labelcol={{ span: 4 }}
                wrappercol={{ span: 14 }}
                layout='horizontal'
                onSubmit={submitForm}>
                <Form.Group className='mb-3' controlId='formBasicEmail'>
                  <Form.Label>Enter Event Name : </Form.Label>
                  <Input
                    value={eventTitle}
                    onChange={(e) => setEventTitle(e.target.value)}
                    placeholder='Enter Title Of the Event'
                  />
                </Form.Group>
                <Form.Group className='mb-3' controlId='formBasicEmail'>
                  <Form.Label>Enter Sub Heading : </Form.Label>
                  <Input
                    value={eventSubheading}
                    onChange={(e) => setEventSubheading(e.target.value)}
                    placeholder='Enter Event Sub Heading'
                  />
                </Form.Group>
                <Form.Group className='mb-3' controlId='evenbtDuration'>
                  <Form.Label>Enter Event Duration : </Form.Label>
                  <RangePicker
                    presets={rangePresets}
                    onChange={onRangeChange}
                  />
                </Form.Group>
                <Form.Group className='mb-3' controlId='evenbtDuration'>
                  <Form.Label>Enter State : </Form.Label>
                 
                    <CountryStateCity
                      type='state'
                      query='IN'
                      setValues={onchangeState}
                    />
                 
                </Form.Group>
                {refetchcity && (
                  <Form.Group className='mb-3' controlId='evenbtDuration'>
                    <Form.Label>Enter City : </Form.Label>
                   
                      <CountryStateCity
                        type='city'
                        query='IN'
                        query2={state?.isoCode}
                        setValues={onchangeCity}
                      />
                  
                  </Form.Group>
                )}

                <Form.Group className='mb-3' controlId='evenbtDiscription'>
                  <Form.Label>Enter Event Description</Form.Label>
                  <CKEditor
                    editor={ClassicEditor}
                    data='<p>Add event discription here</p>'
                    config={{
                      ckfinder: {
                        // Upload the images to the server using the CKFinder QuickUpload command
                        // You have to change this address to your server that has the ckfinder php connector
                        uploadUrl: `${imageUpload}?command=QuickUpload&type=Images&responseType=json`,
                      },
                      headers: {
                        "X-CSRF-TOKEN": "CSRF-Token",
                        Authorization: "Bearer <JSON Web Token>",
                      },
                    }}
                    onReady={(editor) => {
                      // You can store the "editor" and use when it is needed.
                      console.log("Editor is ready to use!", editor);
                    }}
                    onChange={(event, editor) => {
                      const data = editor.getData();
                      setEventDiscription(data);
                    }}
                    onBlur={(event, editor) => {
                      console.log("Blur.", editor);
                    }}
                    onFocus={(event, editor) => {
                      console.log("Focus.", editor);
                    }}
                  />
                </Form.Group>
                <Form.Group className='mb-3' controlId='evenbtCoverPic'>
                  <Form.Label>Upload Event Cover Picture</Form.Label>
                  <ImgCrop
                    shape='rect'
                    aspect={21 / 8}
                    rotate
                    quality={1}
                    grid={true}>
                    <Upload
                      name='avatar'
                      listType='picture-card'
                      fileList={eventCoverPic}
                      onChange={onChangeEventPic}
                      showUploadList={true}
                      action='https://www.mocky.io/v2/5cc8019d300000980a055e76'
                      onPreview={onPreview}>
                      {eventCoverPic.length < 5 && "+ Upload"}
                    </Upload>
                  </ImgCrop>
                </Form.Group>
                <Form.Group className='mb-3' controlId='evenbtThumbnails'>
                  <Button variant='primary' type='submit' size='md'>
                    Create Event
                  </Button>
                </Form.Group>
              </Form>
            </div>
          </div>
        )}

        {!loading && eventStatus && (
          <div className='mn-continer'>
            <ResultGrid
              status='success'
              href1={eventLink}
              title={`Your Event ${eventTitle} is Sucessfully Created`}
              subTitle={`Click On Blow Link to visit you event`}
            />
          </div>
        )}
      </div>
    </>
  );
}

export default CreateEvent;
