import React, { useEffect, useState } from "react"
import { Link, useSearchParams } from "react-router-dom"
import css from "../css/tv_search.module.scss"
import { localLink, globalLink, webTitle } from "../components/settings.jsx"

const Main = () => {
  const apiLink =
    process.env.NODE_ENV === "development" ? localLink : globalLink

  useEffect(() => {
    document.title = `TV / ${webTitle}`
  }, [])

  const [keyword, setKeyword] = useState("")
  const [data, setData] = useState()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const [searchParams, setSearchParams] = useSearchParams()

  useEffect(() => {
    const query = searchParams.get("q")

    if (query && query.length > 0) {
      setKeyword(query)
    }
  }, [])

  const search = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    setData(false)
    const password = localStorage.getItem("tv:auth")
    if (keyword && keyword.length > 0) {
      setSearchParams({ q: keyword })
    }

    try {
      let res = await fetch(`${apiLink}/api/searchFilms?keyword=${keyword}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password })
      })

      if (res.status === 200) {
        res = await res.json()
        setData(res)
        setLoading(false)
        setError("")
      } else if (res.status === 202) {
        res = await res.json()
        setError(res.message)
        setLoading(false)
      } else {
        setError("Ошибка сервера")
        setLoading(false)
      }
    } catch (e) {
      setError("Ошибка fetch api client")
      setLoading(false)
    }
  }

  const getType = (type) => {
    if (!type) return

    if (type === "TV_SERIES") {
      return "Сериал"
    } else if (type === "FILM") {
      return "Фильм"
    } else {
      return type
    }
  }

  return (
    <>
      <section className={css.main}>
        <header>
          <Link to="/tv">TV</Link>
        </header>

        <main>
          <form onSubmit={search}>
            <div className={css.form}>
              <h3 className={css.title}>
                Введите название фильма или КиноПоиск ID
              </h3>
              <div className={css.row}>
                <input
                  value={keyword}
                  onChange={(e) => {
                    setKeyword(e.target.value)
                  }}
                  type="text"
                  maxLength={32}
                  placeholder="8124"
                />
                <button type="submit">Поиск</button>
              </div>
            </div>
          </form>
          {loading && (
            <>
              <div className={css.loading}>Загрузка...</div>
            </>
          )}
          <div className={css.message}>
            {error && (
              <>
                <h3>{error}</h3>
              </>
            )}
          </div>
          <div className={css.list}>
            {(data && "kinopoiskId" in data && (
              <>
                <Link
                  to={`/tv/watch?id=${data.kinopoiskId}`}
                  className={css.item}
                >
                  <div className={css.info}>
                    <p className={css.title}>{data.nameRu}</p>
                    <p className={css.subtitle}>{data.nameOriginal}</p>
                    <p className={css.type}>{getType(data.type)}</p>
                    <p className={css.year}>{data.year}</p>
                  </div>
                  <img src={data.posterUrlPreview} alt={data.nameRu} />
                </Link>
              </>
            )) ||
              (data && (
                <>
                  {data.map((v, i) => {
                    return (
                      <Link
                        to={`/tv/watch?id=${v.filmId}`}
                        className={css.item}
                        key={i}
                      >
                        <div className={css.info}>
                          <p className={css.title}>{v.nameRu}</p>
                          <p className={css.subtitle}>{v.nameEn}</p>
                          <p className={css.type}>{getType(v.type)}</p>
                          <p className={css.year}>{v.year}</p>
                        </div>
                        <img src={v.posterUrlPreview} alt={v.nameRu} />
                      </Link>
                    )
                  })}
                </>
              ))}
          </div>
        </main>
      </section>
    </>
  )
}

export default Main
