(function () {
    "use strict";
    /**
     * @class Graph
     * @classdesc A Graph is a non-linear data structure consisting of nodes and edges.
     * This is implemented with Adjacency List.
     * @desc
     * #### Example -
     * ```js
     * var Graph = require("@structure-js/datastructure").Graph
     * var graph=new Graph()
     * ```
     */

    let Queue = require('./Queue.js');
    let MinHeap = require('./MinHeap.js');

    let isVertexType = function (vertex) {
        return vertex instanceof Graph.Vertex;
    }

    function Graph() {
        this.vertexSize = 0;
        this.edgeSize = 0;
        this.negativeWeightCnt = 0;
        let vertexSet = new Set();

        this.getVertexSet = function () {
            return vertexSet;
        }

        return this;
    }

    Graph.prototype = {
        addVertex: function (vertex) {
            if (!isVertexType(vertex)) {
                throw new Error("VertexTypeError : " + typeof (vertex));
            }

            this.getVertexSet().add(vertex);
            this.vertexSize++;
        },
        removeVertex: function (vertex) {
            if (!isVertexType(vertex)) {
                throw new Error("VertexTypeError : vertex");
            }

            for (let edge of this.getEdgeIterator()) {
                if (edge.vs === vertex || edge.ve === vertex) {
                    this.removeEdge(edge.vs, edge.ve);
                }
            }

            this.getVertexSet().delete(vertex);
            this.vertexSize--;
        },
        hasVertex: function (vertex) {
            // Check type of vertex.
            if (!isVertexType(vertex)) {
                throw new Error("VertexTypeError : start-vertex");
            }
            return this.getVertexSet().has(vertex);
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
            // Check is weight a number.
            if (typeof (weight) != "number") {
                throw new Error("The value of 'weight' is only allowed number");
            }

            if(weight<0){
                this.negativeWeightCnt++;
            }
            vs.addEdge(ve, weight);
            this.edgeSize++;
        },
        getWeight: function (vs, ve){
            // Check this graph has vs or ve.
            if (!this.hasVertex(vs)) {
                throw new Error("Vertex doesn't exist : start-vertex");
            }
            if (!this.hasVertex(ve)) {
                throw new Error("Vertex doesn't exist : end-vertex");
            }

            return vs.getWeightTo(ve);
        },
        removeEdge: function (vs, ve) {
            // Check this graph has vs or ve.
            if (!this.hasVertex(vs)) {
                throw new Error("Vertex doesn't exist : start-vertex");
            }
            if (!this.hasVertex(ve)) {
                throw new Error("Vertex doesn't exist : end-vertex");
            }

            if(vs.getWeightTo(ve) < 0){
                this.negativeWeightCnt--;
            }
            vs.removeEdge(ve);
            this.edgeSize--;
        },
        updateEdgeWeight: function (vs, ve, weight) {
            // Check this graph has vs or ve.
            if (!this.hasVertex(vs)) {
                throw new Error("Vertex doesn't exist : start-vertex");
            }
            if (!this.hasVertex(ve)) {
                throw new Error("Vertex doesn't exist : end-vertex");
            }
            // Check is this edge exist.
            if (!vs.hasEdgeTo(ve)) {
                throw new Error("This Vertex doesn't have this edge");
            }
            // Check is weight a number.
            if (typeof (weight) != "number") {
                throw new Error("The value of 'weight' is only allowed number");
            }

            if(weight < 0 && vs.getWeightTo(ve) >= 0){
                this.negativeWeightCnt++;
            }
            vs.updateEdgeWeightTo(ve, weight);
        },
        getNeighborsOf: function (vertex) {
            return vertex.getNeighbors();
        },
        /**  This function is for get distance between two other vertexes.
         * This basically use Dijkstra algorithm with Queue. - O(V^2)
         * But, If the graph has at least one edge of negative weight, use Bellman-Ford's algorithm. - O(VE)
         * TODO: Change Queue to Minimum Heap in Dijkstra algorithm. - O(ElogV)
         * 
         * @param {Graph.Vertex} vs 
         * @param {Graph.Vertex} ve 
         */
        getDistance: function (vs, ve) {
            if(this.hasNegativeWeight()){
                return this.bellmanFord(vs,ve)[0];
            }else{
                return this.dijkstra(vs, ve)[0];
            }
        }, getPath: function (vs, ve) {
            if(this.hasNegativeWeight()){
                return this.bellmanFord(vs,ve)[1];
            }else{
                return this.dijkstra(vs, ve)[1];
            }
        },
        getVertexIterator: function () {
            return this.getVertexSet().keys();
        },
        getEdgeIterator: function* () {
            for (let vs of this.getVertexSet().keys()) {
                for (let ve of vs.getNeighborsIterator()) {
                    yield new Graph.Edge(vs, ve, vs.getWeightTo(ve));
                }
            }
        },
        /**
         * [deprecated]
         * This is dijkstra algorithm for find shortest-distance 
         * and shortest-path 'vs' to 've'.
         * This is implemented using queue.
         * 
         * Time complexity : O(V^2)
         * 
         * @param {Graph.Vertex} vs 
         * @param {Graph.Vertex} ve 
         */
        dijkstraUsingQueue: function (vs, ve) {
            let distanceMap = new Map();
            let pathMap = new Map();
            let tempQueue = new Queue();
            tempQueue.push(vs);

            for (let vertex of this.getVertexIterator()) {
                distanceMap.set(vertex, Number.MAX_SAFE_INTEGER);
                pathMap.set(vertex, [vs]);
            }
            distanceMap.set(vs, 0);

            while (!tempQueue.isEmpty()) {
                let currentVertex = tempQueue.pop();
                let currentDistance = distanceMap.get(currentVertex);
                let currentPath = pathMap.get(currentVertex);
                // Loop for neighbors of currentVertex
                for (let neighbor of currentVertex.getNeighborsIterator()) {
                    let weight = currentVertex.getWeightTo(neighbor);

                    // Push to tempQueue if this neighbor wasn't visited
                    if (distanceMap.get(neighbor) === Number.MAX_SAFE_INTEGER) {
                        tempQueue.push(neighbor);
                    }

                    let newDistance = currentDistance + weight;
                    // If newDistance is less than existed value, update distance and path.
                    if (distanceMap.get(neighbor) > newDistance) {
                        // update distance
                        distanceMap.set(neighbor, newDistance);

                        // update path
                        let tempCurrentPath = [...currentPath];
                        tempCurrentPath.push(neighbor);
                        pathMap.set(neighbor, tempCurrentPath);
                    }
                }
            }

            let resultDistance = distanceMap.get(ve);
            let resultPath = (resultDistance === Number.MAX_SAFE_INTEGER ? [] : pathMap.get(ve));
            return [resultDistance, resultPath];
        },
        /**
         * This is dijkstra algorithm for find shortest-distance 
         * and shortest-path 'vs' to 've'.
         * This is implemented using min-heap.
         * 
         * Time complexity : O(ElogV)
         * 
         * @param {Graph.Vertex} vs 
         * @param {Graph.Vertex} ve 
         */
        dijkstra: function (vs, ve) {
            let distanceMap = new Map();
            let pathMap = new Map();
            let tempHeap = new MinHeap();

            let VertexDistance = function(vertex, distance){
                this.vertex = vertex;
                this.distance = distance;
            }

            tempHeap._compare = function(e1, e2){
                return e1.distance < e2.distance;
            }


            tempHeap.push(new VertexDistance(vs, 0));
            distanceMap.set(vs, 0);

            for (let vertex of this.getVertexIterator()) {
                if(vertex !== vs){
                    tempHeap.push(new VertexDistance(vertex, Number.MAX_SAFE_INTEGER));
                    distanceMap.set(vertex, Number.MAX_SAFE_INTEGER);
                }
                pathMap.set(vertex, [vs]);
            }

            while (!tempHeap.isEmpty()) {
                let currentVertex = tempHeap.pop().vertex;
                let currentDistance = distanceMap.get(currentVertex);
                let currentPath = pathMap.get(currentVertex);
                // Loop for neighbors of currentVertex
                for (let neighbor of currentVertex.getNeighborsIterator()) {
                    let weight = currentVertex.getWeightTo(neighbor);

                    let newDistance = currentDistance + weight;
                    // If newDistance is less than existed value, update distance and path.
                    if (distanceMap.get(neighbor) > newDistance) {
                        // update distance
                        distanceMap.set(neighbor, newDistance);
                        tempHeap.push(new VertexDistance(neighbor, newDistance));
                        // update path
                        let tempCurrentPath = [...currentPath];
                        tempCurrentPath.push(neighbor);
                        pathMap.set(neighbor, tempCurrentPath);
                    }
                }
            }

            let resultDistance = distanceMap.get(ve);
            let resultPath = (resultDistance === Number.MAX_SAFE_INTEGER ? [] : pathMap.get(ve));
            return [resultDistance, resultPath];
        },
        /**
         * This is bellman-ford's algorithm for find shortest-distance 
         * and shortest-path 'vs' to 've'.
         * 
         * Time complexity : O(V^2)
         * 
         * @param {Graph.Vertex} vs 
         * @param {Graph.Vertex} ve 
         */
        bellmanFord: function (vs, ve) {
            let distanceMap = new Map();
            let pathMap = new Map();
            let tempQueue = new Queue();
            tempQueue.push(vs);

            for (let vertex of this.getVertexIterator()) {
                distanceMap.set(vertex, Number.MAX_SAFE_INTEGER);
                pathMap.set(vertex, [vs]);
            }
            distanceMap.set(vs, 0);

            let isUpdated = true;
            // loop until vertexSize
            for (let i = 0; i < this.vertexSize; i++) {
                isUpdated = false;
                for (let edge of this.getEdgeIterator()) {

                    let currentVsDistance = distanceMap.get(edge.vs);
                    let currentPath = pathMap.get(edge.vs);
                    let newDistance = currentVsDistance + edge.weight;
                    // If newDistance is less than existed value, update distance and path.
                    if (currentVsDistance < Number.MAX_SAFE_INTEGER
                        && newDistance < distanceMap.get(edge.ve)) {
                        // update distance
                        distanceMap.set(edge.ve, newDistance);
                         
                        // update path
                        let tempCurrentPath = [...currentPath];
                        tempCurrentPath.push(edge.ve);
                        pathMap.set(edge.ve, tempCurrentPath);

                        isUpdated = true;
                    }
                }
            }

            if (isUpdated) {
                throw new Error("NegativeCycleError : This graph has at least one negative-cycle.");
            } else {
                let resultDistance = distanceMap.get(ve);
                let resultPath = (resultDistance === Number.MAX_SAFE_INTEGER ? [] : pathMap.get(ve));
                return [resultDistance, resultPath];
            }
        },
        hasNegativeWeight: function(){
            return this.negativeWeightCnt > 0;
        }
    }

    Graph.Vertex = function (name) {
        this.name = name;
        this.edgeSize = 0;
        // Use Map
        var edgeMap = new Map();

        this.getEdgeMap = function () {
            return edgeMap;
        }
    }

    Graph.Vertex.prototype = {
        addEdge: function (ve, weight) {
            // Check is this edge already exist.
            if (this.hasEdgeTo(ve)) {
                throw new Error("Already has this edge");
            }
            // Check is weight a number.
            if (typeof (weight) != "number") {
                throw new Error("The value of 'weight' is only allowed number");
            }
            this.getEdgeMap().set(ve, weight);
            this.edgeSize++;
        },
        removeEdge: function (ve) {
            // Check is this edge exist.
            if (!this.hasEdgeTo(ve)) {
                throw new Error("This Vertex doesn't have this edge");
            }
            this.getEdgeMap().delete(ve);
            this.edgeSize--;
        },
        updateEdgeWeightTo: function (ve, weight) {
            // Check is this edge exist.
            if (!this.hasEdgeTo(ve)) {
                throw new Error("This Vertex doesn't have this edge");
            }
            // Check is weight a number.
            if (typeof (weight) != "number") {
                throw new Error("The value of 'weight' is only allowed number");
            }
            this.getEdgeMap().set(ve, weight);
        },
        hasEdgeTo: function (ve) {
            if (!isVertexType(ve)) {
                throw new Error("VertexTypeError : ");
            }
            return this.getEdgeMap().has(ve);
        },
        getWeightTo: function (ve) {
            // Check is this edge exist.
            if (!this.hasEdgeTo(ve)) {
                throw new Error("This Vertex doesn't have this edge");
            }
            return this.getEdgeMap().get(ve);
        },
        getNeighborsIterator: function () {
            return this.getEdgeMap().keys();
        }
    }

    Graph.Edge = function (vs, ve, weight) {
        if (typeof (weight) !== "number") {
            throw new Error("The value of 'weight' is only allowed number");
        }
        // Check is weight a number.
        if (typeof (weight) != "number") {
            throw new Error("The value of 'weight' is only allowed number");
        }

        this.vs = vs;
        this.ve = ve;
        this.weight = weight;
    }

    module.exports = Graph;
})();
