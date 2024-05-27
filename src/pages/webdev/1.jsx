import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import css from "../../css/webdev/1.module.scss"
import { webTitle } from "../../components/settings"

const WebDev1 = () => {
  useEffect(() => {
    document.title = `ToDo - WebDev 1 / ${webTitle}`
  }, [])

  const defaultList = [
    { title: "Новый список ToDo", checked: true },
    { title: "Купить пельмени", checked: false },
    { title: "Купить апельсины", checked: false },
  ]

  const MainComponent = () => {
    const getLocalList = localStorage.getItem("todo.list")

    const [list, setList] = useState(
      (getLocalList && JSON.parse(getLocalList)) || defaultList
    )

    const saveData = (list) => {
      localStorage.setItem("todo.list", JSON.stringify(list))
    }

    return (
      <>
        <FormComponent list={list} setList={setList} saveData={saveData} />
        <ListComponent list={list} setList={setList} saveData={saveData} />
      </>
    )
  }

  const FormComponent = ({ list, setList, saveData }) => {
    const [value, setValue] = useState("")

    const addItem = (e) => {
      e.preventDefault()

      let _list = [...list]
      _list.push({
        title: value,
        checked: false,
      })
      setList(_list)
      saveData(_list)
      setValue("")
    }

    return (
      <>
        <form onSubmit={addItem}>
          <input
            type="text"
            value={value}
            placeholder="Купить пельмени"
            onChange={(e) => {
              setValue(e.target.value)
            }}
          />
          <button type="submit">Добавить</button>
        </form>
      </>
    )
  }

  const ListComponent = ({ list, setList, saveData }) => {
    const toggleCheck = (id) => {
      let _list = [...list]
      _list[id].checked = !_list[id].checked
      setList(_list)
      saveData(_list)
    }

    const deleteItem = (id) => {
      let _list = [...list]
      _list = _list.filter((v, i) => {
        if (i === id) {
          return false
        } else {
          return true
        }
      })
      setList(_list)
      saveData(_list)
    }

    return (
      <>
        <div className={css.items}>
          {list.map((v, i) => {
            return (
              <div className={css.item} key={i}>
                <div
                  onClick={() => {
                    toggleCheck(i)
                  }}
                  className={`${css.button} ${
                    (v.checked && css.checked) || css.check
                  }`}
                >
                  {(v.checked && "✓") || "X"}
                </div>
                <p>{v.title}</p>
                <div
                  className={`${css.button} ${css.del}`}
                  onClick={() => {
                    deleteItem(i)
                  }}
                >
                  ⌦
                </div>
              </div>
            )
          })}
        </div>
      </>
    )
  }

  return (
    <>
      <div className={css.main}>
        <div className={css.title}>
          <Link to="/webdev">ToDo</Link>
        </div>
        <p className={css.subtitle}>Все данные хранятся в localStorage</p>
        <MainComponent />
      </div>
    </>
  )
}

export default WebDev1
