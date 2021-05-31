// Import libraries
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import PropTypes from "prop-types";

import PhraseModel from "../models/Phrase";
import {
  getPhrases,
  createPhrase,
  phraseErrorClear,
} from "../store/actions/phraseAction";
import actionTypes from "../store/actions/actionTypes";

// Import components
import SectionWrapper from "../components/ui/SectionWrapper/SectionWrapper";
import Phrase from "../components/Phrase/Phrase";
import Spinner from "../components/ui/Spinner/Spinner";
import MessageModal from "../components/ui/MessageModal/MessageModal";
// import InputModal from "../components/ui/InputModal/InputModal";
import Card from "../components/ui/Card/Card";
import AddNewPhrase from "../components/AddNewPhrase/AddNewPhrase";
import InfiniteLoading from "../components/InfiniteLoading/InfiniteLoading";

// Styles
// const AddPhraseStyles = styled.button`
// padding: 1.7rem 2.5rem;
// background-color: ${props => props.theme.colors.yellow};
// border-radius: 50%;
// position: fixed;
// bottom: 10rem;
// right: 3rem;
// font-size: 3rem;
// color: ${props => props.theme.colors.pink};
// transition: all 0.2s ease-in;
// cursor: pointer;

// &:hover {
// background-color: ${props => props.theme.colors.blue};
// }
// `;

// Interface
interface IProps {}

