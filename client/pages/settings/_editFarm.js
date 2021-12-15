// Bootstrap imports
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

// React imports
import { useState, useEffect } from "react";
import { MdOutlineLock } from "react-icons/md";

// Nextjs imports
import { useRouter } from "next/router";
import Image from "next/image";

export default function EditFarm({
  provinces,
  displayProfile,
  editFarmLock,
  setEditFarmLock,
  farmInfo,
  handleFarmCheck,
  f,
  handleUploadImage,
}) {
  let provinceIndex, amphoeIndex;

  if (farmInfo?.province && farmInfo?.district) {
    // Get province index
    if (farmInfo.province) {
      provinceIndex = provinces
        .map((province) => province.name)
        .indexOf(farmInfo.province);
    }

    // Get district index
    if (farmInfo.district) {
      amphoeIndex = provinces[provinceIndex].amphoe
        .map((amphoe) => amphoe.name)
        .indexOf(farmInfo.district);
    }
    // Initial inputs
    // console.log(farmInfo);
    useEffect(() => {
      f.farmName.current.value = farmInfo?.name;
      f.farmAddress.current.value = farmInfo?.address;
      f.farmProvince.current.value = farmInfo?.province;
      f.farmDistrict.current.value = farmInfo?.district;
      f.farmSubDistrict.current.value = farmInfo?.subDistrict;
      f.farmAbout.current.value = farmInfo?.about;
      f.farmPhone.current.value = farmInfo?.phone;
      f.farmPostalCode.current.value = farmInfo?.postalCode;
      f.farmSocialLink.current.value = farmInfo?.socialLink;

      f.farmStoreFront.current.checked = farmInfo?.storeFront;
      f.farmDelivery.current.checked = farmInfo?.delivery;
    }, []);
  }

  // Set initial indexs
  const [selectedProvince, setSelectedProvince] = useState(
    farmInfo?.province ? provinceIndex : 0
  );
  const [selectedAmphoe, setSelectedAmphoe] = useState(
    farmInfo?.district ? amphoeIndex : 0
  );
  const [postalCode, setPostalCode] = useState(
    farmInfo?.postalCode ? farmInfo.postalCode : ""
  );

  // Images state
  const [selectedSocialImage, setSelectedSocialImage] = useState();
  const [selectedOrganicImage, setSelectedOrganicImage] = useState();

  // useRouter
  const router = useRouter();

  return (
    <section
      className="farmForm"
      style={!displayProfile ? { display: "unset" } : { display: "none" }}
    >
      <div className="editFarmFormTitle">
        <h5>Edit Farm</h5>
        {/* If a user has a farm we want to show "view farm" button that will take them to thier farm page */}
        {farmInfo ? (
          <div
            className="goToFarmButton"
            onClick={() => router.push(`/farm/${farmInfo.id}`)}
          >
            View farm
          </div>
        ) : null}
      </div>
      <p id="subtitle">Farm informations</p>

      {/* Edit farm form */}
      {editFarmLock ? (
        <div className="editFarmLock">
          <MdOutlineLock />
          <Button variant="success" onClick={() => setEditFarmLock(false)}>
            Unlock farm
          </Button>
        </div>
      ) : (
        <Form className="editFarmForm">
          {/* Farm name */}
          <div className="mb-3">
            <Form.Group className="">
              <Form.Label>Farm Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Farm name"
                id="farmName"
                ref={f.farmName}
              />
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
              ref={f.farmAddress}
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
                  setSelectedProvince(e.target.selectedOptions[0].id);
                  setSelectedAmphoe(0);
                }}
                ref={f.farmProvince}
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
                id="farmProvince"
                aria-label="Default select example"
                onChange={(e) => {
                  setSelectedAmphoe(e.target.selectedOptions[0].id);
                }}
                ref={f.farmDistrict}
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
                id="farmSubDistrict"
                aria-label="Default select example"
                onChange={(e) => {
                  setPostalCode(e.target.selectedOptions[0].id);
                }}
                ref={f.farmSubDistrict}
              >
                {provinces[selectedProvince].amphoe[
                  selectedAmphoe
                ].districts.map((sub) => (
                  <option
                    id={sub.zipcode}
                    key={sub.district}
                    value={sub.district}
                  >
                    {sub.district}
                  </option>
                ))}
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
                id="farmPostalCode"
                ref={f.farmPostalCode}
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
              ref={f.farmAbout}
            />
          </Form.Group>

          {/* Upload social security card and organic cert */}
          <div className="uploadSocialAndCert">
            <div className="mb-3">
              <Form.Label>Social security card image</Form.Label>
              {/* Display social security card image or upload buttons */}
              {farmInfo?.socialImage ? (
                <div>
                  <Image
                    src={farmInfo.socialImage}
                    width="200px"
                    height="200px"
                  />
                </div>
              ) : (
                <>
                  <input
                    className="form-control mb-2"
                    accept=".jpg, .jpeg, .png"
                    type="file"
                    onChange={(e) => setSelectedSocialImage(e.target.files[0])}
                  />
                  <Button
                    variant="success"
                    disabled={!selectedSocialImage}
                    onClick={() =>
                      handleUploadImage("social-security", selectedSocialImage)
                    }
                  >
                    Upload social security card image
                  </Button>
                </>
              )}
            </div>
            <div className="mb-3">
              <Form.Label>Organic certification image</Form.Label>
              {/* Display organic certification image or upload buttons */}
              {farmInfo?.organicCertImage ? (
                <div>
                  <Image
                    src={farmInfo.organicCertImage}
                    width="200px"
                    height="200px"
                  />
                </div>
              ) : (
                <>
                  <input
                    className="form-control mb-2"
                    accept=".jpg, .jpeg, .png"
                    type="file"
                    onChange={(e) => setSelectedOrganicImage(e.target.files[0])}
                  />
                  <Button
                    variant="success"
                    disabled={!selectedOrganicImage}
                    onClick={() =>
                      handleUploadImage("organic-cert", selectedOrganicImage)
                    }
                  >
                    Upload organic certification image
                  </Button>
                </>
              )}
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
              ref={f.farmPhone}
            />
          </Form.Group>

          {/* Social link */}
          <Form.Group className="mb-3">
            <Form.Label>Social link</Form.Label>
            <Form.Control
              type="text"
              placeholder="Facebook or LINE"
              id="farmSocialLink"
              ref={f.farmSocialLink}
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
            value="Store Front"
            onChange={handleFarmCheck}
            ref={f.farmStoreFront}
          />
          <Form.Check
            inline
            label="Delivery"
            type="checkbox"
            id="delivery"
            value="Delivery"
            onChange={handleFarmCheck}
            ref={f.farmDelivery}
          />
        </Form>
      )}
    </section>
  );
}
