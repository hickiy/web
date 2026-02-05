---
title: 冒泡排序动画
---

# 冒泡排序动画

<ClientOnly>
<div class="sort-demo">
  <h2>冒泡排序动画（柱状图位移效果）</h2>
  <div id="container"></div>
  <button id="startBtn">开始排序</button>
</div>

<style>
  .sort-demo {
    height: 100vh;
    font-family: sans-serif;
    margin: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .sort-demo #container {
    position: relative;
    width: 600px;
    height: 300px;
    border: 1px solid #ccc;
    margin-bottom: 20px;
  }

  .sort-demo .bar {
    position: absolute;
    bottom: 0;
    width: 40px;
    background-color: steelblue;
    text-align: center;
    color: white;
    line-height: 20px;
    transition: left 0.5s ease;
  }

  .sort-demo #startBtn {
    padding: 10px 20px;
    font-size: 16px;
  }
</style>

<script setup>
import { onMounted } from 'vue';

onMounted(() => {
  const initPage = () => {
    // 设置数据及相关参数
    const container = document.getElementById('container');
    const startBtn = document.getElementById('startBtn');
    if (!container || !startBtn) {
      requestAnimationFrame(initPage);
      return;
    }
    const barWidth = 40;
    const gap = 20;
    const maxHeight = container.clientHeight;
    let bars = [];
    let values = [250, 100, 200, 300, 150, 50, 275, 125, 175, 225];

  // 随机生成数据，并创建柱状图
  function init() {
    container.innerHTML = '';
    bars = [];
    for (let i = 0; i < values.length; i++) {
      const bar = document.createElement('div');
      bar.classList.add('bar');
      bar.style.height = values[i] + 'px';
      bar.style.left = (i * (barWidth + gap)) + 'px';
      bar.textContent = values[i];
      container.appendChild(bar);
      bars.push(bar);
    }
  }

  // 等待指定时间（ms）
  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // 交换两根柱子的显示位置
  function swapVisual(i, j) {
    // 获取当前left位置
    const tempLeft = bars[i].style.left;
    bars[i].style.left = bars[j].style.left;
    bars[j].style.left = tempLeft;
    // 同步交换bars数组顺序（数据层面保持一致）
    let temp = bars[i];
    bars[i] = bars[j];
    bars[j] = temp;
  }

  // 冒泡排序，带动画效果
  async function bubbleSort() {
    startBtn.disabled = true;
    for (let i = 0; i < values.length; i++) {
      for (let j = 0; j < values.length - i - 1; j++) {
        // 高亮比较的两个柱子（可选效果）
        bars[j].style.backgroundColor = 'orange';
        bars[j + 1].style.backgroundColor = 'orange';
        await sleep(1000);
        // 如果前面的值比后面值大，则交换
        if (parseInt(bars[j].textContent) > parseInt(bars[j + 1].textContent)) {
          swapVisual(j, j + 1);
          await sleep(600); // 等待交换动画完成
        }
        // 恢复原颜色
        bars[j].style.backgroundColor = 'steelblue';
        bars[j + 1].style.backgroundColor = 'steelblue';
      }
    }
    startBtn.disabled = false;
  }

  // 初始化动画及事件绑定
  init();
    startBtn.addEventListener('click', async () => {
      init(); // 每次排序前重新生成数据
      await bubbleSort();
    });
  };

  initPage();
});
</script>
</ClientOnly>
