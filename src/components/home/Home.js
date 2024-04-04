import Popular from "../recipes/popular/Popular";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Filters from "../recipes/filters/Filters";

const Home = () => {
  return (
    <Container fluid>
      <Row>
        <Col xs={2} className="p-0">
          <Filters />
        </Col>
        <Col>
          <Popular />
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
