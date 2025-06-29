import { useEffect, useReducer, useRef, useState } from "react";

import "./App.css";
import { API_KEY, URL } from "./constants";
import RecentSearch from "./components/RecentSearch";
import QuestionAnswer from "./components/QuestionAnswer";
import SvgLoading from "./components/SvgFiles";

function App() {
  const [question, setQeustion] = useState("");
  const [result, setResult] = useState([]);
  const [recentHistory, setRecentHistory] = useState(
    JSON.parse(localStorage.getItem("history"))
  );
  const [selectedHistory, setSelectedHistory] = useState("");
  const scrollToAns = useRef();

  const [loader, setLoader] = useState(false);

  const askQuestion = async () => {
    if (!question && !selectedHistory) {
      return false;
    }

    if (question) {
      if (localStorage.getItem("history")) {
        let history = JSON.parse(localStorage.getItem("history"));
        history = [question, ...history];
        history = history.slice(0, 19);

        history = history.map((item) => item.charAt(0).toUpperCase() + item.slice(1).trim());
        history = [...new Set(history)]
        localStorage.setItem("history", JSON.stringify(history));
        setRecentHistory(history);

      } else {
        localStorage.setItem("history", JSON.stringify([question]));
        setRecentHistory([question]);
      }
    }

    const payloadDta = question ? question : selectedHistory;
    const payload = {
      contents: [
        {
          parts: [
            {
              text: payloadDta,
            },
          ],
        },
      ],
    };
    setLoader(true);

    let response = await fetch(URL + API_KEY, {
      method: "POST",
      body: JSON.stringify(payload),
    });

    response = await response.json();
    let dataString = response.candidates[0].content.parts[0].text;
    dataString = dataString.split("* ");
    dataString = dataString.map((item) => item.trim());

    // console.log(response.candidates[0].content.parts[0].text)
    setResult([
      ...result,
      { type: "q", text: question ? question : selectedHistory },
      { type: "a", text: dataString },
    ]);
    setQeustion("");
    setTimeout(() => {
      scrollToAns.current.scrollTop = scrollToAns.current.scrollHeight;
    }, 500);

    setLoader(false);
  };

  const isEnter = (event) => {
    if (event.key == "Enter") {
      askQuestion();
    }
  };

  useEffect(() => {
    askQuestion();
  }, [selectedHistory]);

  //dark mode features
  const [darkMode, setDarkMode] = useState('dark');
  useEffect(()=> {
    if (darkMode == 'dark'){
      document.documentElement.classList.add('dark')
    } else
    {
      document.documentElement.classList.remove('dark')
    }
  })
  //
  return (
    <div className={darkMode == 'dark'?'dark': 'light'}>
    <div className="grid grid-cols-5 h-screen text-center overflow-hidden">
      <select onChange={event=>setDarkMode(event.target.value)} className="fixed text-zinc-900 right-2 p-2 mt-2.5 mr-2.5 bg-zinc-400 rounded-md text-lg">
        <option value="dark">Dark</option>
        <option value="light">Light</option>
      </select>

      <RecentSearch recentHistory={recentHistory} setRecentHistory={setRecentHistory} setSelectedHistory={setSelectedHistory}/>

      {/* Main Content Area */}
      <div className="col-span-4 h-screen flex flex-col p-10">
        <h1 className="text-4xl bg-clip-text text-transparent bg-gradient-to-r from-sky-500 to-orange-400 pb-2">Hello User, Ask me Anything</h1>
        {loader ? (
            <SvgLoading/>
        ) : null}

        {/* Scrollable top area */}
        <div
          ref={scrollToAns}
          className="flex-grow overflow-auto custom-scrollbar"
        >
          <div className="dark:text-zinc-300 text-zinc-900">
            <ul>
              {result.map((item, index) => (
              <QuestionAnswer key={index} item={item} index={index}/>
              ))}
            </ul>
          </div>
        </div>

        {/* Input Box at Bottom */}
        <div className="dark:bg-zinc-800 bg-gray-200 w-1/2 p-1 pr-5 dark:text-white text-zinc-800 m-auto rounded-2xl border border-zinc-700 flex h-14 mt-4">
          <input
            type="text"
            value={question}
            onKeyDown={isEnter}
            onChange={(event) => setQeustion(event.target.value)}
            className="w-full h-full p-3 outline-none bg-transparent"
            placeholder="Ask me anything"
          />
          <button onClick={askQuestion}>Ask</button>
        </div>
      </div>
    </div>
    </div>
  );
}

export default App;
