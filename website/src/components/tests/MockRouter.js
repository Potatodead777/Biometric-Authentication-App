import React from 'react';
import { MemoryRouter } from 'react-router-dom';

const MockRouter = ({ children }) => {
  return <MemoryRouter>{children}</MemoryRouter>;
};

export default MockRouter;
