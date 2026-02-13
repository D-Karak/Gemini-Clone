import { assets } from '../../assets/assets'
import './Main.css'
import { useContext } from 'react'
import { Context } from '../../context/context'

const Main = () => {
    const { onSend, recentPrompt, setRecentPrompt, showResult, resultData, loading, input, setInput } = useContext(Context);
    return (
        <div className='main'>
            <div className="nav">
                <p>Gemini</p>
                <img src={assets.boy_icon} alt="" />
            </div>
            <div className="main-container">
                <div className="greet">
                    <p><span>Hello, Dev.</span></p>
                    <p>How can I help you today?</p>
                </div>
                <div className="cards">
                    <div className="card">
                        <p>Suggest beautiful places to see on an upcoming road trip</p>
                        <img src={assets.compass_icon} alt="" />
                    </div>
                    <div className="card">
                        <p>Briefly summarize this concept: urban planning</p>
                        <img src={assets.bulb_icon} alt="" />
                    </div>
                    <div className="card">
                        <p>Brainstorm team bonding activities for our work retreat</p>
                        <img src={assets.chat_icon} alt="" />
                    </div>
                    <div className="card">
                        <p>Improve the readability of the following code</p>
                        <img src={assets.code_icon} alt="" />
                    </div>
                </div>

                <div className="main-bottom">
                    <div className="search-box">
                        <input type="text" placeholder='Enter a prompt here' onChange={(e) => setInput(e.target.value)} value={input} />
                        <div>
                            <button>
                                <img src={assets.add_photo} alt="add photo" />
                            </button>
                            <button>
                                <img src={assets.mic_icon} alt="mic" />
                            </button>
                            <button onClick={() => onSend(input)}>
                                <img src={assets.send_icon} alt="send" />
                            </button>
                        </div>
                    </div>
                    <p className="bottom-info">
                        Gemini may display inaccurate info, including about people, so double-check its responses. Your privacy and Gemini Apps.
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Main
