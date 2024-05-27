import React, { useEffect } from "react"
import { Link } from "react-router-dom"
import css from "../css/webdev.module.scss"
import { webTitle } from "../components/settings"

const WebDev = () => {
  useEffect(() => {
    document.title = `WebDev / ${webTitle}`
  }, [])

  return (
    <>
      <div className={css.header}>
        <Link to="/">WebDev</Link>
      </div>

      <div className={css.main}>
        <div className={css.title}>Проекты:</div>
        <div className={css.items}>
          <div className={css.item}>
            <Link to="/webdev/1">
              <p>ToDo list</p>
            </Link>
          </div>
          <div className={css.item}>
            <Link to="/webdev/2">
              <p>Контакты</p>
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}

export default WebDev
