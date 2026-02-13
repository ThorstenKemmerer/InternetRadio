const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// In-memory storage for development/demo (first 50 normalized stations hard-coded)
// Source: radiobrowser_stations_latest.json (first 50 entries)
const stations = [
  {
    "stationuuid": "96057c18-0601-11e8-ae97-52543be04c81",
    "name": "Austrian Rock Radio",
    "url_stream": "http://live.antenne.at/arr",
    "url_homepage": "http://www.austrianrockradio.at/",
    "url_favicon": "https://austrianrockradio.at/wp-content/uploads/2023/02/liferadio-150x150.png",
    "tags": "rock",
    "iso_3166_1": "AT",
    "iso_3166_2": "",
    "iso_639": null,
    "geo_lat": null,
    "geo_long": null
  },
  {
    "stationuuid": "9605d694-0601-11e8-ae97-52543be04c81",
    "name": "LernRadio",
    "url_stream": "http://193.197.85.26:8000/listen.pls",
    "url_homepage": "http://www.lernradio.de/",
    "url_favicon": "https://www.belwue.de/favicon.ico",
    "tags": "",
    "iso_3166_1": "DE",
    "iso_3166_2": "",
    "iso_639": null,
    "geo_lat": null,
    "geo_long": null
  },
  {
    "stationuuid": "960633eb-0601-11e8-ae97-52543be04c81",
    "name": "Radio Max Merkur",
    "url_stream": "http://listen.radiomax.technology/merkur",
    "url_homepage": "http://www.radiomax.at/",
    "url_favicon": "",
    "tags": "",
    "iso_3166_1": "AT",
    "iso_3166_2": "",
    "iso_639": null,
    "geo_lat": null,
    "geo_long": null
  },
  {
    "stationuuid": "960a2859-0601-11e8-ae97-52543be04c81",
    "name": "Nova 106.9",
    "url_stream": "http://streaming.novaentertainment.com.au/nova1069",
    "url_homepage": "http://www.nova1069.com.au/",
    "url_favicon": "http://www.nova1069.com.au/assets/nova/icons/favicon/apple-touch-icon.png",
    "tags": "hits",
    "iso_3166_1": "AU",
    "iso_3166_2": "",
    "iso_639": null,
    "geo_lat": null,
    "geo_long": null
  },
  {
    "stationuuid": "960a26d5-0601-11e8-ae97-52543be04c81",
    "name": "Nova 100",
    "url_stream": "http://streaming.novaentertainment.com.au/nova100",
    "url_homepage": "http://www.nova100.com.au/",
    "url_favicon": "http://www.nova100.com.au/assets/nova/icons/favicon/apple-touch-icon.png",
    "tags": "hits",
    "iso_3166_1": "AU",
    "iso_3166_2": "",
    "iso_639": null,
    "geo_lat": null,
    "geo_long": null
  },
  {
    "stationuuid": "960a29d2-0601-11e8-ae97-52543be04c81",
    "name": "Nova 93.7",
    "url_stream": "http://streaming.novaentertainment.com.au/nova937",
    "url_homepage": "http://www.nova937.com.au/",
    "url_favicon": "https://www.novafm.com.au/wp-content/themes/theme-novafm.com.au/assets/icons/apple-touch-icon.png",
    "tags": "hits",
    "iso_3166_1": "AU",
    "iso_3166_2": "",
    "iso_639": null,
    "geo_lat": null,
    "geo_long": null
  },
  {
    "stationuuid": "960ab507-0601-11e8-ae97-52543be04c81",
    "name": "Nova 919",
    "url_stream": "http://streaming.novaentertainment.com.au/nova919",
    "url_homepage": "http://www.nova919.com.au/",
    "url_favicon": "",
    "tags": "hits",
    "iso_3166_1": "AU",
    "iso_3166_2": "",
    "iso_639": null,
    "geo_lat": null,
    "geo_long": null
  },
  {
    "stationuuid": "961338cb-0601-11e8-ae97-52543be04c81",
    "name": "Vibration Soft Hits",
    "url_stream": "http://vibration.stream2net.eu:8350/;stream/1",
    "url_homepage": "http://www.vibration108.ch/player/vibrationsofthits/",
    "url_favicon": "https://radiochablais.ch/images/xradiochablais1.png.pagespeed.ic.p3soqp385z.png",
    "tags": "",
    "iso_3166_1": "CH",
    "iso_3166_2": "",
    "iso_639": null,
    "geo_lat": null,
    "geo_long": null
  },
  {
    "stationuuid": "96133ae8-0601-11e8-ae97-52543be04c81",
    "name": "Vibration Gayradio",
    "url_stream": "http://vibration.stream2net.eu:8480/;stream/1",
    "url_homepage": "http://vibrationgayradio.ch/",
    "url_favicon": "",
    "tags": "",
    "iso_3166_1": "CH",
    "iso_3166_2": "",
    "iso_639": null,
    "geo_lat": null,
    "geo_long": null
  },
  {
    "stationuuid": "96133c49-0601-11e8-ae97-52543be04c81",
    "name": "Vibration Zen Relax",
    "url_stream": "http://vibration.stream2net.eu:8220/;stream/1",
    "url_homepage": "http://www.vibration108.ch/player/vibrationzenrelax/",
    "url_favicon": "http://www.vibration108.ch/wp-content/uploads/2014/06/favicon.jpg",
    "tags": "",
    "iso_3166_1": "CH",
    "iso_3166_2": "",
    "iso_639": null,
    "geo_lat": null,
    "geo_long": null
  },
  {
    "stationuuid": "960a81e1-0601-11e8-ae97-52543be04c81",
    "name": "Coast FM",
    "url_stream": "http://streaming1.coastfm.com.au:8000/broadwavehigh.mp3",
    "url_homepage": "http://www.coastfm.com.au/",
    "url_favicon": "",
    "tags": "community radio",
    "iso_3166_1": "AU",
    "iso_3166_2": "",
    "iso_639": null,
    "geo_lat": null,
    "geo_long": null
  },
  {
    "stationuuid": "9609a895-0601-11e8-ae97-52543be04c81",
    "name": "Star 104.5",
    "url_stream": "http://streaming.novaentertainment.com.au/starfm",
    "url_homepage": "http://www.star1045.com.au/",
    "url_favicon": "",
    "tags": "adult,contemporary,rock",
    "iso_3166_1": "AU",
    "iso_3166_2": "",
    "iso_639": null,
    "geo_lat": null,
    "geo_long": null
  },
  {
    "stationuuid": "96092402-0601-11e8-ae97-52543be04c81",
    "name": "Global FM",
    "url_stream": "http://globalfm.ice.infomaniak.ch/globalfm-high.mp3",
    "url_homepage": "http://www.globalfm.ch/site/",
    "url_favicon": "",
    "tags": "",
    "iso_3166_1": "CH",
    "iso_3166_2": "",
    "iso_639": null,
    "geo_lat": null,
    "geo_long": null
  },
  {
    "stationuuid": "960b8e6f-0601-11e8-ae97-52543be04c81",
    "name": "Energy Blick Trendz",
    "url_stream": "http://energyzuerich.ice.infomaniak.ch/energyzuerich-high.mp3",
    "url_homepage": "http://www.energyzueri.ch/",
    "url_favicon": "",
    "tags": "",
    "iso_3166_1": "CH",
    "iso_3166_2": "",
    "iso_639": null,
    "geo_lat": null,
    "geo_long": null
  },
  {
    "stationuuid": "960aa8ba-0601-11e8-ae97-52543be04c81",
    "name": "1000 Melodien",
    "url_stream": "http://stream.laut.fm/1000melodien",
    "url_homepage": "http://1000melodien.de/",
    "url_favicon": "http://1000melodien.de/apple-icon-120x120.png",
    "tags": "ambient,easy listening,instrumental",
    "iso_3166_1": "DE",
    "iso_3166_2": "",
    "iso_639": null,
    "geo_lat": null,
    "geo_long": null
  },
  {
    "stationuuid": "960a6167-0601-11e8-ae97-52543be04c81",
    "name": "1000 Discohits",
    "url_stream": "http://stream.laut.fm/1000discohits",
    "url_homepage": "http://1000discohits.de/",
    "url_favicon": "",
    "tags": "70s,80s,dance,disco,oldies",
    "iso_3166_1": "DE",
    "iso_3166_2": "",
    "iso_639": null,
    "geo_lat": null,
    "geo_long": null
  },
  {
    "stationuuid": "9606b4de-0601-11e8-ae97-52543be04c81",
    "name": "Radio Basilisk",
    "url_stream": "http://radiobasilisk-64.ice.infomaniak.ch/radiobasilisk-64-128-2.mp3",
    "url_homepage": "http://www.basilisk.ch/",
    "url_favicon": "http://www.basilisk.ch/assets/favicons/apple-icon-120x120.png",
    "tags": "",
    "iso_3166_1": "CH",
    "iso_3166_2": "",
    "iso_639": null,
    "geo_lat": null,
    "geo_long": null
  },
  {
    "stationuuid": "9609c9f5-0601-11e8-ae97-52543be04c81",
    "name": "5AA",
    "url_stream": "http://streaming.novaentertainment.com.au/fiveaa?type=.mp3",
    "url_homepage": "http://www.fiveaa.com.au/",
    "url_favicon": "https://www.fiveaa.com.au/wp-content/themes/theme-fiveaa.com.au/assets/icons/apple-touch-icon.png",
    "tags": "news,talk",
    "iso_3166_1": "AU",
    "iso_3166_2": "",
    "iso_639": null,
    "geo_lat": null,
    "geo_long": null
  },
  {
    "stationuuid": "9612c8db-0601-11e8-ae97-52543be04c81",
    "name": "RauteMusik Happy Hardcore",
    "url_stream": "http://happyhardcore-high.rautemusik.fm/",
    "url_homepage": "http://www.rautemusik.fm/happyhardcore/",
    "url_favicon": "",
    "tags": "happy hardcore",
    "iso_3166_1": "DE",
    "iso_3166_2": "",
    "iso_639": null,
    "geo_lat": null,
    "geo_long": null
  },
  {
    "stationuuid": "9605f436-0601-11e8-ae97-52543be04c81",
    "name": "Radio Z",
    "url_stream": "http://snd.radio-z.net:8000/Radio-Z",
    "url_homepage": "http://www.radio-z.net/",
    "url_favicon": "https://www.radio-z.net/storage/thumbs/192x192/r:1720104118/k96jmah7f5j5g.png",
    "tags": "",
    "iso_3166_1": "DE",
    "iso_3166_2": "",
    "iso_639": null,
    "geo_lat": null,
    "geo_long": null
  },
  {
    "stationuuid": "961a6ec0-0601-11e8-ae97-52543be04c81",
    "name": "Radio 3",
    "url_stream": "http://radio3-128.streaming.rs:9200/",
    "url_homepage": "http://www.radio3.rs/",
    "url_favicon": "",
    "tags": "dance,pop",
    "iso_3166_1": "RS",
    "iso_3166_2": "",
    "iso_639": null,
    "geo_lat": null,
    "geo_long": null
  },
  {
    "stationuuid": "961abb9b-0601-11e8-ae97-52543be04c81",
    "name": "RADIO 74",
    "url_stream": "http://radio74.ice.infomaniak.ch/radio74-low.mp3",
    "url_homepage": "http://www.radio74.org/",
    "url_favicon": "",
    "tags": "christian",
    "iso_3166_1": "FR",
    "iso_3166_2": "",
    "iso_639": null,
    "geo_lat": null,
    "geo_long": null
  },
  {
    "stationuuid": "961b1adc-0601-11e8-ae97-52543be04c81",
    "name": "Tangoparabailar",
    "url_stream": "http://stream.laut.fm/tangoparabailar",
    "url_homepage": "http://laut.fm/tangoparabailar",
    "url_favicon": "",
    "tags": "tango",
    "iso_3166_1": "DE",
    "iso_3166_2": "",
    "iso_639": null,
    "geo_lat": null,
    "geo_long": null
  },
  {
    "stationuuid": "961d665b-0601-11e8-ae97-52543be04c81",
    "name": "Radio România Cluj",
    "url_stream": "http://89.238.227.6:8384/",
    "url_homepage": "http://radiocluj.ro/",
    "url_favicon": "https://www.radiocluj.ro/wp-content/themes/radiocluj/images/favicons/favicon-96x96.png",
    "tags": "romania",
    "iso_3166_1": "RO",
    "iso_3166_2": "",
    "iso_639": null,
    "geo_lat": null,
    "geo_long": null
  },
  {
    "stationuuid": "961dea50-0601-11e8-ae97-52543be04c81",
    "name": "Born79",
    "url_stream": "http://stream.laut.fm/born79",
    "url_homepage": "http://laut.fm/born79",
    "url_favicon": "",
    "tags": "",
    "iso_3166_1": "DE",
    "iso_3166_2": "",
    "iso_639": null,
    "geo_lat": null,
    "geo_long": null
  },
  {
    "stationuuid": "961e6505-0601-11e8-ae97-52543be04c81",
    "name": "RauteMusik Solopiano",
    "url_stream": "http://solopiano-high.rautemusik.fm/",
    "url_homepage": "http://www.rautemusik.fm/solopiano/",
    "url_favicon": "",
    "tags": "classical,piano",
    "iso_3166_1": "DE",
    "iso_3166_2": "",
    "iso_639": null,
    "geo_lat": null,
    "geo_long": null
  },
  {
    "stationuuid": "9618e172-0601-11e8-ae97-52543be04c81",
    "name": "Veronika",
    "url_stream": "http://stream.metacast.eu/veronika.ogg",
    "url_homepage": "http://www.radioveronika.bg/",
    "url_favicon": "",
    "tags": "",
    "iso_3166_1": "BG",
    "iso_3166_2": "",
    "iso_639": null,
    "geo_lat": null,
    "geo_long": null
  },
  {
    "stationuuid": "960a5ad0-0601-11e8-ae97-52543be04c81",
    "name": "KBXR 102.3 BXR Columbia, MO",
    "url_stream": "http://playerservices.streamtheworld.com/m3u/KBXRFM.m3u",
    "url_homepage": "http://www.bxr.com/",
    "url_favicon": "",
    "tags": "adult,album,alternative",
    "iso_3166_1": "US",
    "iso_3166_2": "",
    "iso_639": null,
    "geo_lat": null,
    "geo_long": null
  },
  {
    "stationuuid": "961d5912-0601-11e8-ae97-52543be04c81",
    "name": "WXNA 101.5 Nashville, TN \"Low Power, High Voltage\"",
    "url_stream": "http://listen.wxnafm.org:8000/stream",
    "url_homepage": "http://www.wxnafm.org/",
    "url_favicon": "",
    "tags": "community radio,freeform,nashville",
    "iso_3166_1": "US",
    "iso_3166_2": "",
    "iso_639": null,
    "geo_lat": null,
    "geo_long": null
  },
  {
    "stationuuid": "961c15e9-0601-11e8-ae97-52543be04c81",
    "name": "CIRV 88.9 Toronto, ON",
    "url_stream": "http://ice5.securenetsystems.net/CIRV",
    "url_homepage": "http://www.cirvfm.com/",
    "url_favicon": "",
    "tags": "ethnic programming,multicultural,multilingual,toronto",
    "iso_3166_1": "CA",
    "iso_3166_2": "",
    "iso_639": null,
    "geo_lat": null,
    "geo_long": null
  },
  {
    "stationuuid": "9621592e-0601-11e8-ae97-52543be04c81",
    "name": "CJMR 1320 Mississauga, ON",
    "url_stream": "http://provisioning.streamtheworld.com/pls/CJMRAMAAC.pls",
    "url_homepage": "http://www.cjmr1320.ca/",
    "url_favicon": "",
    "tags": "commercial,mississauga,multicultural,multilingual,toronto",
    "iso_3166_1": "CA",
    "iso_3166_2": "",
    "iso_639": null,
    "geo_lat": null,
    "geo_long": null
  },
  {
    "stationuuid": "96222109-0601-11e8-ae97-52543be04c81",
    "name": "Sanctuary - MP3",
    "url_stream": "https://rhema-radio.streamguys1.com/rhema-sanctuary.mp3",
    "url_homepage": "https://yoursanctuary.nz/",
    "url_favicon": "https://yoursanctuary.nz/_ipx/_/images/cover.jpg",
    "tags": "christian,worship",
    "iso_3166_1": "NZ",
    "iso_3166_2": "NZ-AUK",
    "iso_639": "EN",
    "geo_lat": null,
    "geo_long": null
  },
  {
    "stationuuid": "96183602-0601-11e8-ae97-52543be04c81",
    "name": "ILoveRadio",
    "url_stream": "http://www.iloveradio.de/iloveradio.m3u",
    "url_homepage": "http://iloveradio.de/",
    "url_favicon": "http://iloveradio.de/favicon.ico",
    "tags": "",
    "iso_3166_1": "DE",
    "iso_3166_2": "",
    "iso_639": null,
    "geo_lat": null,
    "geo_long": null
  },
  {
    "stationuuid": "961f85c0-0601-11e8-ae97-52543be04c81",
    "name": "Radio todamax",
    "url_stream": "http://stream.laut.fm/todamax",
    "url_homepage": "http://laut.fm/todamax",
    "url_favicon": "",
    "tags": "covers,electronic,guitar,heavy metal,metal,ndw,pop,punk,techno,thrash metal",
    "iso_3166_1": "DE",
    "iso_3166_2": "",
    "iso_639": null,
    "geo_lat": null,
    "geo_long": null
  },
  {
    "stationuuid": "9623cbd4-0601-11e8-ae97-52543be04c81",
    "name": "Kamikaze Radio",
    "url_stream": "http://streamplus52.leonex.de:10894/",
    "url_homepage": "http://www.kamikaze-radio.de/",
    "url_favicon": "",
    "tags": "alternative,punk,ska,underground",
    "iso_3166_1": "DE",
    "iso_3166_2": "",
    "iso_639": null,
    "geo_lat": null,
    "geo_long": null
  },
  {
    "stationuuid": "961d5b7f-0601-11e8-ae97-52543be04c81",
    "name": "Fine Music Radio",
    "url_stream": "http://edge.iono.fm/xhls/fmr_live_medium.m3u8",
    "url_homepage": "http://www.fmr.co.za/",
    "url_favicon": "http://www.fmr.co.za/favicon.ico",
    "tags": "classical,m3u8,music",
    "iso_3166_1": "ZA",
    "iso_3166_2": "",
    "iso_639": null,
    "geo_lat": null,
    "geo_long": null
  },
  {
    "stationuuid": "960e316d-0601-11e8-ae97-52543be04c81",
    "name": "The Great American Songbook",
    "url_stream": "http://tgas.dyndns.org:8001/;",
    "url_homepage": "http://www.greatamericansongbook.info/index.html",
    "url_favicon": "",
    "tags": "classic hits,crooner,entertainer,great american songbook,jazz",
    "iso_3166_1": "NL",
    "iso_3166_2": "",
    "iso_639": null,
    "geo_lat": null,
    "geo_long": null
  },
  {
    "stationuuid": "9623486f-0601-11e8-ae97-52543be04c81",
    "name": "CJLL 97.9 \"CHIN Radio Ottawa\", ON",
    "url_stream": "http://ice7.securenetsystems.net/CJLLFM",
    "url_homepage": "http://www.chinradioottawa.com/",
    "url_favicon": "",
    "tags": "commercial,multicultural,multilingual,ottawa",
    "iso_3166_1": "CA",
    "iso_3166_2": "",
    "iso_639": null,
    "geo_lat": null,
    "geo_long": null
  },
  {
    "stationuuid": "960c759c-0601-11e8-ae97-52543be04c81",
    "name": "Nemzetiségi adások",
    "url_stream": "http://mr-stream.mediaconnect.hu/4743/mr4.aac",
    "url_homepage": "http://www.mediaklikk.hu/nemzetisegiradio/",
    "url_favicon": "https://upload.wikimedia.org/wikipedia/hu/archive/8/8e/20120820103558!Mr4-Nemzetis%C3%A9gi.png",
    "tags": "duna média,minority,public radio,talk",
    "iso_3166_1": "HU",
    "iso_3166_2": "",
    "iso_639": null,
    "geo_lat": null,
    "geo_long": null
  },
  {
    "stationuuid": "9624ac41-0601-11e8-ae97-52543be04c81",
    "name": "Soundstorm Radio",
    "url_stream": "http://stream.soundstorm-radio.com:8000/",
    "url_homepage": "http://soundstorm-radio.com/",
    "url_favicon": "",
    "tags": "relax",
    "iso_3166_1": "CA",
    "iso_3166_2": "",
    "iso_639": null,
    "geo_lat": null,
    "geo_long": null
  },
  {
    "stationuuid": "96241582-0601-11e8-ae97-52543be04c81",
    "name": "WGMC \"Jazz 90.1\" Rochester, NY",
    "url_stream": "http://greece-media.monroe.edu/wgmc.mp3",
    "url_homepage": "http://www.jazz901.org/",
    "url_favicon": "",
    "tags": "community radio,jazz,multicultural,multilingual,rochester",
    "iso_3166_1": "US",
    "iso_3166_2": "",
    "iso_639": null,
    "geo_lat": null,
    "geo_long": null
  },
  {
    "stationuuid": "961ce10a-0601-11e8-ae97-52543be04c81",
    "name": "Radio Gherdëina Dolomites",
    "url_stream": "http://sr1.inmystream.info:8090/;stream.mp3",
    "url_homepage": "http://www.radiogardena.it/",
    "url_favicon": "http://www.radiogardena.it/images/favicon.ico",
    "tags": "adult contemporary,news",
    "iso_3166_1": "IT",
    "iso_3166_2": "",
    "iso_639": null,
    "geo_lat": null,
    "geo_long": null
  },
  {
    "stationuuid": "962a0a81-0601-11e8-ae97-52543be04c81",
    "name": "Magic 96.5 - Oranjestad",
    "url_stream": "http://158.69.114.190:8072/;",
    "url_homepage": "http://www.magic96-5.com/",
    "url_favicon": "",
    "tags": "latin music,oranjestad,pop,top 40",
    "iso_3166_1": "AW",
    "iso_3166_2": "",
    "iso_639": null,
    "geo_lat": null,
    "geo_long": null
  },
  {
    "stationuuid": "96300cd6-0601-11e8-ae97-52543be04c81",
    "name": "WNZK 690 & 680 Dearborn Heights, MI",
    "url_stream": "http://wnzk.birach.com:9000/;",
    "url_homepage": "http://www.birach.com/wnzk.html",
    "url_favicon": "",
    "tags": "dearborn heights,detroit,ethnic programming,multicultural,multilingual",
    "iso_3166_1": "US",
    "iso_3166_2": "",
    "iso_639": null,
    "geo_lat": null,
    "geo_long": null
  },
  {
    "stationuuid": "96300e5b-0601-11e8-ae97-52543be04c81",
    "name": "WNWI 1080 Oak Lawn, IL",
    "url_stream": "http://wnwi.birach.com:9002/;",
    "url_homepage": "http://www.birach.com/wnwi.html",
    "url_favicon": "",
    "tags": "chicago,ethnic programming,multicultural,multilingual,oak lawn",
    "iso_3166_1": "US",
    "iso_3166_2": "",
    "iso_639": null,
    "geo_lat": null,
    "geo_long": null
  },
  {
    "stationuuid": "962fdcaf-0601-11e8-ae97-52543be04c81",
    "name": "RDI 97.1 FM",
    "url_stream": "http://202.147.199.99:8000/;stream/1",
    "url_homepage": "http://www.rdifm.co.id/",
    "url_favicon": "https://i.imgur.com/4abdtyl.jpeg",
    "tags": "dangdut",
    "iso_3166_1": "ID",
    "iso_3166_2": "",
    "iso_639": null,
    "geo_lat": null,
    "geo_long": null
  },
  {
    "stationuuid": "963327f1-0601-11e8-ae97-52543be04c81",
    "name": "Bon FM 102.7  Riscado",
    "url_stream": "http://bonfm5.primcast.com:6482/;",
    "url_homepage": "http://www.bonfm.com/",
    "url_favicon": "",
    "tags": "riscado,top 40",
    "iso_3166_1": "BQ",
    "iso_3166_2": "",
    "iso_639": null,
    "geo_lat": null,
    "geo_long": null
  },
  {
    "stationuuid": "9634bcf0-0601-11e8-ae97-52543be04c81",
    "name": "1000 HITS Love",
    "url_stream": "http://c2.auracast.net:8097/stream",
    "url_homepage": "http://www.1000hitslove.eu/",
    "url_favicon": "",
    "tags": "",
    "iso_3166_1": "DE",
    "iso_3166_2": "",
    "iso_639": null,
    "geo_lat": null,
    "geo_long": null
  },
  {
    "stationuuid": "9634c42e-0601-11e8-ae97-52543be04c81",
    "name": "Radio Erzgebirge - 80er Kulthits",
    "url_stream": "http://streams.bcs-systems.de/slp/80er/erzgebirge/mp3/radioplayer/web?listenerid=ae2db4a8782ab843b168ffb670e8e377&awparams=companionAds%3Atrue",
    "url_homepage": "http://80er.radioerzgebirge.de/",
    "url_favicon": "",
    "tags": "",
    "iso_3166_1": "DE",
    "iso_3166_2": "",
    "iso_639": null,
    "geo_lat": null,
    "geo_long": null
  },
  {
    "stationuuid": "9609ba6c-0601-11e8-ae97-52543be04c81",
    "name": "Laut.FM super radio",
    "url_stream": "http://stream.laut.fm/super-radio",
    "url_homepage": "http://laut.fm/super-radio",
    "url_favicon": "https://lh3.ggpht.com/a4M_Oyz2Jek1bkcRe8I7v3A8clEOoOI8Y-NiYuuICuw0wOHwaZgMUit4rRgC18mGZMo_=w300",
    "tags": "dance,elektro,oldies,pop,rock,soul,trance",
    "iso_3166_1": "DE",
    "iso_3166_2": "",
    "iso_639": null,
    "geo_lat": null,
    "geo_long": null
  }
];

