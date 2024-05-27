import React, { useEffect, useRef, useState } from "react"
import { Link } from "react-router-dom"
import css from "../css/radio.module.scss"
import list from "../components/radioList.jsx"
import "../css/radio.scss"
import { webTitle } from "../components/settings"

const Radio = () => {
  const playerElement = useRef()
  const volumeInput = useRef()
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    document.title = `RADIO / ${webTitle}`

    setTimeout(() => {
      setLoaded(true)
    }, 1000)
  }, [])

  // const _favs = localStorage.getItem("radio.favorites")
  // const [favs, setFavs] = useState(_favs ? JSON.parse(_favs) : [])

  const [selectedMedia, setSelectedMedia] = useState(false)
  const [volume, setVolume] = useState(1)

  const setPlay = (id) => {
    setSelectedMedia(list[id])
    playerElement.current.src = list[id].link
    playerElement.current.play()
  }

  const stopPlay = () => {
    setSelectedMedia(false)
    playerElement.current.pause()
  }

  // const saveStorage = (v) => {
  //   localStorage.setItem("radio.favorites", JSON.stringify(v))
  // }

  // const toggleFavorite = () => {
  //   if (!selectedMedia) return false

  //   if (favs.includes(selectedMedia.id)) {
  //     const _favs = favs.filter((v, i, array) => {
  //       if (v === selectedMedia.id) {
  //         return false
  //       }
  //       return true
  //     })

  //     setFavs(_favs)
  //     saveStorage(_favs)
  //   } else {
  //     const _favs = [...favs, selectedMedia.id]
  //     setFavs(_favs)
  //     saveStorage(_favs)
  //   }

  //   list.some((v, i) => {
  //     if (v.id === selectedMedia.id && v.title === selectedMedia.title) {
  //       setPlay(i)
  //       return true
  //     }
  //   })
  // }

  return (
    <>
      <audio ref={playerElement} src=""></audio>

      <div className={css.main}>
        <div className={css.header}>
          <Link to="/">
            <span>{webTitle} / Radio</span>
          </Link>
        </div>

        {selectedMedia && (
          <div className={css.playerButtons}>
            <img
              src="/stop.svg"
              alt=""
              className={css.stop}
              onClick={stopPlay}
            />
            <p>{selectedMedia.title}</p>
            <input
              type="range"
              min={0}
              max={1}
              step={0.05}
              ref={volumeInput}
              value={volume}
              onChange={(v) => {
                setVolume(v.target.value)
                playerElement.current.volume = v.target.value
              }}
            />
          </div>
        )}

        {loaded && (
          <div className={css.items}>
            {list.map((v, i) => {
              return (
                <button
                  key={i}
                  className={css.item}
                  onClick={() => {
                    setPlay(i)
                  }}
                >
                  {v.title}
                </button>
              )
            })}
          </div>
        )}

        {!loaded && <div className={css.loading}>Загрузка...</div>}
      </div>
    </>
  )
}

export default Radio
