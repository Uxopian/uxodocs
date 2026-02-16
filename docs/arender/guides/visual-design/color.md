---
title: Color palette
sidebar_position: 1
last_update:
  date: '2026-01-29T16:00:59.573Z'
  author: CI/CD Bot
content_hash: 4873afd2cf0ea319faaca1589db14409e8fffc16d14fcb7bd0d0b075be4b6fc8
---

export const ColorPalette = ({colors, bordered}) => (
  <div style={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap'}}>
    {colors.map((color, idx) => (
      <div
        key={idx}
        style={{
          backgroundColor: color,
          width: '50px',
          height: '50px',
          border: bordered ? '1px solid #ccc' : 'none',
          boxSizing: 'border-box'
        }}
        title={color}
      />
    ))}
  </div>
);

### Blue
<ColorPalette colors={["#021D45", "#042475", "#224293", "#1B49BE", "#1865D8", "#74A1F9", "#9BB7FF", "#D3DFF4", "#EDF2FF"]} />

### Gray
<ColorPalette colors={["#1B1F26", "#2E353F", "#404A58", "#5B697E", "#9AA9C5", "#C9CDD8", "#D8DFE8", "#E6EAF2", "#F1F4FA", "#F1F6FF"]} />

### Green
<ColorPalette colors={["#04262F", "#143137", "#284248", "#10434F", "#005264", "#4D8693", "#80A9B2", "#B3CBD1", "#E6EEF0"]} />

### Red
<ColorPalette colors={["#2C0F0F", "#591E1E", "#6F2525", "#B23B3B", "#DE4A4A", "#E56E6E", "#EB9292", "#F5C9C9", "#FCEDED"]} />

### Black and White
<ColorPalette colors={["#000000", "#FFFFFF", "rgb(255, 255, 255, 0.9)"]} bordered />


### Blue palette


| Shade       | Preview                                        | Hex code                  | CSS variable            |
| ----------- | ---------------------------------------------- | ------------------------- | ----------------------- |
| Blue 900    | <ColorPalette colors={["#021D45"]} />          | #021D45                   | \--ar-color-blue-900    |
| Blue 800    | <ColorPalette colors={["#042475"]} />          | #042475                   | \--ar-color-blue-800    |
| Blue 700    | <ColorPalette colors={["#224293"]} />          | #224293                   | \--ar-color-blue-700    |
| Blue 600    | <ColorPalette colors={["#1B49BE"]} />          | #1B49BE                   | \--ar-color-blue-600    |
| Blue 500    | <ColorPalette colors={["#1865D8"]} />          | #1865D8                   | \--ar-color-blue-500    |
| Blue 500-90 | <ColorPalette colors={["rgb(24, 101, 216, 0.9)"]} />  | rgb(24, 101, 216, 0.9)    | \--ar-color-blue-500-90 |
| Blue 400    | <ColorPalette colors={["#74A1F9"]} />                 | #74A1F9                   | \--ar-color-blue-400    |
| Blue 300    | <ColorPalette colors={["#9BB7FF"]} />                 | #9BB7FF                   | \--ar-color-blue-300    |
| Blue 200    | <ColorPalette colors={["#D3DFF4"]} />                 | #D3DFF4                   | \--ar-color-blue-200    |
| Blue 100    | <ColorPalette colors={["#EDF2FF"]} />                 | #EDF2FF                   | \--ar-color-blue-100    |
| Blue 100-90 | <ColorPalette colors={["rgb(237, 242, 255, 0.9)"]} /> | rgb(237, 242, 255, 0.9)   | \--ar-color-blue-100-90 |


### Gray palette

| Shade    | Preview                        | Hex code | CSS variable         |
| -------- | ------------------------------ | -------- | -------------------- |
| Gray 900 | <ColorPalette colors={["#1B1F26"]} /> | #1B1F26  | \--ar-color-gray-900 |
| Gray 800 | <ColorPalette colors={["#2E353F"]} /> | #2E353F  | \--ar-color-gray-800 |
| Gray 700 | <ColorPalette colors={["#404A58"]} /> | #404A58  | \--ar-color-gray-700 |
| Gray 600 | <ColorPalette colors={["#5B697E"]} /> | #5B697E  | \--ar-color-gray-600 |
| Gray 500 | <ColorPalette colors={["#9AA9C5"]} /> | #9AA9C5  | \--ar-color-gray-500 |
| Gray 400 | <ColorPalette colors={["#C9CDD8"]} /> | #C9CDD8  | \--ar-color-gray-400 |
| Gray 300 | <ColorPalette colors={["#D8DFE8"]} /> | #D8DFE8  | \--ar-color-gray-300 |
| Gray 200 | <ColorPalette colors={["#E6EAF2"]} /> | #E6EAF2  | \--ar-color-gray-200 |
| Gray 100 | <ColorPalette colors={["#F1F4FA"]} /> | #F1F4FA  | \--ar-color-gray-100 |
| Gray 50  | <ColorPalette colors={["#F1F6FF"]} /> | #F1F6FF  | \--ar-color-gray-50  |

### Green palette


| Shade     | Preview                        | Hex code | CSS variable          |
| --------- | ------------------------------ | -------- | --------------------- |
| Green 900 | <ColorPalette colors={["#04262F"]} /> | #04262F  | \--ar-color-green-900 |
| Green 800 | <ColorPalette colors={["#143137"]} /> | #143137  | \--ar-color-green-800 |
| Green 700 | <ColorPalette colors={["#284248"]} /> | #284248  | \--ar-color-green-700 |
| Green 600 | <ColorPalette colors={["#10434F"]} /> | #10434F  | \--ar-color-green-600 |
| Green 500 | <ColorPalette colors={["#005264"]} /> | #005264  | \--ar-color-green-500 |
| Green 400 | <ColorPalette colors={["#4D8693"]} /> | #4D8693  | \--ar-color-green-400 |
| Green 300 | <ColorPalette colors={["#80A9B2"]} /> | #80A9B2  | \--ar-color-green-300 |
| Green 200 | <ColorPalette colors={["#B3CBD1"]} /> | #B3CBD1  | \--ar-color-green-200 |
| Green 100 | <ColorPalette colors={["#E6EEF0"]} /> | #E6EEF0  | \--ar-color-green-100 |

### Red palette


| Shade   | Preview                        | Hex code | CSS variable        |
| ------- | ------------------------------ | -------- | ------------------- |
| Red 900 | <ColorPalette colors={["#2C0F0F"]} /> | #2C0F0F  | \--ar-color-red-900 |
| Red 800 | <ColorPalette colors={["#591E1E"]} /> | #591E1E  | \--ar-color-red-800 |
| Red 700 | <ColorPalette colors={["#6F2525"]} /> | #6F2525  | \--ar-color-red-700 |
| Red 600 | <ColorPalette colors={["#B23B3B"]} /> | #B23B3B  | \--ar-color-red-600 |
| Red 500 | <ColorPalette colors={["#DE4A4A"]} /> | #DE4A4A  | \--ar-color-red-500 |
| Red 400 | <ColorPalette colors={["#E56E6E"]} /> | #E56E6E  | \--ar-color-red-400 |
| Red 300 | <ColorPalette colors={["#EB9292"]} /> | #EB9292  | \--ar-color-red-300 |
| Red 200 | <ColorPalette colors={["#F5C9C9"]} /> | #F5C9C9  | \--ar-color-red-200 |
| Red 100 | <ColorPalette colors={["#FCEDED"]} /> | #FCEDED  | \--ar-color-red-100 |

### Black and White palette


| Shade        | Preview                                                | Hex code                 | CSS variable             |
| ------------ | ------------------------------------------------------ | ------------------------ | ------------------------ |
| Black 100    | <ColorPalette colors={["#000000"]} />                  | #000000                  | \--ar-color-black-100    |
| White 100    | <ColorPalette colors={["#FFFFFF"]} bordered />         | #FFFFFF                  | \--ar-color-white-100    |
| White 100-90 | <ColorPalette colors={["rgb(255, 255, 255, 0.9);"]} bordered /> | rgb(255, 255, 255, 0.9); | \--ar-color-white-100-90 |