// Bootstrap imports
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

// React imports
import { useState, useEffect } from "react";

export default function PersonalInfo({
  provinces,
  displayProfile,
  userInfo,
  u,
}) {
  let provinceIndex, amphoeIndex;

  // Get province index
  if (userInfo.province) {
    provinceIndex = provinces
      .map((province) => province.name)
      .indexOf(userInfo.province);
  }

  // Get district index
  if (userInfo.district) {
    amphoeIndex = provinces[provinceIndex].amphoe
      .map((amphoe) => amphoe.name)
      .indexOf(userInfo.district);
  }

  // Set initial indexs
  const [selectedProvince, setSelectedProvince] = useState(
    userInfo.province ? provinceIndex : 0
  );
  const [selectedAmphoe, setSelectedAmphoe] = useState(
    userInfo.district ? amphoeIndex : 0
  );
  const [postalCode, setPostalCode] = useState(
    userInfo.postalCode ? userInfo.postalCode : ""
  );

  // Initial inputs
  // console.log(userInfo);
  useEffect(() => {
    u.userFirstName.current.value = userInfo.name.split(" ")[0];
    u.userLastName.current.value = userInfo.name.split(" ")[1];
    u.userPhone.current.value = userInfo?.phone;
    u.userAddress.current.value = userInfo?.address;
    u.userProvince.current.value = userInfo?.province;
    u.userDistrict.current.value = userInfo?.district;
    u.userSubDistrict.current.value = userInfo?.subDistrict;
    u.userSocial.current.value = userInfo?.socialLink;
  }, []);

  return (
    <section
      className="profilePersonal"
      style={displayProfile ? { display: "unset" } : { display: "none" }}
    >
      <h5>Personal</h5>
      <p id="subtitle">General user informations</p>
      <Form className="profileInfoForm">
        {/* First and last name */}
        <div className="profileName">
          <Form.Group className="">
            <Form.Label>First Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="First Name"
              id="userFirstName"
              ref={u.userFirstName}
            />
            <Form.Text className="text-muted">
              Please use your real name.
            </Form.Text>
          </Form.Group>
          <Form.Group className="">
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Last Name"
              id="userLastName"
              ref={u.userLastName}
            />
          </Form.Group>
        </div>

        {/* Email, phone */}
        <div className="customDivider">
          <span className="dividerText">Contact</span>
        </div>

        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm="2">
            Email
          </Form.Label>
          <Col sm="10">
            <Form.Control
              type="email"
              placeholder="Email"
              id="userEmail"
              value={userInfo.email}
              readOnly
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm="2">
            Phone
          </Form.Label>
          <Col sm="10">
            <Form.Control
              type="number"
              placeholder="Phone number"
              id="userPhone"
              ref={u.userPhone}
            />
          </Col>
        </Form.Group>

        {/* Address */}
        <div className="customDivider">
          <span className="dividerText">Address</span>
        </div>

        <Form.Group className="mb-3">
          <Form.Label>Address</Form.Label>
          <Form.Control
            as="textarea"
            rows={2}
            placeholder="Home address"
            id="userAddress"
            ref={u.userAddress}
          />
        </Form.Group>

        {/* Select province and stuffs */}
        <Form.Group className="mb-3 provinceSelector">
          {/* Province */}
          <div>
            <Form.Label>Provice</Form.Label>
            <Form.Select
              id="userProvince"
              aria-label="Default select example"
              onChange={(e) => {
                setSelectedProvince(e.target.selectedOptions[0].id);
              }}
              ref={u.userProvince}
            >
              {provinces.map((province, index) => (
                <option id={index} key={province.name} value={province.name}>
                  {province.name}
                </option>
              ))}
            </Form.Select>
          </div>
          {/* District */}
          <div>
            <Form.Label>District</Form.Label>
            <Form.Select
              id="userDistrict"
              aria-label="Default select example"
              onChange={(e) => {
                setSelectedAmphoe(e.target.selectedOptions[0].id);
              }}
              ref={u.userDistrict}
            >
              {provinces[selectedProvince].amphoe.map((amphoe, index) => (
                <option
                  id={index}
                  key={amphoe.name + index}
                  value={amphoe.name}
                >
                  {amphoe.name}
                </option>
              ))}
            </Form.Select>
          </div>
          {/* Sub-District */}
          <div>
            <Form.Label>Sub-District</Form.Label>
            <Form.Select
              id="userSubDistrict"
              aria-label="Default select example"
              onChange={(e) => {
                setPostalCode(e.target.selectedOptions[0].id);
              }}
              ref={u.userSubDistrict}
            >
              {provinces[selectedProvince].amphoe[selectedAmphoe].districts.map(
                (sub) => (
                  <option
                    id={sub.zipcode}
                    key={sub.district}
                    value={sub.district}
                  >
                    {sub.district}
                  </option>
                )
              )}
            </Form.Select>
          </div>
          {/* Postal code */}
          <div>
            <Form.Label>Postal code</Form.Label>
            <Form.Control
              type="number"
              placeholder="Zip code"
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
              id="userPostalCode"
              ref={u.userPostalCode}
            />
          </div>
        </Form.Group>

        {/* Social link */}
        <Form.Group className="mb-3">
          <Form.Label>Social link</Form.Label>
          <Form.Control
            type="text"
            placeholder="Facebook or LINE"
            id="userSocialLink"
            ref={u.userSocial}
          />
        </Form.Group>
      </Form>
    </section>
  );
}
