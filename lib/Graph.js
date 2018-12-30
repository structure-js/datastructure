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

    /**
     *
     * @returns
     */
    function Graph() {
        this.vertexSize = 0;
        this.edgeSize = 0;
        // for select path algorithm between 'dijkstra - O(ELogV)' and 'bellman-ford - O(VE)'.
        this._negativeWeightCnt = 0;
        // using map for vertex's key-value.
        let _vertexMap = new Map();

        this._getVertexMap = function () {
            return _vertexMap;
        }

        return this;
    }

    Graph.prototype = {
        addVertex: function (key) {
            let vertex = new Graph.Vertex(key);

            // Check is this vertex already exist.
            if (this.hasVertex(key)) {
                throw new Error("Already has this vertex : " + key);
            }

            this._getVertexMap().set(key, vertex);
            this.vertexSize++;

            return vertex;
        },
        removeVertex: function (key) {
            let vertex = this.getVertex(key);

            if (!isVertexType(vertex)) {
                throw new Error("VertexTypeError : vertex");
            }

            for (let edge of this.getEdgeIterator()) {
                if (edge.vs.key === key || edge.ve.key === key) {
                    this.removeEdge(edge.vs.key, edge.ve.key);
                }
            }

            this._getVertexMap().delete(key);
            this.vertexSize--;

            return vertex;
        },
        /**
         * 
         * @param {*} key 
         */
        hasVertex: function (key) {
            return this._getVertexMap().has(key);
        },

        getVertex: function (key) {
            let result = this._getVertexMap().get(key);
            if (result === undefined) {
                throw new Error("NotExistError : " + key);
            } else {
                return result;
            }
        },
        /**
         * 
         * @param {*} key1 
         * @param {*} key2 
         * @param {*} weight 
         */
        addEdge: function (key1, key2, weight) {
            let vs = this.getVertex(key1);
            let ve = this.getVertex(key2);

            // Check this graph has vs or ve.
            if (!this.hasVertex(key1)) {
                throw new Error("Vertex doesn't exist : start-vertex " + key1);
            }
            if (!this.hasVertex(key2)) {
                throw new Error("Vertex doesn't exist : end-vertex " + key2);
            }
            // Check is weight a number.
            if (typeof (weight) != "number") {
                throw new Error("The 'weight' is only allowed number");
            }

            if (weight < 0) {
                this._negativeWeightCnt++;
            }
            vs._addEdge(ve, weight);
            this.edgeSize++;
        },
        removeEdge: function (key1, key2) {
            let vs = this.getVertex(key1);
            let ve = this.getVertex(key2);

            // Check this graph has vs or ve.
            if (!this.hasVertex(key1)) {
                throw new Error("Vertex doesn't exist : start-vertex");
            }
            if (!this.hasVertex(key2)) {
                throw new Error("Vertex doesn't exist : end-vertex");
            }

            if (vs._getWeightTo(ve) < 0) {
                this._negativeWeightCnt--;
            }

            vs._removeEdge(ve);
            this.edgeSize--;
        },
        /**
         * 
         * @param {*} key1 
         * @param {*} key2 
         */
        hasEdge: function (key1, key2) {
            return this.getVertex(key1)._hasEdgeTo(this.getVertex(key2));
        },
        updateEdgeWeight: function (key1, key2, newWeight) {
            let vs = this.getVertex(key1);
            let ve = this.getVertex(key2);

            // Check this graph has vs or ve.
            if (!this.hasVertex(key1)) {
                throw new Error("Vertex doesn't exist : start-vertex");
            }
            if (!this.hasVertex(key2)) {
                throw new Error("Vertex doesn't exist : end-vertex");
            }
            // Check is this edge exist.
            if (!vs._hasEdgeTo(ve)) {
                throw new Error("This Vertex doesn't have this edge");
            }
            // Check is weight a number.
            if (typeof (newWeight) != "number") {
                throw new Error("The 'weight' is only allowed number");
            }

            if (newWeight < 0 && vs._getWeightTo(ve) >= 0) {
                this._negativeWeightCnt++;
            }
            vs._updateEdgeWeightTo(ve, newWeight);
        },
        /**
         * 
         * @param {*} key1 
         * @param {*} key2 
         */
        getWeight: function (key1, key2) {
            let vs = this.getVertex(key1);
            let ve = this.getVertex(key2);

            // Check this graph has vs or ve.
            if (!this.hasVertex(key1)) {
                throw new Error("Vertex doesn't exist : start-vertex");
            }
            if (!this.hasVertex(key2)) {
                throw new Error("Vertex doesn't exist : end-vertex");
            }

            return vs._getWeightTo(ve);
        },
        getNeighborsOf: function (key) {
            return this.getVertex(key).getNeighbors();
        },
        /**  This function is for get distance between two other vertexes.
         * This basically use Dijkstra algorithm with Queue. - O(ElogV)
         * But, If the graph has at least one edge of negative weight, use Bellman-Ford's algorithm. - O(VE)
         * 
         * @param {*} key1 
         * @param {*} key2 
         */
        getDistance: function (key1, key2) {
            if (this._hasNegativeWeight()) {
                return this.bellmanFord(key1, key2)[0];
            } else {
                return this.dijkstra(key1, key2)[0];
            }
        },
        /**
         * Returns the path key1 to key2 in the `Array`. 
         *
         * @param {*} key1
         * @param {*} key2
         * @returns {Array} 
         */
        getPath: function (key1, key2) {
            if (this._hasNegativeWeight()) {
                return this.bellmanFord(key1, key2)[1];
            } else {
                return this.dijkstra(key1, key2)[1];
            }
        },
        getVertexIterator: function () {
            return this._getVertexMap().values();
        },
        getEdgeIterator: function* () {
            for (let vs of this.getVertexIterator()) {
                for (let ve of vs.getNeighborsIterator()) {
                    yield new Graph.Edge(vs, ve, vs._getWeightTo(ve));
                }
            }
        },
        /**
         * [deprecated]
         * This is dijkstra algorithm for find shortest-distance 
         * and shortest-path 'key1' to 'key2'.
         * This is implemented using queue.
         * 
         * Time complexity : O(V^2)
         * 
         * @param {Graph.Vertex} key1 
         * @param {Graph.Vertex} key2 
         */
        dijkstraUsingQueue: function (key1, key2) {
            let vs = this.getVertex(key1);
            let ve = this.getVertex(key2);

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
                    let weight = currentVertex._getWeightTo(neighbor);

                    // Push to tempQueue if this neighbor wasn't visited
                    if (distanceMap.get(neighbor) === Number.MAX_SAFE_INTEGER) {
                        tempQueue.push(neighbor);
                    }

                    let newDistance = currentDistance + weight;
                    // If newDistance is less than old distance, update distance and path.
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
         * and shortest-path 'key1' to 'key2'.
         * This is implemented using min-heap.
         * 
         * Time complexity : O(ElogV)
         * 
         * @param {*} key1 
         * @param {*} key2 
         */
        dijkstra: function (key1, key2) {
            let vs = this.getVertex(key1);

            let distanceMap = new Map();
            let pathMap = new Map();
            let tempHeap = new MinHeap();

            let VertexDistance = function (vertex, distance) {
                this.vertex = vertex;
                this.distance = distance;
            }

            tempHeap._compare = function (e1, e2) {
                return e1.distance < e2.distance;
            }

            tempHeap.push(new VertexDistance(vs, 0));
            distanceMap.set(key1, 0);

            for (let vertex of this.getVertexIterator()) {
                if (vertex !== vs) {
                    tempHeap.push(new VertexDistance(vertex, Number.MAX_SAFE_INTEGER));
                    distanceMap.set(vertex.key, Number.MAX_SAFE_INTEGER);
                }
                pathMap.set(vertex.key, [key1]);
            }

            while (!tempHeap.isEmpty()) {
                let currentVertex = tempHeap.pop().vertex;
                let currentDistance = distanceMap.get(currentVertex.key);
                let currentPath = pathMap.get(currentVertex.key);
                // Loop for neighbors of currentVertex
                for (let neighbor of currentVertex.getNeighborsIterator()) {
                    let weight = currentVertex._getWeightTo(neighbor);

                    let newDistance = currentDistance + weight;
                    // If newDistance is less than old distance, update distance and path.
                    if (distanceMap.get(neighbor.key) > newDistance) {
                        // update distance
                        distanceMap.set(neighbor.key, newDistance);
                        tempHeap.push(new VertexDistance(neighbor, newDistance));
                        // update path
                        let tempCurrentPath = [...currentPath];
                        tempCurrentPath.push(neighbor.key);
                        pathMap.set(neighbor.key, tempCurrentPath);
                    }
                }
            }

            let resultDistance = distanceMap.get(key2);
            let resultPath = (resultDistance === Number.MAX_SAFE_INTEGER ? [] : pathMap.get(key2));
            return [resultDistance, resultPath];
        },
        /**
         * This is bellman-ford's algorithm for find shortest-distance 
         * and shortest-path 'key1' to 'key2'.
         * 
         * Time complexity : O(VE) 
         * 
         * @param {*} key1 
         * @param {*} key2 

         * @returns {Array}
         */
        bellmanFord: function (key1, key2) {
            let distanceMap = new Map();
            let pathMap = new Map();

            for (let vertex of this.getVertexIterator()) {
                distanceMap.set(vertex.key, Number.MAX_SAFE_INTEGER);
                pathMap.set(vertex.key, [key1]);
            }
            distanceMap.set(key1, 0);

            let isUpdated = true;
            // loop until vertexSize
            for (let i = 0; i < this.vertexSize; i++) {
                isUpdated = false;
                for (let edge of this.getEdgeIterator()) {

                    let currentVsDistance = distanceMap.get(edge.vs.key);
                    let currentPath = pathMap.get(edge.vs.key);
                    let newDistance = currentVsDistance + edge.weight;
                    // If newDistance is less than old distance, update distance and path.
                    if (currentVsDistance < Number.MAX_SAFE_INTEGER
                        && newDistance < distanceMap.get(edge.ve.key)) {
                        // update distance
                        distanceMap.set(edge.ve.key, newDistance);

                        // update path
                        let tempCurrentPath = [...currentPath];
                        tempCurrentPath.push(edge.ve.key);
                        pathMap.set(edge.ve.key, tempCurrentPath);

                        isUpdated = true;
                    }
                }
            }

            if (isUpdated) {
                throw new Error("NegativeCycleError : This graph has at least one negative-cycle.");
            } else {
                let resultDistance = distanceMap.get(key2);
                let resultPath = (resultDistance === Number.MAX_SAFE_INTEGER ? [] : pathMap.get(key2));
                return [resultDistance, resultPath];
            }
        },
        /**
         * Return whether this tree has any negative-weighted edge.
         *
         * @returns {boolean}
         */
        _hasNegativeWeight: function () {
            return this._negativeWeightCnt > 0;
        }
    }

    Graph.Vertex = function (key) {
        this.key = key;
        this.edgeSize = 0;
        // Use Map
        var edgeMap = new Map();

        this._getEdgeMap = function () {
            return edgeMap;
        }
    }

    Graph.Vertex.prototype = {
        _addEdge: function (ve, weight) {
            // Check is this edge already exist.
            if (this._hasEdgeTo(ve)) {
                throw new Error("AlreadyExistEdgeError : " + this.key + " -> " + ve.key );
            }
            // Check is weight a number.
            if (typeof (weight) != "number") {
                throw new Error("The 'weight' is only allowed number");
            }
            this._getEdgeMap().set(ve, weight);
            this.edgeSize++;
        },
        _removeEdge: function (ve) {
            // Check is this edge exist.
            if (!this._hasEdgeTo(ve)) {
                throw new Error("This Vertex doesn't have this edge");
            }
            this._getEdgeMap().delete(ve);
            this.edgeSize--;
        },
        _updateEdgeWeightTo: function (ve, newWeight) {
            // Check is this edge exist.
            if (!this._hasEdgeTo(ve)) {
                throw new Error("This Vertex doesn't have this edge");
            }
            // Check is weight a number.
            if (typeof (newWeight) != "number") {
                throw new Error("The 'weight' is only allowed number");
            }
            this._getEdgeMap().set(ve, newWeight);
        },
        _hasEdgeTo: function (ve) {
            if (!isVertexType(ve)) {
                throw new Error("VertexTypeError : ");
            }
            return this._getEdgeMap().has(ve);
        },
        _getWeightTo: function (ve) {
            // Check is this edge exist.
            if (!this._hasEdgeTo(ve)) {
                throw new Error("This Vertex doesn't have this edge");
            }
            return this._getEdgeMap().get(ve);
        },
        getNeighborsIterator: function () {
            return this._getEdgeMap().keys();
        }
    }

    Graph.Edge = function (vs, ve, weight) {
        // Check whether type of weight is a number.
        if (typeof (weight) != "number") {
            throw new Error("The 'weight' is only allowed number");
        }

        this.vs = vs;
        this.ve = ve;
        this.weight = weight;
    }
    
    module.exports = Graph;
})();
