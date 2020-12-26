import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

// Components imports
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";

// Styles
// const SectionWrapper = styled.section`
//   width: 100%;
//   min-height: calc(100vh - (9rem + 7.6rem));
//   display: flex;
//   //align-items: center;
// `;

interface IProps {}

const Layout: React.FC<IProps> = props => {
  const { children } = props;

  return (
    <>
      <Header />

      <main>
        <section>{children}</section>
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  );
};

Layout.propTypes = {};

export default Layout;
