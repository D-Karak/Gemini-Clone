import { assets } from '../../assets/assets'
import './Main.css'
import { useContext } from 'react'
import { Context } from '../../context/context'
import { useEffect, useRef } from 'react';


const Main = () => {
    const scrollRef = useRef<HTMLDivElement>(null);
    const { onSend, recentPrompt, showResult, resultData, loading, input, setInput } = useContext(Context);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [resultData]);
    return (
        <div className='main'>
            <div className="nav">
                <p>Gemini</p>
                <img src={assets.user_icon} alt="" />
            </div>
            <div className="main-container">
                {/*if user send a prompt the cards will be hidden*/}
                {!showResult ?
                    <>
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
                    </>
                    :
                    <div className='result'>
                        <div className="result-title flex items-center gap-2">
                            <p className=' prompt bg-gray-200'>{recentPrompt}</p>
                            <img src={assets.user_icon} alt="" className='w-10 h-10 rounded-full' />
                        </div>
                        {loading ?
                            <div className='text-gray-500 flex items-center justify-start gap-2'>
                                <img src={assets.gemini_icon} alt="" className='w-[30px] h-[30px] mr-[20px] animate-spin' />
                                <p>Thinking...</p>
                            </div>
                            :
                            <div className="result-data flex items-start justify-start gap-2">
                                <img src={assets.gemini_icon} alt="" />
                                <p dangerouslySetInnerHTML={{ __html: resultData }}></p>
                            </div>
                        }
                        <div ref={scrollRef} />
                    </div>
                }

                <div className="main-bottom">
                    <div className="search-box">
                        <input type="text" placeholder='Enter a prompt here' onChange={(e) => setInput(e.target.value)} value={input} onKeyDown={(e) => e.key === "Enter" && onSend(input)} />
                        <div>
                            <button>
                                <img src={assets.add_photo} alt="add photo" />
                            </button>
                            {input ?
                                (!loading ? <button onClick={() => onSend(input)}>
                                    <img src={assets.send_icon} alt="send" />
                                </button> :
                                    <button>
                                        <img src={assets.stop_icon} alt="stop" />
                                    </button>) :
                                <button>
                                    <img src={assets.mic_icon} alt="mic" />
                                </button>}
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
