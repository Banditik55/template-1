import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import css from "../css/tv_list.module.scss"

const Index = () => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  const getList = async () => {
    const password = localStorage.getItem("tv:auth")

    try {
      let res = await fetch(`${window.location.origin}/api/getList`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      })
      if (res.status === 200) {
        res = await res.json()
        setLoading(false)
        setData(res)
      } else if (res.status === 202) {
        setLoading(false)
        res = await res.json()
        setError(res.message)
      } else {
        setLoading(false)
        setError("Ошибка сервера")
      }
    } catch (e) {
      setLoading(false)
      setError("Error #68534")
    }
  }

  useEffect(() => {
    document.title = "TV / dmitry.fun"
    getList()
  }, [])

  return (
    <section className={css.main}>
      <header>
        <Link to="/tv">TV</Link>
      </header>

      <main>
        {(() => {
          if (loading) {
            return (
              <div className={css.loading}>
                <h1>Загрузка данных с сервера...</h1>
                <div className={css.loader}>
                  <div className={css["lds-roller"]}>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                  </div>
                </div>
              </div>
            )
          }

          if (error) {
            return <h1>{error.toString()}</h1>
          }
        })()}

        {data.map((v) => {
          const img = v.poster
          const title = v.title
          const id = v._id

          return (
            <Link to={`/tv/watch/${id}`} key={id}>
              <img src={img} alt={title} width={"100%"} height={"100%"} loading="lazy" />
              <div>
                <span>{title}</span>
              </div>
            </Link>
          )
        })}
      </main>
    </section>
  )
}

export default Index
