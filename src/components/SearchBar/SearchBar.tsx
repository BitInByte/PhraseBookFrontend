// Import libraries
import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

// Import components

// Styles

const FormWrapper = styled.div`
  //width: 100%;
  margin: 0 auto;
  //flex-shrink: 0;
  //flex-grow: 1;
  flex: 1;
  display: flex;
  //align-items: center;
  justify-content: center;
`;

const Form = styled.form`
  width: 80%;
  margin-left: 3rem;
  display: flex;
  align-items: center;
  background-color: white;
  border-radius: 3rem;
  border: 0.3rem solid ${props => props.theme.colors.yellow};
  padding: 0.2rem;
`;

const Button = styled.button`
  font-size: 2rem;
  color: ${props => props.theme.colors.yellow};
  padding: 0 0.3rem;

  &:hover {
    cursor: pointer;
  }
`;

const Input = styled.input`
  width: 100%;
  padding: 0.7rem;
  font-family: inherit;
  background: none;
`;

// Interface
interface IProps {}

// Component
const SearchBar: React.FC<IProps> = () => {
  return (
    <FormWrapper>
      <Form>
        <Button>
          <FontAwesomeIcon icon={faSearch} size="1x" />
        </Button>
        <Input placeholder="Search..." />
      </Form>
    </FormWrapper>
  );
};

// Prop types declaration
SearchBar.propTypes = {};

export default SearchBar;