const escapeRegExp = value => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const getStationTags = tags => (tags ? tags.split(',').map(tag => tag.trim()).filter(Boolean) : []);
const parsePositiveInt = (value, fallback) => {
  const parsed = Number.parseInt(value, 10);
  return Number.isNaN(parsed) || parsed < 1 ? fallback : parsed;
};
const getPagination = query => {
  const limit = Math.min(parsePositiveInt(query.limit, 50), 50);
  const page = parsePositiveInt(query.page, 1);
  return { page, limit };
};
const getStationsResponse = (items, query) => {
  const { page, limit } = getPagination(query);
  const total = items.length;
  const totalPages = total === 0 ? 0 : Math.ceil(total / limit);
  const safePage = totalPages > 0 && page > totalPages ? totalPages : page;
  const startIndex = (safePage - 1) * limit;
  const stations = items.slice(startIndex, startIndex + limit);

  return {
    stations,
    pagination: {
      page: safePage,
      limit,
      total,
      totalPages
    }
  };
};

// API Routes
// Get all stations
app.get('/api/stations', (req, res) => {
  let filtered = stations;
  if (req.query.country) {
    filtered = filtered.filter(station => station.iso_3166_1 === req.query.country);
  }
  if (req.query.tag) {
    const tag = String(req.query.tag).trim();
    if (tag) {
      const regex = new RegExp(`(^|,\\s*)${escapeRegExp(tag)}(,|$)`, 'i');
      filtered = filtered.filter(station => regex.test(station.tags || ''));
    }
  }
  const sorted = filtered.slice().sort((a, b) => a.name.localeCompare(b.name));
  res.json(getStationsResponse(sorted, req.query));
});

