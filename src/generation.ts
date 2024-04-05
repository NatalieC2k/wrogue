import { Tilemap } from "./world"

export function ObstructRandomTiles(tilemap: Tilemap){
    for(let x = 0; x < tilemap.width; x++){
        for(let y = 0; y < tilemap.height; y++){
            if(Math.random() * 2 < 1){
                tilemap.grid[x][y].obstructed = true;
            }
        }
    }
}
export function CollapseObstructedTiles(tilemap: Tilemap){
    for(let x = 0; x < tilemap.width; x++){
        for(let y = 0; y < tilemap.height; y++){
            let surrounding_tiles = tilemap.GetSurroundingTiles(x, y);
            let obstructed_tile_count = 0;
            for(var tile of surrounding_tiles){
                if(tile.obstructed == false){
                    obstructed_tile_count++;
                }
            }
            if(obstructed_tile_count > 4){
                tilemap.grid[x][y].obstructed = false;
            } else if(obstructed_tile_count < 4){
                tilemap.grid[x][y].obstructed = true;
            }
        }
    }
}
export function ExpandObstructedTiles(tilemap: Tilemap){
    for(let x = 0; x < tilemap.width; x++){
        for(let y = 0; y < tilemap.height; y++){
            let surrounding_tiles = tilemap.GetSurroundingTiles(x, y);
            let obstructed_tile_count = 0;
            for(var tile of surrounding_tiles){
                if(tile.obstructed == true){
                    obstructed_tile_count++;
                }
            }
            if(obstructed_tile_count > 4){
                tilemap.grid[x][y].obstructed = false;
            } else if(obstructed_tile_count < 4){
                tilemap.grid[x][y].obstructed = true;
            }
        }
    }
}
export function GenerateCavern(tilemap: Tilemap){
    ObstructRandomTiles(tilemap);
    for(let i = 0; i < 10; i++){
        CollapseObstructedTiles(tilemap);
    }
}
