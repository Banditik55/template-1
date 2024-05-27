import React, { useEffect, useState, useRef } from "react"
import css from "../css/iptv.module.scss"
// import "../css/iptv.scss"
import Hls from "hls.js"
import Plyr from "plyr-react"
// import "plyr-react/plyr.css"
// import("https://cdn.plyr.io/3.7.3/plyr.css")
import { webTitle, localLink, globalLink } from "../components/settings.jsx"

const detectMobile = () => {
  if (
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    )
  ) {
    return true
  }
  return false
}

const IpTv = () => {
  const apiLink =
    process.env.NODE_ENV === "development" ? localLink : globalLink

  let selectedLink = ""
  let scale = 100
  const plyr = useRef()
  const [data, setData] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [isMobile, _] = useState(detectMobile())
  const [plyrControls, __] = useState(
    isMobile
      ? [
          "play-large",
          "play",
          "rewind",
          "fast-forward",
          "current-time",
          "mute",
          "volume",
          "captions",
          "settings",
          "pip",
          "airplay",
          "fullscreen",
        ]
      : [
          "play-large",
          "play",
          "rewind",
          "fast-forward",
          "current-time",
          "mute",
          "volume",
          "captions",
          "settings",
          "pip",
          "airplay",
          "fullscreen",
        ]
  )

  useEffect(() => {
    document.title = `iptv / ${webTitle}`

    getList()
  }, [])

  const getList = async () => {
    try {
      let res = await fetch(`${apiLink}/api/getIPTV`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password: localStorage.getItem("tv:auth") }),
      })

      if (res.status === 200) {
        res = await res.json()
        setData(res)
        setError(false)
        afterInit()
      } else if (res.status === 202) {
        res = await res.json()
        setError(res.message)
        // afterInit()
      } else {
        setError("Ошибка загрузки")
      }
    } catch (e) {
      setError("Ошибка fetch api client", JSON.stringify(e))
      console.log(e)
    }
  }

  const afterInit = () => {
    setTimeout(() => {
      scaleExtension()
    }, 50)
  }

  const scaleExtension = () => {
    let a = document.querySelector(`.plyr__menu__container`)
    let _id = a.attributes.id.nodeValue
    let append = `			
			<div id="${_id}-home">
				<div role="menu">
					<button data-plyr="settings" type="button" class="plyr__control plyr__control--forward" role="menuitem" aria-haspopup="true">
						<span>
							Масштаб<span class="plyr__menu__value">100%</span>
						</span>
					</button>
				</div>
			</div>
			<div id="${_id}-scale" hidden="">
				<button type="button" class="plyr__control plyr__control--back">
					<span aria-hidden="true">Масштаб 100%</span>
					<span class="plyr__sr-only">Go back to previous menu</span>
				</button>
				<div role="menu">
					<button data-plyr="scale" type="button" role="menuitemradio" class="plyr__control" aria-checked="false" value="inc">
						<span>+5%</span>
					</button>
					<button data-plyr="scale" type="button" role="menuitemradio" class="plyr__control" aria-checked="false" value="dec">
						<span>-5%</span>
					</button>
					<button data-plyr="scale" type="button" role="menuitemradio" class="plyr__control" aria-checked="false" value="def">
						<span>100%</span>
					</button>
				</div>
			</div>
		`
    const element = document.createElement("div")
    element.innerHTML = append
    let b = a.appendChild(element)

    b.querySelector(`#${_id}-home`).addEventListener("click", () => {
      b.querySelector(`#${_id}-home`).setAttribute("hidden", "")
      b.querySelector(`#${_id}-scale`).removeAttribute("hidden")
    })

    b.querySelector(`#${_id}-scale`)
      .querySelector("button")
      .addEventListener("click", () => {
        b.querySelector(`#${_id}-home`).removeAttribute("hidden")
        b.querySelector(`#${_id}-scale`).setAttribute("hidden", "")
      })

    let _buttons = b
      .querySelector(`#${_id}-scale`)
      .querySelector("div")
      .querySelectorAll("button")
    let __buttons = [..._buttons]
    __buttons.map((v, i) => {
      v.addEventListener("click", () => {
        // __buttons.map((v) => {
        // v.setAttribute("aria-checked", "false")
        // })
        // v.setAttribute("aria-checked", "true")

        const sc = v.getAttribute("value")
        if (sc === "inc") {
          setScale(+5)
        } else if (sc === "dec") {
          setScale(-5)
        } else if (sc === "def") {
          setScale()
        }

        b
          .querySelector(`#${_id}-home`)
          .querySelector("div")
          .querySelector("button")
          .querySelector("span")
          .querySelector("span").innerHTML = `${scale}%`
        b
          .querySelector(`#${_id}-scale`)
          .querySelector("button")
          .querySelector("span").innerHTML = `Масштаб ${scale}%`
      })
    })

    const setScale = (v) => {
      const max = 175
      const min = 25

      if (!v) {
        scale = 100
        document.querySelector("video").style.transform = `scale(${scale}%)`
        return
      }

      scale = scale + v
      if (scale >= max) scale = max
      if (scale <= min) scale = min
      document.querySelector("video").style.transform = `scale(${scale}%)`
    }
  }

  const clearSelected = () => {
    let buttons = document.querySelectorAll(`.${css.item}`)
    buttons = [...buttons]
    buttons.map((v, i) => {
      v.classList.remove(`${css.green}`)
    })
  }

  const setSelected = (id) => {
    let buttons = document.querySelectorAll(`.${css.item}`)
    buttons = [...buttons]
    buttons[id].classList.add(`${css.green}`)
  }

  const playTv = (id) => {
    const url = data[id].link
    selectedLink = url

    clearSelected()
    setSelected(id)

    const video = plyr.current.plyr
    const hls = new Hls()
    hls.loadSource(url)
    hls.attachMedia(video.media)
    video.media.play()
  }

  const copyLink = () => {
    const link = selectedLink
    if (link) navigator.clipboard.writeText(link)
  }

  const openWindow = () => {
    const link = selectedLink
    if (link) window.open(link)
  }

  const FormComponent = () => {
    const [link, setLink] = useState("")

    const playUrl = (e) => {
      e.preventDefault()

      clearSelected()

      const video = plyr.current.plyr
      const hls = new Hls()

      const url = link
      selectedLink = url

      hls.loadSource(url)
      hls.attachMedia(video.media)
      video.media.play()
    }

    return (
      <>
        <form onSubmit={playUrl} className={css.url}>
          <input
            type="text"
            value={link}
            placeholder="url"
            onChange={(e) => {
              setLink(e.target.value)
            }}
          />
          <button type="submit">enter</button>
        </form>
      </>
    )
  }

  return (
    <>
      {error && (
        <>
          <div className={css.error}>{error}</div>
        </>
      )}
      {!error && data && (
        <>
          <div className={css.menu_mini}></div>
          <div className={css.menu}>
            <p className={css.title}>Список каналов</p>
            <div className={css.items}>
              {data &&
                data.map((v, i) => {
                  return (
                    <button
                      key={i}
                      className={`${css.item}`}
                      onClick={() => {
                        playTv(i)
                      }}
                    >
                      {v.title}
                    </button>
                  )
                })}
            </div>
            <button className={css.copy} onClick={copyLink}>
              Копировать ссылку
            </button>
            <button className={css.copy} onClick={openWindow}>
              Открыть поток в другом окне
            </button>
            <p className={css.title}>Просмотр по ссылке</p>
            <FormComponent />
          </div>
          <div id="player" className={css.player}>
            <Plyr
              id="plyr"
              ref={plyr}
              options={{
                controls: [...plyrControls],
              }}
              source={{
                type: "video",
                sources: [
                  {
                    src: "",
                  },
                ],
                // poster: "https://cdn.shopify.com/s/files/1/1057/4964/t/27/assets/star-wars-banner.jpeg?v=80624120874934922901668841836",
                // poster:
                //   "https://wallpapersmug.com/download/2048x1152/14d102/poster-movie-2021-wonder-woman-1984.jpeg",
                poster:
                  "https://wallpapers.com/images/hd/planet-in-a-colorful-outer-space-1e4f2o2mmscz9h1b.jpg",
              }}
              // crossOrigin="true"
              controls
            />
          </div>
        </>
      )}
    </>
  )
}

export default IpTv
