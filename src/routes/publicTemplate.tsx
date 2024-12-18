// src/templates/PublicTemplate.tsx

import React, { ReactNode } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { theme as ThemeType } from "../helpers/common.enums";
import { setTheme } from "../redux/action";
import { Container, Button, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import logo_new from "../assets/images/logo_new.webp";
import labPng from "../assets/images/lab.webp";
import darklabPng from "../assets/images/dark_lab.webp";
import sunImage from "../assets/images/sun.svg";
import moonImage from "../assets/images/moon.svg";
import Loader from "../components/Loader/Loader";
import backgroundLight from "../assets/images/bg_1.webp";
import backgroundDark from "../assets/images/dark_bg.webp";

interface PublicTemplateProps {
  children: ReactNode; // Children prop to represent valid React nodes
}

const PublicTemplate: React.FC<PublicTemplateProps> = ({ children }) => {
  const dispatch = useDispatch();
  const loading = useSelector((state: RootState) => state.loader.loader);
  const currentTheme = useSelector((state: RootState) => state.theme.theme);

  const toggleTheme = async () => {
    const newTheme: ThemeType = currentTheme === "dark" ? "light" : "dark";
    await dispatch(setTheme(newTheme));
    document.documentElement.setAttribute("data-bs-theme", newTheme);
  };

  // Determine the background image for the entire page based on the theme
  const pageBackground =
    currentTheme === "dark" ? backgroundDark : backgroundLight;

  // Determine the lab image based on the theme
  const labImage = currentTheme === "dark" ? darklabPng : labPng;

  return (
    <div
      className="form-wrap"
      style={{
        backgroundImage: `url(${pageBackground})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        color: currentTheme === "dark" ? "#ffffff" : "#000000",
      }}
    >
      <Button
        variant="light"
        onClick={toggleTheme}
        className="auth-switch"
        style={{
          backgroundColor: "#d6dde5",
          border: "none",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "40px",
          height: "40px",
          borderRadius: "50%", // Make it circular
        }}
      >
        {currentTheme === "dark" ? (
          <img src={sunImage} alt="sun" style={{ height: "20px" }} />
        ) : (
          <img src={moonImage} alt="moon" style={{ height: "20px" }} />
        )}
      </Button>

      <Container fluid className="d-flex flex-grow-1">
        <Row className="flex-grow-1 w-100">
          {/* 
            3. Left Section:
              - Set background image based on theme.
              - Place logo on the left.
              - Lab image in the center based on theme.
              - Footer with terms on left and both links on the right.
          */}
          <Col md={6} className="d-none d-md-block">
            <div className="left-bg">
              {/* Top Logo on the left */}
              <div className="logo_outer">
                <img src={logo_new} alt="Logo" />
              </div>

              {/* Center Lab Image */}
              <div className="lab">
                <img src={labImage} alt="lab" className="img-fluid" />
              </div>

              {/* Footer */}
              <div className="w-100 d-flex justify-content-between align-items-center copyright-box">
                <p className="mb-0">
                  © The Theranostics Inc. (2024) | Theranostics™
                </p>
                <ul>
                  <li>
                    <Link to="#" className="me-3 text-decoration-none">
                      Terms & Conditions
                    </Link>
                  </li>
                  <li>
                    <Link to="#" className="text-decoration-none">
                      Privacy Policy
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </Col>

          {/* 
            3. Right Section:
              - Contains the children components.
              - Adjust background color based on theme.
          */}
          <Col
            md={6}
            className="d-flex flex-column justify-content-center align-items-center p-4 right-section"
            style={{
              backgroundColor: "transparent",
            }}
          >
            <div className="logo_outer d-block d-md-none mb-4">
              <img src={logo_new} alt="Logo" />
            </div>
            {children}
          </Col>
        </Row>
      </Container>

      {/* Loader */}
      {loading && <Loader />}
    </div>
  );
};

export default PublicTemplate;
