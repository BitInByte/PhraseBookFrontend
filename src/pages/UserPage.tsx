// Import libraries
import React from "react";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";

// Import components

// Styles

// Interface
interface IProps {}

// Component
const UserPage: React.FC<IProps> = () => {
  const { uid } = useParams<{ uid: string }>();
  return <p>{uid}</p>;
};

// Prop types declaration
UserPage.propTypes = {};

export default UserPage;
