(function () {
    "use strict";
    /**
     * @class Graph
     * @classdesc A Graph is a non-linear data structure consisting of nodes and edges.
     * This is implemented with Adjacency List.
     * @desc
     * #### Example -
     * ```js
     * var UndirectedGraph = require("@structure-js/datastructure").UndirectedGraph
     * var UndirectedGraph=new UndirectedGraph()
     * ```
     */

    let Graph = require('./Graph.js');

    let isVertexType = function(vertex) {
        return vertex instanceof Graph.Vertex;
    }

    function UndirectedGraph() {
        this.vertexSize = 0;
        this.edgeSize = 0;
        this.vertexSet = new Set();

        return this;
    }

    UndirectedGraph.prototype = new Graph();

    UndirectedGraph.prototype.addEdge = function(v1, v2, weight){
        v1.addEdge(v2, weight);
        v2.addEdge(v1, weight);
        this.edgeSize++;
    }

    UndirectedGraph.prototype.removeEdge = function(v1, v2){
        v1.removeEdge(v2);
        v2.removeEdge(v1);
        this.edgeSize--;
    }

    UndirectedGraph.Vertex = Graph.Vertex;

    module.exports = UndirectedGraph;
})();
