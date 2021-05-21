// Import libraries
import React from "react";
import PropTypes from "prop-types";
import styled, { css } from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp, faShareSquare } from "@fortawesome/free-regular-svg-icons";

// Import components
import Card from "../ui/Card/Card";

// Styles
// const PhraseContainer = styled.div`
// width: 55rem;
// padding: 3.5rem;
// // border: 0.1rem solid ${props => props.theme.colors.black};
// // border-radius: 5rem;
// border-radius: 2rem;
// margin: 1rem;
// // box-shadow: 0px 0px 10px -2px rgba(0, 0, 0, 0.84);
// box-shadow: 0px 0px 10px -2px rgba(0, 0, 0, 0.5);
// `;

const PhraseElement = styled.p`
  font-family: "Alice", serif;
  font-size: 1.75rem;
  position: relative;
  top: 0;
  left: 0;

  &::before {
    position: absolute;
    font-size: 16rem;
    content: '"';
    display: block;
    top: 4.2rem;
    left: -4.2rem;
    color: #aaa;
    line-height: 0;
    font-style: italic;
    z-index: -1;
  }
`;

const AuthorElement = styled.p`
  width: 100%;
  padding: 1.5rem;
  text-align: right;

  & span {
    font-style: italic;
  }
`;

const ActionsElement = styled.div`
  width: 100%;
  display: flex;
  font-size: 2rem;
  margin-top: 1rem;

  & button {
    flex: 1;
    text-align: center;
    // color: inherit;
    transition: all .3s ease-in;
    font-size: inherit;
    cursor: pointer;

    & span {
      margin-right: 0.5rem;
      color: inherit:
    }

  }
`;

interface ILikeElement {
  isLiked: boolean;
}

const LikeElement = styled.button<ILikeElement>`
  ${props =>
    props.isLiked &&
    css`
      color: ${props.theme.colors.red};
      font-weight: 700;
    `}
  &:hover {
    color: ${props => props.theme.colors.red};
    font-weight: 700;
  }
`;

interface ISharedElement {
  isShared: boolean;
}

const ShareElement = styled.button<ISharedElement>`
  ${props =>
    props.isShared &&
    css`
      color: ${props.theme.colors.green};
      font-weight: 700;
    `}
  &:hover {
    color: ${props => props.theme.colors.green};
    font-weight: 700;
  }
`;

// Interface
interface IProps extends ILikeElement, ISharedElement {
  phrase: string;
  authorName: string;
  isOwnPhrase: boolean;
  onLikeHandler: (event: React.MouseEvent<HTMLButtonElement>) => void;
  onShareHandler: (event: React.MouseEvent) => void;
  // isLiked: boolean;
  // isShared: boolean;
}

// Component
const Phrase: React.FC<IProps> = ({
  phrase,
  authorName,
  isLiked,
  isShared,
  isOwnPhrase,
  onLikeHandler,
  onShareHandler,
}) => {
  return (
    <Card>
      <PhraseElement>{phrase}</PhraseElement>
      <AuthorElement>
        By: <span>{authorName}</span>
      </AuthorElement>
      <ActionsElement>
        <LikeElement onClick={onLikeHandler} isLiked={isLiked}>
          <span>
            <FontAwesomeIcon icon={faThumbsUp} />
          </span>
          Like
        </LikeElement>
        {!isOwnPhrase && (
          <ShareElement onClick={onShareHandler} isShared={isShared}>
            <span>
              <FontAwesomeIcon icon={faShareSquare} />
            </span>
            Share
          </ShareElement>
        )}
      </ActionsElement>
    </Card>
  );
};

// Prop types declaration
Phrase.propTypes = {
  phrase: PropTypes.string.isRequired,
  authorName: PropTypes.string.isRequired,
  isLiked: PropTypes.bool.isRequired,
  isShared: PropTypes.bool.isRequired,
  isOwnPhrase: PropTypes.bool.isRequired,
  onLikeHandler: PropTypes.func.isRequired,
  onShareHandler: PropTypes.func.isRequired,
};

export default Phrase;
