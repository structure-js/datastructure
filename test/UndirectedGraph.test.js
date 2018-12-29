let UndirectedGraph = require('../index').UndirectedGraph;

let graph = new UndirectedGraph();

test('When construct new Graph,',()=>{
    expect(graph.vertexSize).toBe(0);
    expect(graph.edgeSize).toBe(0);
});

test('graph.addVertex(vertex)',()=>{
    graph.addVertex('A');
    graph.addVertex('B');
    graph.addVertex('C');
    graph.addVertex('D');
    graph.addVertex('E');
    graph.addVertex('F');
    graph.addVertex('G');
    graph.addVertex(1);

    expect(graph.vertexSize).toBe(8);
    expect(graph.edgeSize).toBe(0);
});

test('graph.addEdge(vs, ve, weight)',()=>{
    graph.addEdge('A', 'B', 1);
    graph.addEdge('A', 'C', 2);
    graph.addEdge('B', 'C', 3);
    graph.addEdge('C', 'D', 3);
    graph.addEdge('C', 'E', 2);
    graph.addEdge('D', 'F', 4);
    graph.addEdge('E', 'F', 1);
    graph.addEdge('E', 'G', 2);
    graph.addEdge('G', 'A', 1);
    graph.addEdge('G', 'B', 2);
    graph.addEdge('A', 1, 2);
    // graph.addEdge('F', 'A', 2);
    
    expect(graph.vertexSize).toBe(8);
    expect(graph.edgeSize).toBe(11);
});

test('graph.removeEdge(vs, ve)',()=>{
    graph.removeEdge('G','A');

    expect(graph.vertexSize).toBe(8);
    expect(graph.edgeSize).toBe(10);
});

test("Fail when try to remove non-existent edge", () => {
    expect(()=>graph.removeEdge('G','A')).toThrow(Error);
});

test("graph.removeVertex(vertex), also remove edges that contains 'vertex'",()=>{
    graph.removeVertex('G');

    expect(graph.vertexSize).toBe(7);
    expect(graph.edgeSize).toBe(8);
});

test("graph.getDistance(vs, ve)",()=>{
    expect(graph.getDistance('A','A')).toBe(0);
    expect(graph.getDistance('D','D')).toBe(0);
    expect(graph.getDistance('A','B')).toBe(1);
    expect(graph.getDistance('C','B')).toBe(3);
    expect(graph.getDistance('C','D')).toBe(3);
    expect(graph.getDistance('C','F')).toBe(3);
    expect(graph.getDistance('B','E')).toBe(5);
    expect(graph.getDistance('E','A')).toBe(4);
    expect(graph.getDistance('F','A')).toBe(5);
    expect(graph.getDistance('A',1)).toBe(2);
});

test("graph.getPath(vs, ve)",()=>{
    expect(graph.getPath('A','A')).toEqual(['A']);
    expect(graph.getPath('C','C')).toEqual(['C']);
    expect(graph.getPath('A','B')).toEqual(['A','B']);
    expect(graph.getPath('A','D')).toEqual(['A','C','D']);
    expect(graph.getPath('A','E')).toEqual(['A','C','E']);
    expect(graph.getPath('F','A')).toEqual(['F','E','C','A']);
    expect(graph.getPath('E','A')).toEqual(['E','C','A']);
    expect(graph.getPath('A',1)).toEqual(['A',1]);
});
