// Import libraries
import React, { useState, useEffect, useRef, RefObject } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faTimes } from "@fortawesome/free-solid-svg-icons";

import User, { userType } from "../models/User";

// Import components
import BackDrop from "./ui/BackDrop";
import Search from "./../models/Search";
import Spinner from "./ui/Spinner";
import MessageModal from "./ui/MessageModal";

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
  position: relative;
`;

const FormResultModal = styled.div`
  max-height: 50rem;
  position: absolute;
  top: 0;
  // left: 0;
  width: 80%;
  margin-left: 3rem;
  min-height: 15rem;
  // background-color: ${props => props.theme.colors.white};
  background-color: #ffffff;
  border-radius: 3rem 3rem 0 0;
  padding: 5rem 1.5rem 1.5rem 1.5rem;
  text-align: center;
  border: 0.3rem solid ${props => props.theme.colors.yellow};
  z-index: 10;
  visibility: hidden;
  opacity: 0;
  transform: scaleY(0);
  transform-origin: top;
  transition: all 0.3s ease-in;
  overflow: scroll;
  border-bottom-left-radius: 3rem;
  border-bottom-right-radius: 3rem;
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
  // z-index: 30;
  position: relative;
`;

const Button = styled.button`
  font-size: 2rem;
  color: ${props => props.theme.colors.yellow};
  padding: 0 0.3rem;

  // &:hover {
  cursor: pointer;
  // }

  &:last-of-type {
    position: absolute;
    right: 0.5rem;
    top: 50%;
    transform: translateY(-50%);
  }
`;

const Input = styled.input`
  // width: 100%;
  width: 92%;
  padding: 0.7rem;
  font-family: inherit;
  background: none;
`;

const SearchInputDiv = styled.div`
  width: 100%;
  padding: 2rem;
  transition: all 0.2s ease-in;

  &:hover {
    background-color: ${props => props.theme.colors.yellow};
  }
`;

// interface SRIProps {
// authorName: string;
// slug: string;
// }

// const SearchResult: React.FC<SRIProps> = (authorName: string, slug: string) => {
// return (
// <SearchInputDiv>
// <p>{authorName}</p>
// <p>{slug}</p>
// </SearchInputDiv>
// );
// };

const changeWindowPopup = (
  isVisible: boolean,
  searchBar: RefObject<HTMLFormElement>,
  searchWindowPopup: RefObject<HTMLDivElement>
) => {
  if (searchWindowPopup && searchWindowPopup.current) {
    searchWindowPopup.current.style.visibility = isVisible
      ? "visible"
      : "hidden";
    searchWindowPopup.current.style.opacity = isVisible ? "1" : "0";
    searchWindowPopup.current.style.transform = isVisible
      ? "scaleY(1)"
      : "scaleY(0)";
  }
  if (searchBar && searchBar.current) {
    searchBar.current.style.zIndex = isVisible ? "30" : "0";
  }
};

// Interface
interface IProps {}

// Component
const SearchBar: React.FC<IProps> = () => {
  const [searchInput, setSearchInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [searchResults, setSearchResults] = useState<Search[] | undefined>();
  const [error, setError] = useState<string | undefined>();

  const token = useSelector((state: IStore) => state.auth.token);

  const searchWindowPopup = useRef<HTMLDivElement>(null);
  const searchBar = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (searchInput.length > 0) {
      changeWindowPopup(true, searchBar, searchWindowPopup);
      // if (searchWindowPopup && searchWindowPopup.current) {
      // searchWindowPopup.current.style.visibility = "visible";
      // searchWindowPopup.current.style.opacity = "1";
      // searchWindowPopup.current.style.transform = "scaleY(1)";
      // }
      // if (searchBar && searchBar.current) {
      // searchBar.current.style.zIndex = "30";
      // }
      // setTimeout(() => {
      // }, 1000);
    } else {
      changeWindowPopup(false, searchBar, searchWindowPopup);
      // if (searchWindowPopup && searchWindowPopup.current) {
      // searchWindowPopup.current.style.visibility = "hidden";
      // searchWindowPopup.current.style.opacity = "0";
      // searchWindowPopup.current.style.transform = "scaleY(0)";
      // }
      // if (searchBar && searchBar.current) {
      // searchBar.current.style.zIndex = "0";
      // }
      // setTimeout(() => {
      // }, 1000);
    }
  }, [searchInput]);

  useEffect(() => {
    setIsLoading(true);
    const timeout = setTimeout(async () => {
      console.log("Token: ", token);
      console.log("True: ", searchInput.length > 0);
      if (token && searchInput.length > 0) {
        console.log("Starting searching...");
        try {
          const response = await Search.getSearch(token, searchInput);
          console.log("Search response: ", response);
          // setSearchResults(response.data.data.users);
          setSearchResults(
            response.data.data.users.map(user => {
              return new Search(
                user._id,
                user.slug,
                user.firstName,
                user.lastName
              );
            })
          );
        } catch (error) {
          setError(error.message);
        }
      }
      setIsLoading(false);
    }, 1000);

    return () => {
      clearTimeout(timeout);
      setSearchResults(undefined);
    };
  }, [searchInput]);

  const onInputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(event.target.value);
  };

  const onDeleteInputValueHandler = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
    setSearchInput("");
  };

  const onSearchResultClickHandler = () => {
    setSearchInput("");
  };

  let searchResultElement;
  if (isLoading) {
    searchResultElement = <Spinner />;
  } else if (searchResults && searchResults.length > 0) {
    searchResultElement = searchResults.map(result => (
      <Link
        key={result.getId()}
        to={{
          pathname: `/user/${result.getId()}`,
        }}
        onClick={onSearchResultClickHandler}>
        <SearchInputDiv>
          <p>{result.getAuthorName()}</p>
          <p>@{result.getSlug()}</p>
        </SearchInputDiv>
      </Link>
    ));
  }

  return (
    <>
      <MessageModal
        isError={true}
        message={error}
        clearError={() => setError(undefined)}
      />
      {searchInput.length > 0 && (
        <BackDrop toggleDrawer={() => setSearchInput("")} />
      )}
      <FormWrapper>
        <Form ref={searchBar}>
          <Button>
            <FontAwesomeIcon icon={faSearch} size="1x" />
          </Button>
          <Button onClick={onDeleteInputValueHandler}>
            <FontAwesomeIcon icon={faTimes} size="1x" />
          </Button>
          <Input
            placeholder="Search..."
            value={searchInput}
            onChange={onInputChangeHandler}
          />
        </Form>
        <FormResultModal ref={searchWindowPopup}>
          {searchResultElement}
        </FormResultModal>
      </FormWrapper>
    </>
  );
};

// Prop types declaration
SearchBar.propTypes = {};

export default SearchBar;
