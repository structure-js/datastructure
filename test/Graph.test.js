let Graph = require('../index').Graph;

let graph = new Graph();

test('When construct new Graph,', () => {
    expect(graph.vertexSize).toBe(0);
    expect(graph.edgeSize).toBe(0);
});

test('graph.addVertex(vertex)', () => {
    graph.addVertex('A');
    graph.addVertex('B');
    graph.addVertex('C');
    graph.addVertex('D');
    graph.addVertex('E');
    graph.addVertex('F');
    graph.addVertex('G');

    expect(graph.vertexSize).toBe(7);
    expect(graph.edgeSize).toBe(0);
});

test('graph.addEdge(vs, ve, weight)', () => {
    graph.addEdge('A', 'B', 1);
    graph.addEdge('A', 'C', 2);
    graph.addEdge('B', 'C', 3);
    graph.addEdge('C', 'A', 2);
    graph.addEdge('C', 'D', 3);
    graph.addEdge('C', 'E', 2);
    graph.addEdge('D', 'F', 4);
    graph.addEdge('E', 'F', 1);
    graph.addEdge('E', 'G', 2);
    graph.addEdge('G', 'A', 1);
    graph.addEdge('G', 'B', 2);
    // graph.addEdge('F', 'A', 2);

    expect(graph.vertexSize).toBe(7);
    expect(graph.edgeSize).toBe(11);
});

test('graph.removeEdge(vs, ve)', () => {
    graph.removeEdge('G', 'A');

    expect(graph.vertexSize).toBe(7);
    expect(graph.edgeSize).toBe(10);
});

test("Fail when try to remove non-existent edge", () => {
    expect(() => graph.removeEdge('G', 'A')).toThrow(Error);
});

test("graph.removeVertex(vertex), also remove edges that contains 'vertex'", () => {
    graph.removeVertex('G');

    expect(graph.vertexSize).toBe(6);
    expect(graph.edgeSize).toBe(8);
});

test("graph.getDistance(vs, ve) (don't have negative edge)", () => {
    expect(graph._hasNegativeWeight()).toBe(false);

    expect(graph.getDistance('A', 'A')).toBe(0);
    expect(graph.getDistance('A', 'B')).toBe(1);
    expect(graph.getDistance('C', 'B')).toBe(3);
    expect(graph.getDistance('C', 'D')).toBe(3);
    expect(graph.getDistance('C', 'F')).toBe(3);
    expect(graph.getDistance('B', 'E')).toBe(5);
    expect(graph.getDistance('E', 'A')).toBe(Number.MAX_SAFE_INTEGER);
    expect(graph.getDistance('F', 'A')).toBe(Number.MAX_SAFE_INTEGER);
});

test("graph.getPath(vs, ve) (don't have negative edge)", () => {
    expect(graph._hasNegativeWeight()).toBe(false);

    expect(graph.getPath('A', 'A')).toEqual(['A']);
    expect(graph.getPath('C', 'C')).toEqual(['C']);
    expect(graph.getPath('A', 'B')).toEqual(['A', 'B']);
    expect(graph.getPath('A', 'D')).toEqual(['A', 'C', 'D']);
    expect(graph.getPath('A', 'E')).toEqual(['A', 'C', 'E']);
    expect(graph.getPath('F', 'A')).toEqual([]);
    expect(graph.getPath('E', 'A')).toEqual([]);
});

test("graph.getDistance(vs, ve), using bellman-ford algorithm.", () => {
    expect(graph.bellmanFord('A', 'A')[0]).toBe(0);
    expect(graph.bellmanFord('A', 'B')[0]).toBe(1);
    expect(graph.bellmanFord('C', 'B')[0]).toBe(3);
    expect(graph.bellmanFord('C', 'D')[0]).toBe(3);
    expect(graph.bellmanFord('C', 'F')[0]).toBe(3);
    expect(graph.bellmanFord('B', 'E')[0]).toBe(5);
    expect(graph.bellmanFord('E', 'A')[0]).toBe(Number.MAX_SAFE_INTEGER);
    expect(graph.bellmanFord('F', 'A')[0]).toBe(Number.MAX_SAFE_INTEGER);
});

