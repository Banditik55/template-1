import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import css from "../css/tv.module.scss"
import { webTitle } from "../components/settings"

const Main = () => {
  useEffect(() => {
    document.title = `TV / ${webTitle}`
  }, [])

  return (
    <>
      <section className={css.main}>
        <header>
          <Link to="/">TV</Link>
        </header>

        <nav>
          <Link to="/tv/contacts">контакты</Link>
          <Link to="/tv/search">поиск</Link>
          <Link to="/tv/favorites">избранное</Link>
          <Link to="/tv/collections">коллекции</Link>
          <Link to="/tv/series">активные сериалы</Link>
          <Link to="/tv/auth">auth</Link>
        </nav>
      </section>
    </>
  )
}

export default Main
