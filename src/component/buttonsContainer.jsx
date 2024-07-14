import { useState } from "react";
import ButtonsGroup from "./ButtonsGroup";

function buttonsContainer({
    updateRun,
    updateBall,
    updateWicket,
    displayScore,
    setDisplayScore,
    isMatchEnd,
}) {

    function updateScoreBoard(value) {
        setDisplayScore([...displayScore, value]);
    }

    function addRunAndBall(run) {
        console.log(run, typeof(run));
        run = typeof run === "string" ? run[run.length - 1] : run;
        run = parseInt(run) || 0;
        updateRun(run);
        updateBall();
        updateScoreBoard(run);
    }

    function addExtraRun(run) {
        // run = run.run;
        updateScoreBoard(run);
        run = typeof run === "string" ? run[run.length - 1] : run;
        run = parseInt(run) || 0;
        updateRun(run + 1);
    }

    function addRun(run) {
        updateScoreBoard(run);
        run = typeof run === "string" ? run[run.length - 1] : run;
        run = parseInt(run) || 0;
        updateRun(run);
    }

    function addWicket(w) {
        updateWicket();
        updateScoreBoard(w);
        if (w === 'W') {
            updateBall();
        } else {
            w = typeof w === "string" ? w[w.length - 1] : run;
            w = parseInt(w) || 0;
            updateRun(w);
            updateBall();
        }
    }

    return (
        <ButtonsGroup
            addWicket = {addWicket}
            addRun = {addRun}
            addExtraRun = {addExtraRun}
            addRunAndBall = {addRunAndBall}
            isMatchEnd = {isMatchEnd}
        />
    );
}

export default buttonsContainer;
