import React, { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import css from "../css/tv_episode.module.scss"

const Main = () => {
  // query
  const { id } = useParams()
  // data
  const [data, setData] = useState()
  const [filmData, setFilmData] = useState()
  // loading
  const [loading, setLoading] = useState(true)
  // error
  const [error, setError] = useState()
  // nav
  const nav = useNavigate()

  const Init = async () => {
    try {
      const password = localStorage.getItem("tv:auth")

      let data = await fetch(`${window.location.origin}/api/getDocById?id=${id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      })
      if (data.status === 200) {
        data = await data.json()
        if (data && data.length > 0) {
          if (data[0].type !== "Сериал") {
            nav("/tv")
            return ""
          }

          setData(data[0])
          getFilmData(data[0].kpId)
        }
      } else if (data.status === 202) {
        data = await data.json()
        setError(data.message)
        setLoading(false)
      } else {
        setLoading(false)
        setError("Ошибка сервера")
      }
    } catch (e) {
      setLoading(false)
      setError("Ошибка JS #1")
    }
  }

  const getFilmData = async (id) => {
    try {
      const password = localStorage.getItem("tv:auth")

      let data = await fetch(`${window.location.origin}/api/getEpisodes?kpid=${id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      })
      if (data.status === 200) {
        data = await data.json()
        if (data) {
          setFilmData(data)
          setLoading(false)
        }
      } else if (data.status === 202) {
        data = await data.json()
        setError(data.message)
        setLoading(false)
      } else {
        setError("Ошибка сервера")
        setLoading(false)
      }
    } catch (e) {
      setError("Ошибка JS #2")
      setLoading(false)
    }
  }

  useEffect(() => {
    document.title = "TV / dmitry.fun"
    Init()
  }, [])

  return (
    <>
      <section className={css.section}>
        {data && (
          <Link to={`/tv/watch/${data._id}`}>
            {data.title} - {data.year}
          </Link>
        )}
        {error && (
          <div className={css.error}>
            <h1>{error}</h1>
          </div>
        )}
        {loading && (
          <div className={css.loading}>
            <h1>Загрузка...</h1>
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
        )}
        <table className={css.table}>
          <tbody>
            {filmData &&
              filmData.translations &&
              filmData.translations.map((v, i) => {
                return (
                  <React.Fragment key={i}>
                    <tr>
                      <th>{v.label}</th>
                    </tr>

                    {filmData.files[v.id].map((vv, ii) => {
                      return (
                        <React.Fragment key={ii}>
                          <tr>
                            {filmData.singleSeason ? (
                              <React.Fragment>
                                <td>
                                  <a href={`/tv/watch/${data._id}?translation=${i + 1}&season=1&episode=${ii + 1}`}>{vv.comment}</a>
                                </td>
                              </React.Fragment>
                            ) : (
                              <>
                                <th>{vv.comment}</th>
                                {vv.folder.map((vvv, iii) => {
                                  return (
                                    <React.Fragment key={iii}>
                                      <td>
                                        <a href={`/tv/watch/${data._id}?translation=${i + 1}&season=${ii + 1}&episode=${iii + 1}`}>{vvv.comment}</a>
                                      </td>
                                    </React.Fragment>
                                  )
                                })}
                              </>
                            )}
                          </tr>
                        </React.Fragment>
                      )
                    })}
                  </React.Fragment>
                )
              })}
          </tbody>
        </table>
      </section>
    </>
  )
}

export default Main
