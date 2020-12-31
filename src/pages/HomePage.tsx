// Import libraries
import React from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import PropTypes from "prop-types";

// Import components
import H1 from "../components/ui/Typography/H1";
import H3 from "../components/ui/Typography/H3";
import RegisterForm from "../components/auth/Register/RegisterForm";
// import SectionWrapper from "../components/ui/SectionWrapper/SectionWrapper";

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
  //width: 100%;
  width: 75%;
  height: 100%;
  //display: flex;
  //flex-direction: column;
  //align-items: center;
  //justify-content: center;
`;

// Interface
interface IProps {}

// Component
const HomePage: React.FC<IProps> = () => {
  let history = useHistory();
  const onLoginButtonPush = () => {
    history.push("/auth");
  };

  return (
    <HomePageWrapper>
      <ContentWrapper>
        <LeftSideWrapper>
          <H1>Inspiring people on taking the best of their lives!</H1>
          <H3>Start inspiring other people and register now</H3>
        </LeftSideWrapper>
      </ContentWrapper>
      <ContentWrapper>
        <RightSideWrapper>
          <RegisterForm onButtonPush={onLoginButtonPush} />
        </RightSideWrapper>
      </ContentWrapper>
    </HomePageWrapper>
  );
};

// Prop types declaration
HomePage.propTypes = {};

export default HomePage;
