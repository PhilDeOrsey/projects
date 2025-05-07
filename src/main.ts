// main.ts
import {OpticsSim, OpticsSimConfig, RoomBounds, ShapeConfig} from "./opticsSim";

const shapes: ShapeConfig[] = [
    {
        id: 'observer',
        type: "circle",
        attributes: {
            cx: 500,
            cy: 350,
            r: 15,
            fill: `#0000c8` // blue
        },
        draggable: true
    },
    {
        id: 'poly1',
        type: "polygon",
        attributes: {
            points: "450,400 525,400 525,450 475,440 450,450 475,425",
            fill: `#c80000` // red
        },
        draggable: true
    }
];

const bounds: RoomBounds = {
    x: 400,
    y: 300,
    width: 200,
    height: 200
};

const config: OpticsSimConfig = {
    svg: document.querySelector('svg')!,
    shapes: shapes,
    bounds: bounds,
    mirrorLocation: 'all'
};

new OpticsSim(config);
