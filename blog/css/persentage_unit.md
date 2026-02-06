# CSS 百分比参考系速查（哪些百分比相对于什么计算）

本文按类别梳理常见 CSS 属性中的百分比值如- m- mask-position / mask-size（百分比）
	- 与 background-position/size 类似，基于遮罩定位区域。
- object-position（替换元素，如 `<img>`/`<video>`）
	- 基准：替换内容在元素内容盒内的"剩余空间"。与 background-position 的百分比语义相同。position / mask-size（百分比）
	- 与 background-position/size 类似，基于遮罩定位区域。
- object-position（替换元素，如 `<img>`/`<video>`）
	- 基准：替换内容在元素内容盒内的"剩余空间"。与 background-position 的百分比语义相同。相对于谁计算），并标注易踩坑点与小例子。

提示：多数“尺寸相关”的百分比依赖包含块（containing block）。文中涉及“包含块”“定位区域”等术语均以常规块级布局为前提，特殊布局另有说明。

## 1. 盒模型尺寸类

- width / min-width / max-width
	- 基准：包含块的宽度（content box）。
- height / min-height / max-height
	- 基准：包含块的高度（content box）。若包含块高度不确定（auto），百分比高度通常无法解析，表现为 auto（绝对定位、Flex/Grid 中有例外，见下文）。
- padding（含 padding-top/right/bottom/left 与逻辑属性 padding-block/inline）
	- 经典规则：百分比基于包含块的宽度。
	- 规范更新：按 Values & Units Level 4，基于包含块的 inline-size（横排等同“宽度”；竖排为“高度”）。多数场景可理解为“基于父元素的行内轴尺寸”。
	- 备注：这正是“padding-top 百分比法”实现固定宽高比的核心。
- margin（含 margin-top/right/bottom/left 与逻辑属性 margin-block/inline）
	- 经典规则：无论上下左右，百分比都基于包含块的宽度。
	- 规范更新同上（inline-size）。
- border-radius（百分比）
	- 基准：元素自身的边框盒（border box）。横向半径的百分比相对于元素宽度，纵向半径相对于元素高度。
- text-indent（百分比）
	- 基准：包含块的宽度。

示例（固定 4:3 盒）：

```css
.ratio-box { width: 400px; }
.ratio-box::before { content: ""; display: block; padding-top: 75%; }
```

## 2. 定位与偏移

- top / bottom（绝对或固定定位）
	- 基准：包含块的高度。
- left / right（绝对或固定定位）
	- 基准：包含块的宽度。
- inset / inset-block / inset-inline
	- 与对应方向 top/left 等一致：块轴基于高度，行内轴基于宽度（或更一般地：基于包含块的对应轴尺寸）。
- transform: translate(%)
	- 基准：元素自身的盒尺寸（默认 border box）在对应轴上的长度。例如 translateX(50%) 是自身宽度的 50%。
- transform-origin(%)
	- 基准：元素自身盒（默认 border box）在对应轴上的尺寸（0%~100% 即从左/上到右/下）。

## 3. 背景、遮罩与替换元素

- background-position（百分比）
	- 基准：背景定位区域（background positioning area）与背景图像尺寸的“剩余空间”。公式等价于：(定位区域尺寸 − 图片尺寸) × 百分比。
	- 直觉：50% 不是“容器一半”，而是让图像相对剩余空间居中。
- background-position-x / background-position-y
	- 同上，各自沿轴计算。
- background-size（百分比）
	- 基准：背景定位区域的对应轴尺寸（不涉及图片本身尺寸）。
- mask-position / mask-size（百分比）
	- 与 background-position/size 类似，基于遮罩定位区域。
- object-position（替换元素，如 `<img>`/`<video>`）
	- 基准：替换内容在元素内容盒内的“剩余空间”。与 background-position 的百分比语义相同。

## 4. 字体与文本排版

- font-size（百分比）
	- 基准：父元素的 font-size（继承值）。
