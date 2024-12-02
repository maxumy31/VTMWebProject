import styles from "./AuthPage.module.css"
import React, { useState , useEffect} from 'react';
import { apiService } from '../Api/ApiService.js';
import caineImage from "./../Images/caine.webp";

import { useSelector, useDispatch } from 'react-redux';
import { setUser, clearUser, store } from './../Store/store'; 

export default function AuthPage({loadNextPage})
{
    const [userPassword, setUserPassword] = useState("");
    const [userLogin, setUserLogin] = useState("");
    const [message, setMessage] = useState('');
    const [errorMessage,setErrorMessage] = useState('')
    let isInitialized = false

    function prepareHandleChange(setter)
    {
        return function(event)
        {
            const value = event.target.value
            setter(value)
            console.log({"login":userLogin,"password":userPassword})
        }
    }

    const handleLoginChange = prepareHandleChange(setUserLogin)

    const handlePassowrdChange = prepareHandleChange(setUserPassword)

    const dispatch = useDispatch()

    const user = useSelector((state) => state.user)


    function handleAuth()
    {
        apiService.post('Auth',{"login":userLogin,"password":userPassword}) 
          .then(response => {
            console.log(response.data);
            LoadCookie()
          })
          .catch(error => {
            console.error('Error fetching data:', error);
          });
    }

    const checkLogin = [
      ((str) => [str.length < 20,"В логине должно быть меньше 20 символов"]),
      ((str) => [str.length > 5, "В логине должно быть больше 5 символов"])
    ]

    const checkPassword = [
      ((str) => [str.length < 20,"В пароле должно быть меньше 20 символов"]),
      ((str) => [str.length > 5, "В пароле должно быть больше 5 символов"])
    ]
    function checkString(str, functions)
    {
      const erorrs = functions.filter(f => !f(str)[0])
      if (erorrs.length == 0) return [true,""]
      else return [false,erorrs[0](str)[1]]
    }


    function handleRegistation()
    {
      const [loginCheck,loginErrorValue] = checkString(userLogin,checkLogin)
      if(!loginCheck)
      {
        setErrorMessage(loginErrorValue)
        return
      }

      const [passwordCheck,passwordErrorValue] = checkString(userPassword,checkPassword)
      if(!passwordCheck)
      {
        setErrorMessage(passwordErrorValue)
        return
      }
      setErrorMessage("")


      apiService.post('User',{"login":userLogin,"password":userPassword}) 
          .then(response => {
            console.log(response.data);
          })
          .catch(error => {
            console.error('Error fetching data:', error);
          });
    }


    function LoadCookie()
    {
      apiService.get('User').then(response => 
        {
          if(response["data"]["data"] != null) {
            const cid = response["data"]["data"]["id"]
            dispatch(setUser({id : cid}))
            console.log("cookie loaded")
          } else {
            console.log("cookie not loaded")
          }
        })
    }

    useEffect(() => {
      console.log("use effect")
      const storedUserId = localStorage.getItem("userID")
      if(user && user.id)
      {
        console.log("updatedUser inside : ",user.id);
        localStorage.setItem("userID",user.id)
        loadNextPage("character_overview")
      } else if(storedUserId)
      {
        console.log("setting to storage", storedUserId)
        dispatch(setUser({id : storedUserId}))
      } else {
        LoadCookie();
      }
    },[user])


    

    return(
        <div className={styles.wrap}>
                <div>
                    <img width="220" height="200" alt = {"Картинка не найдена"} src = {caineImage} />
                </div>
                <div>
                        <h4 className={styles.header}>Логин</h4>
                        <input className={styles.user_input} onChange={handleLoginChange}/>

                        <h4 className={styles.header}>Пароль</h4>
                        <input className={styles.user_input} onChange = {handlePassowrdChange} type="password"/>
                        <h5 className={styles.header}>{errorMessage}</h5>

                        <div className={styles.buttons_div}>
                            <button className={styles.buttons} onClick = {handleAuth}>Войти</button>
                            <button className={styles.buttons} onClick = {handleRegistation}>Регистрация</button>
                        </div>
                </div>
                <div>
                
                </div>
        </div>
    )
}