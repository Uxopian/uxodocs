import React, { useEffect } from "react";
import { useHistory } from "@docusaurus/router";

export default function Fast2ReleasesRedirect() {
    const history = useHistory();

    useEffect(() => {
        history.replace("/releases?product=fast2");
    }, [history]);

    return null;
}
