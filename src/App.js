import React from 'react';
import styled from 'styled-components';
import { firebaseApp } from './shared/firebase';

const Test = styled.div`
    background-color : ${(props) => props.theme.mainColor};
`

console.log(firebaseApp);

const App = () => {
    return <Test>App</Test>;
};

export default App;
