import Bridges from "./Bridges";
import Node from "./Node";
import Point from "./Point";

let bridgesGame = new Bridges('#canvas');
const colPoint = bridgesGame.getCellCenter(2, 3);
const node = new Node(colPoint, 16);
bridgesGame.setProperSize();
bridgesGame.renderGrid();
bridgesGame.renderNode(node);
