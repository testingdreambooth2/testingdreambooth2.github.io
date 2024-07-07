

function ButtonS() {

const handleClick3 = (e) => e.target.textContent = "OUCH";

    let count = 0;


const handleClick = (name) => {
    if(count<3) {
        count++;
        console.log(`${name} clicked me ${count} times`)
    }
    else {
        console.log(`${name} stop clicking `)
    }
};

const handleClick2 = (name) => console.log(`${name} stio clicking nigger`);

return(<button onDoubleClick={(e)=>handleClick3(e)}>click me EMOJI_HERE</button>)

}
export default ButtonS;