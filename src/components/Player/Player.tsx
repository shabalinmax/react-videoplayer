import React, {createRef, FC, useMemo, useState} from 'react';
import {PlayerModel} from './PlayerModel';
import {ICurrentSquares, IPlayerProps, PlayersCount} from './EnumsAndTypes';

const Player: FC<IPlayerProps> = (props) => {
    const [playerModel, setPlayerModel] = useState(new PlayerModel({
        defaultPlayersCount: props.defaultPlayersCount,
        containerSize: props.containerSize
    }))
    const [currentSquares, setCurrentSquares] = useState<ICurrentSquares>(playerModel.currentSquares);
    const [timer, setTimer] = useState<NodeJS.Timer | null>(null)
    const inputRefs: React.RefObject<HTMLVideoElement>[] = useMemo(() => currentSquares.squareInfo.map(i => createRef()), []);

    const handleGridChange = async (number: PlayersCount) => {
        const newCountOfSquares = number; // Здесь можно указать нужное количество квадратов
        playerModel.changeGrid(newCountOfSquares);
        setCurrentSquares(playerModel.currentSquares);
    };

    const setNewInfo = async () => {
        playerModel.addLinksToCameras([{
            cameraId: 0,
            link: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'
        }])
        setCurrentSquares((prevState) => ({
            ...prevState,
            squareInfo: playerModel.currentSquares.squareInfo
        }));
    }
    const onClickHandler = (event: React.MouseEvent<HTMLVideoElement>, index: number) => {
        event.preventDefault();
        if (timer) {
            playerModel.selectSquare(index)
            setCurrentSquares((prevState) => ({
                squareInfo: playerModel.currentSquares.squareInfo,
                styles: playerModel.currentSquares.styles
            }));
            const videoRef = inputRefs[index].current
            if (videoRef) {
                if (videoRef.paused) {
                    videoRef.play()
                } else {
                    videoRef.pause()
                }
            }
            setTimer(null)
        } else {
            const videoRef = inputRefs[index].current
            if (videoRef) {
                if (videoRef.paused) {
                    videoRef.play()
                } else {
                    videoRef.pause()
                }
            }
            setTimer(setTimeout(() => {
                setTimer(null)
            }, 300))
        }
    }

    return (
            <div style={{...currentSquares.styles, width: playerModel.containerSize}}>
                {currentSquares.squareInfo.map((square, index) => (
                    <div key={square.id}>
                        <video
                            ref={inputRefs[index]}
                            controls
                            // style={{margin: '10px'}}
                            key={square.id}
                            width={'100%'}
                            height={'100%'}
                            src={square.link ?? undefined}
                            onClick={(event: React.MouseEvent<HTMLVideoElement>) => onClickHandler(event, square.id)}
                        />
                    </div>
                ))}
                <button onClick={() => setNewInfo()}>+</button>
            </div>
    );
};

export default Player;