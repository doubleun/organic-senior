// Bootstrap imports
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";

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
  loading,
  userInfoUI,
}) {
  let provinceIndex, amphoeIndex;
  console.log(farmInfo?.storeFront);
  console.log(farmInfo?.delivery);

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
        <h5>แก้ไขฟาร์ม</h5>
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
      <p id="subtitle">ข้อมุลเกี่ยวกับฟาร์ม</p>

      {/* Edit farm form */}
      {editFarmLock ? (
        <div className="editFarmLock">
          <MdOutlineLock />
          <Button variant="success" onClick={() => setEditFarmLock(false)}>
            ปลดล็อคฟาร์ม
          </Button>
        </div>
      ) : (
        <Form className="editFarmForm">
          {/* Farm name */}
          <div className="mb-3">
            <Form.Group className="">
              <Form.Label>ชื่อฟาร์ม</Form.Label>
              <Form.Control
                type="text"
                placeholder="Farm name"
                id="farmName"
                ref={f.farmName}
              />
            </Form.Group>
          </div>

          <div className="customDivider">
            <span className="dividerText">ที่อยู่</span>
          </div>

          {/* Address */}
          <Form.Group className="mb-3">
            <Form.Label>ที่อยู่ฟาร์ม</Form.Label>
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
              <Form.Label>จังหวัด</Form.Label>
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
              <Form.Label>อำเภอ</Form.Label>
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
              <Form.Label>ตำบล</Form.Label>
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
              <Form.Label>รหัสไปรษณีย์</Form.Label>
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
            <span className="dividerText">เกี่ยวกับฟาร์ม</span>
          </div>

          {/* About */}
          <Form.Group className="mb-3">
            <Form.Label>อธิบายเกี่ยวกับฟาร์ม</Form.Label>
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
              <Form.Label>ภาพบัตรประชาชน</Form.Label>
              {/* Display social security card image or upload buttons */}
              {userInfoUI.FarmMain?.socialImage ? (
                <div>
                  <Image
                    src={userInfoUI.FarmMain.socialImage}
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
                    disabled={loading}
                  />
                  <Button
                    variant="success"
                    disabled={!selectedSocialImage || loading}
                    onClick={() =>
                      handleUploadImage("social-security", selectedSocialImage)
                    }
                  >
                    {loading ? (
                      <Spinner
                        as="span"
                        animation="border"
                        size="sm"
                        role="status"
                        className="me-1"
                      />
                    ) : null}
                    Upload social security card image
                  </Button>
                </>
              )}
            </div>
            <div className="mb-3">
              <Form.Label>ภาพใบรับรองออร์แกนิค</Form.Label>
              {/* Display organic certification image or upload buttons */}
              {userInfoUI.FarmMain?.organicCertImage ? (
                <div>
                  <Image
                    src={userInfoUI.FarmMain.organicCertImage}
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
                    disabled={loading}
                  />
                  <Button
                    variant="success"
                    disabled={!selectedOrganicImage || loading}
                    onClick={() =>
                      handleUploadImage("organic-cert", selectedOrganicImage)
                    }
                  >
                    {loading ? (
                      <Spinner
                        as="span"
                        animation="border"
                        size="sm"
                        role="status"
                        className="me-1"
                      />
                    ) : null}
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
            <Form.Label>โทรศัพท์</Form.Label>
            <Form.Control
              type="text"
              placeholder="Phone number"
              id="farmPhone"
              ref={f.farmPhone}
            />
          </Form.Group>

          {/* Social link */}
          <Form.Group className="mb-3">
            <Form.Label>โซเชียลมีเดียของฟาร์ม</Form.Label>
            <Form.Control
              type="text"
              placeholder="Facebook or LINE"
              id="farmSocialLink"
              ref={f.farmSocialLink}
            />
          </Form.Group>

          {/* Selling methods */}
          <div className="customDivider">
            <span className="dividerText">วิธีการขาย</span>
          </div>

          <Form.Check
            inline
            label="หน้าร้าน"
            type="checkbox"
            id="storeFront"
            value="Store Front"
            onChange={handleFarmCheck}
            ref={f.farmStoreFront}
          />
          <Form.Check
            inline
            label="ส่งเดลิเวอรี่"
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
