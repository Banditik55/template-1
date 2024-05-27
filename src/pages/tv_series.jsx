import React, { useEffect } from "react"
import { Link } from "react-router-dom"
import css from "../css/tv_series.module.scss"
import { webTitle } from "../components/settings"

export default () => {
  useEffect(() => {
    document.title = `Активные сериалы / ${webTitle}`
  }, [])

  const list = [
    "4490414", // винчестеры
    "252089", // доктор кто
    "4795888", // берлин
    "1301710", // игра в кальмара
    "1309174", // Уокер
    "1040428", // Сквозь Снег
    "1203039", // Локи
    "1046704", // Алекс Райдер
    "1367856", // Мы Все Мертвы
    "771194", // Halo
    "4476885", // Извне
    "1392743", // Постучись В Мою Дверь
    "1355296", // Ла-брея
    "1142153", // Новичок
    "4412019", // буровая
    "915196", // Очень странные дела
    "4526286", // Декстер: Новая кровь
    "817506", // Флэш
    "1200706", // Зло
    "4541515", // Укрытие
    "1239664", // Вторжение
    "915196", // Очень странные дела
    "1127489", // Загрузка
    "4693201", // Задача трёх тел
  ]

  return (
    <>
      <section className={css.main}>
        <header>
          <Link to="/tv">TV</Link>
        </header>

        <main>
          <div className={css.title}>
            <h3>Активных сериалов: {list.length}</h3>
          </div>
          <div className={css.items}>
            {list.map((v, i) => {
              return (
                <a
                  className={css.item}
                  href={`${window.location.origin}/tv/watch?id=${v}`}
                  key={i}
                >
                  <img
                    src={`https://kinopoiskapiunofficial.tech/images/posters/kp_small/${v}.jpg`}
                    alt={v}
                    loading="lazy"
                  />
                </a>
              )
            })}
          </div>
        </main>
      </section>
    </>
  )
}
