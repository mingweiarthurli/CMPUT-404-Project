import React, { Fragment } from 'react';
import AdminActionForms from '../adminFragments/AdminActionForms';

const adminActions = ({match}) => (
    <Fragment>
        <AdminActionForms action={match.params.action} />
    </Fragment>
);
export default adminActions;