import { useState, useEffect} from 'react';
import './App.css';
import CalculateScore from './component/calculateScore';
import WinAnnimation from './component/WinAnnimation';
import UserInput from './component/UserInput';


function App() {
    const [teamName, setTeamName] = useState(["", ""]);
    const [overLimit, setOverLimit] = useState(2);
    const [isWin, setIsWin] = useState(false);
    const [isFormSubmit, setIsFormSubmit] = useState(false);
    const [tossWin,setTossWin] = useState("");

    return (
        <div className='App w-[100%] h-[100%] flex justify-evenly items-center'>
            {!isFormSubmit &&
            (<UserInput
                setTeamName = {setTeamName}
                setOverLimit = {setOverLimit}
                setTossWin = {setTossWin}
                setIsFormSubmit = {setIsFormSubmit}
            />)}
            {isFormSubmit && (
                <CalculateScore
                teamName={teamName}
                overLimit={overLimit}
                isWin = {isWin}
                setIsWin={setIsWin}
                tossWin = {tossWin}
                />
            )}
            {isWin &&(<WinAnnimation/>)}
        </div>
    );
}

export default App;
