import React, { useEffect, useRef, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import css from "../css/multiwatch.module.scss"
import { webTitle } from "../components/settings"

const MultiWatch = () => {
  useEffect(() => {
    document.title = `MultiWatch / ${webTitle}`
  }, [])

  const [input1, setInput1] = useState("")
  const [input2, setInput2] = useState("")
  const [input3, setInput3] = useState("")
  const [input4, setInput4] = useState("")
  const [input5, setInput5] = useState("")
  const [input6, setInput6] = useState("")

  const [count, setCount] = useState(1)

  const countInc = () => {
    let c = count + 1
    if (c > 6) c = 6
    setCount(c)
  }

  const countDec = () => {
    let c = count - 1
    if (c < 1) c = 1
    setCount(c)
  }

  const changeValue = (v, i) => {
    ;(i === 0 && setInput1(v.target.value)) ||
      (i === 1 && setInput2(v.target.value)) ||
      (i === 2 && setInput3(v.target.value)) ||
      (i === 3 && setInput4(v.target.value)) ||
      (i === 4 && setInput5(v.target.value)) ||
      (i === 5 && setInput6(v.target.value))
  }

  useEffect(() => {
    let save = localStorage.getItem("mw")
    if (save && save.length > 0) {
      save = JSON.parse(save)
      setInput1(save[0]?.link || "")
      setInput2(save[1]?.link || "")
      setInput3(save[2]?.link || "")
      setInput4(save[3]?.link || "")
      setInput5(save[4]?.link || "")
      setInput6(save[5]?.link || "")
    }
  }, [])
  const saveList = () => {
    let list = []
    if (input1.length > 0) {
      list.push({ link: input1 })
    }
    if (input2.length > 0) {
      list.push({ link: input2 })
    }
    if (input3.length > 0) {
      list.push({ link: input3 })
    }
    if (input4.length > 0) {
      list.push({ link: input4 })
    }
    if (input5.length > 0) {
      list.push({ link: input5 })
    }
    if (input6.length > 0) {
      list.push({ link: input6 })
    }
    console.log(list)

    if (list.length > 0) {
      localStorage.setItem("mw", JSON.stringify(list))
    }
  }

  const refHeader = useRef()
  const refContent = useRef()
  const startWatch = () => {
    refHeader.current.style.display = "none"
    refContent.current.style.display = "none"
    setWatch(true)

    let list = []
    if (input1.length > 0) list.push({ link: input1 })
    if (input2.length > 0) list.push({ link: input2 })
    if (input3.length > 0) list.push({ link: input3 })
    if (input4.length > 0) list.push({ link: input4 })
    if (input5.length > 0) list.push({ link: input5 })
    if (input6.length > 0) list.push({ link: input6 })
    setPlayers(list)
  }

  const [watch, setWatch] = useState(false)
  const [players, setPlayers] = useState(false)

  // { link: "https://www.youtube.com/watch_popup?v=jfKfPfyJRdk" }
  // {
  //   link: "https://player.twitch.tv/?muted=true&channel=1ukecsgo&parent=localhost&autoplay=false"
  // },
  // {
  //   link: "https://player.multikick.tv/cristravels?muted=true&autoplay=false"
  // },

  return (
    <>
      <main className={css.main}>
        <Link to={"/"} className={css.header} ref={refHeader}>
          <div className={css.title}>MultiWatch</div>
        </Link>
        <div className={css.content} ref={refContent}>
          <div className={css.title}>
            MultiWatch - возможность смотреть несколько стримов одновременно
          </div>
          <div className={css.desc}>
            <div className={css.hl_white}>Пример ссылок:</div> <br />
            <div className={css.hl_white}>YouTube:</div> https://www.
            <div className={css.hl_wheat}>youtube</div>
            .com/watch_popup?v=<div className={css.hl_green}>jfKfPfyJRdk</div>
            <br />
            <div className={css.hl_white}>Twitch:</div> https://player.
            <div className={css.hl_wheat}>twitch</div>
            .tv/?channel=<div className={css.hl_green}>1ukecsgo</div>
            &parent={String(document.location.hostname)}
            <br />
            <div className={css.hl_white}>Kick:</div> https://player.
            <div className={css.hl_wheat}>multikick</div>
            .tv/<div className={css.hl_green}>cristravels</div>
          </div>
          <div className={css.setup}>
            <div className={css.btns}>
              <div className={css.space}>
                <div>
                  <div className={css.btn} onClick={saveList}>
                    Сохранить список
                  </div>
                </div>
                <div>
                  <div className={css.btn} onClick={startWatch}>
                    Начать просмотр
                  </div>
                  <div className={css.btn} onClick={countDec}>
                    -
                  </div>
                  <div className={css.btn} onClick={countInc}>
                    +
                  </div>
                </div>
              </div>
            </div>

            {[0, 1, 2, 3, 4, 5].map((v, i) => {
              if (i >= count) return
              return (
                <input
                  key={i}
                  type="text"
                  className={css.input}
                  placeholder="https://"
                  value={
                    (i === 0 && input1) ||
                    (i === 1 && input2) ||
                    (i === 2 && input3) ||
                    (i === 3 && input4) ||
                    (i === 4 && input5) ||
                    (i === 5 && input6) ||
                    ""
                  }
                  onChange={(e) => {
                    changeValue(e, i)
                  }}
                />
              )
            })}
          </div>
        </div>

        <div className={`${css.list} ${css[`list_${players.length}`]}`}>
          {players &&
            watch &&
            players.map((v, i) => {
              return (
                <iframe
                  key={i}
                  className={`${css.iframe} ${css[`iframe_${i}`]}`}
                  src={v.link}
                  frameBorder="0"
                ></iframe>
              )
            })}
        </div>
      </main>
    </>
  )
}

export default MultiWatch
