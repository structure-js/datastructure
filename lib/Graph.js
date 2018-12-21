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
     * var Graph = require("@structure-js/datastructure").Graph
     * var graph=new Graph()
     * ```
     */

    let isVertexType = function(vertex) {
        return vertex instanceof Graph.Vertex;
    }

    function Graph() {
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

    Graph.prototype = {
        addVertex: function (vertex) {
            if (!isVertexType(vertex)) {
                throw new Error("VertexTypeError : " + typeof (vertex));
            }

            this.vertexSize++;
            this.vertexSet.add(vertex);
        },
        removeVertex: function (vertex) {
            if (!isVertexType(vertex)) {
                throw new Error("VertexTypeError : vertex");
            }

            this.vertexSize--;
            this.vertexSet.delete(vertex);
        },
        hasVertex: function (vertex) {
            return this.vertexSet.has(vertex);
        },
        hasEdge: function (vs, ve) {
            return vs.hasEdgeTo(ve);
        },
        addEdge: function (vs, ve, weight) {
            // Check type of vs and ve.
            if (!isVertexType(vs)) {
                throw new Error("VertexTypeError : start-vertex");
            }
            if (!isVertexType(ve)) {
                throw new Error("VertexTypeError : end-vertex");
            }
            // Check this graph has vs or ve.
            if (!this.hasVertex(vs)) {
                throw new Error("Vertex doesn't exist : start-vertex");
            }
            if (!this.hasVertex(ve)) {
                throw new Error("Vertex doesn't exist : end-vertex");
            }
            // Check this edge is already exist.
            // if(this.hasEdge(vs,ve)){
            // throw new Error("Already has this edge");
            // }

            vs.addEdge(ve, weight);
            this.edgeSize++;
        },
        removeEdge: function (vs, ve) {
            vs.removeEdge(ve);
            this.edgeSize--;
        },
        getNeighborsOf: function (vertex) {
            return vertex.getNeighbors();
        },
        getDistanceBetween: function (vs, ve) {
            return Number.MAX_SAFE_INTEGER;
        },
        getPathBetween: function (vs, ve) {
            return [];
        },
        getVertexIterator: function () {
            return this.vertexSet.keys();
        }
    }

    Graph.Vertex = function () {
        this.edgeSize = 0;
        // Use Map
        this.edgeMap = new Map();
    }

    Graph.Vertex.prototype = {
        addEdge: function (ve,weight) {
            // Check is this edge already exist.
            if (this.hasEdgeTo(ve)) {
                throw new Error("Already has this edge");
            }
            // Check is weight a number.
            if (typeof (weight) != "number") {
                throw new Error("The value of 'weight' is only allowed number");
            }
            this.edgeMap.set(ve,weight);
            this.edgeSize++;
        },
        removeEdge: function (ve) {
            // Check is this edge exist.
            if (!this.hasEdgeTo(ve)) {
                throw new Error("This Vertex doesn't have this edge");
            }
            this.edgeMap.delete(ve);
            this.edgeSize--;
        },
        hasEdgeTo: function (ve) {
            if(!isVertexType(ve)){
                throw new Error("VertexTypeError : ");
            }
            return this.edgeMap.has(ve);
        },
        getWeightTo: function(ve){
            // Check is this edge exist.
            if (!this.hasEdgeTo(ve)) {
                throw new Error("This Vertex doesn't have this edge");
            }
            return this.edgeMap.get(ve);
        },
        getNeighborsIterator: function () {
            return this.edgeMap.keys();
        }
    }

    Graph.Edge = function (vs, ve, weight) {
        if (typeof (weight) !== "number") {
            throw new Error("The value of 'weight' is only allowed number");
        }

        this.startVertex = vs;
        this.endVertex = ve;
        this.weight = weight;
    }

    module.exports = Graph;
})();