test("graph.getPath(vs, ve), using bellman-ford algorithm.", () => {
    expect(graph.bellmanFord('A', 'A')[1]).toEqual(['A']);
    expect(graph.bellmanFord('C', 'C')[1]).toEqual(['C']);
    expect(graph.bellmanFord('A', 'B')[1]).toEqual(['A', 'B']);
    expect(graph.bellmanFord('A', 'D')[1]).toEqual(['A', 'C', 'D']);
    expect(graph.bellmanFord('A', 'E')[1]).toEqual(['A', 'C', 'E']);
    expect(graph.bellmanFord('F', 'A')[1]).toEqual([]);
    expect(graph.bellmanFord('E', 'A')[1]).toEqual([]);
});

test("graph.updateEdgeWeight(vs, ve) to negative number.", () => {
    graph.updateEdgeWeight('A', 'B', -2)

    expect(graph.getWeight('A', 'B')).toBe(-2);

    expect(graph._hasNegativeWeight()).toBe(true);
});

test("graph.getDistance(vs, ve), using bellman-ford algorithm include negative weight.", () => {
    expect(graph._hasNegativeWeight()).toBe(true);

    expect(graph.bellmanFord('A', 'A')[0]).toBe(0);
    expect(graph.bellmanFord('A', 'B')[0]).toBe(-2);
    expect(graph.bellmanFord('C', 'B')[0]).toBe(0);
    expect(graph.bellmanFord('C', 'D')[0]).toBe(3);
    expect(graph.bellmanFord('C', 'F')[0]).toBe(3);
    expect(graph.bellmanFord('B', 'E')[0]).toBe(5);
    expect(graph.bellmanFord('E', 'A')[0]).toBe(Number.MAX_SAFE_INTEGER);
    expect(graph.bellmanFord('F', 'A')[0]).toBe(Number.MAX_SAFE_INTEGER);
});

test("graph.getPath(vs, ve), using bellman-ford algorithm include negative weight.", () => {
    expect(graph._hasNegativeWeight()).toBe(true);

    expect(graph.bellmanFord('A', 'A')[1]).toEqual(['A']);
    expect(graph.bellmanFord('C', 'C')[1]).toEqual(['C']);
    expect(graph.bellmanFord('C', 'B')[1]).toEqual(['C', 'A', 'B']);
    expect(graph.bellmanFord('A', 'B')[1]).toEqual(['A', 'B']);
    expect(graph.bellmanFord('A', 'D')[1]).toEqual(['A', 'B', 'C', 'D']);
    expect(graph.bellmanFord('A', 'E')[1]).toEqual(['A', 'B', 'C', 'E']);
    expect(graph.bellmanFord('F', 'A')[1]).toEqual([]);
    expect(graph.bellmanFord('E', 'A')[1]).toEqual([]);
});

test("graph.getDistance(vs, ve), using bellman-ford algorithm include negative weight.", () => {
    graph.updateEdgeWeight('A', 'B', -6)

    expect(graph._hasNegativeWeight()).toBe(true);

    expect(() => graph.bellmanFord('A', 'A')).toThrow(Error);
    expect(() => graph.bellmanFord('A', 'B')).toThrow(Error);
    expect(() => graph.bellmanFord('C', 'B')).toThrow(Error);
    expect(() => graph.bellmanFord('C', 'D')).toThrow(Error);
});

test("graph.getPath(vs, ve), using bellman-ford algorithm include 'negative cycle'.", () => {
    expect(graph._hasNegativeWeight()).toBe(true);

    expect(() => graph.bellmanFord('A', 'A')[1]).toThrow(Error);
    expect(() => graph.bellmanFord('C', 'C')[1]).toThrow(Error);
    expect(() => graph.bellmanFord('C', 'B')[1]).toThrow(Error);
    expect(() => graph.bellmanFord('A', 'B')[1]).toThrow(Error);
});