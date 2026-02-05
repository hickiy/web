---
title: 计数排序演示
---

# 计数排序演示

<ClientOnly>
<div class="sort-demo">
  <h2>计数排序演示</h2>
  <div id="container"></div>
  <div id="sortInfo">排序信息将在此显示</div>
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
    transition: left 0.5s ease, border 0.5s ease;
  }

  .sort-demo #sortInfo {
    margin-bottom: 20px;
    font-size: 16px;
    color: #555;
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
    const container = document.getElementById('container');
    const startBtn = document.getElementById('startBtn');
    const sortInfo = document.getElementById('sortInfo');
    if (!container || !startBtn || !sortInfo) {
      requestAnimationFrame(initPage);
      return;
    }
    const barWidth = 40;
    const gap = 20;
    let bars = [];
    // 使用较小的数值便于计数排序演示
    let values = [6, 3, 9, 3, 5, 1, 7, 2, 8, 4];

  // 初始化柱状图（高度乘以30便于显示）
  function init() {
    container.innerHTML = '';
    bars = [];
    for (let i = 0; i < values.length; i++) {
      const bar = document.createElement('div');
      bar.classList.add('bar');
      bar.style.height = (values[i] * 30) + 'px';
      bar.style.left = (i * (barWidth + gap)) + 'px';
      bar.textContent = values[i];
      container.appendChild(bar);
      bars.push(bar);
    }
    sortInfo.textContent = '排序信息将在此显示';
  }

  // 延时函数
  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // 更新柱子位置
  function updatePositions() {
    for (let i = 0; i < bars.length; i++) {
      bars[i].style.left = (i * (barWidth + gap)) + 'px';
    }
  }

  // 计数排序演示
  async function countingSort() {
    sortInfo.textContent = '计数排序开始';
    // 计算最小值与最大值
    let max = Math.max(...values);
    let min = Math.min(...values);
    let range = max - min + 1;
    // 初始化计数数组
    let count = new Array(range).fill(0);

    // 1. 统计每个数出现的频率
    for (let i = 0; i < bars.length; i++) {
      bars[i].style.border = '3px solid yellow';
      sortInfo.textContent = `统计: 值 ${bars[i].textContent} 出现次数增加`;
      await sleep(600);
      let idx = parseInt(bars[i].textContent) - min;
      count[idx]++;
      bars[i].style.border = 'none';
    }

    sortInfo.textContent = '计数数组: ' + count.join(', ');
    await sleep(2000);

    // 2. 累加计数数组（构造前缀和数组）
    for (let i = 1; i < count.length; i++) {
      count[i] += count[i - 1];
    }
    sortInfo.textContent = '累加计数数组: ' + count.join(', ');
    await sleep(2000);

    // 3. 根据计数数组，将元素放入正确的位置
    let output = new Array(bars.length);
    // 为了保证稳定性，从右向左遍历原数组
    for (let i = bars.length - 1; i >= 0; i--) {
      let val = parseInt(bars[i].textContent);
      let idx = val - min;
      count[idx]--;
      let pos = count[idx];
      sortInfo.textContent = `放置元素: ${val} 到新位置 ${pos}`;
      bars[i].style.border = '3px solid red';
      await sleep(600);
      output[pos] = bars[i];
      bars[i].style.border = 'none';
    }

    // 4. 更新原始数组并动画展示排序结果
    for (let i = 0; i < output.length; i++) {
      bars[i] = output[i];
    }
    updatePositions();
    sortInfo.textContent = '排序完成！';
  }

  // 事件绑定及启动排序
  startBtn.addEventListener('click', async () => {
    startBtn.disabled = true;
    init();
    await countingSort();
    startBtn.disabled = false;
  });

    init();
  };

  initPage();
});
</script>
</ClientOnly>
