import Nlink from './Link'
import { signIn, signOut, useSession } from 'next-auth/client'
import styles from './header.module.css'

// The approach used in this component shows how to built a sign in and sign out
// component that works on pages which support both client and server side
// rendering, and avoids any flash incorrect content on initial page load.
export default function Header () {
  const [ session, loading ] = useSession()

  //存在用户时才显示个人界面的nav
  let mepage = null;
  if(session) mepage=<>
  <li className={styles.navItem}><Nlink className="linka" href="/me"><a>我的商品</a></Nlink></li>
  <li className={styles.navItem}><Nlink className="linka" href="/myorder"><a>我的购买</a></Nlink></li>
  <li className={styles.navItem}><Nlink className="linka" href="/mysell"><a>我的出售</a></Nlink></li>
  </>
  return (
    <header>
      <noscript>
        <style>{`.nojs-show { opacity: 1; top: 0; }`}</style>
      </noscript>
      <h1>Resoure - Sharing</h1>
      <div className={styles.signedInStatus}>
        <p className={`nojs-show ${(!session && loading) ? styles.loading : styles.loaded}`}>
          {!session && <>
            <span className={styles.notSignedInText}>请先完成登录</span>
            <a
                href={`/api/auth/signin`}
                className={styles.buttonPrimary}
                onClick={(e) => {
                  e.preventDefault()
                  signIn()
                }}
              >
                登录
              </a>
          </>}
          {session && <>
            {session.user.image && <span style={{backgroundImage: `url(${session.user.image})` }} className={styles.avatar}/>}
            <span className={styles.signedInText}>
              <small>Signed in as</small><br/>
              <strong>{session.user.email || session.user.name}</strong>
              </span>
            <a
                href={`/api/auth/signout`}
                className={styles.button}
                onClick={(e) => {
                  e.preventDefault()
                  signOut()
                }}
              >
                登出
              </a>
          </>}
        </p>
      </div>
      <nav>
        <ul className={styles.navItems}>
          <li className={styles.navItem}><Nlink href="/"><a className="linka">所有商品</a></Nlink></li>
          {mepage}
          <li className={styles.navItem}><Nlink href="/form"><a className="linka">创建商品</a></Nlink></li>
          <li className={styles.navItem}><Nlink href="/about"><a className="linka">关于</a></Nlink></li>
        </ul>
      </nav>
      <style global jsx>{`
  .selected{
    text-decoration: none;
}
  `}
  </style>
    </header>
    
  )
}
