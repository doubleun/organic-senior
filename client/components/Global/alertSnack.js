import Alert from "react-bootstrap/Alert";
import { BsCheck2Circle, BsX } from "react-icons/bs";

function alertSnack({ setAlert }) {
  return (
    <Alert variant="success" className="alertSubmiited">
      <BsCheck2Circle /> Update profile successfully!
      <BsX onClick={() => setAlert(false)} />
    </Alert>
  );
}

export default alertSnack;
