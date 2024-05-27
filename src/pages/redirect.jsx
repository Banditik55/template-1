import React, { useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"

const Redirect = () => {
  const list = {
    tg: "//t.me/stfu6",
    gh: "//github.com/Banditik55",
    yt: "//youtube.com/Banditik55",
    scloud: "//soundcloud.com/Banditik55",
    x: "//x.com/@Banditik55",
    tr: "//threads.net/@Banditik55",
    kick: "//kick.com/Banditik55",
    twitch: "//twitch.tv/Banditik55",
    ig: "//instagram.com/Banditik55"
  }
  const nav = useNavigate()
  const { q } = useParams()

  useEffect(() => {
    const link = list[q] || "/"
    nav(link)
  }, [])

  return <></>
}

export default Redirect
