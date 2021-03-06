import Field from './Field.js';
import constants from "../lib/constants";
import View from  "./View.js";

function Controller(fieldSize) {
    this.field = new Field(fieldSize);
    this.moveVector = {
        x: 0,
        y: 0,
        compareFunc: undefined
    };
    this.view = View.getInstance();
}

Controller.prototype.makePositionValid = function (position) {
    var result = {
        vertical: 0,
        horizontal: 0
    };

    if(position.vertical > (this.field.size - 1) * constants.DEFAULT_GAME_ITEM_SIZE){
        result.vertical = (this.field.size - 1) * constants.DEFAULT_GAME_ITEM_SIZE;
    } else {
        if(position.vertical < 0){
            result.vertical = 0;
        } else {
            result.vertical = position.vertical;
        }
    }

    if(position.horizontal > (this.field.size - 1) * constants.DEFAULT_GAME_ITEM_SIZE){
        result.horizontal = (this.field.size - 1) * constants.DEFAULT_GAME_ITEM_SIZE
    } else {
        if(position.horizontal < 0){
            result.horizontal = 0;
        } else {
            result.horizontal = position.horizontal;
        }
    }


    return result;
};

Controller.prototype.isMoveAvalible = function (position) {
    var self = this;
    var validatedPosition = self.makePositionValid(position);
    return self.field.isCellFree(position) && position.vertical == validatedPosition.vertical && position.horizontal == validatedPosition.horizontal;
};

//смещает все элементы в направлении moveVector
Controller.prototype.moveElements = function () {
    var self = this;

    var vertical = self.moveVector.y * constants.DEFAULT_GAME_ITEM_SIZE;
    var horizontal = self.moveVector.x * constants.DEFAULT_GAME_ITEM_SIZE;

    var moves = 0;


    self.field.elements.sort(self.moveVector.compareFunc);

    self.field.elements.forEach(function (element, number, array) {
        var position = {//текущая позиция сдвигаемого элемента
            vertical: element.position.vertical,
            horizontal: element.position.horizontal
        };

        var checkedPosition = {//позиция на которую предполагается сдвиг
            vertical: element.position.vertical + vertical,
            horizontal: element.position.horizontal + horizontal
        };

        while (self.isMoveAvalible(checkedPosition)) {
            moves += 1;
            position.horizontal = checkedPosition.horizontal;
            position.vertical = checkedPosition.vertical;
            checkedPosition.vertical += vertical;
            checkedPosition.horizontal += horizontal;
        }

        var checkedElement = self.field.getElementByPosition(self.makePositionValid(checkedPosition));

        if (!!checkedElement && element.value == checkedElement.value && element.id != checkedElement.id) {
            checkedElement.setValue(element.value * 2);

            var vertShift = self.moveVector.y == 0 ? 0 : constants.DEFAULT_GAME_ITEM_SIZE / 2;
            var horizShift = self.moveVector.x == 0 ? 0 : constants.DEFAULT_GAME_ITEM_SIZE / 2;

            var mergedPosition = {
                vertical: self.makePositionValid(checkedPosition).vertical - vertShift,
                horizontal: self.makePositionValid(checkedPosition).horizontal - horizShift
            };

            element.move(self.makePositionValid(mergedPosition));
            self.view.moveGameItem(element);
            array[number].merged = true;
            moves += 1;
        } else {
            element.move(self.makePositionValid(position));
            self.view.moveGameItem(element);
        }
    });

    self.field.elements = self.field.elements.filter(function(element) { return !element.merged; });

    if(moves !== 0){
        self.field.addElement();
        self.view.refreshField(self.field);
    } else {
        if(!this.field.isFreeCells()){
            alert('Game Over!');
        }
    }
};

Controller.prototype.init = function () {
    var self = this;

    var mouseStartHorizCoord = 0;
    var mouseStartVertCoord = 0;
    var mouseEndHorizCoord = 0;
    var mouseEndVertCoord = 0;

    window.onmousedown = function (event) {
        mouseStartHorizCoord = event.clientX;
        mouseStartVertCoord = event.clientY;
    };

    window.onmouseup = function (event) {
        mouseEndHorizCoord = event.clientX;
        mouseEndVertCoord = event.clientY;

        if(Math.abs(mouseStartHorizCoord - mouseEndHorizCoord) > constants.MINIMAL_MOUSE_SHIFT || Math.abs(mouseStartVertCoord - mouseEndVertCoord) > constants.MINIMAL_MOUSE_SHIFT){
            self.setMoveVector(mouseStartHorizCoord, mouseEndHorizCoord, mouseStartVertCoord, mouseEndVertCoord);
            self.moveElements();
        }
    };

    self.field.addElement();
    self.view.refreshField(self.field);
};

//получает вектор направления движения
Controller.prototype.setMoveVector = function (horizStart, horizEnd, vertStart, vertEnd) {
    var self = this;

    if(Math.abs(horizEnd - horizStart) > Math.abs(vertEnd - vertStart)){
        if(horizStart < horizEnd){
            self.moveVector.x = 1;
            self.moveVector.y = 0;
            self.moveVector.compareFunc = function (el1, el2) {
                return el2.position.horizontal - el1.position.horizontal;
            };
        } else {
            self.moveVector.x = -1;
            self.moveVector.y = 0;
            self.moveVector.compareFunc = function (el1, el2) {
                return el1.position.horizontal - el2.position.horizontal;
            };
        }
    } else {
        if(vertStart < vertEnd){
            self.moveVector.x = 0;
            self.moveVector.y = 1;
            self.moveVector.compareFunc = function (el1, el2) {
                return el2.position.vertical - el1.position.vertical;
            };
        } else {
            self.moveVector.x = 0;
            self.moveVector.y = -1;
            self.moveVector.compareFunc = function (el1, el2) {
                return el1.position.vertical - el2.position.vertical;
            };
        }
    }
};

export default Controller;