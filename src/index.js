// REACT
import React from "react"
import { createRoot } from "react-dom/client"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
// CSS
import "./index.scss"
// PAGES
// import TvListPage from "./pages/tv_list"
// import WatchPage from "./pages/tv_watch"
// import EpisodePage from "./pages/tv_episode"
import MainPage from "./pages/main"
import RadioPage from "./pages/radio"
import MusicPage from "./pages/music"
import MyMusicPage from "./pages/mymusic"
import ErrorPage from "./pages/404"
import TvPage from "./pages/tv_main"
import TvSimplePage from "./pages/tv_search"
import TvSimpleWatchPage from "./pages/tv_watch"
import TvFavoritesPage from "./pages/tv_favorites"
import TvCollectionsPage from "./pages/tv_collections"
import TvContactsPage from "./pages/tv_contacts"
import TvAuthPage from "./pages/tv_auth"
import TvSeries from "./pages/tv_series"
import Redirect from "./pages/redirect"
import WebDev from "./pages/webdev"
import WebDev1 from "./pages/webdev/1"
import WebDev2 from "./pages/webdev/2"
import IpTv from "./pages/iptv"
import MultiWatch from "./pages/multiwatch"
import Passgen from "./pages/passgen"

const root = createRoot(document.getElementById("root"))

root.render(
  <>
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />

        {/* <Route path="/tv/watch/:id" element={<WatchPage />} /> */}
        {/* <Route path="/tv/watch/:id/episodes" element={<EpisodePage />} /> */}
        {/* <Route path="/tv/list" element={<TvListPage />} /> */}
        <Route path="/tv" element={<TvPage />} />
        <Route path="/tv/auth" element={<TvAuthPage />} />
        <Route path="/tv/contacts" element={<TvContactsPage />} />
        <Route path="/tv/search" element={<TvSimplePage />} />
        <Route path="/tv/watch" element={<TvSimpleWatchPage />} />
        <Route path="/tv/favorites" element={<TvFavoritesPage />} />
        <Route path="/tv/collections" element={<TvCollectionsPage />} />
        <Route path="/tv/series" element={<TvSeries />} />

        <Route path="/radio" element={<RadioPage />} />

        <Route path="/music" element={<MusicPage />} />
        <Route path="/mymusic" element={<MyMusicPage />} />

        <Route path="/webdev" element={<WebDev />} />
        <Route path="/webdev/1" element={<WebDev1 />} />
        <Route path="/webdev/2" element={<WebDev2 />} />

        {/* <Route path="/r" element={<Redirect />} /> */}
        <Route path="/r/:q" element={<Redirect />} />

        <Route path="/iptv" element={<IpTv />} />

        <Route path="/multiwatch" element={<MultiWatch />} />

        <Route path="/passgen" element={<Passgen />} />

        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </Router>
  </>
)
