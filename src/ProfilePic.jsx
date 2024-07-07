
function ProfilePic() {

    const url = './src/assets/drip_goku.png';

    const handleCLick = (e) => e.target.style.display = "none";

    return(<img onClick={(e) => handleCLick(e)} src={url}></img>)
}

export default ProfilePic