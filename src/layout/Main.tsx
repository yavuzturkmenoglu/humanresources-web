import { Container } from "react-bootstrap";
import Home from "../pages/Home";
import { ToastContainer } from "react-toastify";

export default function Main() {
  return (
    <Container>
      <div className="m-auto">
        <Home />
      </div>
      <ToastContainer />
    </Container>
  );
}
