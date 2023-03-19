import React, { useContext } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { Data } from "../../App";
function ProfileData() {
  const { loginState, setLoginState, profileData, setProfileData } =
    useContext(Data);
  return (
    <Tabs
      defaultActiveKey="photos"
      id="uncontrolled-tab-example"
      className="mb-3"
    >
      <Tab eventKey="photos" title="Photos (50)">
        <Card
          className="shadow-sm p-3 mb-5 bg-white rounded"
          border="light"
          style={{ width: "100%" }}
        >
          <Card.Body>
            <Card.Title>About</Card.Title>
            <Card.Text
              dangerouslySetInnerHTML={{ __html: profileData.about }}
            ></Card.Text>
            <Card.Text>
              <p>
                <strong>Bike Info :</strong> {profileData.bikeinfo}
              </p>
              <p>
                <strong>Distance Covered :</strong> {profileData.kms}
              </p>
              <p>
                <strong>Location :</strong> {profileData.ridingsince}
              </p>
              <p>
                <strong>Company :</strong> {profileData.companyinfo}
              </p>
            </Card.Text>
            <Button variant="primary">Edit Info</Button>
          </Card.Body>
        </Card>
      </Tab>
      <Tab eventKey="posts" title="Posts (50)">
        <Card
          className="shadow-sm p-3 mb-5 bg-white rounded"
          border="light"
          style={{ width: "100%" }}
        >
          <Card.Body>
            <Card.Title>About</Card.Title>
            <Card.Text
              dangerouslySetInnerHTML={{ __html: profileData.about }}
            ></Card.Text>
            <Card.Text>
              <p>
                <strong>Bike Info :</strong> {profileData.bikeinfo}
              </p>
              <p>
                <strong>Distance Covered :</strong> {profileData.kms}
              </p>
              <p>
                <strong>Location :</strong> {profileData.ridingsince}
              </p>
              <p>
                <strong>Company :</strong> {profileData.companyinfo}
              </p>
            </Card.Text>
            <Button variant="primary">Edit Info</Button>
          </Card.Body>
        </Card>
      </Tab>
      <Tab eventKey="videos" title="videos (50)">
        <Card
          className="shadow-sm p-3 mb-5 bg-white rounded"
          border="light"
          style={{ width: "100%" }}
        >
          <Card.Body>
            <Card.Title>About</Card.Title>
            <Card.Text
              dangerouslySetInnerHTML={{ __html: profileData.about }}
            ></Card.Text>
            <Card.Text>
              <p>
                <strong>Bike Info :</strong> {profileData.bikeinfo}
              </p>
              <p>
                <strong>Distance Covered :</strong> {profileData.kms}
              </p>
              <p>
                <strong>Location :</strong> {profileData.ridingsince}
              </p>
              <p>
                <strong>Company :</strong> {profileData.companyinfo}
              </p>
            </Card.Text>
            <Button variant="primary">Edit Info</Button>
          </Card.Body>
        </Card>
      </Tab>
    </Tabs>
  );
}

export default ProfileData;
