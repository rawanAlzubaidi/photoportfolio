import { Container, Row, Col } from "react-bootstrap";

export const Footer = () => {
  return (
    <footer className="footer">
      <Container>
        <Row className="align-items-center">
          <Col size={12} sm={6} className="text-center">
            <p className="mb-0">© Rawan Alzubaidi 2024</p>
          </Col>
          <Col size={12} sm={6} className="text-center text-sm-end">
            <div className="social-icon">
              {/* Add your social icons here */}
            </div>
          </Col>
        </Row>
      </Container>
    </footer>
  )
}

export default Footer;
