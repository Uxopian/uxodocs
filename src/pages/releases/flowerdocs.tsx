import React, { useEffect } from 'react';
import { useHistory } from '@docusaurus/router';

export default function FlowerDocsReleasesRedirect() {
    const history = useHistory();
    
    useEffect(() => {
        history.replace('/releases?product=flowerdocs');
    }, [history]);
    
    return null;
}
