import {ICurrentSquares, IPlayerProps, PlayersCount} from "./EnumsAndTypes";

export class PlayerModel {

    currentPlayersCount: PlayersCount;
    private containerSize: number;
    static currentSquares: ICurrentSquares;
    static changeGrid: void;
    currentSquares: ICurrentSquares;

    constructor(params: IPlayerProps) {
        const {defaultPlayersCount, containerSize} = params;
        this.containerSize = containerSize ?? 600;
        this.currentPlayersCount = defaultPlayersCount;
        this.currentSquares = this.createGrid(defaultPlayersCount);
    }

    private createGrid(number: PlayersCount): ICurrentSquares {
        let currentSquares: ICurrentSquares = {
            squareInfo: [], styles: {
                display: '',
                gridTemplateColumns: '',
                gridTemplateRows: '',
            }
        }
        for (let i = 0; i < number; i++) {
            currentSquares.squareInfo.push({
                id: i, link: null
            })
        }
        const totalPlayers = number.valueOf();
        const sqrtPlayers = Math.ceil(Math.sqrt(totalPlayers));
        const gridTemplateColumns = `repeat(${sqrtPlayers}, 1fr)`;
        const gridTemplateRows = `repeat(${sqrtPlayers}, 1fr)`;

        currentSquares.styles = {
            display: "grid",
            gridTemplateColumns,
            gridTemplateRows,
        }
        return currentSquares
    }

    changeGrid(newCountOfSquares: PlayersCount) {
        const newSquareInfo = this.currentSquares.squareInfo.filter((element, index) => index < newCountOfSquares)
        const totalPlayers = newCountOfSquares.valueOf();
        const sqrtPlayers = Math.ceil(Math.sqrt(totalPlayers));
        const gridTemplateColumns = `repeat(${sqrtPlayers}, 1fr)`;
        const gridTemplateRows = `repeat(${sqrtPlayers}, 1fr)`;
        this.currentSquares = {
            squareInfo: newSquareInfo,
            styles: {display: "grid", gridTemplateColumns, gridTemplateRows}

        }
        console.log('this.currentSquares', this.currentSquares)
    }
    selectSquare(id: number) {
        const newSquareInfo = this.currentSquares.squareInfo.find(element => element.id === id)
        if (newSquareInfo) {
            const sqrtPlayers = Math.ceil(Math.sqrt(1));
            const gridTemplateColumns = `repeat(${sqrtPlayers}, 1fr)`;
            const gridTemplateRows = `repeat(${sqrtPlayers}, 1fr)`;
            this.currentSquares = {
                squareInfo: [newSquareInfo],
                styles: {display: "grid", gridTemplateColumns, gridTemplateRows}
            }
        }

    }
    addLinksToCameras(info: {cameraId: number, link: string}[]) {
        info.forEach(newInfo => {
            const workPlayer = this.currentSquares.squareInfo.find(el => el.id === newInfo.cameraId)
            if (workPlayer) {
                workPlayer.link = newInfo.link
            };
        })
    }
}
