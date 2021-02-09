/**
 * Iterable Queue data structure.
 * It implements FIFO.
 * 
 * @license MIT
 * @author Leonardo Otoni <leonardootoni@gmail.com>
 */
class Queue {

    #head;
    #tail;
    #total;
    #data;

    constructor() {

        this.#head = 0;
        this.#tail = 0;
        this.#total = 0;
        this.#data = {};

        // FIFO iterator implementation
        this[ Symbol.iterator ] = function() {

            let qIndex = this.#head;
            return {
                next: () => {
                    return {
                        done: ( qIndex > this.#tail ) ? true : false,
                        value: this.#data[ qIndex++ ],
                    };
                }
            };

        }

    }

    /**
     * Check if the Queue is empty
     * 
     * @returns {boolean}
     */
    isEmpty() {
        return this.#total === 0;
    }

    /**
     * Return the number of elements stored in the stack
     *
     * @returns {number}
     */
    size() {
        return this.#total;
    }

    /**
     * Insert the new element at the end of the Queue
     * 
     * @param {Object} element 
     * @throws {Error} when trying to insert a null/undefined element
     */
    enqueue( element ) {

        if( element == null ) {
            throw Error( `Not allowed to enqueue ${element} element. Operation aborted.` );
        }

        this.#tail++;
        this.#head += this.#head === 0 ? 1 : 0;
        this.#data[ this.#tail ] = element;
        this.#total++;

    }

    /**
     * Return the first element inserted into the Queue and remove it from the storage.
     * Automatically set the next available element as the first element and so on.
     * It returns undefined if invoked when the Queue is empty.
     * 
     * @returns {Object}
     */
    dequeue() {

        let element = undefined;

        if( this.#total > 0 ) {

            element = this.#data[ this.#head ];
            delete this.#data[ this.#head ];
            this.#total--;

            if( this.#total > 0 ) {
                this.#head++;
            } else {
                this.#head = 0;
                this.#tail = 0;
            }

        }
        
        return element;

    }

    /**
     * Return the first element inserted into the Queue but does not remove it.
     * 
     * @returns {Object}
     */
    peek() {

        return this.#data[ this.#head ];

    }

    /**
     * Remove all elements stored by the Queue
     */
    clear() {

        this.#head = 0;
        this.#tail = 0;
        this.#total = 0;
        this.#data = {};

    }

}

module.exports = Queue;