import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import { useState } from "react";
import { BsPlus, BsBoxArrowRight, BsGeoAlt, BsAward } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import "./HomeNavBar.css";

const ListNavBar = () => {
  let Navigate = useNavigate();
  const [isShown, setIsShown] = useState(false);

  const toggleMenu = () => {
    setIsShown((current) => !current);
  };

  const logOut = () => {
    sessionStorage.clear();
    Navigate("/login");
  };
  return (
    <>
      {/* 추가메뉴 */}
      {isShown && (
        <Container>
          <Nav
            style={{
              position: "fixed",
              right: 0,
              zIndex: 1030,
              bottom: 150,
              marginRight: "5px",
            }}
          >
            <Nav.Item
              onClick={() => {
                Navigate("/");
              }}
            >
              <button className="btn btn-default">
                <BsGeoAlt
                  style={{
                    width: 48,
                    height: 48,
                  }}
                ></BsGeoAlt>
              </button>
            </Nav.Item>
          </Nav>
          <Nav
            style={{
              position: "fixed",
              right: 0,
              zIndex: 1030,
              bottom: 210,
              marginRight: "5px",
            }}
          >
            <Nav.Item
              onClick={() => {
                Navigate("/rank");
              }}
            >
              <button className="btn btn-default">
                <BsAward
                  style={{
                    width: 50,
                    height: 50,
                  }}
                ></BsAward>
              </button>
            </Nav.Item>
          </Nav>
          <Nav
            style={{
              position: "fixed",
              right: 0,
              zIndex: 1030,
              bottom: 85,
            }}
          >
            <Nav.Item onClick={logOut}>
              <button className="btn btn-default">
                <BsBoxArrowRight
                  style={{
                    width: 50,
                    height: 50,
                  }}
                ></BsBoxArrowRight>
              </button>
            </Nav.Item>
          </Nav>
        </Container>
      )}

      {/* 하단메뉴 */}
      <Container>
        <div className="navbar transparent navbar-inverse fixed-bottom">
          <Nav.Link
            onClick={toggleMenu}
            className="navbar-inner"
            style={{
              position: "absolute",
              right: 0,
              bottom: "20px",
              marginRight: "10px",
              display: "block",
            }}
          >
            <BsPlus
              style={{
                width: 60,
                height: 60,
              }}
            />
          </Nav.Link>
        </div>
      </Container>
    </>
  );
};

export default ListNavBar;
