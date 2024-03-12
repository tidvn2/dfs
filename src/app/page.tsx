"use client"
import { Graph } from "@/components/Graph";
import { useState } from "react";
import { edge } from "../../data";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { NodeConfig } from "@ant-design/graphs";
import { set } from "react-hook-form";

interface request {
  start: NodeConfig;
  end: NodeConfig;
}
export default function Home() {
  const [nodes, setNodes] = useState<NodeConfig[]>([])
  const [edges, setEdges] = useState<edge[]>([])
  const [result, setResult] = useState<NodeConfig[]>([])
  const [request, setRequest] = useState<request>()

  function handleChange(e: any) {
    try {
      if (e.target.name === "nodes") {
        const nodeValues = e.target.value.split("\n").map((value: string) => {
          return {
            id: value,
            label: value,
          };
        });
        setNodes(nodeValues);
      }
      if (e.target.name === "edges") {
        const edgeValues = e.target.value.split("\n").map((value: string) => {
          const [source, target] = value.split("");
          if (!source || !target) throw new Error("Invalid edge");
          const sourceNode = nodes.find(n => n.id === source);
          const targetNode = nodes.find(n => n.id === target);
          return {
            source: sourceNode,
            target: targetNode,
          };
        });
        setEdges(edgeValues);
      }
      if (e.target.name === "request") {
        const [start, end] = e.target.value.split("");
        const startNode: any = nodes.find(n => n.id === start);
        const endNode: any = nodes.find(n => n.id === end);
        setRequest({
          start: startNode,
          end: endNode
        })
        return;
      };
    } catch (e) {
      console.error(e);
    }
  }

  interface StackItem {
    node: NodeConfig;
    path: NodeConfig[];
  }
  // Depth-first search algorithm
  const dfs = (): NodeConfig[] => {
    if (!request || !request.start || !request.end) {
      return [];
    }

    let q = new Set();
    let stack: StackItem[] = [{ node: request.start, path: [request.start] }];

    while (stack.length) {
      let { node, path }: StackItem = stack.pop()!;

      if (node === request.end) {
        return path;
      }

      let neighbours = edges
        .filter(edge => edge.source === node)
        .map((edge) => {
          const neighbor = edge.target
          if (!q.has(neighbor)) {
            q.add(neighbor);
            stack.push({ node: neighbor, path: [...path, neighbor] });
          }
        });

    }
    return [];
  }

  return (
    <div className="container">
      <div className="grid w-full gap-2">
        <Graph nodes={nodes} edges={edges} path={result} />
      </div>
      <div className="grid w-full gap-2">
        <Textarea name="nodes" onChange={handleChange} placeholder="nodes" className="h-400" />
        <Textarea name="edges" onChange={handleChange} placeholder="edges" className="h-400" />
        <Input name="request" onChange={handleChange} placeholder="request" />
        <Button onClick={() => setResult(dfs())}>FIND</Button>
        <Button onClick={() => setResult([])}>reset</Button>
      </div>
    </div>
  );
}
