import React, { useEffect } from "react"
import { Link } from "react-router-dom"
import css from "../css/contacts.module.scss"
import { webTitle } from "../components/settings"

const Index = () => {
  useEffect(() => {
    document.title = `Контакты / ${webTitle}`
  }, [])

  return (
    <>
      <section className={css.main}>
        <header>
          <Link to="/tv">TV</Link>
        </header>

        <main>
          <span>
            Если Вы владелец авторских прав, просим Вас учесть, что все фильмы и
            сериалы на сайте из сторонних API источников. Пишите напрямую по
            контактным данным этих видео-хостингов, для соблюдения DMCA. В 99%
            случаев они удаляют спорный контент в течении 24 часов. Фильмы и
            сериалы недоступные на первоисточнике априори не будут отображаться.
            <br />
            <br />
            По вопросам авторского права и всего остального, пишите на
            контактные данные видео-хостингов!
          </span>
        </main>
      </section>
    </>
  )
}

export default Index