// Get list of countries (ISO code + raw value)
app.get('/api/stations/countries', (req, res) => {
  const codes = [...new Set(stations.map(station => station.iso_3166_1).filter(Boolean))]
    .sort((a, b) => a.localeCompare(b));
  res.json(codes.map(code => ({ code, name: String(code).trim() })));
});

// Get list of tags
app.get('/api/stations/tags', (req, res) => {
  const tagSet = new Set();
  stations.forEach(station => {
    getStationTags(station.tags).forEach(tag => tagSet.add(tag));
  });
  res.json([...tagSet].sort((a, b) => a.localeCompare(b)));
});

// Get stations by country (ISO 3166-1 code)
app.get('/api/stations/country/:country', (req, res) => {
  const filtered = stations.filter(station => station.iso_3166_1 === req.params.country);
  const sorted = filtered.slice().sort((a, b) => a.name.localeCompare(b.name));
  res.json(getStationsResponse(sorted, req.query));
});

// Get stations by tag
app.get('/api/stations/tag/:tag', (req, res) => {
  const tag = req.params.tag.trim();
  const regex = new RegExp(`(^|,\\s*)${escapeRegExp(tag)}(,|$)`, 'i');
  const filtered = stations.filter(station => regex.test(station.tags || ''));
  const sorted = filtered.slice().sort((a, b) => a.name.localeCompare(b.name));
  res.json(getStationsResponse(sorted, req.query));
});

