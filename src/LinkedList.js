const ListNode = require( './util/ListNode' );

/**
 * Iterable LinkedList data structure.
 * It implements FIFO.
 * 
 * @license MIT
 * @author Leonardo Otoni <leonardootoni@gmail.com>
 */
class LinkedList {

    #head;
    #tail;
    #total;

    constructor() {

        this.#head = undefined;
        this.#tail = undefined;
        this.#total = 0;

        this[ Symbol.iterator ] = function() {

            let node = this.#head;
            return {
                next() {
                    
                    if( !node ) {
                        return { done: true, value: undefined };
                    } else {

                        const element = node.getElement();
                        node = node.getNextNode();
                        return { done: false, value: element };

                    }
                }
            };

        };

    }

    /**
     * Insert a new element in the List
     * @param {Object} element 
     */
    push( element ) {

        const node = new ListNode( element );
        
        if( !this.#head ) {

            this.#head = node;
            this.#tail = node;

        } else if ( !this.#head.getNextNode() ) {

            this.#head.setNextNode( node );
            this.#tail = node;

        } else {

            const last = this.#tail;
            last.setNextNode( node );
            this.#tail = node;

        }

        this.#total++;

    }

    /**
     * Return the number of elements stored in the LinkedList
     *
     * @returns {number}
     */
    size() {
        return this.#total;
    }

}

const list = new LinkedList();
list.push( 'Leo' );
list.push( 'Otoni' );
list.push( 'de Assis' );
console.log( list.size() );
console.log( [ ...list ] );