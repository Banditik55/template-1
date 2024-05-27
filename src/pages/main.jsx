// REACT
import React, { useEffect } from "react"
import { Link } from "react-router-dom"
// CSS
import css from "../css/main.module.scss"
import { webTitle } from "../components/settings"

const Index = () => {
  useEffect(() => {
    document.title = `${webTitle}`
  }, [])

  return (
    <>
      <main className={css.main}>
        <div className={css.title}>¡Welcome!</div>
        <div className={css.subtitle}>¿hooli nado?</div>
        <ul className={css.list}>
          <li>
            <Link to="/tv">/tv</Link>
          </li>
          <li>
            <Link to="/iptv">/iptv</Link>
          </li>
          <li>
            <Link to="/radio">/radio</Link>
          </li>
          <li>
            <Link to="/music">/music</Link>
          </li>
          <li>
            <Link to="/webdev">/webdev</Link>
          </li>
          <li>
            <Link to="/passgen">/passgen</Link>
          </li>
          <li>
            <Link to="/multiwatch">/multiwatch</Link>
          </li>
          <br />
          <li>
            <a href="/r/gh" target="_blank" rel="noopener noreferrer">
              [github]
            </a>
          </li>
          <li>
            <a href="/r/x" target="_blank" rel="noopener noreferrer">
              [twitter]
            </a>
          </li>
          <li>
            <a href="/r/tr" target="_blank" rel="noopener noreferrer">
              [threads]
            </a>
          </li>
          <li>
            <a href="/r/yt" target="_blank" rel="noopener noreferrer">
              [youtube]
            </a>
          </li>
          <li>
            <a href="/r/tg" target="_blank" rel="noopener noreferrer">
              [telegram]
            </a>
          </li>
          <li>
            <a href="/r/scloud" target="_blank" rel="noopener noreferrer">
              [soundcloud]
            </a>
          </li>
        </ul>
      </main>
    </>
  )
}

export default Index
