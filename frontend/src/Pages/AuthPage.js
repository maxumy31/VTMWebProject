import styles from "./AuthPage.module.css"
import React, { useState , useEffect} from 'react';
import { apiService } from '../Api/ApiService.js';
import caineImage from "./../Images/caine.webp";


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




    function handleAuth()
    {
        apiService.post('Auth',{"login":userLogin,"password":userPassword}) 
          .then(response => {
            console.log(response.data);
            loadCookie()
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


    function loadCookie()
    {
      apiService.get('User').then(response => 
        {
          if(response["data"]["data"] != null) {
            const cid = response["data"]["data"]["id"]
            localStorage.setItem("userID",cid)
            console.log("cookie loaded")
            tryLogin()
          } else {
            console.log("cookie not loaded")
          }
        })
    }

    function tryLogin()
    {
      const storedUserId = localStorage.getItem("userID")
      console.log(storedUserId)
      if(storedUserId)
      {
        loadNextPage("character_overview")
        return true;
      }
      return false;
    }

    useEffect(() => {
      console.log("use effect")
      if(tryLogin())
      {
        console.log("setting to storage")
      } 
      else 
      {
        loadCookie();
      }
    },)


    

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