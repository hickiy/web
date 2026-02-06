---
title: 归并排序递归演示
---

# 归并排序递归演示

<ClientOnly>
<div class="sort-demo">
  <h2>归并排序递归演示</h2>
  <div id="container"></div>
  <div id="recursionInfo">递归信息将在此显示</div>
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
    transition: left 0.5s ease, background-color 0.5s ease;
  }

  .sort-demo #recursionInfo {
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
    const recursionInfo = document.getElementById('recursionInfo');
    if (!container || !startBtn || !recursionInfo) {
      requestAnimationFrame(initPage);
      return;
    }
    const barWidth = 40;
    const gap = 20;
    let bars = [];
    // 初始的随机数据
    let values = [250, 100, 200, 300, 150, 50, 275, 125, 175, 225];

  // 初始化柱状图
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
    recursionInfo.textContent = '递归信息将在此显示';
  }

  // 延时函数
  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // 更新柱子位置（通过 left 属性实现水平移动动画）
  function updatePositions() {
    for (let i = 0; i < bars.length; i++) {
      bars[i].style.left = (i * (barWidth + gap)) + 'px';
    }
  }

  // 给指定区间的柱子添加边框高亮显示
  function highlightSubarray(low, high, color) {
    for (let i = low; i <= high; i++) {
      bars[i].style.border = `3px solid ${color}`;
    }
  }

  // 清除指定区间柱子的高亮边框
  function clearHighlight(low, high) {
    for (let i = low; i <= high; i++) {
      bars[i].style.border = 'none';
    }
  }

  // 合并函数，动画展示归并过程（由高度变化改为位置移动）
  async function merge(low, mid, high) {
    recursionInfo.textContent = `合并区间 [${low}, ${mid}] 和 [${mid + 1}, ${high}]`;
    highlightSubarray(low, high, 'orange');
    await sleep(1000);

    let mergedBars = [];
    let left = low;
    let right = mid + 1;

    // 收集两个有序子区间的柱子（直接比较柱子的文本值）
    while (left <= mid && right <= high) {
      let leftVal = parseInt(bars[left].textContent);
      let rightVal = parseInt(bars[right].textContent);
      if (leftVal <= rightVal) {
        mergedBars.push(bars[left]);
        left++;
      } else {
        mergedBars.push(bars[right]);
        right++;
      }
    }
    while (left <= mid) {
      mergedBars.push(bars[left]);
      left++;
    }
    while (right <= high) {
      mergedBars.push(bars[right]);
      right++;
    }

    // 将合并后的柱子放回原数组，并依次改变它们的位置来展示移动动画
    for (let i = low; i <= high; i++) {
      mergedBars[i - low].style.backgroundColor = 'green';
      bars[i] = mergedBars[i - low];
      await sleep(300);
    }

    // 根据新的数组顺序更新柱子的位置，实现移动效果
    updatePositions();
    await sleep(600);

    // 恢复柱子颜色为默认
    for (let i = low; i <= high; i++) {
      bars[i].style.backgroundColor = 'steelblue';
    }

    clearHighlight(low, high);
  }

  // 递归实现归并排序，并展示递归调用信息
  async function mergeSort(low, high, depth = 0) {
    if (low < high) {
      recursionInfo.textContent = `深度 ${depth}: 排序区间 [${low}, ${high}]`;
      highlightSubarray(low, high, 'purple');
      await sleep(1000);
      let mid = Math.floor((low + high) / 2);
      await mergeSort(low, mid, depth + 1);
      await mergeSort(mid + 1, high, depth + 1);
      await merge(low, mid, high);
    } else if (low === high) {
      recursionInfo.textContent = `深度 ${depth}: 单个元素 ${bars[low].textContent} 已归位`;
      bars[low].style.border = '3px solid green';
      await sleep(600);
      bars[low].style.border = 'none';
    }
  }

  // 事件绑定及启动排序
  startBtn.addEventListener('click', async () => {
    startBtn.disabled = true;
    init();
    await mergeSort(0, bars.length - 1);
    recursionInfo.textContent = '排序完成！';
    startBtn.disabled = false;
  });

    init();
  };

  initPage();
});
</script>
</ClientOnly>
