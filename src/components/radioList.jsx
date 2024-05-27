const list = [
  {
    id: "101",
    title: "Record",
    link: "https://radiorecord.hostingradio.ru/rr_main96.aacp",
  },
  {
    id: "102",
    title: "Russian Mix",
    link: "https://radiorecord.hostingradio.ru/rus96.aacp",
  },
  {
    id: "103",
    title: "Russian Hits",
    link: "https://radiorecord.hostingradio.ru/russianhits96.aacp",
  },
  {
    id: "104",
    title: "Russian Gold",
    link: "https://radiorecord.hostingradio.ru/russiangold96.aacp",
  },
  {
    id: "105",
    title: "Rap Classics",
    link: "https://radiorecord.hostingradio.ru/rapclassics96.aacp",
  },
  {
    id: "106",
    title: "Rap Hits",
    link: "https://radiorecord.hostingradio.ru/rap96.aacp",
  },
  {
    id: "107",
    title: "Christmas",
    link: "https://radiorecord.hostingradio.ru/christmas96.aacp",
  },
  {
    id: "108",
    title: "Европа-Плюс",
    link: "https://ep128.hostingradio.ru:8030/ep128",
  },
  {
    id: "109",
    title: "Топ 40",
    link: "http://eptop128server.streamr.ru:8033/eptop128",
  },
  {
    id: "110",
    title: "Summer Dance",
    link: "https://radiorecord.hostingradio.ru/summerparty96.aacp",
  },
  {
    id: "111",
    title: "Ambient",
    link: "https://radiorecord.hostingradio.ru/ambient96.aacp",
  },
  {
    id: "112",
    title: "181 The Mix",
    link: "http://listen.livestreamingservice.com/181-themix_64k.aac",
  },
  { id: "113", title: "HOT 108 JAMZ", link: "http://66.85.88.174:80/hot108" },
  {
    id: "114",
    title: "Valli di Bergamo",
    link: "http://46.252.154.133:58080/stream.mp3",
  },
  {
    id: "118",
    title: "Star 90's",
    link: "https://listen.181fm.com/181-star90s_128k.mp3",
  },
  {
    id: "119",
    title: "Power 181 (Top 40)",
    link: "https://listen.181fm.com/181-power_128k.mp3",
  },
  {
    id: "121",
    title: "Organic",
    link: "https://radiorecord.hostingradio.ru/organic96.aacp",
  },
  {
    id: "122",
    title: "Chill House",
    link: "https://radiorecord.hostingradio.ru/chillhouse96.aacp",
  },
  {
    id: "123",
    title: "Lo-Fi",
    link: "https://radiorecord.hostingradio.ru/lofi96.aacp",
  },
  {
    id: "124",
    title: "Dream Pop",
    link: "https://radiorecord.hostingradio.ru/dreampop96.aacp",
  },
  {
    id: "125",
    title: "Innocence",
    link: "https://radiorecord.hostingradio.ru/ibiza96.aacp",
  },
  {
    id: "126",
    title: "Deep",
    link: "https://radiorecord.hostingradio.ru/deep96.aacp",
  },
  {
    id: "127",
    title: "Tech House",
    link: "https://radiorecord.hostingradio.ru/techouse96.aacp",
  },
  {
    id: "128",
    title: "Chill-Out",
    link: "https://radiorecord.hostingradio.ru/chil96.aacp",
  },
  {
    id: "129",
    title: "Pirate Station",
    link: "https://radiorecord.hostingradio.ru/ps96.aacp",
  },
  {
    id: "130",
    title: "Маятник Фуко",
    link: "https://radiorecord.hostingradio.ru/mf96.aacp",
  },
  {
    id: "131",
    title: "Black Rap",
    link: "https://radiorecord.hostingradio.ru/yo96.aacp",
  },
  {
    id: "132",
    title: "Trancemission",
    link: "https://radiorecord.hostingradio.ru/tm96.aacp",
  },
  {
    id: "133",
    title: "Megamix",
    link: "https://radiorecord.hostingradio.ru/mix96.aacp",
  },
  {
    id: "134",
    title: "Record Gold",
    link: "https://radiorecord.hostingradio.ru/gold96.aacp",
  },
  {
    id: "135",
    title: "Big Hits",
    link: "https://radiorecord.hostingradio.ru/bighits96.aacp",
  },
  {
    id: "136",
    title: "Remix",
    link: "https://radiorecord.hostingradio.ru/rmx96.aacp",
  },
  {
    id: "137",
    title: "60's Dance",
    link: "https://radiorecord.hostingradio.ru/cadillac96.aacp",
  },
  {
    id: "138",
    title: "70's Dance",
    link: "https://radiorecord.hostingradio.ru/197096.aacp",
  },
  {
    id: "139",
    title: "Record 80-х",
    link: "https://radiorecord.hostingradio.ru/198096.aacp",
  },
  {
    id: "140",
    title: "Супердискотека 90-х",
    link: "https://radiorecord.hostingradio.ru/sd9096.aacp",
  },
  {
    id: "141",
    title: "Bass House",
    link: "https://radiorecord.hostingradio.ru/jackin96.aacp",
  },
  {
    id: "142",
    title: "VIP House",
    link: "https://radiorecord.hostingradio.ru/vip96.aacp",
  },
  {
    id: "143",
    title: "Trance Classics",
    link: "https://radiorecord.hostingradio.ru/trancehits96.aacp",
  },
  {
    id: "144",
    title: "House Hits",
    link: "https://radiorecord.hostingradio.ru/househits96.aacp",
  },
  {
    id: "145",
    title: "EDM",
    link: "https://radiorecord.hostingradio.ru/club96.aacp",
  },
  {
    id: "146",
    title: "Minimal/Tech",
    link: "https://radiorecord.hostingradio.ru/mini96.aacp",
  },
  {
    id: "147",
    title: "Tropical",
    link: "https://radiorecord.hostingradio.ru/trop96.aacp",
  },
  {
    id: "148",
    title: "House Classics",
    link: "https://radiorecord.hostingradio.ru/houseclss96.aacp",
  },
  {
    id: "149",
    title: "D'n'B Classics",
    link: "https://radiorecord.hostingradio.ru/drumhits96.aacp",
  },
  {
    id: "150",
    title: "EDM Classics",
    link: "https://radiorecord.hostingradio.ru/edmhits96.aacp",
  },
  {
    id: "151",
    title: "Future House",
    link: "https://radiorecord.hostingradio.ru/fut96.aacp",
  },
  {
    id: "152",
    title: "Trap",
    link: "https://radiorecord.hostingradio.ru/trap96.aacp",
  },
  {
    id: "153",
    title: "Progressive",
    link: "https://radiorecord.hostingradio.ru/progr96.aacp",
  },
  {
    id: "154",
    title: "Breaks",
    link: "https://radiorecord.hostingradio.ru/brks96.aacp",
  },
  {
    id: "155",
    title: "Trancehouse",
    link: "https://radiorecord.hostingradio.ru/trancehouse96.aacp",
  },
  {
    id: "156",
    title: "GOA/PSY",
    link: "https://radiorecord.hostingradio.ru/goa96.aacp",
  },
  {
    id: "157",
    title: "Dream Dance",
    link: "https://radiorecord.hostingradio.ru/dream96.aacp",
  },
  {
    id: "158",
    title: "Uplifting",
    link: "https://radiorecord.hostingradio.ru/uplift96.aacp",
  },
  {
    id: "159",
    title: "Electro",
    link: "https://radiorecord.hostingradio.ru/elect96.aacp",
  },
  {
    id: "160",
    title: "Future Bass",
    link: "https://radiorecord.hostingradio.ru/fbass96.aacp",
  },
  {
    id: "161",
    title: "Neurofunk",
    link: "https://radiorecord.hostingradio.ru/neurofunk96.aacp",
  },
  {
    id: "162",
    title: "Dancecore",
    link: "https://radiorecord.hostingradio.ru/dc96.aacp",
  },
  {
    id: "163",
    title: "Liquid Funk",
    link: "https://radiorecord.hostingradio.ru/liquidfunk96.aacp",
  },
  {
    id: "164",
    title: "Eurodance",
    link: "https://radiorecord.hostingradio.ru/eurodance96.aacp",
  },
  {
    id: "165",
    title: "Dubstep",
    link: "https://radiorecord.hostingradio.ru/dub96.aacp",
  },
  {
    id: "166",
    title: "Technopop",
    link: "https://radiorecord.hostingradio.ru/technopop96.aacp",
  },
  {
    id: "167",
    title: "Techno",
    link: "https://radiorecord.hostingradio.ru/techno96.aacp",
  },
  {
    id: "168",
    title: "Disco/Funk",
    link: "https://radiorecord.hostingradio.ru/discofunk96.aacp",
  },
  {
    id: "169",
    title: "Hardstyle",
    link: "https://radiorecord.hostingradio.ru/teo96.aacp",
  },
  {
    id: "170",
    title: "Tecktonik",
    link: "https://radiorecord.hostingradio.ru/tecktonik96.aacp",
  },
  {
    id: "171",
    title: "Midtempo",
    link: "https://radiorecord.hostingradio.ru/mt96.aacp",
  },
  {
    id: "172",
    title: "Synthwave",
    link: "https://radiorecord.hostingradio.ru/synth96.aacp",
  },
  {
    id: "173",
    title: "Old School",
    link: "https://radiorecord.hostingradio.ru/pump96.aacp",
  },
  {
    id: "174",
    title: "Hard Bass",
    link: "https://radiorecord.hostingradio.ru/hbass96.aacp",
  },
  {
    id: "175",
    title: "Darkside",
    link: "https://radiorecord.hostingradio.ru/darkside96.aacp",
  },
  {
    id: "176",
    title: "Hypnotic",
    link: "https://radiorecord.hostingradio.ru/hypno96.aacp",
  },
  {
    id: "177",
    title: "Moombahton",
    link: "https://radiorecord.hostingradio.ru/mmbt96.aacp",
  },
  {
    id: "178",
    title: "2-step",
    link: "https://radiorecord.hostingradio.ru/2step96.aacp",
  },
  {
    id: "179",
    title: "Groove/Tribal",
    link: "https://radiorecord.hostingradio.ru/groovetribal96.aacp",
  },
  {
    id: "180",
    title: "Rave FM",
    link: "https://radiorecord.hostingradio.ru/rave96.aacp",
  },
  {
    id: "181",
    title: "Jungle",
    link: "https://radiorecord.hostingradio.ru/jungle96.aacp",
  },
  {
    id: "182",
    title: "Complextro",
    link: "https://radiorecord.hostingradio.ru/complextro96.aacp",
  },
  {
    id: "183",
    title: "Гоп FM",
    link: "https://radiorecord.hostingradio.ru/gop96.aacp",
  },
  {
    id: "184",
    title: "Rock",
    link: "https://radiorecord.hostingradio.ru/rock96.aacp",
  },
  {
    id: "185",
    title: "Руки Вверх!",
    link: "https://radiorecord.hostingradio.ru/rv96.aacp",
  },
  {
    id: "186",
    title: "Веснушка FM",
    link: "https://radiorecord.hostingradio.ru/deti96.aacp",
  },
  {
    id: "187",
    title: "Медляк FM",
    link: "https://radiorecord.hostingradio.ru/mdl96.aacp",
  },
  {
    id: "188",
    title: "Нафталин FM",
    link: "https://radiorecord.hostingradio.ru/naft96.aacp",
  },
  {
    id: "189",
    title: "Гастарбайтер FM",
    link: "https://radiorecord.hostingradio.ru/gast96.aacp",
  },
  {
    id: "190",
    title: "Симфония FM",
    link: "https://radiorecord.hostingradio.ru/symph96.aacp",
  },
  { id: "191", title: "Nightwave Plaza", link: "https://radio.plaza.one/mp3" },
  {
    id: "197",
    title: "Радио Эрмитаж",
    link: "https://hermitage.hostingradio.ru/hermitage128.mp3",
  },
]

export default list
