import styles from "./AuthPage.module.css"

export default function AuthPage({loadNextPage})
{
    return(
        <div className={styles.wrap}>
                <div>
                    <img width="220" height="200" alt = {"Картинка не найдена"} src = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBSpx0KAHSG_4Mx_FyV-2pLbfs3oa8Odg4TA&s" />
                </div>
                <div>
                    <form>
                        <h4 className={styles.header}>Логин</h4>
                        <input className={styles.user_input}/>
                        <h4 className={styles.header}>Пароль</h4>
                        <input className={styles.user_input} type="password"/>
                        <div className={styles.buttons_div}>
                            <button className={styles.buttons} onClick={() => loadNextPage("character_overview")}>Войти</button>
                            <button className={styles.buttons}>Регистрация</button>
                        </div>
                    </form>
                </div>
                <div>
                
                </div>
        </div>
    )
}