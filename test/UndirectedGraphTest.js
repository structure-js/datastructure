let UndirectedGraph = require('../lib/UndirectedGraph.js');
let Vertex = UndirectedGraph.Vertex;

let graph = new UndirectedGraph();

console.log(UndirectedGraph.Vertex);

let v1 = new Vertex();
let v2 = new Vertex();
let v3 = new Vertex();
let v4 = new Vertex();
let v5 = new Vertex();
let v6 = new Vertex();

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
graph.addEdge(v3, v4, 2);
graph.addEdge(v5, v6, 1);
graph.addEdge(v6, v1, 2);


if(graph.vertexSize !== 6){
    throw Error("vertexSize : " + graph.vertexSize);
}
if(graph.edgeSize !== 6){
    throw Error("edgeSize : " + graph.edgeSize);
}

console.log(graph.getVertexIterator());
console.log();

for(vertex of graph.getVertexIterator()){
    for(neighbor of vertex.getNeighborsIterator()){
        console.log(vertex.getWeightTo(neighbor));
    }
}
console.log();