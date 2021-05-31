import React from 'react';
import Header from "./Header";
import {Container, Typography} from "@material-ui/core";

const Page404 = () => {
    return (
        <>
            <Header/>
            <Container>
                <Typography variant="h1" color={'secondary'} style={{textAlign: "center"}}>PAGE NOT FOUND
                    404</Typography>
            </Container>
        </>
    );
};

export default Page404;