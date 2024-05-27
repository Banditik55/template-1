import React, { useEffect, useRef, useState } from "react"
import { Link } from "react-router-dom"
import css from "../css/passgen.module.scss"
import { webTitle } from "../components/settings"

const Passgen = () => {
  useEffect(() => {
    document.title = `Генератор пароля / ${webTitle}`
  }, [])

  const [value, setValue] = useState("")
  const [checkUpper, setCheckUpper] = useState(true)
  const [checkLower, setCheckLower] = useState(true)
  const [checkNumb, setCheckNumb] = useState(true)
  const [checkSymb, setCheckSymb] = useState(false)
  const length = useRef()

  const randomFun = {
    lower: getRandomLower,
    upper: getRandomUpper,
    number: getRandomNumber,
    symbol: getRandomSymbol
  }

  /* https://net-comber.com/charset.html */
  function getRandomLower() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 97)
  }

  function getRandomUpper() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 65)
  }

  function getRandomNumber() {
    return String.fromCharCode(Math.floor(Math.random() * 10) + 48)
  }

  function getRandomSymbol() {
    const symbols = '~`!#$%^&*()-_+|?.,<>"{}=/[];:'

    return symbols[Math.floor(Math.random() * symbols.length)]
  }

  function generatePassword(lower, upper, number, symbol, length) {
    let generatedPassword = ""

    const typeCount = lower + upper + number + symbol

    // console.log("typeCount :", typeCount)

    const typeArray = [{ lower }, { upper }, { number }, { symbol }].filter(
      (item) => Object.values(item)[0]
    )

    // console.log("typeArray :", typeArray)

    if (typeCount === 0) {
      return ""
    }

    for (let i = 0; i < length; i += typeCount) {
      typeArray.forEach((type) => {
        const funcName = Object.keys(type)[0]

        // console.log("funcName :", funcName)

        generatedPassword += randomFun[funcName]()
      })
    }

    const finalPassword = generatedPassword.slice(0, length)

    // console.log(finalPassword)

    return finalPassword
  }

  const startGenerate = () => {
    const pass = generatePassword(
      checkLower,
      checkUpper,
      checkNumb,
      checkSymb,
      length.current.value
    )
    setValue(pass)
  }

  const copyPassword = () => {
    copyTextToClipboard(value)
  }

  function fallbackCopyTextToClipboard(text) {
    const textArea = document.createElement("textarea")
    textArea.value = text

    // Avoid scrolling to bottom
    textArea.style.top = "0"
    textArea.style.left = "0"
    textArea.style.position = "fixed"

    document.body.appendChild(textArea)
    textArea.focus()
    textArea.select()

    try {
      const successful = document.execCommand("copy")
      // var msg = successful ? "successful" : "unsuccessful"
      // console.log("Fallback: Copying text command was " + msg)
    } catch (err) {
      // console.error("Fallback: Oops, unable to copy", err)
    }

    document.body.removeChild(textArea)
  }
  function copyTextToClipboard(text) {
    if (!navigator.clipboard) {
      fallbackCopyTextToClipboard(text)
      return
    }
    navigator.clipboard.writeText(text).then(
      function () {
        // console.log("Async: Copying to clipboard was successful!")
      },
      function (err) {
        // console.error("Async: Could not copy text: ", err)
      }
    )
  }

  return (
    <>
      <main className={css.main}>
        <Link to={"/"} className={css.header}>
          Генератор пароля
        </Link>
        <div className={css.content}>
          <div className={css.passgen}>
            <div className={css.input_row}>
              <div className={css.input_row_l}>
                <input
                  type="text"
                  readOnly
                  placeholder="new_password"
                  value={value}
                />
                <div className={css.btn} onClick={startGenerate}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="24px"
                    viewBox="0 -960 960 960"
                    width="24px"
                    fill="currentColor"
                    className={css.svg_restart}
                  >
                    <path d="M440-122q-121-15-200.5-105.5T160-440q0-66 26-126.5T260-672l57 57q-38 34-57.5 79T240-440q0 88 56 155.5T440-202v80Zm80 0v-80q87-16 143.5-83T720-440q0-100-70-170t-170-70h-3l44 44-56 56-140-140 140-140 56 56-44 44h3q134 0 227 93t93 227q0 121-79.5 211.5T520-122Z" />
                  </svg>
                </div>
              </div>
              <div className={css.input_row_r}>
                <div className={css.btn} onClick={copyPassword}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="24px"
                    viewBox="0 -960 960 960"
                    width="24px"
                    fill="currentColor"
                    className={css.svg_copy}
                  >
                    <path d="M360-240q-33 0-56.5-23.5T280-320v-480q0-33 23.5-56.5T360-880h360q33 0 56.5 23.5T800-800v480q0 33-23.5 56.5T720-240H360Zm0-80h360v-480H360v480ZM200-80q-33 0-56.5-23.5T120-160v-560h80v560h440v80H200Zm160-240v-480 480Z" />
                  </svg>
                </div>
              </div>
            </div>

            <div className={css.settings}>
              <select className={css.select} defaultValue={"16"} ref={length}>
                <optgroup label="Длина пароля">
                  <option value="2">2</option>
                  <option value="4">4</option>
                  <option value="8">8</option>
                  <option value="16">16</option>
                  <option value="24">24</option>
                  <option value="32">32</option>
                  <option value="48">48</option>
                  <option value="64">64</option>
                </optgroup>
              </select>

              <div className={css.checkbox}>
                <input
                  type="checkbox"
                  checked={checkUpper}
                  onChange={() => {
                    setCheckUpper((v) => {
                      return !v
                    })
                  }}
                />
                <div className={css.text}>ABC</div>
              </div>
              <div className={css.checkbox}>
                <input
                  type="checkbox"
                  checked={checkLower}
                  onChange={() => {
                    setCheckLower((v) => {
                      return !v
                    })
                  }}
                />
                <div className={css.text}>abc</div>
              </div>
              <div className={css.checkbox}>
                <input
                  type="checkbox"
                  checked={checkNumb}
                  onChange={() => {
                    setCheckNumb((v) => {
                      return !v
                    })
                  }}
                />
                <div className={css.text}>123</div>
              </div>
              <div className={css.checkbox}>
                <input
                  type="checkbox"
                  checked={checkSymb}
                  onChange={() => {
                    setCheckSymb((v) => {
                      return !v
                    })
                  }}
                />
                <div className={css.text}>!@#</div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}

export default Passgen
