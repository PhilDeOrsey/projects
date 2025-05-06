// main.ts
import {OpticsSim, OpticsSimConfig, RoomBounds, ShapeConfig} from "./opticsSim";

const shapes: ShapeConfig[] = [
    {
        id: 'circle1',
        type: "circle",
        attributes: {
            cx: 300,
            cy: 300,
            r: 20,
            fill: "blue"
        },
        draggable: true
    },
    {
        id: 'rect1',
        type: "polygon",
        attributes: {
            points: "250,250 325,250 325,300 250,300",
            fill: "red"
        },
        draggable: true
    }
];

const bounds: RoomBounds = {
    x: 200,
    y: 200,
    width: 400,
    height: 400
};

const config: OpticsSimConfig = {
    svg: document.querySelector('svg')!,
    shapes: shapes,
    bounds: bounds,
    mirrorLocation: 'left-right'
};

new OpticsSim(config);
