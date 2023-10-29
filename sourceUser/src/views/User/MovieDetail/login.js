import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

// import { deletetUser } from "../services/UserService";

function ModalMustLogin(props) {
  const { handleClose, show } = props;

  const handleLogin = () => {
    window.open("http://localhost:4000/login");
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header>
        <Modal.Title className="text-dark font-weight-bold">
          Thông báo:
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h6 className="text-dark">Bạn cần đăng nhập trước khi mua vé</h6>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="danger" onClick={() => handleLogin()}>
          Đăng nhập
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalMustLogin;
