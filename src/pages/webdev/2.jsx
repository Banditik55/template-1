import React, { useEffect, useState, useRef } from "react"
import css from "../../css/webdev/2.module.sass"
import { webTitle } from "../../components/settings"

const WebDev2 = () => {
  useEffect(() => {
    document.title = `Контакты - WebDev 2 / ${webTitle}`
  }, [])

  const openButton = useRef()
  const closeButton = useRef()
  const menu = useRef()
  const newContact = useRef()
  const editMenu = useRef()
  const editSelfMenu = useRef()
  const [selectedContact, setSelectedContact] = useState(false)
  const defaultData = { name: "", img: "", tel: "", description: "" }
  const [data, setData] = useState(defaultData)
  const [editData, setEditData] = useState(defaultData)

  const defaultSelfData = {
    name: "Dmitry",
    img: "https://econet.ru/uploads/pictures/456175/content_photo_1.jpg",
  }
  const selfStorage = localStorage.getItem("contacts.self")
  const [selfData, setSelfData] = useState(
    (selfStorage && JSON.parse(selfStorage)) || defaultSelfData
  )
  const [editSelfData, setEditSelfData] = useState(defaultSelfData)

  const defaultImg =
    "https://cspromogame.ru//storage/upload_images/avatars/1299.jpg"

  const defaultContacts = [
    {
      name: "Contact 1",
      img: "https://shapka-youtube.ru/wp-content/uploads/2021/02/prikolnaya-avatarka-dlya-patsanov.jpg",
      tel: "8 800 555 35 35",
      description: "бла бла бла",
    },
    {
      name: "Contact 2",
      img: "https://bipbap.ru/wp-content/uploads/2021/07/1551512888_2-730x617.jpg",
      tel: "8 800 555 35 36",
      description: "",
    },
    {
      name: "Contact 3",
      img: "https://avatars.mds.yandex.net/i?id=ce2a382dbd06a91c36a98cd492c48c813c0ee9f0-5297706-images-thumbs&n=13",
      tel: "8 800 555 35 37",
      description: "",
    },
    {
      name: "Contact 4",
      img: "https://i.pinimg.com/736x/86/95/54/8695540db1e9224367ed9d1a4884ccfc.jpg",
      tel: "8 800 555 35 38",
      description: "",
    },
  ]

  const storage = localStorage.getItem("contacts.list")
  const [list, setList] = useState(
    (storage && JSON.parse(storage)) || defaultContacts
  )

  const openMenu = () => {
    menu.current.classList.add(css.opened)
  }

  const closeMenu = () => {
    menu.current.classList.remove(css.opened)
  }

  const openCreateContact = () => {
    menu.current.classList.remove(css.opened)
    newContact.current.classList.add(css.opened)
    setSelectedContact(false)
    closeEditContact()
  }

  const closeCreateContact = () => {
    newContact.current.classList.remove(css.opened)
  }

  const createContact = (e) => {
    e.preventDefault()
    newContact.current.classList.remove(css.opened)

    let _list = [...list]
    let a = _list.push({ ...data, description: "New Contact" })
    setSelectedContact(String(a - 1))
    setList(_list)
    saveData(_list)
    setData(defaultData)
  }

  const saveData = (list) => {
    localStorage.setItem("contacts.list", JSON.stringify(list))
  }

  const removeContact = () => {
    if (!selectedContact) return

    let _list = [...list]
    _list = _list.filter((v, i) => {
      if (String(i) === selectedContact) {
        return false
      } else {
        return true
      }
    })
    setList(_list)
    saveData(_list)
    setSelectedContact(false)
    closeEditContact()
  }

  const closeEditContact = () => {
    editMenu.current.classList.remove(css.opened)
  }

  const editContact = () => {
    if (!selectedContact) return

    setEditData(list[selectedContact])
    editMenu.current.classList.add(css.opened)
  }

  const saveEditContact = (e) => {
    e.preventDefault()
    if (!selectedContact) return

    editMenu.current.classList.remove(css.opened)
    let _list = [...list]
    _list[selectedContact] = editData
    setList(_list)
    saveData(_list)
  }

  const saveEditSelf = (e) => {
    e.preventDefault()
    editSelfMenu.current.classList.remove(css.opened)
    setSelfData(editSelfData)
    localStorage.setItem("contacts.self", JSON.stringify(editSelfData))
  }

  const closeEditSelf = () => {
    editSelfMenu.current.classList.remove(css.opened)
  }

  const openEditSelf = () => {
    editSelfMenu.current.classList.add(css.opened)
    setEditSelfData({ ...selfData })
  }

  return (
    <>
      <div className={css.open} ref={openButton} onClick={openMenu}>
        •••
      </div>
      <div className={`${css.menu} ${css.opened}`} ref={menu}>
        <div className={css.close} ref={closeButton} onClick={closeMenu}>
          X
        </div>
        <div className={css.self}>
          <div className={css.name}>{selfData.name}</div>
          <div className={css.img}>
            <img src={selfData.img || defaultImg} alt="" />
          </div>
        </div>
        <div className={css.buttons}>
          <div className={css.add} onClick={openCreateContact}>
            Добавить контакт
          </div>
          <div className={css.editSelf} onClick={openEditSelf}>
            Изменить свои данные
          </div>
        </div>
        <div className={css.contacts}>Контакты</div>
        <div className={css.items}>
          {list.length === 0 && (
            <>
              <p className={css.empty}>Список пуст...</p>
            </>
          )}
          {list.map((v, i) => {
            return (
              <div
                className={css.item}
                key={i}
                onClick={() => {
                  closeCreateContact()
                  setSelectedContact(String(i))
                  closeEditContact()
                }}
              >
                <img src={v.img || defaultImg} alt="" />
                <div className={css.info}>
                  <div className={css.name}>{v.name}</div>
                  <div className={css.number}>{v.tel}</div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
      <form className={css.new} ref={newContact} onSubmit={createContact}>
        <div className={css.close} onClick={closeCreateContact}>
          X
        </div>
        <p>Новый контакт</p>
        <input
          type="text"
          placeholder="Имя"
          value={data.name}
          onChange={(e) => {
            let _data = { ...data }
            _data.name = e.target.value
            setData(_data)
          }}
        />
        <input
          type="text"
          placeholder="Ссылка на аватар"
          value={data.img}
          onChange={(e) => {
            let _data = { ...data }
            _data.img = e.target.value
            setData(_data)
          }}
        />
        <input
          type="text"
          placeholder="Телефон"
          value={data.tel}
          onChange={(e) => {
            let _data = { ...data }
            _data.tel = e.target.value
            setData(_data)
          }}
        />
        <button type="submit">добавить</button>
      </form>
      {selectedContact && (
        <>
          <div className={css.viewContact_wrap}>
            <div className={css.viewContact}>
              <p className={css.name}>{list[selectedContact].name}</p>
              <img
                src={list[selectedContact].img || defaultImg}
                alt=""
                loading="lazy"
              />
              <p className={css.tel}>{list[selectedContact].tel}</p>
              {list[selectedContact].description && (
                <>
                  <div className={css.description}>
                    <p>{list[selectedContact].description}</p>
                  </div>
                </>
              )}
              <div className={css.buttons}>
                <div className={css.del} onClick={removeContact}>
                  Удалить
                </div>
                <div className={css.edit} onClick={editContact}>
                  Редактировать
                </div>
              </div>
            </div>
          </div>
        </>
      )}
      <form
        className={`${css.editMenu}`}
        ref={editMenu}
        onSubmit={saveEditContact}
      >
        <div className={css.close} onClick={closeEditContact}>
          X
        </div>
        <p>Редактировать контакт</p>
        <input
          type="text"
          placeholder="Имя"
          value={editData.name}
          onChange={(e) => {
            let _data = { ...editData }
            _data.name = e.target.value
            setEditData(_data)
          }}
        />
        <input
          type="text"
          placeholder="Ссылка на аватар"
          value={editData.img}
          onChange={(e) => {
            let _data = { ...editData }
            _data.img = e.target.value
            setEditData(_data)
          }}
        />
        <input
          type="text"
          placeholder="Телефон"
          value={editData.tel}
          onChange={(e) => {
            let _data = { ...editData }
            _data.tel = e.target.value
            setEditData(_data)
          }}
        />
        <input
          type="text"
          placeholder="Описание"
          value={editData.description}
          onChange={(e) => {
            let _data = { ...editData }
            _data.description = e.target.value
            setEditData(_data)
          }}
        />
        <button type="submit">сохранить</button>
      </form>
      <form
        className={`${css.editMenu}`}
        ref={editSelfMenu}
        onSubmit={saveEditSelf}
      >
        <div className={css.close} onClick={closeEditSelf}>
          X
        </div>
        <p>Редактировать свои данные</p>
        <input
          type="text"
          placeholder="Имя"
          value={editSelfData.name}
          onChange={(e) => {
            let _data = { ...editSelfData }
            _data.name = e.target.value
            setEditSelfData(_data)
          }}
        />
        <input
          type="text"
          placeholder="Ссылка на аватар"
          value={editSelfData.img}
          onChange={(e) => {
            let _data = { ...editSelfData }
            _data.img = e.target.value
            setEditSelfData(_data)
          }}
        />
        <button type="submit">сохранить</button>
      </form>
    </>
  )
}

export default WebDev2
