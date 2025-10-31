import React from 'react';
import OriginalNavbar from '@theme-original/Navbar';
import SecondaryNav from '@site/src/components/SecondaryNav';

export default function Navbar(props: any) {
    return (
        <>
            <OriginalNavbar {...props} />
            <SecondaryNav />
        </>
    );
}
