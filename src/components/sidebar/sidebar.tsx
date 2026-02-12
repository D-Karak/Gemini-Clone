import { useState } from "react"
import { assets } from "../../assets/assets"
import './sidebar.css'
const Sidebar = () => {
    const [extended, setExtended] = useState(false)
    function toggleSidebar() {
        setExtended(prev => !prev)
    }
    return (
        <div className='sidebar min-h-screen flex flex-col justify-between p-5 transition-all'>
            <div className="top flex flex-col gap-5">
                <img onClick={toggleSidebar} className="menu" src={assets.menu_icon} alt="menu_icon" />
                <div className="new-chat cursor-pointer">
                    <img src={assets.plus_icon} alt="plus_icon" />
                    {extended ? <p>New Chat</p> : null}
                </div>
                {extended ? <div className={"recent flex flex-col gap-2"}>
                    <p className="text-sm font-medium">Recent</p>
                    <div className="recent-entry flex items-center justify-between cursor-pointer hover:bg-[#e5e7eb] rounded-full">
                        <img src={assets.chat_icon} alt="chat_icon" className="w-[25px]" />
                        <p>What is the capital of France?</p>
                    </div>
                </div> : null}
            </div>
            <div className="bottom">
                <div className="bottom-item">
                    <img src={assets.help_icon} alt="help_icon" />
                    {extended ? <p>Help</p> : null}
                </div>
                <div className="bottom-item">
                    <img src={assets.history_icon} alt="history_icon" />
                    {extended ? <p>Activity</p> : null}
                </div>
                <div className="bottom-item">
                    <img src={assets.settings_icon} alt="setting_icon" />
                    {extended ? <p>Settings</p> : null}
                </div>
            </div>
        </div>
    )
}

export default Sidebar