const PhotoCard = (props) => {
    return (
        <li class="card">
            <img src = {props.imgUrl} />

            <p>{props.memo}</p>
        </li>
    )
}

export default PhotoCard;