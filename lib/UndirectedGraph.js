(function () {
    "use strict";
    /**
     * @class Graph
     * @classdesc A Graph is a non-linear data structure consisting of nodes and edges.
     * This is implemented with Adjacency List.
     * (key --> [values])
     * [Reference: MultiMap in Google Guava libraries](https://code.google.com/p/guava-libraries/wiki/NewCollectionTypesExplained#Multimap)
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

        // 자기 자신의 객체 생성을 막기 위한 추가 소스 
        if (this.constructor === Graph) {
            throw new Error('정의된 추상클래스는 자기 자신의 객체를 가질 수 없습니다.');
        } else {
            return this;
        }
    }

    UndirectedGraph.prototype = new Graph();

    UndirectedGraph.prototype.addEdge = function(v1, v2, weight){
        this.edgeSize++;
        v1.addEdge(v2, weight);
        v2.addEdge(v1, weight);
    }

    UndirectedGraph.prototype.removeEdge = function(v1, v2){
        this.edgeSize--;
        v1.removeEdge(v2);
        v2.removeEdge(v1);
    }

    UndirectedGraph.Vertex = Graph.Vertex;

    module.exports = UndirectedGraph;
})();
