import React, { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import css from "../css/auth.module.scss"
import { webTitle } from "../components/settings"

const Index = () => {
  const nav = useNavigate()
  const [password, setPassword] = useState("")

  const postData = (e) => {
    e.preventDefault()
    localStorage.setItem("tv:auth", password)
    nav("/tv")
  }

  useEffect(() => {
    document.title = `Auth / ${webTitle}`
  }, [])

  return (
    <>
      <section className={css.main}>
        <header>
          <Link to="/tv">TV</Link>
        </header>

        <main>
          <div className={css.form}>
            <h3>Auth</h3>
            <form onSubmit={postData}>
              <div className={css.row}>
                <input
                  type="text"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value)
                  }}
                  placeholder="token"
                />
                <button type="submit">enter</button>
              </div>
            </form>
          </div>
        </main>
      </section>
    </>
  )
}

export default Index
