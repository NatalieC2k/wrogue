
export enum TileType{
    Empty  = 0,
    Wall   = 1,
    Entity = 2,
}
export class Entity{
    color: string = "yellow";
    x: number = 0;
    y: number = 0;

    constructor(x: number, y: number){
        this.x = x;
        this.y = y;
    }
}
export class Tile{
    obstructed: boolean = false;
    entity?: Entity = undefined;
}
export const RandomEnumValue = (enumeration: any) => {
    const values = Object.keys(enumeration);
    const enumKey = values[Math.floor(Math.random() * values.length)];
    return enumeration[enumKey];
}

export class Tilemap{
    width:  number;
    height: number;
    grid: Tile[][] = [];
    constructor(x: number, y: number){
        this.width = x;
        this.height = y;
        for(let x = 0; x < this.width; x++){
            this.grid.push([]);
            for(let y = 0; y < this.height; y++){
                this.grid[x].push(new Tile());
            }
        }
    }
    GetSurroundingTiles(x: number, y: number): Tile[]{
        let tiles: Tile[] = [];
        if(x + 1 < this.width){
            tiles.push(this.grid[x+1][y])
            if(y + 1 < this.height){
                tiles.push(this.grid[x+1][y+1])
            }
            if(y - 1 > 0){
                tiles.push(this.grid[x+1][y-1])
            }
        }
        if(x - 1 > 0){
            tiles.push(this.grid[x-1][y])
            if(y + 1 < this.height){
                tiles.push(this.grid[x-1][y+1])
            }
            if(y - 1 > 0){
                tiles.push(this.grid[x-1][y-1])
            }
        }
        if(y + 1 < this.height){
            tiles.push(this.grid[x][y+1])
        }
        if(y - 1 > 0){
            tiles.push(this.grid[x][y-1])
        }
        return tiles;
    }

    Draw(context: CanvasRenderingContext2D, tile_size: number){
        for(let x = 0; x < this.width; x++){
            for(let y = 0; y < this.height; y++){
                let tile = this.grid[x][y];
                if(tile.obstructed){
                    context.fillStyle = "black";
                    context.fillRect(x * tile_size, y * tile_size, tile_size, tile_size);
                } else if(tile.entity != undefined){
                    context.fillStyle = tile.entity!.color;
                    context.fillRect(x * tile_size, y * tile_size, tile_size, tile_size);
                } else{
                    context.fillStyle = "grey";
                    context.fillRect(x* tile_size, y * tile_size, tile_size, tile_size);
                }
            }
        }
    }
    Insert(entity: Entity){
        this.grid[entity.x][entity.y].entity = entity;
    }
    Move(entity: Entity, x: number, y: number){
        this.grid[entity.x][entity.y].entity = undefined;
        entity.x = x;
        entity.y = y;
        this.Insert(entity);
    }
}
