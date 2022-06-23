import { uiDsingWidth, splitCount } from "./settings";
import { debounce } from '@/utils'

const resizeHandler = function () {
  let doc = document.documentElement;
  let vw = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
  let scale = vw / uiDsingWidth;
  let baseSize = uiDsingWidth / splitCount;
  let size = (baseSize * scale).toFixed();
  doc.style.fontSize = size + 'px';
};

resizeHandler();

window.addEventListener('resize', debounce(resizeHandler))
