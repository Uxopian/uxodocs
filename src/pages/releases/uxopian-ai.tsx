import React, { useEffect } from "react";
import { useHistory } from "@docusaurus/router";

export default function UxopianAiReleasesRedirect() {
    const history = useHistory();

    useEffect(() => {
        history.replace("/releases?product=uxopian-ai");
    }, [history]);

    return null;
}
