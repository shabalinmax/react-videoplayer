export enum PlayersCount {
    One = 1,
    Two = 2,
    Four = 4,
    Six = 6,
    Eight = 8,
    Nine = 9,
}
export interface IPlayerProps {
    defaultPlayersCount: PlayersCount,
    containerSize: string
}

export interface ICurrentSquares {
    squareInfo: {id: number, link: string | null}[],
    styles: {
        display: string,
        gridTemplateColumns: string,
        gridTemplateRows: string,
    }
}