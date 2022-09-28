import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const PhotoCards = () => {

    const location = useLocation();

    return (
        <div>
            {location.state.plantInfo}

        </div>
    )
}

export default PhotoCards;