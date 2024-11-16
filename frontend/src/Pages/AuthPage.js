import styles from "./AuthPage.module.css"

export default function AuthPage({loadNextPage})
{
    return(
        <div className={styles.wrap}>
                <div>
                    <img width="220" height="200" src = "https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Cat_August_2010-4.jpg/1200px-Cat_August_2010-4.jpg" />
                </div>
                <div>
                    <form>
                        <h4 className={styles.header}>Login</h4>
                        <input className={styles.user_input}/>
                        <h4 className={styles.header}>Password</h4>
                        <input className={styles.user_input} type="password"/>
                        <div className={styles.buttons_div}>
                            <button className={styles.buttons} onClick={() => loadNextPage("character_overview")}>Login</button>
                            <button className={styles.buttons}>Register</button>
                        </div>
                    </form>
                </div>
                <div>
                
                </div>
        </div>
    )
}