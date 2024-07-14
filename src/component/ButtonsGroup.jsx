import { useState } from "react";
import DisplayButton from "./DisplayButton";


function ButtonsGroup({
  addWicket,
  addRun,
  addExtraRun,
  addRunAndBall,
  isMatchEnd,
}) {

    const [runs,setRuns] = useState([0,1,2,3,4,6]);
    const wicketOptions = [
        { label: 'Wicket', value: 'W'},
        { label: 'Runout + (1)', value: 'W1'},
        { label: 'Runout + (2)', value: 'W2'},
    ];
    const noBallsOptions = [
        { label: 'No Ball', value: 'N0' },
        { label: 'No + (1)', value: 'N1' },
        { label: 'No + (2)', value: 'N2' },
        { label: 'No + (3)', value: 'N3' },
        { label: 'No + (4)', value: 'N4' },
        { label: 'No + (6)', value: 'N6' },
    ];
    const wideOptions = [
        { label: 'Wide', value: 'WD0' },
        { label: 'Wide + (1)', value: 'Wd1' },
        { label: 'Wide + (2)', value: 'Wd2' },
        { label: 'Wide + (3)', value: 'Wd3' },
        { label: 'Wide + (4)', value: 'Wd4' },
    ];
    const freeHitOptions = [
        { label: 'Free Hit', value: 0 },
        { label: 'Free Hit + (1)', value: 1 },
        { label: 'Free Hit + (2)', value: 2 },
        { label: 'Free Hit + (3)', value: 3 },
        { label: 'Free Hit + (4)', value: 4 },
        { label: 'Free Hit + (6)', value: 6 },
      ];
    
      const byesOptions = [
        { label: 'Byes', value: 'B0' },
        { label: 'Byes + (1)', value: 'B1' },
        { label: 'Byes + (2)', value: 'B2' },
        { label: 'Byes + (3)', value: 'B3' },
        { label: 'Byes + (4)', value: 'B4' },
      ];
    
      const legByesOptions = [
        { label: 'Leg Byes', value: 'LB0' },
        { label: 'Leg Byes + (1)', value: 'LB1' },
        { label: 'Leg Byes + (2)', value: 'LB2' },
        { label: 'Leg Byes + (3)', value: 'LB3' },
        { label: 'Leg Byes + (4)', value: 'LB4' },
      ];

    return (
        <div className="flex flex-col h-[60vh] max-h-[70vh] sm:h-[90vh] sm:max-h-[90vh] w-full gap-2 overflow-y-scroll scroll-smooth no-scrollbar ">
            <h2 className="text-xl text-black font-bold">Runs :- </h2>
            <div className="grid grid-cols-5 sm:grid-cols-6 gap-4 justify-between">
                {runs.map((run,index)=>(
                    <button 
                        key={index}
                        type="button" 
                        disabled={isMatchEnd} 
                        value={run}
                        onClick={() => addRunAndBall(run)}>
                        {run===0?"Dot":run}
                    </button>
                ))}
            </div>
            
            <DisplayButton
                title="Wicket :-"
                options={wicketOptions}
                isMatchEnd={isMatchEnd}
                onClick={addWicket}
            />
            <DisplayButton
                title="No Ball :-"
                options={noBallsOptions}
                isMatchEnd={isMatchEnd}
                onClick={addExtraRun}
            />
            <DisplayButton
                title="Wide :-"
                options={wideOptions}
                isMatchEnd={isMatchEnd}
                onClick={addExtraRun}
            />
            <DisplayButton
                title="Free Hit :-"
                options={freeHitOptions}
                isMatchEnd={isMatchEnd}
                onClick={addRun}
            />
            <DisplayButton
                title="Byes :-"
                options={byesOptions}
                isMatchEnd={isMatchEnd}
                onClick={addExtraRun}
            />
            <DisplayButton
                title="Leg Byes :-"
                options={legByesOptions}
                isMatchEnd={isMatchEnd}
                onClick={addExtraRun}
            />
        </div>
    );
}

export default ButtonsGroup;
