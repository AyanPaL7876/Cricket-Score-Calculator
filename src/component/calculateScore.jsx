import { useState, useEffect, useRef } from 'react';
import ButtonsContainer from './buttonsContainer';

function CalculateScore({ teamName, overLimit, setIsWin, tossWin, isWin }) {
    const [totalRun, setTotalRun] = useState([0, 0]);
    const [ball, setBall] = useState([0, 0]);
    const [over, setOver] = useState([0, 0]);
    const [wicket, setWicket] = useState([0, 0]);
    const [currTeam, setCurrTeam] = useState(0);
    const [isMatchEnd, setIsMatchEnd] = useState(false);
    const [displayScore, setDisplayScore] = useState([]);
    const [runrate, setRunRate] = useState("");
    const [displayMsg, setDisplayMsg] = useState(`${tossWin} choose ${teamName[0] === tossWin ? "batting" : "bolling"}`);
    const [target, setTarget] = useState(null);
    const scoreDivRef = useRef(null);
    // let hold = 0;

    useEffect(() => {
        const runRate = calculateRunRate();
        let message = `CRR: ${runRate.toFixed(2)}`;
        if (currTeam === 1 && target !== null) {
            const requiredRunRate = calculateRequiredRunRate();
            message += `, RRR: ${requiredRunRate.toFixed(2)}`;
            setDisplayMsg(`${teamName[1]} need ${(totalRun[0] - totalRun[1])+1} runs from ${(overLimit * 6) - ((over[1] * 6) + ball[1])} balls`);
        }
        setRunRate(message);
    }, [totalRun, ball, over, wicket, teamName, overLimit]);

    useEffect(() => {
        setTarget(totalRun[0]);
        if (currTeam === 1 && target + 1 !== null) {
            if (totalRun[1] > target) {
                setDisplayMsg(`${teamName[1]} won by ${10 - wicket[1]} wickets`);
                console.log(`${totalRun[1]} won by ${10 - wicket[1]} wickets`);
                setIsMatchEnd(true);
                setIsWin(true);
            } else if (totalRun[0] > totalRun[1] && over[1] === overLimit) {
                setDisplayMsg(`${teamName[0]} won by ${totalRun[0] - totalRun[1]} runs`);
                setIsMatchEnd(true);
                setIsWin(true);
            } else if (wicket[1] === 10) {
                setDisplayMsg(`${teamName[0]} won by ${totalRun[0] - totalRun[1]} runs`);
                setIsMatchEnd(true);
                setIsWin(true);
            }
        }
    }, [totalRun, wicket, over, ball, teamName]);

    function calculateRunRate() {
        const ballsFaced = over[currTeam] * 6 + ball[currTeam];
        return ballsFaced === 0 ? 0 : (totalRun[currTeam] / ballsFaced) * 6;
    }

    function calculateRequiredRunRate() {
        const runsRemaining = target - totalRun[1];
        const ballsRemaining = (overLimit * 6) - (over[1] * 6 + ball[1]);
        return ballsRemaining === 0 ? 0 : (runsRemaining / ballsRemaining) * 6;
    }

    function updateRun(r) {
        if (currTeam === 0) {
            setTotalRun([totalRun[0] + r, totalRun[1]]);
        } else {
            const newTotal = totalRun[1] + r;
            setTotalRun([totalRun[0], newTotal]);
            if (totalRun[0] < newTotal) endInnings();
        }
    }

    function updateBall() {
        if (ball[currTeam] === 5) updateOver();
        else {
            setBall(prevBall => {
                const newBall = [...prevBall];
                newBall[currTeam] += 1;
                return newBall;
            });
        }
    }

    function updateWicket() {
        setWicket(prevWicket => {
            const newWicket = [...prevWicket];
            newWicket[currTeam] += 1;
            return newWicket;
        });
    }

    function updateOver() {
        setBall([0, 0]);
        setOver(prevOver => {
            const newOver = [...prevOver];
            newOver[currTeam] += 1;
            return newOver;
        });
        if (overLimit - 1 <= over[currTeam]) endInnings();
    }
    
    function endInnings() {
        if (currTeam === 0) {
            setCurrTeam(1);
        } else if (currTeam === 1) {
            setIsMatchEnd(true);
        }
    }

    const scrollRef = useRef(null);

    useEffect(() => {
        if (scrollRef.current) {
          scrollRef.current.scrollLeft = scrollRef.current.scrollWidth;
        }
      }, [displayScore]);
  
    return (
      <div className='flex flex-col-reverse gap-6 lg:flex-row justify-around items-center w-full'>
        {!isMatchEnd && 
          <div className='bg-[#b7b7b738] p-4 max-w-lg w-full lg:w-1/2 bg_blur rounded-xl border-white border-1 mb-4 lg:mb-0'>
            <ButtonsContainer
              updateRun={updateRun}
              updateBall={updateBall}
              updateWicket={updateWicket}
              displayScore={displayScore}
              setDisplayScore={setDisplayScore}
              isMatchEnd={isMatchEnd}
            />
          </div>
        }
        <div className='bg-[#0000009d] p-4 max-w-lg w-full lg:w-1/2 bg_blur rounded-xl border-white border-spacing-4 z-20'>
          <div className='text-xl font-bold flex justify-between'>
            <h4>{teamName[0]} - {totalRun[0]}/{wicket[0]} ({over[0]}.{ball[0]})</h4>
            <h4>({over[1]}.{ball[1]}) {totalRun[1]}/{wicket[1]} - {teamName[1]}</h4>
          </div>
          <div className='flex flex-col justify-center items-center py-5'>
            <p>{runrate}</p>
            <p>{displayMsg}</p>
          </div>
          <div ref={scrollRef} className='flex justify-center gap-1 flex-row-reverse overflow-x-scroll scroll-smooth no-scrollbar px-2 h-10'>
            {displayScore.map((score, index) => (
              <div 
                className={`border border-white rounded-xl p-1 min-w-10 flex justify-center items-center ${
                  score === 4 || score === 6 ? 'bg-green-600' : score === 'W'|| score === 'W1'|| score === 'W2' ? 'bg-red-500' : ''
                }`} 
                key={index}
              >
                {score}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

export default CalculateScore;
