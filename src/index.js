import "./index.scss";
import { Circle, Rect } from "./shape";
import { Painter } from "./painter";
import { Rotate, Translate } from "./behavior";
import { Animator } from "./animator";
import Easing from "./tween";

document.addEventListener('DOMContentLoaded', () => {
  const $canvas = document.getElementById("canvas");
  $canvas.setAttribute("width", document.documentElement.clientWidth);
  $canvas.setAttribute("height", document.documentElement.clientHeight);
  const ctx = $canvas.getContext("2d");

  const painter = new Painter(ctx);

  const s1 = new Circle(
    {
      shape: {
        x: 100,
        y: 100,
        radius: 50,
        angle: 0,
        strokeStyle: "blue",
        fillStyle: "red"
      },

    },
    [new Translate()]
  );

  const s2 = new Rect(
    {
      shape: {
        x: 200,
        y: 200,
        width: 100,
        height: 50,
        angle: 0,
        strokeStyle: "orange",
        fillStyle: "yellow"
      },

    },
    [new Rotate()]
  );
  const s3 = new Rect(
    {
      shape: {
        x: 400,
        y: 400,
        width: 100,
        height: 100,
        angle: 45 * Math.PI / 180,
        strokeStyle: "bule",
        fillStyle: "skyblue"
      },

    },
    [new Rotate()]
  );
  painter.add(s2);
  painter.add(s1);
  const an = new Animator(ctx, painter, 3000, Easing.Bounce.InOut);
  const an2 = new Animator(ctx, painter, 5000, Easing.Back.InOut);
  an.start()
    .finish(() => {

      painter.add(s3);
      an2.start();
      console.log(s1, s2, s3);
    });
})


