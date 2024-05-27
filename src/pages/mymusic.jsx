import React, { useEffect, useRef, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import css from "../css/mymusic.module.scss"
import { webTitle } from "../components/settings"

const MyMusicComponent = () => {
  let _list = localStorage.getItem("music.list")
  if (_list) {
    _list = JSON.parse(_list)
  } else {
    _list = []
  }

  const [list, setList] = useState(_list)
  const [playingSong, setPlayingSong] = useState(false)
  const [paused, setPaused] = useState(false)
  const [volume, setVolume] = useState(100)
  const [search, setSearch] = useState("")
  const player = useRef()

  useEffect(() => {
    document.title = `My Music / ${webTitle}`

    document.querySelector("#audio").addEventListener("ended", (e) => {
      nextMusic()
    })
  }, [])

  const playMusic = (id) => {
    if (playingSong.id - 1 === id) {
      stopMusic()
    } else {
      player.current.src = list[id].url
      player.current.play()
      setPlayingSong({ id: id + 1 })
      setPaused(false)
    }
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

  const deleteMusic = (id) => {
    let c = window.confirm(`Удалить песню? (${list[id].title})`)

    if (c) {
      let favs = localStorage.getItem("music.list")
      if (!favs) return false

      favs = JSON.parse(favs)
      favs = favs.filter((v, i) => {
        if (i === id) {
          return false
        } else {
          return true
        }
      })

      localStorage.setItem("music.list", JSON.stringify(favs))
      setList(favs)
    }
  }

  return (
    <>
      <audio ref={player} id="audio" src=""></audio>

      <div className={css.header}>
        <Link to="/">My Music</Link>
      </div>

      <div className={css.content}>
        <form>
          <input
            type="text"
            placeholder="Название песни"
            value={search}
            onChange={(v) => {
              setSearch(v.target.value)
            }}
          />
        </form>

        <div className={css.items}>
          {(search &&
            search.length > 0 &&
            list.map((v, i) => {
              if (v.title.toLowerCase().includes(search.toLowerCase())) {
                return (
                  <div className={css.item} key={i}>
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
                      className={css.delete}
                      onClick={() => {
                        deleteMusic(i)
                      }}
                    >
                      <img src="/close.svg" alt="" />
                    </button>
                  </div>
                )
              }
            })) ||
            (list &&
              list.map((v, i) => {
                return (
                  <div className={css.item} key={i}>
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
                      className={css.delete}
                      onClick={() => {
                        deleteMusic(i)
                      }}
                    >
                      <img src="/close.svg" alt="" />
                    </button>
                  </div>
                )
              }))}
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

export default MyMusicComponent