// Get single station
app.get('/api/stations/:id', (req, res) => {
  const station = stations.find(s => s.stationuuid === req.params.id);
  if (!station) {
    return res.status(404).json({ message: 'Station not found' });
  }
  res.json(station);
});

// Create new station
app.post('/api/stations', (req, res) => {
  const newStation = {
    stationuuid: req.body.stationuuid || `station-${Date.now()}`,
    name: req.body.name,
    url_stream: req.body.url_stream,
    url_homepage: req.body.url_homepage || '',
    url_favicon: req.body.url_favicon || '',
    tags: req.body.tags || '',
    iso_3166_1: req.body.iso_3166_1 || '',
    iso_3166_2: req.body.iso_3166_2 || '',
    iso_639: req.body.iso_639 ?? null,
    geo_lat: req.body.geo_lat ?? null,
    geo_long: req.body.geo_long ?? null
  };
  stations.push(newStation);
  res.status(201).json(newStation);
});

// Update station
app.put('/api/stations/:id', (req, res) => {
  const index = stations.findIndex(s => s.stationuuid === req.params.id);
  if (index === -1) {
    return res.status(404).json({ message: 'Station not found' });
  }

  stations[index] = { ...stations[index], ...req.body, stationuuid: stations[index].stationuuid };
  res.json(stations[index]);
});

// Delete station
app.delete('/api/stations/:id', (req, res) => {
  const index = stations.findIndex(s => s.stationuuid === req.params.id);
  if (index === -1) {
    return res.status(404).json({ message: 'Station not found' });
  }

  stations.splice(index, 1);
  res.json({ message: 'Station deleted' });
});

// Root route
app.get('/', (req, res) => {
  res.json({ message: 'Internet Radio API Server - In-Memory Mode' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log('Using in-memory storage (no MongoDB required)');
});

module.exports = app;
