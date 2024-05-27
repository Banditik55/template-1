import React, { useEffect, useRef, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import css from "../css/music.module.scss"
import { webTitle, localLink, globalLink } from "../components/settings"

const Music = () => {
  const apiLink =
    process.env.NODE_ENV === "development" ? localLink : globalLink

  const [list, setList] = useState(false)
  const [loading, setLoading] = useState(false)
  const [playingSong, setPlayingSong] = useState(false)
  const [paused, setPaused] = useState(false)
  const [volume, setVolume] = useState(100)
  const [search, setSearch] = useState("")
  const [searched, setSearched] = useState(false)
  const [error, setError] = useState("")
  const player = useRef()

  useEffect(() => {
    document.title = `Music / ${webTitle}`

    document.querySelector("#audio").addEventListener("ended", (e) => {
      nextMusic()
    })
  }, [])

  const searchMusic = async (e) => {
    stopMusic()
    setList(false)

    e.preventDefault()

    setError(false)
    setLoading(true)
    setSearched(search)

    if (search.length < 1) {
      setLoading(false)
      setError("Некорректный запрос")
      return false
    }

    try {
      let res = await fetch(`${apiLink}/api/searchMusic`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          password: localStorage.getItem("tv:auth"),
          search: search,
        }),
      })

      if (res.status === 200) {
        res = await res.json()
        setList(res)
        setError(false)
        setLoading(false)
        // afterInit()
      } else if (res.status === 202) {
        res = await res.json()
        setError(res.message)
        setLoading(false)
        // afterInit()
      } else {
        setError("Ошибка загрузки")
        setLoading(false)
      }
    } catch (e) {
      setError("Ошибка fetch api client", JSON.stringify(e))
      setLoading(false)
      // console.log(e)
    }
  }

  const playMusic = (id) => {
    if (playingSong.id - 1 === id) {
      stopMusic()
    } else {
      if (list[id] && list[id].url) {
        player.current.src = list[id].url
        let play = player.current.play()
        play
          .then(() => {
            //
          })
          .catch((e) => {
            console.log("error play", e)
          })
        setPlayingSong({ id: id + 1 })
        setPaused(false)
      } else {
        stopMusic()
        console.log("error playMusic", list[id], id)
      }
    }
  }

  const setFavorite = (id) => {
    let favs = localStorage.getItem("music.list")
    if (favs) {
      favs = JSON.parse(favs)
    } else {
      favs = []
    }

    favs.push(list[id])
    localStorage.setItem("music.list", JSON.stringify(favs))

    alert(`Добавлено в сохранёнки (${list[id].title})`)
  }

  const stopMusic = () => {
    player.current.src = ""
    setPlayingSong(false)
  }

  const changeVolume = (v) => {
    setVolume(v.target.value)
    player.current.volume = v.target.value / 100
  }

  const nextMusic = () => {
    setPlayingSong((prev) => {
      if (list.length - 1 <= prev.id) {
        stopMusic()
      } else {
        playMusic(prev.id)
      }

      return prev
    })
  }

  const prevMusic = () => {
    setPlayingSong((prev) => {
      if (prev.id - 2 < 0) {
        stopMusic()
      } else {
        playMusic(prev.id - 2)
      }

      return prev
    })
  }

  const nextMusicButton = () => {
    setPlayingSong((prev) => {
      if (list.length <= prev.id) {
        stopMusic()
      } else {
        playMusic(prev.id)
      }

      return prev
    })
  }

  const pauseMusic = () => {
    if (player.current.paused) {
      player.current.play()
      setPaused(false)
    } else {
      player.current.pause()
      setPaused(true)
    }
  }

  return (
    <>
      <audio ref={player} id="audio" src=""></audio>

      <div className={css.header}>
        <Link to="/">Music</Link>
      </div>

      <div className={css.content}>
        <Link to="/mymusic" className={css.favs}>
          <img
            src="https://img.icons8.com/material/24/null/external-link-squared.png"
            alt=""
          />
          <p>Сохранёнки</p>
        </Link>

        <form onSubmit={searchMusic}>
          <div className={css.row}>
            <input
              type="text"
              placeholder="Введите название"
              value={search}
              onChange={(v) => {
                setSearch(v.target.value)
              }}
            />
            <button type="submit">Поиск</button>
          </div>
        </form>

        <div className={css.items}>
          {list && searched && (
            <p className={css.item_title}>
              Найдено {list.length} шт. по запросу ({searched})
            </p>
          )}

          {list &&
            list.map((v, i) => {
              return (
                <div
                  className={`${css.item} ${
                    playingSong.id - 1 === i && `${css.item_play}`
                  }`}
                  key={i}
                >
                  <button
                    className={css.play}
                    onClick={() => {
                      playMusic(i)
                    }}
                  >
                    {playingSong.id - 1 === i ? (
                      <img src="/stop.svg" alt="" />
                    ) : (
                      <img src="/play.svg" alt="" />
                    )}
                  </button>

                  <div className={css.text}>{v.title}</div>

                  <button
                    className={css.star}
                    onClick={() => {
                      setFavorite(i)
                    }}
                  >
                    <img src="/star.svg" alt="" />
                  </button>
                </div>
              )
            })}

          {loading && (
            <>
              <p className={css.loading}>Загрузка...</p>
            </>
          )}

          {error && (
            <>
              <p className={css.error}>{error}</p>
            </>
          )}
        </div>

        {playingSong ? (
          <div className={css.player}>
            <button onClick={prevMusic}>
              <img
                className={css.img_arrow_back}
                src="/arrow_back.svg"
                alt=""
              />
            </button>

            <button onClick={pauseMusic}>
              {paused ? (
                <img className={css.img_pause} src="/play.svg" alt="" />
              ) : (
                <img className={css.img_pause} src="/pause.svg" alt="" />
              )}
            </button>

            <button className={css.btn_next} onClick={nextMusicButton}>
              <img
                className={css.img_arrow_next}
                src="/arrow_back.svg"
                alt=""
              />
            </button>

            <input
              type="range"
              min={0}
              max={100}
              step={2.5}
              onChange={changeVolume}
              value={volume}
            />

            <div className={css.title}>{list[playingSong.id - 1].title}</div>

            <button className={css.btn_close} onClick={stopMusic}>
              <img className={css.img_close} src="/close.svg" alt="" />
            </button>
          </div>
        ) : (
          ""
        )}
      </div>
    </>
  )
}

export default Music
