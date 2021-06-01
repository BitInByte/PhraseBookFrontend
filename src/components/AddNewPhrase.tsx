// Import libraries
import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

// Import components
import H2 from "./ui/Typography/H2";
import Button from "./ui/Button";

const MAX_LENGTH = 220;

// Styles
const FormStyles = styled.form`
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TextAreaStyles = styled.textarea`
  width: 40rem;
  height: 9rem;
  background-color: transparent;
  border: none;
  border-bottom: 0.1rem solid ${props => props.theme.colors.pink};
  resize: none;
  padding: 0.4rem;
`;

const MaxLengthStyles = styled.p`
  width: 40rem;
  text-align: right;
`;

// Interface
interface INewPhraseState {}

interface IProps {
  value: string;
  onAddNewPhraseHandler: (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => void;
  createNewPhraseHandler: () => void;
}

// Component
const AddNewPhrase: React.FC<IProps> = props => {
  const { value, onAddNewPhraseHandler, createNewPhraseHandler } = props;

  return (
    <>
      <H2>Insert a new phrase</H2>
      <FormStyles>
        <TextAreaStyles
          placeholder="Insert Your Phrase Here"
          maxLength={MAX_LENGTH}
          onChange={onAddNewPhraseHandler}
          value={value}
        />
        <MaxLengthStyles>
          {value.length}/{MAX_LENGTH}
        </MaxLengthStyles>
      </FormStyles>
      <Button
        text="Add New Phrase"
        isFilled
        isDisabled={!(value.length > 0 && value.length <= 220)}
        type="button"
        buttonPushHandler={createNewPhraseHandler}
      />
    </>
  );
};

// Prop types declaration
AddNewPhrase.propTypes = {
  value: PropTypes.string.isRequired,
  onAddNewPhraseHandler: PropTypes.func.isRequired,
  createNewPhraseHandler: PropTypes.func.isRequired,
};

export default AddNewPhrase;
