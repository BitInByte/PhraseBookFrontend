// Import libraries
import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import PropTypes from "prop-types";

// Import components

// Styles
const UserPinRounded = styled.div`
  padding: 1.4rem;
  color: ${props => props.theme.colors.pink};
  background-color: ${props => props.theme.colors.yellow};
  border-radius: 50%;
  //border: 0.1rem solid transparent;
  transition: all 0.2s ease-in;

  &:hover {
    // border: 0.1rem solid ${props => props.theme.colors.blue};
    //color: ${props => props.theme.colors.blue};
    background-color: ${props => props.theme.colors.blue};
  }
`;

const UserLetters = styled.p`
  color: inherit;
  text-transform: uppercase;
  font-weight: 700;
`;

// Interface
interface IProps {
  userInitials: string;
}

// Component
const UserPin: React.FC<IProps> = ({ userInitials }) => {
  console.log("££££UserPin Render");
  return (
    <Link to="/settings">
      <UserPinRounded>
        <UserLetters>{userInitials}</UserLetters>
      </UserPinRounded>
    </Link>
  );
};

const areEqual = (prevProps: IProps, nextProps: IProps) => {
  return !(prevProps.userInitials !== nextProps.userInitials);
};

// Prop types declaration
UserPin.propTypes = {
  userInitials: PropTypes.string.isRequired,
};

export default React.memo(UserPin, areEqual);
