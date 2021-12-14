import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import { useRef } from "react";

function progressTrackingModal({ setShowTrackingModal, handleUpdate }) {
  const trackID = useRef();
  return (
    <div className="progressTrackingModal">
      <Form>
        <h3>โปรดระบุรหัสพัสดุ</h3>
        <Form.Group className="mt-3" controlId="addProductName">
          <Form.Control
            type="text"
            placeholder="กรอกรหัส"
            required
            ref={trackID}
          />
          <div className="mt-3 progressTrackingModalBtn">
            <Button
              variant="secondary"
              onClick={() => setShowTrackingModal(false)}
            >
              Cancel
            </Button>
            <Button
              variant="success"
              onClick={() => handleUpdate(trackID.current.value)}
            >
              Confirm
            </Button>
          </div>
        </Form.Group>
      </Form>
    </div>
  );
}

export default progressTrackingModal;
