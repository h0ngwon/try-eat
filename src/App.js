import React from 'react';
import styled from 'styled-components';

const Test = styled.div`
    background-color : ${(props) => props.theme.mainColor};
`

const App = () => {
    return <Test>App</Test>;
};

export default App;
