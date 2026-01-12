import React, { useEffect } from "react";
import { useHistory } from "@docusaurus/router";

export default function ARenderReleasesRedirect() {
    const history = useHistory();

    useEffect(() => {
        history.replace("/releases?product=arender");
    }, [history]);

    return null;
}
