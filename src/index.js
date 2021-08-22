import "./style.scss";
import Shape from "./shape";
import { CiclePainter, RectPainter } from "./painter";
import { Rotate, Translate } from "./behavior";
import { Animator } from "./animator";

const $canvas = document.getElementById("canvas");
$canvas.setAttribute("width", document.documentElement.clientWidth);
$canvas.setAttribute("height", document.documentElement.clientHeight);
const ctx = $canvas.getContext("2d");

const s1 = new Shape(
  "circle",
  new CiclePainter(ctx),
  {
    x: 100,
    y: 100,
    radius: 50,
    strokeStyle: "blue",
    fillStyle: "red"
  },
  [new Rotate(), new Translate()]
);

const s2 = new Shape(
  "rect",
  new RectPainter(ctx),
  {
    x: 200,
    y: 200,
    width: 100,
    height: 50,
    strokeStyle: "orange",
    fillStyle: "yellow"
  },
  [new Rotate(), new Translate()]
);

const an = new Animator([s1, s2], 3000);
an.start();
