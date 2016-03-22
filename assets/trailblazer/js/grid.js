//  "use strict";
//
//    /**
//     * grid.js
//     * Grid Constructor function
//     * Its a bit of a miss match of vanilla JS and jQuery...sorry,
//     * wanted to do everything in JS but for speed i did jQuery
//     *
//     */
//    function Grid(task) {
//
//        //Modal.call(this);
//
//        console.log(this);
//        console.log(Zoom);
//
//        this.task = task;
//        this.activateCell();
//
//        /**
//         *
//         * Initializing the elevateZoom library
//         * www.elevateweb.co.uk/image-zoom
//         *
//         */
//        $(".img-polaroid").elevateZoom({
//            zoomWindowPosition: "grid-info",
//            lensFadeIn: 500,
//            lensFadeOut: 500,
//            cursor: "pointer",
//            // Changing these two numbers changes the zoomWindowWidth
//            // Also the side of the .zoomLens (box over image)
//            zoomWindowWidth: 455,
//            zoomWindowHeight: 455,
//        });
//    }
//
//    //Grid.prototype = Object.create(Modal.prototype);
//
//    /**
//     *
//     * For creating a grid overlayed over the image
//     *
//     */
//    Grid.prototype.createGrid = function () {
//
//        /*
//         * Using raphael so we can use methods like isPointInside
//         * and calculate how close the click on grid are.
//         * Also nice and cross browser :D
//         *
//         * Maybe d3 might have been better!?
//         */
//        var rows = 6,
//            columns = 6,
//            canvas = Raphael("canvas", $(".img-polaroid").width(), $(".img-polaroid").height()),
//            gridHeight = $(".img-polaroid").height() / columns,
//            gridWidth = $(".img-polaroid").width() / rows;
//
//        // creates 36 grid squares in raphael
//        var x, y;
//        for (y = 0; y < rows; y += 1) {
//            for (x = 0; x < columns; x += 1) {
//
//                var offsetH = y,
//                    offsetW = x,
//                    moveDown = (y + gridHeight - offsetH) * y,
//                    moveRight = (x + gridWidth - offsetW) * x,
//                    gridSquare = canvas.rect(moveRight, moveDown, gridWidth, gridHeight).attr({
//                        "stroke": "#fff"
//                    });
//
//                gridSquare.node.setAttribute("class", "grid-item");
//
//                gridSquare.column = x;
//                gridSquare.row = y;
//                gridSquare.has_cancer = null;
//
//                // Save all grid squares in array within main task object
//                // We can then grab this when saving the info at the end
//                this.task.answer.squares.push(gridSquare);
//
//            }
//        }
//    };
//
//
//    /**
//     *
//     * Listen for lick on .zoomLens and find the closed square
//     *
//     */
//    Grid.prototype.activateCell = function () {
//
//        var clicks = 0;
//        var timer = null;
//        var _this = this;
//
//        $("body").on("click touchstart", ".zoomLens", function (evt) {
//
//            evt.preventDefault();
//            clicks++; //count clicks
//
//            // Find the cloest grid square to click on the zoomLens
//
//            var activeSquare = _this.findClosestSquare();
//            var activeSquareNode = activeSquare.node;
//
//            // Not able to use jQuery .click or .dblclick for some reason i can't remember
//            // If we can then should use jQuery...might be quicker and easier
//
//            if (clicks === 1) {
//                timer = setTimeout(function () {
//                    // Adds and removes classes to grid squares making them red or green
//                    if (activeSquareNode.className.animVal != "grid-item grid-item-success") {
//                        activeSquareNode.setAttribute("class", "grid-item grid-item-success");
//                        activeSquare.has_cancer = true;
//                    } else {
//                        activeSquareNode.setAttribute("class", "grid-item");
//                        activeSquare.has_cancer = null;
//                    } //after action performed, reset counter
//                    clicks = 0;
//                }, 250);
//            } else {
//                clearTimeout(timer); //prevent single-click action
//                activeSquareNode.setAttribute("class", "grid-item grid-item-error");
//                activeSquare.has_cancer = false;
//                clicks = 0;
//            }
//        });
//    };
//
//    /**
//     *
//     * Loop through the grid items
//     * and find the closest matching grid
//     * that have the clicked coordinates
//     *
//     */
//    Grid.prototype.findClosestSquare = function () {
//
//        var _this = this,
//            activeSquare,
//            target = $(".zoomLens"),
//            target_pos = {
//                x: parseInt(target.css("left")),
//                y: parseInt(target.css("top"))
//            };
//
//        // Center the zoom cursor to middle of square
//        target_pos.x = target_pos.x + 34.85;
//        target_pos.y = target_pos.y + 34.85;
//
//        // Find the closet grid item
//        $.each(_this.task.answer.squares, function (key, value) {
//            if (value.isPointInside(target_pos.x, target_pos.y)) {
//                activeSquare = value;
//            }
//        });
//        return activeSquare;
//    };
//
//
//    Grid.prototype.selectAllSquares = function () {
//        for (var i = 0; i < this.task.answer.squares.length; i++) {
//            var gridSquare = this.task.answer.squares[i],
//                gridSquareNode = this.task.answer.squares[i].node;
//            gridSquare.has_cancer = true;
//            gridSquareNode.setAttribute("class", "grid-item grid-item-success");
//        }
//    }
//    Grid.prototype.deselectAllSquares = function () {
//        for (var i = 0; i < this.task.answer.squares.length; i++) {
//            var gridSquare = this.task.answer.squares[i],
//                gridSquareNode = this.task.answer.squares[i].node;
//            gridSquare.has_cancer = null;
//            gridSquareNode.setAttribute("class", "grid-item");
//        }
//    }
//
//
//    /*
//     *
//     * End of Grid class
//     *
//     * */
//
//    /************************************************************************************/
//
//
//
