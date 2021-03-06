import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Link } from "react-router-dom";

export const Footer = ({ isGameStarted }) => (
  <FooterBox>
    {!isGameStarted
      && (
        <>
          <FooterLink to="/terms">Terms</FooterLink>
          <FooterLink to="/about">About</FooterLink>
          <FooterLinkAbsolute href="https://github.com/R9c8/n-back-training">
            GitHub
          </FooterLinkAbsolute>
        </>
      )
    }

  </FooterBox>
);

Footer.propTypes = {
  isGameStarted: PropTypes.bool,
};

Footer.defaultProps = {
  isGameStarted: false,
};

const FooterBox = styled.footer`
  {
    height: 35px;
    margin-top: 5px;
    margin-bottom: 15px;
    display: flex;
    justify-content: center;
    font-size: 0.8em;
  }
`;

const FooterLink = styled(Link)`
  {
    display: inline;
    margin: 0 15px 15px 15px;
  }
`;

const FooterLinkAbsolute = styled.a`
  {
    display: inline;
    margin: 0 15px 15px 15px;
  }
`;
