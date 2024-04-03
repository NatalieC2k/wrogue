let canvas  = document.getElementById("canvas") as HTMLCanvasElement;
let context = canvas.getContext("2d")!;

const randomEnumValue = (enumeration) => {
    const values = Object.keys(enumeration);
    const enumKey = values[Math.floor(Math.random() * values.length)];
    return enumeration[enumKey];
}

enum TileType{
    Empty  = 0,
    Wall   = 1,
    Entity = 2,
}
class Entity{
    color: string;
}
class Tile{
    type: TileType = TileType.Empty;
    entity?: Entity = undefined;
}

let tile_size = 10;
let world_width  = canvas.clientWidth  / tile_size;
let world_height = canvas.clientHeight / tile_size;
const world: Tile[][] = [];
for(let x = 0; x < world_width; x++){
    world.push([]);
    for(let y = 0; y < world_height; y++){
        world[x].push(new Tile());
    }
}

let getSurroundingTiles: (x: number, y: number) => Tile[] = function(x: number, y: number): Tile[]{
    let tiles: Tile[] = [];
    if(x + 1 < world_width){
        tiles.push(world[x+1][y])
        if(y + 1 < world_height){
            tiles.push(world[x+1][y+1])
        }
        if(y - 1 > 0){
            tiles.push(world[x+1][y-1])
        }
    }
    if(x - 1 > 0){
        tiles.push(world[x-1][y])
        if(y + 1 < world_height){
            tiles.push(world[x-1][y+1])
        }
        if(y - 1 > 0){
            tiles.push(world[x-1][y-1])
        }
    }
    if(y + 1 < world_height){
        tiles.push(world[x][y+1])
    }
    if(y - 1 > 0){
        tiles.push(world[x][y-1])
    }
    return tiles;
}

function createFloor(y: number){
    for(let x = 0; x < world_width; x++){
        world[x][y].type = TileType.Wall;
    }
}
function randomize(lower_y: number, upper_y: number){
    for(let y = lower_y; y < upper_y; y++){
        for(let x = 0; x < world_width; x++){
            world[x][y].type = randomEnumValue(TileType);
            if(world[x][y].type == TileType.Entity){
                world[x][y].type = TileType.Wall;
            }
        }
    }
}
function collapseWalls(){
    for(let x = 0; x < world_width; x++){
        for(let y = 0; y < world_height; y++){
            let surroundings = getSurroundingTiles(x, y);
            let wall_count = 0;
            for(let i = 0; i < surroundings.length; i++){
                if(surroundings[i].type == TileType.Wall){
                    wall_count++;
                }
            }
            if(wall_count > 4){
                world[x][y].type = TileType.Wall;
            } else if(wall_count < 2) {
                world[x][y].type = TileType.Empty;
            }
        }
    }
}

let surface_height = 10;
let burrow_slices = 6;
let burrow_slice_size = 10;
let slice_height = Math.floor((burrow_slice_size * burrow_slices - surface_height) / burrow_slices);
randomize(surface_height-2, surface_height);
for(let i = 0; i < burrow_slices; i++){
    let height_offset = (slice_height * i);
    createFloor(surface_height + height_offset)
    randomize(surface_height + height_offset + 1,  surface_height + height_offset + slice_height);
}
createFloor(world_height - 1);

collapseWalls();

for(let i = 0; i < 15; i++){
    //collapseWalls();
}

for(let x = 0; x < world_width; x++){
    for(let y = 0; y < world_height; y++){
        let tile = world[x][y];
        switch(tile.type){
            case TileType.Empty: {
                context.clearRect(x*tile_size, y * tile_size, tile_size, tile_size);
                break;
            }
            case TileType.Wall: {
                context.fillStyle = "black";
                context.fillRect(x*tile_size, y * tile_size, tile_size, tile_size);
                break;
            }
            case TileType.Entity: {
                context.fillStyle = tile.entity!.color;
                context.fillRect(x*tile_size, y * tile_size, tile_size, tile_size);
                break;
            }
        }
    }
}