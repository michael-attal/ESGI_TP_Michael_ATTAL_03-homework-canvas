import * as drawlib from "./drawlib.js";
import * as color from "./color.js";

/**
 * @throws {string}
 * @returns {CanvasRenderingContext2D}
 * @param {string} id
 */
function get2DContextById(id) {
    const canvas = document.getElementById(id);
    if (canvas === null) {
        throw "No html element with id `canvas` found";
    }
    if (!(canvas instanceof HTMLCanvasElement)) {
        throw "The selected element is not a canvas";
    }
    if (canvas.getContext) {
        const ctx = canvas.getContext("2d");
        if (ctx) {
            return ctx;
        } else {
            throw "Error when getting the context";
        }
    } else {
        throw "`getContext` is not a property of the element. Please use a modern browser.";
    }
}
const treeTrunkColor = color.brown;
const treeLeafColor = color.green;
const sheepBodyColor = color.charcoal;
const sheepHeadColor = color.black;

/**
 * @param {{ x: number, y: number }} point
 * @returns {drawlib.Shape}
 */
function createTree(point) {
    const trunk = drawlib.move(point.x, point.y + 40, drawlib.rectangle(treeTrunkColor, 20, 80));
    const leaves = drawlib.move(point.x, point.y, drawlib.circle(treeLeafColor, 50));
    return drawlib.group([trunk, leaves]);
}

/**
 * @param {{ x: number, y: number }} point
 * @returns {drawlib.Shape}
 */
function createSheep(point) {
    const body = drawlib.move(point.x, point.y, drawlib.circle(sheepBodyColor, 30));
    const head = drawlib.move(point.x + 20, point.y - 20, drawlib.circle(sheepHeadColor, 10));
    return drawlib.group([body, head]);
}

function main() {
    try {
        const context = get2DContextById("canvas");

        const trees = [
            createTree({ x: -300, y: -250 }),
            createTree({ x: -150, y: -250 }),
            createTree({ x: 0, y: -250 }),
            createTree({ x: 300, y: 250 }),
            createTree({ x: 150, y: 250 }),
            createTree({ x: 0, y: 250 }),
            // .
        ];

        const sheeps = [
            createSheep({ x: -50, y: -80 }),
            createSheep({ x: -150, y: 0 }),
            createSheep({ x: -300, y: 150 }),
            createSheep({ x: 0, y: 0 }),
            createSheep({ x: -150, y: 100 }),
            // .
        ];

        trees.forEach((tree) => {
            drawlib.renderCentered(tree, context);
        });

        sheeps.forEach((sheep) => {
            drawlib.renderCentered(sheep, context);
        });
    } catch (e) {
        console.error(e);
    }
}

main();
