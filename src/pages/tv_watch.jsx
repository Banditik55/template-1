import React, { useEffect, useState } from "react"
import { Link, useSearchParams, useNavigate } from "react-router-dom"
import css from "../css/tv_search_watch.module.scss"
import { localLink, globalLink, webTitle } from "../components/settings.jsx"

import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css"
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules"
import "swiper/css/navigation"
import "swiper/css/pagination"
import "swiper/css/scrollbar"

const Main = () => {
  const nav = useNavigate()
  const [searchParams] = useSearchParams()
  const kp_id = searchParams.get("id")
  const apiLink =
    process.env.NODE_ENV === "development" ? localLink : globalLink

  useEffect(() => {
    document.title = `TV / ${webTitle}`

    if (!kp_id) {
      nav("/tv")
      return
    }

    search()

    return () => {
      document.querySelector("body").style.backgroundImage = ""
    }
  }, [])

  const [list, setList] = useState(false)
  const [data, setData] = useState(false)
  const [error, setError] = useState(false)
  const [description, setDescription] = useState(false)
  const [seasons, setSeasons] = useState(false)
  const [hideSlider, setHideSlider] = useState(false)
  const [trailers, setTrailers] = useState(false)
  const [posters, setPosters] = useState(false)
  const [sequels, setSequels] = useState(false)
  const [similars, setSimilars] = useState(false)

  const search = async () => {
    const password = localStorage.getItem("tv:auth")
    let res

    const initFrame = () => {
      if (res && "nameRu" in res) {
        document.title = `${res.nameRu || res.nameOriginal} / ${webTitle}`
      }

      setDescription(res.description || res.shortDescription || false)
      document.querySelector("body").style.backgroundImage = `url(${
        res.coverUrl || res.posterUrlPreview || ""
      })`

      const list = {
        // RU
        videocdn: {
          link: `${apiLink}/api/getFrame?kp_id=${res.kinopoiskId}&player=videocdn`,
          title: "#1"
        },
        // iframe_video: {
        //   link: `${apiLink}/api/getFrame?kp_id=${res.kinopoiskId}&player=iframe_video`,
        //   title: "iframe",
        // },
        hdvb: {
          link: `${apiLink}/api/getFrame?kp_id=${res.kinopoiskId}&player=hdvb`,
          title: "#2"
        },
        alloha: {
          link: `${apiLink}/api/getFrame?kp_id=${res.kinopoiskId}&player=alloha`,
          title: "#3"
        },
        // collaps: {
        //   link: `${apiLink}/api/getFrame?kp_id=${res.kinopoiskId}&player=collaps`,
        //   title: "collaps",
        // },
        cdn_movies: {
          link: `${apiLink}/api/getFrame?kp_id=${res.kinopoiskId}&player=cdn_movies`,
          title: "#4"
        },
        miradres: {
          link: `${apiLink}/api/getFrame?kp_id=${res.kinopoiskId}&player=miradres`,
          title: "#5"
        }
        // bazon: {
        //   link: `${apiLink}/api/getFrame?kp_id=${res.kinopoiskId}&player=bazon`,
        //   title: "bazon",
        // },
        // kodik: {
        //   link: `${apiLink}/api/getFrame?kp_id=${res.kinopoiskId}&player=kodik`,
        //   title: "#6",
        // },
        // xooxo: {
        //   link: `,
        //   title: "xooxo",
        // },
      }

      setList(list)
    }

    try {
      res = await fetch(`${apiLink}/api/searchFilms?keyword=${kp_id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password })
      })

      if (res.status === 200) {
        res = await res.json()
        setData(res)
        setError(false)
        initFrame()
        if (res.serial) {
          loadSeasons()
        }

        setTimeout(() => {
          loadTrailers()
          loadPosters()
          loadSequels()
          loadSimilars()
        }, 500)
      } else if (res.status === 202) {
        res = await res.json()
        setError(res.message)
      } else {
        setError("Ошибка загрузки информации о фильме")
      }
    } catch (e) {
      setError("Ошибка fetch api client", JSON.stringify(e))
    }
  }

  const loadSeasons = async () => {
    const password = localStorage.getItem("tv:auth")
    let res

    try {
      res = await fetch(`${apiLink}/api/getSeasons?id=${kp_id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password })
      })

      if (res.status === 200) {
        res = await res.json()
        setSeasons(res)
        setError(false)
      } else if (res.status === 202) {
        res = await res.json()
        setError(res.message)
      } else {
        setError("Ошибка загрузки информации о фильме")
      }
    } catch (e) {
      setError("Ошибка fetch api client", JSON.stringify(e))
    }
  }

  const loadTrailers = async () => {
    const password = localStorage.getItem("tv:auth")
    let res

    try {
      res = await fetch(`${apiLink}/api/getTrailers?id=${kp_id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password })
      })

      if (res.status === 200) {
        res = await res.json()
        setTrailers(res)
        setError(false)
      } else if (res.status === 202) {
        res = await res.json()
        setError(res.message)
      } else {
        setError("Ошибка загрузки информации о фильме")
      }
    } catch (e) {
      setError("Ошибка fetch api client", JSON.stringify(e))
    }
  }

  const loadPosters = async () => {
    const password = localStorage.getItem("tv:auth")
    let res

    try {
      res = await fetch(`${apiLink}/api/getPosters?id=${kp_id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password })
      })

      if (res.status === 200) {
        res = await res.json()
        setPosters(res)
        setError(false)
      } else if (res.status === 202) {
        res = await res.json()
        setError(res.message)
      } else {
        setError("Ошибка загрузки информации о фильме")
      }
    } catch (e) {
      setError("Ошибка fetch api client", JSON.stringify(e))
    }
  }

  const loadSequels = async () => {
    const password = localStorage.getItem("tv:auth")
    let res

    try {
      res = await fetch(`${apiLink}/api/getSequels?id=${kp_id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password })
      })

      if (res.status === 200) {
        res = await res.json()
        setSequels(res)
        setError(false)
      } else if (res.status === 202) {
        res = await res.json()
        setError(res.message)
      } else {
        setError("Ошибка загрузки информации о фильме")
      }
    } catch (e) {
      setError("Ошибка fetch api client", JSON.stringify(e))
    }
  }

  const loadSimilars = async () => {
    const password = localStorage.getItem("tv:auth")
    let res

    try {
      res = await fetch(`${apiLink}/api/getSimilars?id=${kp_id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password })
      })

      if (res.status === 200) {
        res = await res.json()
        setSimilars(res)
        setError(false)
      } else if (res.status === 202) {
        res = await res.json()
        setError(res.message)
      } else {
        setError("Ошибка загрузки информации о фильме")
      }
    } catch (e) {
      setError("Ошибка fetch api client", JSON.stringify(e))
    }
  }

  const getType = (type) => {
    if (!type) return

    if (type === "TV_SERIES") {
      return "Сериал"
    } else if (type === "FILM") {
      return "Фильм"
    } else if (type === "MINI_SERIES") {
      return "Мини Сериал"
    } else {
      return type
    }
  }

  const setFrame = (player, id) => {
    document.querySelector("#player").style.display = "block"
    const frame = document.querySelector("iframe")
    // setHideSlider(true)

    if (player === "openvids") {
      if (data.type === "FILM") {
        frame.src = list[player].movie
      } else if (data.type === "TV_SERIES") {
        frame.src = list[player].series
      } else {
        frame.src = list[player].movie
      }
    } else {
      frame.src = list[player].link
    }

    let buttons = document.querySelector(`.${css.player_buttons}`)
    buttons = buttons.children
    for (let i = 0; i < buttons.length; i++) {
      buttons[i].classList.remove(css.active)
    }

    let button = buttons[id]
    button.classList.add(css.active)
  }

  let fsEnabled = false
  const ToggleFS = () => {
    if (!fsEnabled) {
      fsEnabled = true
      const fs = document.querySelector("#player")
      fs.classList.add(`${css.playerfs}`)
      const root = document.querySelector("body")
      root.style.overflow = "hidden"
    } else {
      fsEnabled = false
      const fs = document.querySelector("#player")
      fs.classList.remove(`${css.playerfs}`)
      const root = document.querySelector("body")
      root.style.overflow = "auto"
    }
  }

  // window.addEventListener("keyup", (event) => {
  // 	if ((event.key === "q" && fsEnabled) || (event.key === "Escape" && fsEnabled)) {
  // 		ToggleFS()
  // 	}
  // })

  // window.addEventListener("fullscreenchange", (event) => {
  // 	window.focus()
  // })

  const closePop = (c) => {
    const list = document.querySelectorAll(`.${css.popup}`)
    list.forEach((v, i) => {
      const bg = v.querySelector(`.${css.popup_bg}`)
      if (bg === c.target) {
        v.classList.remove(css.popup_open)
      }
    })
  }

  const openPop = (id) => {
    const list = document.querySelectorAll(`.${css.popup}`)
    list[id].classList.add(css.popup_open)
  }

  return (
    <>
      <section className={css.main}>
        <div className={css["header-wrap"]}>
          <div className={css.header}>
            <ul className={css.ul}>
              <li>
                <Link to="/">
                  <img src="/home.png" alt="" width={32} height={32} />
                </Link>
              </li>
              <li>
                <Link to="/tv">Главная TV</Link>
              </li>
              <li>
                <Link to="/tv/search">Поиск</Link>
              </li>
              <li>
                <Link to="/tv/favorites">Избранное</Link>
              </li>
              <li>
                <Link to="/tv/collections">Коллекции</Link>
              </li>
              <li>
                <Link to="/tv/series">Сериалы</Link>
                <div className={`${css.drop} ${css.left}`}>
                  <p>Активные сериалы</p>
                </div>
              </li>
              <li>
                <Link to="/tv/auth">
                  <img src="/lock.png" alt="" width={20} height={20} />
                </Link>
              </li>
            </ul>
          </div>
          <div className={css["header-min"]}>
            <ul className={css.ul}>
              <li>
                <Link to="/">
                  <img src="/home.png" alt="" width={32} height={32} />
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <main id="main">
          {error && (
            <>
              <div className={css.error}>
                <h3>{error}</h3>
              </div>
            </>
          )}
          {data && "kinopoiskId" in data && (
            <>
              <div className={css.info}>
                <div className={css.top}>
                  <img src={data.posterUrlPreview} alt={data.nameRu} />

                  <div className={css.right}>
                    <h3 className={css.title}>
                      {data.nameRu || data.nameOriginal}
                    </h3>
                    <p className={css.subtitle}>
                      {data.nameRu && data.nameOriginal}
                    </p>
                    <p className={css.type}>{getType(data.type)}</p>
                    <p className={css.year}>
                      {(data.year && data.year) || "Н/Д"}
                    </p>
                    {data.type === "TV_SERIES" && data.endYear && (
                      <>
                        <p className={css.end}>{data.endYear}</p>
                      </>
                    )}
                    {data.type === "FILM" && (
                      <>
                        <p className={css.len}>
                          {(data.filmLength && data.filmLength) || "Н/Д"}
                        </p>
                      </>
                    )}
                    <div className={css.country}>
                      {data.countries.map((v, i) => {
                        return <p key={i}>{v.country}</p>
                      })}
                    </div>
                    <div className={css.genre}>
                      {data.genres.map((v, i) => {
                        return <p key={i}>{v.genre}</p>
                      })}
                    </div>
                    <div className={css.rating}>
                      <div className={css.rating_1}>
                        {(data.ratingImdb && data.ratingImdb) || "Н/Д"}
                      </div>
                      /
                      <div className={css.rating_2}>
                        {(data.ratingKinopoisk && data.ratingKinopoisk) ||
                          "Н/Д"}
                      </div>
                    </div>
                  </div>
                </div>

                <div className={css.buttons}>
                  <ul>
                    <li>
                      <a
                        className={css.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        href={data.webUrl}
                      >
                        КП
                      </a>
                    </li>
                    {data.kinopoiskHDId && (
                      <li>
                        <a
                          className={css.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          href={`https://hd.kinopoisk.ru/film/${data.kinopoiskHDId}`}
                        >
                          КП.HD
                        </a>
                      </li>
                    )}
                    <li>
                      <a
                        className={css.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        href={`https://www.imdb.com/title/${data.imdbId}`}
                      >
                        IMDB
                      </a>
                    </li>
                    <li>
                      <div className={css.btn} onClick={() => ToggleFS()}>
                        Плеер на весь экран
                      </div>
                    </li>
                    <li>
                      <div className={css.btn} onClick={() => openPop(0)}>
                        Описание
                      </div>
                    </li>
                    {trailers && trailers.length > 0 && (
                      <li>
                        <div className={css.btn} onClick={() => openPop(2)}>
                          Трейлеры
                        </div>
                      </li>
                    )}
                    {data.serial && (
                      <li>
                        <div className={css.btn} onClick={() => openPop(1)}>
                          Сезоны
                        </div>
                      </li>
                    )}
                  </ul>
                </div>

                <div className={css.popup}>
                  <div
                    className={css.popup_bg}
                    onClick={(c) => closePop(c)}
                  ></div>
                  <div className={css.popup_content}>
                    <p className={css.description}>
                      {data.description || data.shortDescription}
                    </p>
                  </div>
                </div>

                <div className={css.popup}>
                  <div
                    className={css.popup_bg}
                    onClick={(c) => closePop(c)}
                  ></div>
                  <div className={css.popup_content}>
                    <div className={css.seasons}>
                      <p className={css.seasons_title}>
                        Всего сезонов: {seasons.total}
                      </p>
                      <div className={css.seasons_list}>
                        {seasons &&
                          seasons.items.map((v, i) => {
                            return (
                              <div className={css.seasons_item} key={i}>
                                <p className={css.seasons_item_title}>
                                  Сезон: {v.number}
                                </p>

                                <div className={css.seasons_list2}>
                                  {v.episodes.map((v2, i2) => {
                                    return (
                                      <div
                                        className={css.seasons_item2}
                                        key={i2}
                                      >
                                        <p
                                          className={css.seasons_item2_episode}
                                        >
                                          Эпизод: {v2.episodeNumber}{" "}
                                          {v2.releaseDate &&
                                            "(" + v2.releaseDate + ")"}
                                        </p>
                                        <p className={css.seasons_item2_name}>
                                          {(v2.nameRu &&
                                            v2.nameRu +
                                              " (" +
                                              v2.nameEn +
                                              ")") ||
                                            (v2.nameEn && v2.nameEn)}
                                        </p>
                                        <p
                                          className={
                                            css.seasons_item2_description
                                          }
                                        >
                                          {v2.synopsis}
                                        </p>
                                      </div>
                                    )
                                  })}
                                </div>
                              </div>
                            )
                          })}
                      </div>
                    </div>
                  </div>
                </div>

                <div className={css.popup}>
                  <div
                    className={css.popup_bg}
                    onClick={(c) => closePop(c)}
                  ></div>
                  <div className={css.popup_content}>
                    <div className={css.trailers}>
                      {trailers &&
                        trailers.map((v, i) => {
                          return (
                            <a
                              key={i}
                              className={css.trailers_link}
                              target="_blank"
                              rel="noopener noreferrer"
                              href={v.url}
                            >
                              {v.name}
                            </a>
                          )
                        })}
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}

          {!error && data && (
            <>
              <div className={css.player_title}>Доступные плееры</div>
              <div className={css.player_buttons}>
                {list &&
                  Object.keys(list).map((v, i) => {
                    return (
                      <div
                        key={i}
                        className={`${css.player_button}`}
                        onClick={() => {
                          setFrame(v, i)
                        }}
                      >
                        {list[v].title}
                      </div>
                    )
                  })}
              </div>

              <div id="player" className={css.player}>
                <iframe title="iframe" allowFullScreen></iframe>
              </div>
            </>
          )}

          {!hideSlider && posters && posters.length > 0 && (
            <Swiper
              className={css.slider}
              modules={[Navigation, Pagination, Scrollbar, A11y]}
              spaceBetween={0}
              slidesPerView={1}
              navigation
              pagination={{ clickable: true }}
              // scrollbar={{ draggable: true }}
              // onSlideChange={() => console.log("slide change")}
              // onSwiper={(swiper) => console.log(swiper)}
            >
              {posters &&
                posters.map((v, i) => {
                  return (
                    <SwiperSlide className={css.slider_item} key={i}>
                      <img className={css.slider_img} src={v.url} alt="" />
                    </SwiperSlide>
                  )
                })}
            </Swiper>
          )}

          {sequels && sequels.length > 0 && (
            <div className={css.sequels}>
              <div className={css.sequels_title}>Сиквелы и Приквелы</div>

              <div className={css.sequels_list}>
                {sequels.map((v, i) => {
                  return (
                    <a
                      key={i}
                      className={css.sequels_item}
                      href={`/tv/watch?id=${v.id}`}
                    >
                      <img
                        className={css.sequels_img}
                        src={v.poster}
                        alt=""
                        loading="lazy"
                      />
                    </a>
                  )
                })}
              </div>
            </div>
          )}

          {similars && similars.length > 0 && (
            <div className={css.similars}>
              <div className={css.similars_title}>Похожее</div>

              <div className={css.similars_list}>
                {similars.map((v, i) => {
                  return (
                    <a
                      key={i}
                      className={css.similars_item}
                      href={`/tv/watch?id=${v.id}`}
                    >
                      <img
                        className={css.similars_img}
                        src={v.poster}
                        alt=""
                        loading="lazy"
                      />
                    </a>
                  )
                })}
              </div>
            </div>
          )}
        </main>
      </section>
    </>
  )
}

export default Main
