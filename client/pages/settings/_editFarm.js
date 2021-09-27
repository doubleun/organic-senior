// Bootstrap imports
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

// React imports
import { useState } from "react";

export default function EditFarm({ provinces, displayProfile }) {
  const [selectedProvince, setSelectedProvince] = useState(provinces[0].amphoe);
  const [selectedAmphoe, setSelectedAmphoe] = useState(
    provinces[0].amphoe[0].districts
  );
  const [districtCode, setDistrictCode] = useState(
    provinces[0].amphoe[0].districts[0].zipcode
  );

  return (
    <section
      className="profilePersonal"
      style={!displayProfile ? { display: "unset" } : { display: "none" }}
    >
      <h5>Edit Farm</h5>
      <p id="subtitle">Farm informations</p>
      <Form className="editFarmForm">
        {/* First and last name */}
        <div className="mb-3">
          <Form.Group className="">
            <Form.Label>Farm Name</Form.Label>
            <Form.Control type="text" placeholder="Farm name" id="farmName" />
          </Form.Group>
        </div>

        <div className="customDivider">
          <span className="dividerText">Address</span>
        </div>

        {/* Address */}
        <Form.Group className="mb-3">
          <Form.Label>Farm Address</Form.Label>
          <Form.Control
            as="textarea"
            rows={2}
            placeholder="Farm address"
            id="farmAddress"
          />
        </Form.Group>

        {/* Select province and stuffs */}
        <Form.Group className="mb-3 provinceSelector">
          {/* Province */}
          <div>
            <Form.Label>Provice</Form.Label>
            <Form.Select
              id="farmProvince"
              aria-label="Default select example"
              onChange={(e) => {
                setSelectedProvince(
                  provinces[e.target.selectedOptions[0].id].amphoe
                );
                setSelectedAmphoe(
                  provinces[e.target.selectedOptions[0].id].amphoe[0].districts
                );
                setDistrictCode(
                  provinces[e.target.selectedOptions[0].id].amphoe[0]
                    .districts[0].zipcode
                );
              }}
            >
              {provinces.map((province, index) => (
                <option id={index} key={province.name}>
                  {province.name}
                </option>
              ))}
            </Form.Select>
          </div>
          {/* District */}
          <div>
            <Form.Label>District</Form.Label>
            <Form.Select
              id="farmDistrict"
              aria-label="Default select example"
              onChange={(e) => {
                setSelectedAmphoe(
                  selectedProvince[Number(e.target.selectedOptions[0].id)]
                    .districts
                );
                setDistrictCode(
                  selectedProvince[e.target.selectedOptions[0].id].districts[0]
                    .zipcode
                );
              }}
            >
              {selectedProvince.map((amphoe, index) => (
                <option id={index} key={amphoe.name + index}>
                  {amphoe.name}
                </option>
              ))}
            </Form.Select>
          </div>
          {/* Sub-District */}
          <div>
            <Form.Label>Sub-District</Form.Label>
            <Form.Select
              id="farmSubDistrict"
              aria-label="Default select example"
              onChange={(e) => {
                setDistrictCode(
                  selectedAmphoe[Number(e.target.selectedOptions[0].id)].zipcode
                );
              }}
            >
              {selectedAmphoe.map((sub, index) => (
                <option id={index} key={index}>
                  {sub.district}
                </option>
              ))}
            </Form.Select>
          </div>
          {/* Postal code */}
          <div>
            <Form.Label>Postal code</Form.Label>
            <Form.Control
              id="farmPostalCode"
              type="number"
              placeholder="Zip code"
              value={districtCode}
              onChange={(e) => setDistrictCode(e.target.value)}
            />
          </div>
        </Form.Group>

        <div className="customDivider">
          <span className="dividerText">About farm</span>
        </div>

        {/* About */}
        <Form.Group className="mb-3">
          <Form.Label>About farm</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="About farm"
            id="farmAbout"
          />
        </Form.Group>

        {/* Upload social security card and organic cert */}
        <div className="uploadSocialAndCert">
          <div className="mb-3">
            <Form.Label>Upload social security card image</Form.Label>
            <Button variant="success">Upload image</Button>
          </div>
          <div className="mb-3">
            <Form.Label>Upload organic certification image</Form.Label>
            <Button variant="success">Upload image</Button>
          </div>
        </div>

        <div className="customDivider">
          <span className="dividerText">Contact</span>
        </div>

        {/* Phone number */}
        <Form.Group className="mb-3">
          <Form.Label>Phone</Form.Label>
          <Form.Control
            type="number"
            placeholder="Phone number"
            id="farmPhone"
          />
        </Form.Group>

        {/* Social link */}
        <Form.Group className="mb-3">
          <Form.Label>Social link</Form.Label>
          <Form.Control
            type="text"
            placeholder="Facebook or LINE"
            id="farmSocialLink"
          />
        </Form.Group>

        {/* Selling methods */}
        <div className="customDivider">
          <span className="dividerText">Selling methods</span>
        </div>

        <Form.Check
          inline
          label="Store front"
          type="checkbox"
          id="storeFront"
        />
        <Form.Check inline label="Delivery" type="checkbox" id="delivery" />
      </Form>
    </section>
  );
}
