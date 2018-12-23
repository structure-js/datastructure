let Graph = require('../lib/Graph.js');
let Vertex = Graph.Vertex;

let graph = new Graph();

let v1 = new Vertex('A');
let v2 = new Vertex('B');
let v3 = new Vertex('C');
let v4 = new Vertex('D');
let v5 = new Vertex('E');
let v6 = new Vertex('F');
let v7 = new Vertex('G');

test('When construct new Graph,',()=>{
    expect(graph.vertexSize).toBe(0);
    expect(graph.edgeSize).toBe(0);
});

test('graph.addVertex(vertex)',()=>{
    graph.addVertex(v1);
    graph.addVertex(v2);
    graph.addVertex(v3);
    graph.addVertex(v4);
    graph.addVertex(v5);
    graph.addVertex(v6);
    graph.addVertex(v7);

    expect(graph.vertexSize).toBe(7);
    expect(graph.edgeSize).toBe(0);
});

test('graph.addEdge(vs, ve, weight)',()=>{
    graph.addEdge(v1, v2, 1);
    graph.addEdge(v1, v3, 2);
    graph.addEdge(v2, v3, 3);
    graph.addEdge(v3, v1, 2);
    graph.addEdge(v3, v4, 3);
    graph.addEdge(v3, v5, 2);
    graph.addEdge(v4, v6, 4);
    graph.addEdge(v5, v6, 1);
    graph.addEdge(v5, v7, 2);
    graph.addEdge(v7, v1, 1);
    graph.addEdge(v7, v2, 2);
    // graph.addEdge(v6, v1, 2);
    
    expect(graph.vertexSize).toBe(7);
    expect(graph.edgeSize).toBe(11);
});

test('graph.removeEdge(vs, ve)',()=>{
    graph.removeEdge(v7,v1);

    expect(graph.vertexSize).toBe(7);
    expect(graph.edgeSize).toBe(10);
});

test("Fail when try to remove non-existent edge", () => {
    expect(()=>graph.removeEdge(v7,v1)).toThrow(Error);
});

test("graph.removeVertex(vertex), also remove edges that contains 'vertex'",()=>{
    graph.removeVertex(v7);

    expect(graph.vertexSize).toBe(6);
    expect(graph.edgeSize).toBe(8);
});

test("graph.getDistance(vs, ve)",()=>{
    expect(graph.getDistance(v1,v1)).toBe(0);
    expect(graph.getDistance(v1,v2)).toBe(1);
    expect(graph.getDistance(v3,v2)).toBe(3);
    expect(graph.getDistance(v3,v4)).toBe(3);
    expect(graph.getDistance(v3,v6)).toBe(3);
    expect(graph.getDistance(v2,v5)).toBe(5);
    expect(graph.getDistance(v5,v1)).toBe(Number.MAX_SAFE_INTEGER);
    expect(graph.getDistance(v6,v1)).toBe(Number.MAX_SAFE_INTEGER);
});

test("graph.getPath(vs, ve)",()=>{
    expect(graph.getPath(v1,v1)).toEqual([v1]);
    expect(graph.getPath(v3,v3)).toEqual([v3]);
    expect(graph.getPath(v1,v2)).toEqual([v1,v2]);
    expect(graph.getPath(v1,v4)).toEqual([v1,v3,v4]);
    expect(graph.getPath(v1,v5)).toEqual([v1,v3,v5]);
    expect(graph.getPath(v6,v1)).toEqual([]);
    expect(graph.getPath(v5,v1)).toEqual([]);
});