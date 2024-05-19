import {
  AudioMutedOutlined,
  AudioOutlined,
} from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import useClipboard from "react-use-clipboard";
import GoogleResults from "./GoogleResults";
import Map from "./Map";
import axios from "axios";
import YaleikymAssalam from '../assets/newSound/hello.mp3'
import Ok from '../assets/newSound/ok.mp3'

function Animate() {
  //condition
  const [time, setTime] = useState(new Date());
  const [active, setActive] = useState(false);
  const [message, setMessage] = useState("");
  const [results, setResults] = useState([]);
  const [textToCopy, setTextToCopy] = useState();
  const [isCopied, setCopied] = useClipboard();
  const [show, setShow] = useState(true);
  const [toggle, setToggle] = useState("");
  const [photos, setPhotos] = useState([]);

  let contentRes;
  //time is start
  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const monthArray = [
    "Январь",
    "Февраль",
    "Март",
    "Апрель",
    "Май",
    "Июнь",
    "Июль",
    "Август",
    "Сентябрь",
    "Октябрь",
    "Ноябрь",
    "Декабрь",
  ];
  const WeekDArray = [
    "Дуйшомбу",
    "Шейшемби",
    "Шаршемби",
    "Бейшемби",
    "Жума",
    "Ишемби",
    "Жекшемби",
  ];

  const DateArray = {
    day: time.getDate(),
    month: time.getMonth(),
    weekD: time.getDay(),
  };

  const currentTime = time.toLocaleTimeString();
  const [hours, minutes, seconds] = currentTime.split(":");
  const formattedTime = `${hours}:${minutes}:${seconds.padStart(2, "0")}`;

  // time is end

   const Yaleikym = new Audio(YaleikymAssalam)
   const ok = new Audio(Ok)

  // commands base start

  const commands = [
    {
      command: ["Привет", "Здраствуйте", "Здорово", "Даров", "Дарова"],
      callback: () => {
        setMessage("Саламатсызбы");
        
      },
    },
    
    {
      command: ["Ассалам алейкум", "Салам алейкум", "Салам"],
      callback: () => {
        setMessage("Уалейкум Ассалям");
        Yaleikym.play()
      },
    },
    {
      command: ["Стоп"],
      callback: () => {
        setMessage("Как пожелаете:)");
        SpeechRecognition.stopListening();
        setActive(false)
      },
    },
    {
      command: "так",
      callback: () => setMessage(`Эмне болду?`),
    },

    {
      command: ["очистка","Clear", 'мусор','удалить'],
      callback: ({ resetTranscript }) => { resetTranscript()
        ok.play()
      },
    },
    {
      command: ["Убрать сообщение", "удалить сообщение", "Удалить сообщение"],
      callback: () => setMessage("  "),
    },

    {
      command: "Скопировать",
      callback: () => setCopied,
    },
    {
      command: "Светлая тема",
      callback: () => {
        document.body.style.backgroundColor =
          "#185360af";
      },
    },
    {
      command: "Тёмная тема",
      callback: () => {
        document.body.style.backgroundColor =
          "black";
      },
    },
    {
      command: "жёлтый",
      callback: () => {
        document.getElementById("container").style.backgroundColor =
          "rgba(122, 128, 0, 0.434)";

        setTimeout(() => {
          document.getElementById("container").style.backgroundColor =
            "rgba(215, 212, 212, 0.595)";
        }, 1000);
      },
    },
    {
      command: "синий",
      callback: () => {
        document.getElementById("container").style.backgroundColor =
          "rgba(0, 34, 128, 0.434)";

        setTimeout(() => {
          document.getElementById("container").style.backgroundColor =
            "rgba(215, 212, 212, 0.595)";
        }, 1000);
      },
    },
    {
      command: "розовый",
      callback: () => {
        document.getElementById("container").style.backgroundColor =
          "rgba(128, 0, 100, 0.434)";

        setTimeout(() => {
          document.getElementById("container").style.backgroundColor =
            "rgba(215, 212, 212, 0.595)";
        }, 1000);
      },
    },

    {
      command: "Открой YouTube",
      callback: () => { window.open("https://www.youtube.com/", "_blanck")
      ok.play()
      }
    },
    {
      command: ["Открой WhatsApp",'WhatsApp'],
      callback: () => window.open("https://web.whatsapp.com/", "_blanck"),
    },
    {
      command: ["открой Instagram",'Instagram'],
      callback: () => window.open("https://www.instagram.com/", "_blanck"),
    },
    {
      command: ["Открой Twitter","Twitter"],
      callback: () => window.open("https://twitter.com/?lang=ru", "_blanck"),
    },
    {
      command: ["открой Facebook", "Facebook"],
      callback: () => window.open("https://www.facebook.com/", "_blanck"),
    },
    {
      command: ["открой новый файл",'открой новый документ', 'открой новый проект'],
      callback: () => window.open("https://docs.google.com/document/d/1e1-FGyQiwyvP1a6HwD-ufH-gRxj0narA597hamrgr14/edit", "_blanck"),
    },
    {
      command: ["поиск", "Поиск в Google", "Инфо", "найди", "Узнай", "Search"],
      callback: () => {
        setToggle('Google')
        const resulttranslate = transcript.split(' ')
        resulttranslate.pop()
        handleSearch(resulttranslate)
      },
    },
  ];
  // const ndd = "Clock";
  // search
  const handleSearch = async (query) => {
    

    try {
      const response = await fetch(
        `https://www.googleapis.com/customsearch/v1?key=AIzaSyC6YQ6WBFLXgme_bKVhPQERkhK-7WnlpjU&cx=d47eae4c2eacf4804&q=${encodeURIComponent(
          transcript 
        )}& `
      );
      const data = await response.json();
      setResults(data.items);
    } catch (error) {
      console.error("Ошибка при выполнении запроса:", error);
    }
  };
  // photos

  const searchPhotos = async () => {
    setToggle("Photo");
    try {
      const response = await axios.get(
        `https://api.unsplash.com/photos/random?query=${transcript}&count=10&client_id=l4e8Ylzo7Yj1oIuVpwIjtyS5GwbHes63OJzOwE82Y7k`
      );
      setPhotos(response.data);
    } catch (error) {
      console.error("Error fetching photos:", error);
    }
  };
  // speech start
  const startListening = () =>
    SpeechRecognition.startListening({ continuous: true, language: "ru" });
  const { transcript, browserSupportsSpeechRecognition } = useSpeechRecognition(
    { commands }  
  );

  if (!browserSupportsSpeechRecognition) {
    return null;
  }

  // speech end

 
  const toggleListening = () => {
    if (active) {
      SpeechRecognition.stopListening();
      document
        .getElementById("voiceAnimation")
        .classList.remove("voiceAnimationOn");
      document.getElementById("centerMic").classList.remove("arcTwo");
      document.getElementById("centerMic").classList.remove("t2");
    } else {
      startListening();
      document
        .getElementById("voiceAnimation")
        .classList.add("voiceAnimationOn");
      document.getElementById("centerMic").classList.add("arcTwo");
      document.getElementById("centerMic").classList.add("t2");
    }
    setActive(!active);
  };
  const toggleShow = () => {
    setToggle('SHOW')

    setShow(!show);
  };


  const ToogleToGoogle = () => {
    if (transcript == "") {
      return null;
    } else {
      handleSearch();
    }
    setToggle("Google");
  };
 
  

  switch (toggle) {
    case "Google":
      contentRes = (
        <div>
          <div className="searchBlock">
            <GoogleResults results={results} />
          </div>
        </div>
      );
      break;
    case "Map":
      contentRes = <Map />;
      break;
    case "Photo":
      contentRes = (
        <div className="photos">
          <h1>Photo</h1>
          {photos.map((photo) => (
            <img
              key={photo.id}
              src={photo.urls.small}
              alt={photo.alt_description}
              className="Photo"
            />
          ))}
        </div>
      );
      break;
      case "SHOW":
        contentRes =  <textarea
        id="note_input"
        rows={12}
        cols={44}
        defaultValue={
          transcript
        }
        style={{fontFamily:"Poiret One",fontWeight: 'bold', fontStyle:'normal', outline:'none'}}
      />
        break;
    default:
      break;
  }

  return (
    <div>
      <>
        {/* Left Menu */}
        <div id="leftmenu">
          <div id="date_time">
            <div id="date" className="semi_arc e4">
              <div className="semi_arc_2 e4_1">
                <div className="counterspin4" />
              </div>
              <div style={{ fontSize: 40, marginTop: 25 }}>{DateArray.day}</div>
              <div style={{ fontSize: 25, fontFamily: "fantasy" }}>
                {monthArray[DateArray.month]}
              </div>
            </div>
            <div id="time" className="arc e1">
              <div style={{ fontSize: 18, marginLeft: "0px", marginTop: 25 }}>
                {formattedTime}
              </div>
              <div
                style={{ fontSize: 12, marginTop: 0, fontFamily: "fantasy" }}
              >
                {WeekDArray[DateArray.weekD]}
              </div>
            </div>
          </div>
          <p
            className="title"
            style={{
              fontFamily: "Poiret One",
              fontWeight: "bold",
              fontStyle: "normal",
            }}
          >
            Тиркемелер
          </p>
          <div className="hline title_underline" />
          <span
            className="menuitem entypo-gauge"
            style={{ fontSize: 30, marginLeft: 10 }}
          >
            { transcript ?  <p
              id="cpu"
              className="caption"
              style={{ fontSize: 20 }}
              onClick={ToogleToGoogle}
            >
              Google
            </p> :
            <p
            id="cpu"
            className="caption Off"
            style={{ fontSize: 20 }}
            onClick={ToogleToGoogle}
          >
            Google
          </p>
            }
           
          </span>{" "}
          <br />
          <span
            className="menuitem entypo-chart-area"
            style={{ fontSize: 30, marginLeft: 10 }}
          > 
          { }
            <p id="ram" className="caption Off" style={{ fontSize: 20 }}>
              Chat Gpt
            </p>
          </span>{" "}
          <br />
          <span
            className="menuitem entypo-chart-pie"
            style={{ fontSize: 30, marginLeft: 10 }}
          > 
          
            <p
              id="proc"
              className="caption"
              style={{ fontSize: 20, marginLeft: "4px" }}
              onClick={() => setToggle("Map")}
            >
              Map
            </p>
          </span>
          <span
            className="menuitem entypo-chart-pie"
            style={{ fontSize: 30, marginLeft: 10 }}
          >
            { transcript ?  <p
              id="proc"
              className="caption"
              style={{ fontSize: 20, marginLeft: "4px" }}
              onClick={searchPhotos}
            >
              Photo 
            </p> : 
            <p
            id="proc"
            className="caption Off"
            style={{ fontSize: 20, marginLeft: "4px" }}
            
          >
            Photo 
          </p>
            }
           
          </span>
          <span
            className="menuitem entypo-chart-pie"
            style={{ fontSize: 30, marginLeft: 10 }}
          > 
          
            <p
              id="proc"
              className="caption"
              style={{ fontSize: 20, marginLeft: "4px" }}
            >
              Translation
            </p>
          </span>
          <p
            className="title"
            style={{
              fontFamily: "Poiret One",
              fontWeight: "bold",
              fontStyle: "normal",
            }}
          >
            Башкы
          </p>
          <div className="hline title_underline" />
          <div className="menu">
            <button className="menuitem">
              {" "}
              <span className="entypo-right-open">
                {" "}
                <p className="caption">Сакталгандар</p>{" "}
              </span>
            </button>
            <button className="menuitem">
              {" "}
              <span className="entypo-right-open">
                {" "}
                <p className="caption">Биз жонундо</p>{" "}
              </span>
            </button>
            <button className="menuitem">
              {" "}
              <span className="entypo-right-open">
                {" "}
                <p className="caption">Орнотуулар</p>{" "}
              </span>
            </button>
            <hr style={{ borderColor: "transparent", margin: 0 }} />
            <div className="hline" style={{ marginTop: 5, marginBottom: 5 }} />
            <button className="menuitem">
              {" "}
              <span className="entypo-right-open">
                {" "}
                <p className="caption">1</p>{" "}
              </span>
            </button>
            <button className="menuitem">
              {" "}
              <span className="entypo-right-open">
                {" "}
                <p className="caption">2</p>{" "}
              </span>
            </button>
            <button className="menuitem">
              {" "}
              <span className="entypo-right-open">
                {" "}
                <p className="caption">3</p>{" "}
              </span>
            </button>
          </div>
        </div>

        {/* Right Menu */}
        <div id="rightmenu" style={{ marginTop: "30px" }}>
          <p
            className="title"
            style={{
              fontFamily: "Poiret One",
              fontWeight: "bold",
              fontStyle: "normal",
              textAlign: "left",
              marginLeft: 5,
            }}
          ></p>
          <div id="particle10" className="hline" />
          <div id="particle11" className="hline" />
          <div className="RightPanel">
            {transcript ? (
              <div className="btnShow" onClick={toggleShow} id="edit">
                <div id="" className="hline btnShowLineUp"></div>
                <h1>SHOW</h1>
                <div id="" className="hline btnShowLineDown"></div>
              </div>
            ) : (
              <div className="Off" id="edit">
                <div id="" className="hline btnShowLineUp"></div>
                <h1>SHOW</h1>
                <div id="" className="hline btnShowLineDown"></div>
              </div>
            )}
            {
               transcript ? <div className="btnShow" id="" onClick={setCopied}>
              <div id="" className="hline btnShowLineUp"></div>
              <h1>COPY</h1>
              <div id="" className="hline btnShowLineDown"></div>
            </div> : 
            <div className="Off" id="" onClick={setCopied}>
            <div id="" className="hline btnShowLineUp"></div>
            <h1>COPY</h1>
            <div id="" className="hline btnShowLineDown"></div>
          </div>
            }
            

            {transcript ? (
              <div className="btnShow" id="" onClick={ToogleToGoogle}>
                <div id="" className="hline btnShowLineUp"></div>
                <h1>SEARCH</h1>
                <div id="" className="hline btnShowLineDown"></div>
              </div>
            ) : (
              <div className="Off" id="edit">
                <div id="" className="hline btnShowLineUp"></div>
                <h1>SEARCH</h1>
                <div id="" className="hline btnShowLineDown"></div>
              </div>
            )}
            {transcript ? (
              <div className="btnShow" id="" onClick={()=>window.location.reload()} >
                <div id="" className="hline btnShowLineUp"></div>
                <h1>CLEAR</h1>
                <div id="" className="hline btnShowLineDown"></div>
              </div>
            ) : (
              <div className="Off" id="edit">
                <div id="" className="hline btnShowLineUp"></div>
                <h1>CLEAR</h1>
                <div id="" className="hline btnShowLineDown"></div>
              </div>
            )}
          </div>
          <div id="particle12" className="vline" style={{ height: "800px" }} />

          
          {contentRes}
        </div>
        {/* Arc Reactor */}

        <div id="arc_container">
          <div className="voiceAnimationOff" id="voiceAnimation"></div>
          <div className="arc_reactor">
            <div className="case_container">
              <div className="e7">
                <div className="semi_arc_3 e5_1">
                  <div className="semi_arc_3 e5_2">
                    <div className="semi_arc_3 e5_3">
                      <div className="semi_arc_3 e5_4" />
                    </div>
                  </div>
                </div>
                <div className="core2" />
              </div>
              <ul className="marks">
                <li />
                <li />
                <li />
                <li />
                <li />
                <li />
                <li />
                <li />
                <li />
                <li />
                <li />
                <li />
                <li />
                <li />
                <li />
                <li />
                <li />
                <li />
                <li />
                <li />
                <li />
                <li />
                <li />
                <li />
                <li />
                <li />
                <li />
                <li />
                <li />
                <li />
                <li />
                <li />
                <li />
                <li />
                <li />
                <li />
                <li />
                <li />
                <li />
                <li />
                <li />
                <li />
                <li />
                <li />
                <li />
                <li />
                <li />
                <li />
                <li />
                <li />
                <li />
                <li />
                <li />
                <li />
                <li />
                <li />
                <li />
                <li />
                <li />
                <li />
              </ul>
            </div>
          </div>
        </div>

        {/* Particles */}
        {/* Left Menu Particles */}
        <canvas id="particle1" width={20} height={500} />
        <canvas id="particle1_1" width={40} height={510} />
        <canvas id="particle1_2" width={40} height={510} />
        <div id="particle2">
          ▶<br />▶<br />▶
        </div>
        <div id="particle3" className="vline">
          <div id="particle4" className="vline">
            <div id="particle5" className="vline">
              <div id="particle6" className="vline">
                <div id="particle7" className="vline">
                  <div id="particle8" className="vline">
                    <div id="particle9" className="vline"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="center">
            <div className="res" id="res">
              {transcript}
            </div>
            <div className="controlPanel">
              <div
                id="centerMic"
                className="arcOne t1"
                onClick={toggleListening}
                style={{ marginLeft: "-15px" }}
              >
                <div
                  style={{ fontSize: 18, marginLeft: "11px", marginTop: 25 }}
                >
                  <button className="a1" style={{ width: "40px" }}>
                    {active ? (
                      <AudioMutedOutlined className="AudioMutedOutLined" />
                    ) : (
                      <AudioOutlined className="AudioOutLined" />
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    </div>
  );
}

export default Animate;
