let Graph = exports.Graph;
let Vertex = exports.Graph.Vertex;

let graph = new Graph();

let v1 = new Graph.Vertex();
let v2 = new Graph.Vertex();
let v3 = new Graph.Vertex();
let v4 = new Graph.Vertex();
let v5 = new Graph.Vertex();
let v6 = new Graph.Vertex();

graph.addVertex(v1);
graph.addVertex(v2);
graph.addVertex(v3);
graph.addVertex(v4);
graph.addVertex(v5);
graph.addVertex(v6);

// graph.addEdge(v1,v1,1);
graph.addEdge(v1, v2, 1);
graph.addEdge(v1, v3, 2);
graph.addEdge(v2, v3, 3);
graph.addEdge(v3, v1, 2);
graph.addEdge(v3, v4, 2);
graph.addEdge(v5, v6, 1);
graph.addEdge(v6, v1, 2);

console.log(v1.edgeMap);
console.log();

console.log(v1.getNeighborsIterator());
console.log();

for(vertex of graph.getVertexIterator()){
    for(neighbor of vertex.getNeighborsIterator()){
        console.log(vertex.getWeightTo(neighbor));
    }
}
console.log();