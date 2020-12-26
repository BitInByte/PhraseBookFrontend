// Import libraries
import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

// Import components
import H1 from "../components/ui/Typography/H1";
import H3 from "../components/ui/Typography/H3";

// Styles
const HomePageWrapper = styled.div`
  width: 100rem;
  min-height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ContentWrapper = styled.div`
  width: 50%;
  //height: 100%;
  flex: 1;
  //display: flex;
  //align-items: center;
  //justify-content: center;
`;

const LeftSideWrapper = styled.div`
  width: 100%;
  //height: 100%;
  //display: flex;
  //justify-content: center;
  //align-items: center;

  //flex-grow: 0;
`;

const RightSideWrapper = styled.div`
  width: 100%;
  height: 100%;
  //display: flex;
  //align-items: center;
  //justify-content: center;
`;

// Interface
interface IProps {}

// Component
const HomePage: React.FC<IProps> = () => {
  return (
    <HomePageWrapper>
      <ContentWrapper>
        <LeftSideWrapper>
          <H1>Inspiring people on taking the best of their lives!</H1>
          <H3>Start inspiring other people and register now</H3>
        </LeftSideWrapper>
      </ContentWrapper>
      <ContentWrapper>
        <RightSideWrapper>Registration Page</RightSideWrapper>
      </ContentWrapper>
    </HomePageWrapper>
  );
};

// Prop types declaration
HomePage.propTypes = {};

export default HomePage;
