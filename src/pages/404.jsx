import React, { useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import css from "../css/404.module.scss"

const Index = () => {
  const nav = useNavigate()

  useEffect(() => {
    document.title = "Страница не найдена / 404"
  }, [])

  const goBack = (event) => {
    event.preventDefault()
    nav(-1)
  }

  return (
    <>
      <main className={css.container}>
        <h3>Страница не найдена / 404</h3>
        <div className={css.row}>
          <Link to="/">Главная страница</Link>
          <Link
            to="/"
            onClick={(event) => {
              goBack(event)
            }}
          >
            Назад
          </Link>
        </div>
      </main>
    </>
  )
}

export default Index
