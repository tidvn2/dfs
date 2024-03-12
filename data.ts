import { NodeConfig } from "@ant-design/graphs";

export interface edge {
  source: NodeConfig;
  target: NodeConfig;
}

// const nodes: node[] = [
//   {
//     id: "A",
//     label: "A",
//   },
//   {
//     id: "B",
//     label: "B",
//   },
//   {
//     id: "C",
//     label: "C",
//   },
//   {
//     id: "D",
//     label: "D",
//   },
//   {
//     id: "E",
//     label: "E",
//   },
//   {
//     id: "F",
//     label: "F",
//   },
//   {
//     id: "G",
//     label: "G",
//   },
//   {
//     id: "K",
//     label: "K",
//   },
//   {
//     id: "I",
//     label: "I",
//   },
// ];

// const edges: edge[] = [
//   {
//     source: "A",
//     target: "B",
//   },
//   {
//     source: "A",
//     target: "C",
//   },
//   {
//     source: "A",
//     target: "D",
//   },
//   {
//     source: "B",
//     target: "I",
//   },
//   {
//     source: "B",
//     target: "G",
//   },
//   {
//     source: "C",
//     target: "E",
//   },
//   {
//     source: "C",
//     target: "F",
//   },
//   {
//     source: "D",
//     target: "C",
//   },
//   {
//     source: "D",
//     target: "F",
//   },
//   {
//     source: "I",
//     target: "G",
//   },
//   {
//     source: "F",
//     target: "K",
//   },
//   {
//     source: "K",
//     target: "E",
//   },
//   {
//     source: "E",
//     target: "G",
//   },
// ];
