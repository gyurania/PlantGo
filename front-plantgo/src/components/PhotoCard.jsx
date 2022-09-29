

let PhotoCard = (props) => {
    console.log(props)
    return (
        <div className="photocard">
            <div style={{
                backgroundImage: `url(${props.data.photoUrl})`,
            }} className="front"></div>
            <div className="back">
                <p>{props.data.area}</p>
                <p>{props.data.memo}</p>
            </div>
            <button className="photocardbutton">카카오톡 공유</button>
        </div>
    )
}

export default PhotoCard;