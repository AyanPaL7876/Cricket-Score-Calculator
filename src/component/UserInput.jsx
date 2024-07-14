import { useState, useEffect } from 'react';

function UserInput({ setTeamName, setOverLimit, setTossWin, setIsFormSubmit }) {
    const [battingTeam, setBattingTeam] = useState('');
    const [bowlingTeam, setBowlingTeam] = useState('');
    const [tossWinTeam, setTossWinTeam] = useState('');
    const [totalOvers, setTotalOvers] = useState('');

    function updateDetails(e) {
        e.preventDefault();
        (battingTeam!=''&&bowlingTeam!='')?setTeamName([battingTeam, bowlingTeam]):"";
        totalOvers!=0?setOverLimit(parseInt(totalOvers, 10)):"";
        console.log(`TOtal over:${totalOvers}`);
        tossWinTeam!=''?setTossWin(tossWinTeam):"";
        setIsFormSubmit(true);
    }

    useEffect(() => {
        if (battingTeam && bowlingTeam && battingTeam === bowlingTeam) {
            alert("Batting and bowling team's names are must be different!");
            return;
        }
        if (tossWinTeam && tossWinTeam !== battingTeam && tossWinTeam !== bowlingTeam) {
            alert("Toss win team is not defined correctly!");
        }
    }, [battingTeam, bowlingTeam, tossWinTeam, totalOvers]);

    return (
        <div className="p-4 w-full max-w-md mx-auto bg-[#0000002c] bg_blur rounded-xl">
            <h1 className='text-[29px] mb-5'>Fill the details</h1>
            <form onSubmit={updateDetails} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-300">Enter batting team name:</label>
                    <input
                        type="text"
                        value={battingTeam}
                        onChange={(e) => setBattingTeam(e.target.value)}
                        className="mt-1 p-2 w-full border border-gray-300 rounded-md bg-[#7b7b7b2c] bg_blur"
                        placeholder='CSK (maximum 3-4 characters for better view)'
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-300">Enter bowling team name:</label>
                    <input
                        type="text"
                        value={bowlingTeam}
                        onChange={(e) => setBowlingTeam(e.target.value)}
                        className="mt-1 p-2 w-full border border-gray-300 rounded-md bg-[#7b7b7b2c] bg_blur"
                        placeholder='KKR (maximum 3-4 characters for better view)'
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-300">Enter toss win team name:</label>
                    <select
                        value={tossWinTeam}
                        onChange={(e) => setTossWinTeam(e.target.value)}
                        className="mt-1 p-2 w-full border border-gray-300 rounded-md bg-[#7b7b7b2c] bg_blur"
                        required
                    >
                        <option className='bg-black' value="">Choose toss win team</option>
                        <option className='bg-black' value={battingTeam}>{battingTeam}</option>
                        <option className='bg-black' value={bowlingTeam}>{bowlingTeam}</option>
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-300">Total overs:</label>
                    <input
                        type="number"
                        value={totalOvers}
                        onChange={(e) => setTotalOvers(e.target.value)}
                        className="mt-1 p-2 w-full border border-gray-300 rounded-md bg-[#7b7b7b2c] bg_blur"
                        placeholder='20'
                        required
                    />
                </div>
                <div>
                    <button
                        type="submit"
                        className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md"
                    >
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
}

export default UserInput;
