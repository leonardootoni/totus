class ListNode {

    #element;
    #nextNode;
    #previousNode;
    
    static #INVALID_ELEMENT = 'Element Cannot be null.';

    constructor( element ) {

        this.#element = element;
        this.#nextNode = undefined;
        this.#previousNode = undefined;

    }

    getElement() { return this.#element; }

    getNextNode() { return this.#nextNode; }
    setNextNode( node ) { this.#nextNode = node; }

    getPreviousNode() { return this.#previousNode; }
    setPreviousNode( node ) { this.#previousNode = node; } 

    
}

module.exports = ListNode;