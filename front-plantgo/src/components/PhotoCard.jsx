

let PhotoCard = (props) => {
    console.log(props)
    return (
        <div className="photocard">
            <div style={{
                backgroundImage: `URL("http://www.nature.go.kr/fileUpload/plants/basic/Polygonaceae/Persicaria/1314/1314_20160817152323712files.jpg")`
                //backgroundImage: `url(${props.data.photoUrl})`,
            }} className="front">
                <p>2022.03.04</p>
                <br></br>
                <p>강남구</p>
            </div>
            <div className="back">
                <div>
                    <p>강남구에서 찾았다!! 나도 곧 식물박사!!</p>
                    {/* <p>{props.data.area}</p>
                    <p>{props.data.memo}</p> */}

                </div>
                <button className="photocardbutton">Memo</button>
            </div>
        </div>
    )
}

export default PhotoCard;