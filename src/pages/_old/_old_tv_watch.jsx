import React, { useEffect, useLayoutEffect, useRef, useState } from "react"
import { Link, useParams, useSearchParams } from "react-router-dom"
import css from "../css/tv_watch.module.scss"
import Player from "../components/player"
import settings from "../components/settings.jsx"

const Main = () => {
  // query
  const { id } = useParams()
  // data
  const [data, setData] = useState([])
  const [filmData, setFilmData] = useState(false)
  // loading
  const [loading, setLoading] = useState(true)
  const [loadingPlayer, setLoadingPlayer] = useState(true)
  // error
  const [error, setError] = useState("")
  // refs
  const episodeSelector = useRef()
  const seasonSelector = useRef()
  const dom = {}
  dom.playerWrap = useRef()
  dom.player = useRef()
  dom.fsButton = useRef()
  // params
  const [searchParams] = useSearchParams()
  const translation = searchParams.get("translation") || 1
  const [season, setSeason] = useState(searchParams.get("season") || 1)
  const [episode, setEpisode] = useState(searchParams.get("episode") || 1)
  // set page title
  const setTitle = (title) => {
    document.title = title
  }
  // vars
  let FS = false

  const Init = async () => {
    try {
      const password = localStorage.getItem("tv:auth")

      let data = await fetch(
        `${window.location.origin}/api/getDocById?id=${id}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ password }),
        }
      )
      if (data.status === 200) {
        data = await data.json()
        setLoading(false)
        if (data && data.length > 0) {
          setData(data[0])
          setTitle(`${data[0].title} / TV / dmitry.fun`)

          getFilmData(data[0].kpId)
        }
      } else if (data.status === 202) {
        setLoading(false)
        setLoadingPlayer(false)
        data = await data.json()
        setError(data.message)
      }
    } catch (e) {
      setLoading(false)
      setLoadingPlayer(false)
      setError(`Error: Ошибка JS`)
    }
  }

  const getFilmData = async (id) => {
    try {
      let query = ""
      if (translation) {
        query += `&translation=${translation}`
      }

      if (season) {
        query += `&season=${season}`
      }

      if (episode) {
        query += `&episode=${episode}`
      }

      const password = localStorage.getItem("tv:auth")

      let data = await fetch(
        `${window.location.origin}/api/getFilmData?kpid=${id}${query}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ password }),
        }
      )
      if (data.status === 200) {
        data = await data.json()
        if (data && !data.error) {
          initPlayer(data)
        } else if (data.error) {
          setLoadingPlayer(false)
          setError(data.error)
          Player({ id: "player", file: "", poster: "" })
        }
      } else if (data.status === 202) {
        setLoadingPlayer(false)
        data = await data.json()
        setError(data.message)
      } else {
        setLoadingPlayer(false)
        setError("Ошибка сервера")
      }
    } catch (e) {
      setError(`Error2: Ошибка JS`)
    }
  }

  const initPlayer = (data) => {
    if (data.type === "Фильм") {
      const link = data.data
      let poster = ""

      // let shortLink = link.split("]")
      // shortLink = shortLink[1].split(" ")
      // shortLink = shortLink[0].split("/")
      // for (let i = 0; i < shortLink.length; i++) {
      //   if (i == shortLink.length - 1) break
      //   poster += `/${shortLink[i]}`
      // }
      // poster += `/thumb003.jpg`

      setFilmData(data)
      setLoadingPlayer(false)
      Player({ id: "player", file: link, poster })
    } else if (data.type === "Сериал") {
      let link = ""
      let poster = ""

      if (data.singleSeason) {
        link = data.data[Number(episode) - 1].file
      } else {
        let _season = Number(season) - 1
        let _episode = Number(episode) - 1
        link = data.data[_season].folder[_episode].file
      }

      setFilmData(data)
      setLoadingPlayer(false)
      Player({ id: "player", file: link, poster })
    }
  }

  const setPlayerFile = (file, poster) => {
    window.pljssglobal[0].api("file", file)
    window.pljssglobal[0].api("poster", poster)
  }

  const onChangeTranslationSelector = (v) => {
    const value = v.target.value

    const url = `${window.location.origin}${window.location.pathname}?translation=${value}`
    window.location = url
  }

  const onChangeSeasonSelector = (v) => {
    const value = v.target.value
    setSeason(value)

    // change history w/o reloading
    let url = `${window.location.origin}${window.location.pathname}?translation=${translation}&season=${value}`
    window.history.pushState("", "", url)

    let link = filmData.data[Number(value) - 1].folder[0].file

    setPlayerFile(link, "")
  }

  const onChangeEpisodeSelector = (v) => {
    const value = v.target.value
    setEpisode(value)

    // change history w/o reloading
    let url = `${window.location.origin}${window.location.pathname}?translation=${translation}&season=${season}&episode=${value}`
    window.history.pushState("", "", url)

    let link
    if (!filmData.singleSeason) {
      link = filmData.data[Number(season) - 1].folder[Number(value) - 1].file
    } else if (filmData.singleSeason) {
      link = filmData.data[Number(value) - 1].file
    }

    setPlayerFile(link, "")
  }

  const formatLink = (link) => {
    const poster = `${link}thumb003.jpg`
    let linkList = ""
    const qualities = ["240", "360", "480", "720", "1080"]
    qualities.map((v) => {
      linkList += `[${v}p]${link}${v}.mp4,`
      return ""
    })
    return { linkList, poster }
  }

  const onNextEpisode = () => {
    if (!filmData.singleSeason) {
      if (filmData.data[Number(season) - 1].folder.length > Number(episode)) {
        const link =
          filmData.data[Number(season) - 1].folder[Number(episode)].file
        setEpisode(Number(episode) + 1)

        let url = `${window.location.origin}${
          window.location.pathname
        }?translation=${translation}&season=${season}&episode=${
          Number(episode) + 1
        }`
        window.history.pushState("", "", url)

        setPlayerFile(link, "")

        episodeSelector.current.value = Number(episode) + 1
      } else {
        if (filmData.data.length > Number(season)) {
          const link = filmData.data[Number(season)].folder[0].file

          let url = `${window.location.origin}${
            window.location.pathname
          }?translation=${translation}&season=${
            Number(season) + 1
          }&episode=${1}`
          window.history.pushState("", "", url)

          setSeason(Number(season) + 1)
          setEpisode(1)

          setPlayerFile(link, "")

          seasonSelector.current.value = Number(season) + 1
          episodeSelector.current.value = 1
        }
      }
    } else {
      if (filmData.data.length > Number(episode)) {
        const link = filmData.data[Number(episode)].file
        setEpisode(Number(episode) + 1)

        let url = `${window.location.origin}${
          window.location.pathname
        }?translation=${translation}&season=${1}&episode=${Number(episode) + 1}`
        window.history.pushState("", "", url)

        setPlayerFile(link, "")

        episodeSelector.current.value = Number(episode) + 1
      }
    }
  }

  const toggleFullscreen = () => {
    if (!FS) {
      FS = true
      dom.playerWrap.current.style.margin = "0"
      dom.playerWrap.current.style.position = "absolute"
      dom.playerWrap.current.style.top = "0"
      dom.playerWrap.current.style.left = "0"
      dom.playerWrap.current.style.width = "100%"
      dom.playerWrap.current.style.height = "100%"
      dom.player.current.style.margin = "0"
      dom.fsButton.current.style.display = "block"
    } else {
      FS = false
      dom.playerWrap.current.style["margin-top"] = "1rem"
      dom.playerWrap.current.style.position = "relative"
      dom.playerWrap.current.style.width = "600px"
      dom.playerWrap.current.style.height = "300px"
      dom.player.current.style.margin = "0"
      dom.fsButton.current.style.display = "none"
    }
  }

  useEffect(() => {
    setTitle("TV / dmitry.fun")
    Init()
  }, [])

  return (
    <>
      <section className={css.main}>
        <header>
          <Link to="/tv">TV</Link>
        </header>
        <main>
          {loading && (
            <div className={css.loading}>
              <h1>Загрузка информации...</h1>
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
          )}
          {error && <h1>{error.toString()}</h1>}

          {data && (
            <>
              {data.poster && (
                <div className={css.top}>
                  <img
                    src={data.poster}
                    alt={data.title}
                    width={"250px"}
                    height={"350px"}
                  />
                  <div className={css.info}>
                    <h1>{data.title}</h1>
                    <h3>{data.subtitle}</h3>
                    <h4>{`Год выхода: ${data.year}`}</h4>
                    <h4>{`Страна: ${data.country.join(", ")}`}</h4>
                    <h4>{`Жанр: ${data.genre.join(", ")}`}</h4>
                    <p>
                      kpID:{" "}
                      <a
                        href={`//kinopoisk.ru/film/${data.kpId}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {data.kpId}
                      </a>
                    </p>
                    {data.type === "Сериал" && (
                      <Link to={`/tv/watch/${data._id}/episodes`}>
                        Все сезоны и серии
                      </Link>
                    )}
                  </div>
                </div>
              )}

              {loadingPlayer && (
                <div className={css.loading}>
                  <h1>Загрузка плеера...</h1>
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
              )}

              {filmData && filmData.type === "Фильм" && (
                <div className={css.items}>
                  <button onClick={() => toggleFullscreen()}>FS</button>
                  <select
                    className={css.item}
                    onChange={onChangeTranslationSelector}
                    defaultValue={"DEFAULT"}
                  >
                    <optgroup label="Перевод"></optgroup>
                    {filmData && filmData.translations && (
                      <>
                        {filmData.translations.map((v, i) => {
                          return (
                            <option
                              value={
                                Number(searchParams.get("translation")) ===
                                i + 1
                                  ? "DEFAULT"
                                  : i + 1
                              }
                              key={v.id}
                            >
                              {v.label}
                            </option>
                          )
                        })}
                      </>
                    )}
                  </select>
                </div>
              )}

              {filmData && filmData.type === "Сериал" && (
                <div className={css.items}>
                  <button onClick={() => toggleFullscreen()}>FS</button>
                  <select
                    className={css.item}
                    onChange={onChangeTranslationSelector}
                    defaultValue={"DEFAULT"}
                  >
                    <optgroup label="Перевод"></optgroup>
                    {filmData && filmData.translations && (
                      <>
                        {filmData.translations.map((v, i) => {
                          return (
                            <option
                              value={
                                Number(translation) === i + 1
                                  ? "DEFAULT"
                                  : i + 1
                              }
                              key={v.id}
                            >
                              {v.label}
                            </option>
                          )
                        })}
                      </>
                    )}
                  </select>
                  {filmData && !filmData.singleSeason && (
                    <select
                      className={css.item}
                      onChange={onChangeSeasonSelector}
                      defaultValue={"DEFAULT"}
                      ref={seasonSelector}
                    >
                      <optgroup label="Сезон"></optgroup>
                      {filmData && filmData.data && (
                        <>
                          {filmData.data.map((v, i) => {
                            return (
                              <option
                                value={
                                  Number(season) === i + 1 ? "DEFAULT" : i + 1
                                }
                                key={v.id}
                              >
                                {v.comment}
                              </option>
                            )
                          })}
                        </>
                      )}
                    </select>
                  )}
                  <select
                    className={css.item}
                    onChange={onChangeEpisodeSelector}
                    defaultValue={"DEFAULT"}
                    ref={episodeSelector}
                  >
                    <optgroup label="Серия"></optgroup>
                    {filmData && filmData.data && !filmData.singleSeason && (
                      <>
                        {filmData.data[Number(season) - 1].folder.map(
                          (v, i) => {
                            return (
                              <option
                                value={
                                  Number(episode) === i + 1 ? "DEFAULT" : i + 1
                                }
                                key={v.id}
                              >
                                {v.comment}
                              </option>
                            )
                          }
                        )}
                      </>
                    )}
                    {filmData && filmData.data && filmData.singleSeason && (
                      <>
                        {filmData.data.map((v, i) => {
                          return (
                            <option
                              value={
                                Number(episode) === i + 1 ? "DEFAULT" : i + 1
                              }
                              key={v.id}
                            >
                              {v.comment}
                            </option>
                          )
                        })}
                      </>
                    )}
                  </select>
                  <button onClick={() => onNextEpisode()}>{">>>"}</button>
                </div>
              )}
              <div
                ref={dom.playerWrap}
                className={css.playerWrap}
                style={{ width: "600px", height: "300px", marginTop: "1rem" }}
              >
                <button
                  onClick={() => {
                    toggleFullscreen()
                  }}
                  ref={dom.fsButton}
                  style={{ display: "none" }}
                  className={css.fsButton}
                >
                  •
                </button>
                {!error && (
                  <div
                    id="player"
                    ref={dom.player}
                    className={css.player}
                    style={{ width: "100%", height: "100%" }}
                  ></div>
                )}
              </div>
            </>
          )}
        </main>
      </section>
    </>
  )
}

export default Main