// Component
const TimelinePage: React.FC<IProps> = () => {
  const [responseMessage, setResponseMessage] = useState<null | string>(null);
  const [newPhraseInput, setNewPhraseInput] = useState("");

  const auth: IAuthState = useSelector((state: IStore) => state.auth);
  const phrases: IPhraseState = useSelector((state: IStore) => state.phrases);

  // if (phrases && phrases.phrases) {
  // setPhraseTotal(phrases.phrases.length);
  // }

  // if (
  // phrases &&
  // phrases.phrases &&
  // phraseTotal &&
  // phrases.phrases.length > phraseTotal
  // ) {
  // setResponseMessage("Phrase Created with Success");
  // }

  const dispatch = useDispatch();
  useEffect(() => {
    // const getPhrasesHandler = async () => {
    // const phrase = new PhraseModel();
    // await phrases.getPhrases(auth.token!);
    console.log("token: ", auth.token!);
    // dispatch(getPhrases(auth.token!));
    dispatch(getPhrases());
    // };
    // getPhrasesHandler();
  }, []);

  console.log("====Phrases: ", phrases);
  console.log("Loading: ", phrases.loading);

  const onActionHandler = async (phraseId: string, isLike: boolean) => {
    console.log(phraseId);
    // const phrase = new PhraseModel();

    let response;
    if (auth.token) {
      if (isLike) {
        response = await PhraseModel.likePhrase(auth.token, phraseId);
        console.log("Response: ", response);
      } else if (!isLike) {
        response = await PhraseModel.sharePhrase(auth.token, phraseId);
      }
    }

    if (response && "status" in response) {
      if (response.status === 200) {
        console.log("Dispatching like");
        dispatch({
          type: actionTypes.PHRASE_ACTION,
          payload: { phraseId, isLike },
        });
        setResponseMessage(response.data.message);
      } else {
        dispatch({
          type: actionTypes.PHRASE_ERROR,
          payload: { error: response.data.message },
        });
      }
    }
  };

  // const toggleInputModal = () => {
  // setIsAddPhraseModalOpen(snapshot => !snapshot);
  // if (isAddPhraseModalOpen === true) {
  // setNewPhraseInput("");
  // }
  // };

  // let messageModalElement;
  // if (responseMessage) {
  // console.log("Success Message Modal");
  // messageModalElement = (
  // <MessageModal
  // isError={false}
  // message={responseMessage}
  // clearError={() => setResponseMessage(null)}
  // />
  // );
  // } else if (phrases.error) {
  // console.log("Error Message Modal");
  // messageModalElement = (
  // <MessageModal
  // isError
  // message={phrases.error}
  // clearError={() => dispatch(phraseErrorClear())}
  // />
  // );
  // }

  let element;
  if (phrases && phrases.phrases && phrases.phrases.length > 0) {
    console.log("Changing element ====");
    element = phrases.phrases.map(phrase => (
      <Phrase
        // key={phrase.id}
        key={phrase.getId()}
        // phrase={phrase.phrase}
        phrase={phrase.getPhrase()}
        // authorName={phrase.author.firstName + " " + phrase.author.lastName}
        authorName={
          phrase.getAuthorFirstName() + " " + phrase.getAuthorLastName()
        }
        // isLiked={phrase.isLiked}
        isLiked={phrase.getIsLiked()}
        // isShared={phrase.isShared}
        isShared={phrase.getIsShared()}
        // isOwnPhrase={phrase.isOwnPhrase}
        isOwnPhrase={phrase.getIsOwnPhrase()}
        onLikeHandler={_ => {
          // onActionHandler(phrase.id, true);
          onActionHandler(phrase.getId(), true);
        }}
        onShareHandler={_ => {
          // onActionHandler(phrase.id, false);
          onActionHandler(phrase.getId(), false);
        }}
      />
    ));
  } else if (phrases && phrases.phrases && !phrases.phrases.length) {
    element = <p>There is nothing to display on the feed!</p>;
  } else {
    element = <Spinner />;
  }

  const onNewPhraseInputChangeHandler = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setNewPhraseInput(event.target.value);
  };

  const createNewPhraseHandler = () => {
    const phraseTotal = phrases!.phrases!.length;
    console.log("New Phrase: ", newPhraseInput);
    if (auth.token) {
      // dispatch(createPhrase(auth.token, newPhraseInput));
      dispatch(createPhrase(newPhraseInput));
    }
    // setIsAddPhraseModalOpen(false);

    if (phrases && phrases.phrases && phrases.phrases.length > phraseTotal) {
      setResponseMessage("Message created with success!");
    }

    setNewPhraseInput("");
  };

  const addNewPhraseElement = (
    <Card>
      <AddNewPhrase
        value={newPhraseInput}
        onAddNewPhraseHandler={onNewPhraseInputChangeHandler}
        createNewPhraseHandler={createNewPhraseHandler}
      />
    </Card>
  );

  const infiniteLoadingHandler = () => {
    console.log("Loading new values!!!");
    console.log("Pagination: ", phrases.pagination);
    console.log("Page: ", phrases.pagination.page);
    console.log("Phrases: ", phrases);
    // TODO: Time to make async calls to the server
    if (phrases.pagination.hasNextPage) {
      if (auth.token && phrases.pagination && phrases.pagination.page) {
        console.log("Dispatching=========");
        // dispatch(getPhrases(auth.token, phrases.pagination.page + 1, true));
        dispatch(getPhrases(phrases.pagination.page + 1, true));
      }
    }
  };

  // const phrasesElement =
  // phrases.phrases &&
  // phrases.phrases.map(phrase => (
  // <Phrase
  // phrase={phrase.phrase}
  // authorName={phrase.author.firstName + " " + phrase.author.lastName}
  // />
  // ));
  return (
    <>
      <MessageModal
        isError
        message={phrases.error}
        clearError={() => dispatch(phraseErrorClear())}
      />
      <MessageModal
        isError={false}
        message={responseMessage}
        clearError={() => setResponseMessage(null)}
      />
      {
        // <InputModal isOpen={isAddPhraseModalOpen} toggleModal={toggleInputModal}>
        // <AddNewPhrase
        // value={newPhraseInput}
        // onAddNewPhraseHandler={onNewPhraseInputChangeHandler}
        // createNewPhraseHandler={createNewPhraseHandler}
        // />
        // </InputModal>
      }
      {
        //  messageModalElement
      }
      <SectionWrapper>
        {addNewPhraseElement}
        <InfiniteLoading
          loading={phrases.pagination.loading}
          onEndReached={infiniteLoadingHandler}>
          {element}
        </InfiniteLoading>
      </SectionWrapper>
      {
        // <AddPhraseStyles onClick={toggleInputModal}>+</AddPhraseStyles>
      }
    </>
  );
};

// Prop types declaration
TimelinePage.propTypes = {};

export default TimelinePage;
// <Phrase
// phrase="sollicitudin tempor id eu nisl nunc mi ipsum faucibus vitae aliquet nec ullamcorper sit amet risus nullam eget felis eget nunc lobortis mattis aliquam faucibus purus in massa tempor nec feugiat nisl pretium fusce id velit ut tortor pretium viverra suspendisse potenti nullam ac tortor vitae purus faucibus ornare suspendisse sed nisi lacus sed viverra tellus in hac habitasse platea dictumst vestibulum rhoncus est pellentesque elit ullamcorper dignissim cras tincidunt lobortis feugiat vivamus at augue eget arcu dictum varius duis at consectetur lorem donec massa sapien faucibus et molestie ac feugiat sed lectus vestibulum mattis ullamcorper velit sed ullamcorper morbi tincidunt ornare massa eget egestas purus viverra accumsan in nisl nisi scelerisque eu ultrices vitae auctor eu augue ut lectus arcu bibendum at varius vel pharetra vel turpis nunc eget lorem dolor sed viverra ipsum nunc aliquet bibendum enim facilisis gravida neque convallis a cras semper auctor neque vitae tempus"
// authorName="Thommas William"
// />
