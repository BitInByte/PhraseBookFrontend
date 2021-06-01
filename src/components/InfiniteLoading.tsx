// Import libraries
import React, { useRef, useEffect } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

// Import components
import Spinner from "./ui/Spinner";

// Styles
const InfiniteLoadingStyles = styled.div`
  // width: 100%;
`;

const SentinelStyles = styled.div`
  width: 100%;
`;

// Interface
interface IProps {
  loading: boolean;
  onEndReached: () => void;
  children: JSX.Element | JSX.Element[];
}

// Component
const InfiniteLoading: React.FC<IProps> = props => {
  const { children, loading, onEndReached } = props;

  const sentinelRef = useRef<HTMLDivElement>(null);

  console.log("Reloading$$$$$$$");

  useEffect(() => {
    const intersectionObserver = new IntersectionObserver(async entries => {
      const [entry] = entries;
      console.log("Entries: ", entries);
      console.log("Entry: ", entry);

      // if (entries[0].intersectionRatio <= 0) {
      if (!entry.isIntersecting) {
        return;
      }
      console.log("Reached the end!!!");
      console.log("Reached: ", entry);
      console.log(entries);

      // Fetch new data
      if (!loading) {
        onEndReached();
      }
    });
    if (sentinelRef.current) {
      intersectionObserver.observe(sentinelRef.current);
    }

    // Cancel at component unmount
    return () => {
      if (sentinelRef.current) {
        intersectionObserver.unobserve(sentinelRef.current);
      }
    };
  }, [onEndReached, loading]);

  return (
    <InfiniteLoadingStyles>
      {children}
      <SentinelStyles ref={sentinelRef}>
        {loading && <Spinner withWrapper />}
      </SentinelStyles>
    </InfiniteLoadingStyles>
  );
};

// Prop types declaration
InfiniteLoading.propTypes = {
  onEndReached: PropTypes.func.isRequired,
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.element])
    .isRequired,
};

export default InfiniteLoading;
