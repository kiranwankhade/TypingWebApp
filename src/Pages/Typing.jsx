import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { startPractice, finishPractice, updateTypedKey, calculateAccuracy } from '../Redux/action';
import { Modal } from 'react-overlays';

import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { auth, logout } from "../firebase";

import "../Styles/Typing.css"

import logo from "../logo.png"

const Typing = () => {

  //getting user from firebase Auth
  const [user] = useAuthState(auth);
  console.log('user:', user)

  const navigate = useNavigate();


  //dispatch function 
  const dispatch = useDispatch();

  //get current added keys
  const [currentKey, setCurrentKey] = useState('');

  //typed key gey stored 
  const typedKeys = useSelector((store) => store.typedKeys);
  
 //get accuracy from the store 
  const accuracy = useSelector((store) => store.accuracy);

  //to show the accuracy after time ends
  const [modalAccuracy,setModalAccuracy] = useState(accuracy)

  //timer countdown setup
  const [countDown, setCountDown] = React.useState(0);
  const [runTimer, setRunTimer] = React.useState(false);


  //counting key typed in input
  const [countKeys,setCountKeys] = useState(0);

  // checking the typing key is right or wrong
  const [keyRight,setKeyRight] = useState(true);

  // Modal Setup
  const [showModal, setShowModal] = useState(false);
    //close Modal Function
    var handleClose = () => setShowModal(false); 
  
    //Success Modal Function
    var handleSuccess = async() => {
          try{
            if(runTimer === true){
              setModalAccuracy(accuracy)
            }
           
            setShowModal(false);
            window.location.reload();
          }catch(err){
            console.log('err:', err)

          }
    };
  
    //back functionality
    const renderBackdrop = (props) => {
      return (
        <div className="backdrop" {...props} />
      )
    };

  useEffect(() => {

    dispatch(startPractice());
    setCurrentKey(getRandomKey());
    setRunTimer(true);
    let timerId;
    //check the timer
    if (runTimer) {     
      setCountDown(60 * 5);   
      timerId = setInterval(() => {
        setCountDown((countDown) => countDown - 1); 
        dispatch(finishPractice());
        dispatch(calculateAccuracy());
      }, 1000);
    } 
    else {
      clearInterval(timerId);
    //   dispatch(startPractice());
    //   setCountKeys(0)
     
      
    //   alert(`You have Typed ${countKeys} words within 5 Min` )
      
    }
    return () => { 
        setModalAccuracy(accuracy)
        clearInterval(timerId)
    };
  }, [runTimer]);

  // checking after timer
  React.useEffect(() => {
    if (countDown < 0 && runTimer) {
      console.log("expired");
      setRunTimer(false);
      setCountDown(0);
      
      setShowModal(true);
    }
  }, [countDown, runTimer]);

  // seconds minutes
  const seconds = String(countDown % 60).padStart(2, 0);
  const minutes = String(Math.floor(countDown / 60)).padStart(2, 0);

  //After Change in input
  const handleKeyPress = (event) => {
    
    const key = event.target.value.toLowerCase();
    const hideDiv = document.getElementById("hideDiv");
    if (key === currentKey) {
      hideDiv.style.display = "block";
      dispatch(updateTypedKey(key));
      setCurrentKey(getRandomKey());
      setKeyRight(true)
    }else{
        hideDiv.style.display = "block";
        dispatch(updateTypedKey(key));
        if(key !== ""){
            setKeyRight(false)
        } 
    }

    if(currentKey === ""){
        dispatch(startPractice());
    }

    // let filter = typedKeys.filter((key) => {return key !==""})
    setCountKeys(typedKeys.length);
  };


  //getting random keys
  const getRandomKey = () => {
    const keys = ['a', 's', 'd', 'f', 'j', 'k', 'l', ';'];
    const randomIndex = Math.floor(Math.random() * keys.length);
    console.log('randomIndex:', randomIndex)
    dispatch(finishPractice());
    dispatch(calculateAccuracy());
   
    return keys[randomIndex];
    
    // Its for Words
    // const keysLength = keys.length;
    // let counter = 0;
    // let result = '';
    // while (counter < length) {
    //   result += keys[Math.floor(Math.random() * keysLength)];
    //   counter += 1;
    // }

    
    // if (result.length === 0) {
    //     // All keys have been typed, practice finished
    //     dispatch(finishPractice());
    //     dispatch(calculateAccuracy());
    //     return '';
    //   }
    
    // return result;
  };

  const handleLogin = () => {
      navigate("/login")
  }
  

  return (
    <>
      <div id='navbar'>
        <button id='buttonLogo' onClick={()=>{
          navigate("/")
        }}>
          <img className='logo' src={logo} alt="logo" />
        </button>
        {
          user ?
           <div className='logoDiv'>
           <div>
              <img className='logo' src={user?.photoURL} alt="profile" />
            </div>
            <button className='logout' onClick={logout}>Logout</button>
            </div> : <>
          <button className='logout' onClick={handleLogin}>
            Login
          </button>
          </>
        }
       
      </div>
      <div id='main'>
        <h1>❀  Touch Typing Practice ❀</h1>
        <div id='inputType'>
          <p>Type : <span>{currentKey}</span></p>
          <input type="text" placeholder='Write word here' onChange={handleKeyPress} autoFocus />
        </div>
        <div id='hideDiv'>
        {keyRight ? <p id='right'>Typed Key is Right</p> : <p id='wrong'>Typed Key is Wrong</p> }
        </div>

        {/* {keyRight ? <p id='right'>Typed Key is Right</p> : <p id='wrong'>Typed Key is Wrong</p> } */}
        
        <div className='timerDiv'>Timer: <span>{minutes}:{seconds}</span></div>
        {/* <div  className='timerDiv'>
          Typed Keys: <span> {typedKeys.join(', ')}</span>
        </div> */}
        <div className='correctDiv' >Total Keys type {countKeys} in time </div>
        <div className='timerDiv'>Accuracy: <span>{accuracy}</span></div>
        {/* Modal */}
        <Modal
          className="modal"
          show={showModal}
          onHide={handleClose}
          renderBackdrop={renderBackdrop}
          center
        >
          <div>
            <div className="modal-header">
              <div className="modal-title">Result of Your Typing</div>
              <div>
                <span className="close-button" onClick={handleClose}>
                  x
                </span>
              </div>
            </div>
            <div className="modal-desc">
                <p>{user ? `${user?.displayName} You `: "You"} have typed over <span>{countKeys}</span> keys in 5 min</p>
                <p>Accuracy : <span>{modalAccuracy}</span></p>
            </div>
            <div className="modal-footer">
            
              <button className="primary-button" onClick={handleSuccess}>
                Retry
              </button>

              <button className="secondary-button" onClick={handleClose}>
                Close
              </button>
            </div>
          </div>
          </Modal>
      </div>
    </>
  );
};

export default Typing;
