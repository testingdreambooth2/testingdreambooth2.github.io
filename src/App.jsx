import Header from './Header';
import Footer from './Footer';
import Food from './Food';
import Card from './Card';
import Button from './Button/Button';
import Student from './Student';
import UserGreeting from './UserGreeting';
import List from './List';
import ButtonS from './ButtonS';
import ProfilePic from './ProfilePic';
import Counter from './Counter';
import MyComponent from './MyComponent';


function App() {

const fruits = [{id: 1, name: "apple", calories: 100},
  {id: 2, name: "orange", calories: 110},
  {id: 3, name: "banana", calories: 120},
  {id: 4, name: "coconut", calories: 130},
  {id: 5, name: "pineapple", calories: 140}
  

  

];



const veg = [{id: 6, name: "apple2", calories: 100},
  {id: 7, name: "orange2", calories: 110},
  {id: 8, name: "banana2", calories: 120},
  {id: 9, name: "coconut2", calories: 130},
  {id: 10, name: "pineapple2", calories: 140}
];

 
  return(
    <>
    <MyComponent/>
    <Counter/>
    <ProfilePic/>
    <ButtonS/>
    <List items={fruits} category="Fruits"/>
    <List items={veg} category="Veg"/> </> );
}

export default App
