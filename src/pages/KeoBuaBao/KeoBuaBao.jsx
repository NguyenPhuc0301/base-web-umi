import React, { useState } from "react";

const choices = ["Kéo", "Búa", "Bao"];

const getResult = (player, computer) => {
    if (player === computer) return "Hòa";
    if (
        (player === "Kéo" && computer === "Bao") ||
        (player === "Búa" && computer === "Kéo") ||
        (player === "Bao" && computer === "Búa")
    ) {
        return "Thắng";
    }
    return "Thua";
};

const RockPaperScissors = () => {
    const [history, setHistory] = useState([]);
    const [playerChoice, setPlayerChoice] = useState(null);
    const [computerChoice, setComputerChoice] = useState(null);
    const [result, setResult] = useState("");

    const playGame = (choice) => {
        const computerRandomChoice = choices[Math.floor(Math.random() * choices.length)];
        const gameResult = getResult(choice, computerRandomChoice);

        setPlayerChoice(choice);
        setComputerChoice(computerRandomChoice);
        setResult(gameResult);

        setHistory([...history, { player: choice, computer: computerRandomChoice, result: gameResult }]);
    };

    return (
        <div style={{ textAlign: "center", padding: "20px" }}>
            <h1>Kéo - Búa - Bao</h1>
            <div>
                {choices.map((choice) => (
                    <button key={choice} onClick={() => playGame(choice)} style={{ margin: "10px", padding: "10px" }}>
                        {choice}
                    </button>
                ))}
            </div>
            {playerChoice && (
                <div>
                    <h3>Bạn chọn: {playerChoice}</h3>
                    <h3>Máy tính chọn: {computerChoice}</h3>
                    <h2>Kết quả: {result}</h2>
                </div>
            )}
            <h2>Lịch sử trận đấu:</h2>
            <ul>
                {history.map((item, index) => (
                    <li key={index}>
                        Bạn: {item.player} - Máy: {item.computer} → Kết quả: {item.result}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default RockPaperScissors;
