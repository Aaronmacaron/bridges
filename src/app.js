import Bridges from "./Bridges";
import Cell from "./Cell";

let bridgesGame = new Bridges('#canvas');

const a = bridgesGame.getNodeFromCell(new Cell(4, 2));
const b = bridgesGame.getNodeFromCell(new Cell(4, 5));

const nodes = [a, b];

bridgesGame.nodes = nodes;
bridgesGame.setProperSize();
bridgesGame.render();