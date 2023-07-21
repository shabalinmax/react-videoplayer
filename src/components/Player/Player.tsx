import React, {FC, useState} from 'react';
import {PlayerModel} from './PlayerModel';
import {ICurrentSquares, IPlayerProps, PlayersCount} from './EnumsAndTypes';

const Player: FC<IPlayerProps> = (props) => {
    const [playerModel, setPlayerModel] = useState(new PlayerModel({
        defaultPlayersCount: props.defaultPlayersCount,
        containerSize: props.containerSize
    }))
    const [currentSquares, setCurrentSquares] = useState<ICurrentSquares>(playerModel.currentSquares);

    const handleGridChange = async (number: PlayersCount) => {
        const newCountOfSquares = number; // Здесь можно указать нужное количество квадратов
        playerModel.changeGrid(newCountOfSquares);
        setCurrentSquares(playerModel.currentSquares);
    };
    const handleSquareSelect = (id: number) => {
        playerModel.selectSquare(id);
        setCurrentSquares(playerModel.currentSquares);
    };
    const squareSize = Math.floor(props.containerSize / (currentSquares.squareInfo.length - 3));
    const setNewInfo = async () => {
        playerModel.addLinksToCameras([{cameraId: 0, link: 'hui0'}, {cameraId: 1, link: 'hui1'}])
        setCurrentSquares((prevState) => ({
            ...prevState,
            squareInfo: playerModel.currentSquares.squareInfo
        }));
    }
    return (
        <div>
            <div style={currentSquares.styles}>
                {currentSquares.squareInfo.map((square) => (
                    <video
                        style={{ margin: '10px'}}
                        key={square.id}
                        width={squareSize}
                        height={squareSize}
                        controls
                    />
                ))}
            </div>
            <button onClick={() => handleGridChange(PlayersCount.Two)}>2</button>
            <button onClick={() => handleGridChange(PlayersCount.Four)}>4</button>
            <button onClick={() => handleGridChange(PlayersCount.Six)}>6</button>
            <button onClick={() => handleGridChange(PlayersCount.Eight)}>8</button>
            <button onClick={() => setNewInfo()}>+++</button>
        </div>
    );
};

export default Player;