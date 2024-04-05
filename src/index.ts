import { CollapseObstructedTiles, ObstructRandomTiles, ExpandObstructedTiles, GenerateCavern } from "./generation";
import { TileType, Entity, Tile, Tilemap} from "./world"

let canvas  = document.getElementById("canvas") as HTMLCanvasElement;
let context = canvas.getContext("2d")!;

let tile_size =  5;
let tilemap = new Tilemap(canvas.width / tile_size, canvas.height / tile_size);

let player = new Entity(5, 5);
tilemap.Insert(player);

tilemap.Move(player, 10, 10);

GenerateCavern(tilemap);

tilemap.Draw(context, tile_size);