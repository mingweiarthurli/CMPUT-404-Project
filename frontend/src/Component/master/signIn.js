import React, {Fragment} from 'react';
import SignInForm from '../Fragments/SignInForm';
import BottomBar from '../Fragments/BottomBar';

const signIn = () => (
    <Fragment>
        <SignInForm />
        <BottomBar />
    </Fragment>
    
);
export default signIn;