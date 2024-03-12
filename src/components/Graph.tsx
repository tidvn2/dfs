"use client"
import dynamic from "next/dynamic";
import { edge } from "../../data";
import { NodeConfig } from "@ant-design/graphs/es/interface";


const RadialGraph = dynamic(
    async () => (await import("@ant-design/graphs")).RadialGraph,
    { ssr: false }
)

export const Graph = ({ nodes, edges, path }: { nodes: NodeConfig[], edges: edge[], path: NodeConfig[] }) => {
    const data = {
        nodes: nodes,
        edges: edges.map((edge: edge) => {
            if(path.find(node => node.id === edge.source.id) && path.find(node => node.id === edge.target.id)) {
                return {
                    source: edge.source.id,
                    target: edge.target.id,
                    isPath: true,
                }
            }
            return {
                source: edge.source.id,
                target: edge.target.id,
            }
        })
    };

    const config = {
        data: data,
        autoFit: false,
        layout: {
            unitRadius: 80,
            nodeSize: 20,
            nodeSpacing: 10,
        },
        nodeCfg: {
            data,
            size: 20,
            style: {
                fill: '#6CE8DC',
                stroke: '#6CE8DC',
            },
            labelCfg: {
                style: {
                    fontSize: 5,
                    fill: '#000',
                },
            },
        },
        edgeCfg: {
            style: (value:any)=>{
                if(value.isPath) {
                    return {
                        stroke: '#FF2D00',
                    }
                }
                return {
                    stroke: '#6CE8DC',
                }
            },
            endArrow: {
                d: 10,
                size: 2,
            },
        },
        behaviors: ['drag-canvas', 'zoom-canvas', 'drag-node'],

    };

    return <RadialGraph {...config} />;
}