- line-height（百分比）
	- 基准：元素自身的 font-size。
- vertical-align（百分比）
	- 基准：元素自身的 line-height。
- 注：letter-spacing / word-spacing 不接受百分比（为长度或关键字）。

## 5. 布局模型特例（Flex / Grid 等）

- flex-basis（百分比）
	- 基准：Flex 容器在主轴方向上的可用空间（容器 content box 对应轴尺寸）。若该尺寸不确定，百分比可能视为 auto。
- width/height 在 Flex/Grid 子项中的百分比
	- 当父容器在对应轴上具有“确定尺寸”时，百分比可用；Flex/Grid 经常能提供确定性，从而让百分比高度生效。
- grid-template-columns / grid-template-rows 中的百分比轨道尺寸
	- 基准：Grid 容器在对应轴上的尺寸（content box）。
- gap（行/列间距）
	- 仅支持长度，不支持百分比（截至多数实现）。

## 6. 形状与裁剪

- clip-path: inset()/circle()/ellipse()/polygon()（百分比）
	- 基准：引用盒（reference box），默认为元素的 border-box。百分比沿对应轴相对于该盒尺寸计算。
- shape-outside 基本形状（百分比）
	- 基准：默认相对于元素的 margin-box。用于浮动环绕时决定外形尺寸。

## 7. 渐变与图像函数中的百分比

- linear-gradient / radial-gradient / conic-gradient 色标百分比
	- 基准：渐变线/圆/圆锥的进度（0%→100%），表示颜色停靠点在渐变轴上的位置，而非布局尺寸。
- image() / image-set() 中的分辨率/类型权重不使用百分比（与此无关）。

## 8. 视觉效果函数中的“比例百分比”（非尺寸参考）

这些百分比不是相对几何尺寸，而是以 100% 为“无变化”的比例标尺：

- filter: grayscale(%) / sepia(%) / saturate(%) / invert(%) / brightness(%) / contrast(%) / opacity(%)
	- 100% 表示原值（或完全应用，依函数而定），与布局尺寸无关。
- backdrop-filter 同理（若实现支持相应函数）。

## 9. 动画时间轴

- @keyframes 选择器中的 0% ~ 100%
	- 基准：动画时长（timeline 进度）。
- transition-duration / delay 不接受百分比。

## 10. 视口单位与“百分比”的区别

- 视口单位（vw/vh/vmin/vmax）不是百分比，但常与百分比混淆：
	- 1vw = 视口宽度的 1%；1vh = 视口高度的 1%。

## 常见坑位与小贴士

1) margin/padding 的百分比在“横排写字模式”下都以父元素宽度为基准；在竖排时遵循 inline-size（等价于以前所说“改为父元素的高度”）。

2) 百分比高度需要父容器在该轴上有“确定尺寸”。若父容器高度为 auto，则子元素 height: 50% 通常无效。

3) translate(%) 相对的是“自身尺寸”，而 top/left(%) 相对的是“包含块尺寸”，两者不要混淆。

4) background-position 的 50%/50% 表示在“剩余空间”居中，不等于直接把图像左上角放在容器的中心。

5) 利用 padding-top: 56.25% 可得到 16:9 盒；75% 得到 4:3 盒。该技巧对响应式视频容器等很实用。

---

参考记忆（速背版）：

- 尺寸/外边距/内边距：看包含块的行内轴尺寸（横排≈父宽）。
- 定位 top/bottom 看高；left/right 看宽。
- transform translate(%)：看自身盒尺寸；transform-origin(%)：看自身盒。
- 背景/遮罩位置与大小：看定位区域（位置还要减去图片尺寸求“剩余空间”）。
- 字体：font-size 看父；line-height 看自己；vertical-align 看本元素行高。
- Flex/Grid：百分比相对容器对应轴尺寸；需“确定尺寸”。
- clip-path/shape：看 reference box（clip 默认 border-box；shape-outside 默认 margin-box）。
- 动画 keyframes：时间进度。
