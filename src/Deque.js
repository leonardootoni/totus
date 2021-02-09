/**
 * Iterable Deque data structure.
 * It implements both, FIFO and LIFO.
 * 
 * @license MIT
 * @author Leonardo Otoni <leonardootoni@gmail.com>
 */
class Deque {

    #total;
    #head;
    #tail;
    #data;

    constructor() {

        this.#total = 0;
        this.#head = 0;
        this.#tail = 0;
        this.#data = {}

        // Iterates from the Head to Tail
        this[ Symbol.iterator ] = function() {

            let index = this.#head;

            return {
                next: () => {
                    return {
                        done: index > this.#tail ? true : false,
                        value: this.#data[ index++ ],
                    };
                }
            };
        }
    }

    /**
     * Check if the Deque is empty
     * 
     * @returns {boolean}
     */
    isEmpty() {
        return this.#total == 0;
    }

    /**
     * Return the number of elements stored in the Deque
     *
     * @returns {number}
     */
    size() {
        return this.#total;
    }

    /**
     * Return the first element inserted into the Deque but does not remove it.
     * When the Deque contains only one element, .peekFront() has the same effect of .peekRear() method.
     * It returns undefined is Deque is empty;
     * 
     * @returns {Object}
     */
    peekFront() {
        return this.#data[ this.#head ];
    }

    /**
     * Return the last element inserted into the Deque but does not remove it.
     * When the Deque contains only one element .peekRear() has the same effect of .peekFront() method.
     * It returns undefined is Deque is empty;
     * 
     * @returns {Object}
     */
    peekRear() {
        return this.#data[ this.#tail ];
    }

    /**
     * Insert the new element at the beginning of the Deque.
     * If the Deque already contains elements on it, this operation will re-index all existing elements, moving them to
     * next positions. This operation has O(n) complexity.
     * 
     * @param {Object} element 
     * @throws {Error} when trying to insert a null/undefined element
     */
    enqueueFront( element ) {
        
        if( element == null ) {
            throw Error( `Not allowed to enqueue ${element} element. Operation aborted.` )
        }

        if( this.isEmpty() ) {
            
            this.#head++;
            this.#tail++;
            this.#data[ this.#head ] = element;
        
        } else {

            // At least one element is already stored. Create a new datastorage having the new element at 1st. O(n).
            this.#data = Object.values( this.#data )
                .reduce( ( acc, value, idx ) => {

                    const dataStorage = acc;
                    const nextProperty = idx + 2;
                    dataStorage[ nextProperty ] = value;
                    return dataStorage;

                }, { 1: element } );
            
            this.#tail++;

        }

        this.#total++;

    }

    /**
     * Insert the new element at the end of the Deque.
     * This operation has O(1) complexity.
     * 
     * @param {Object} element 
     * @throws {Error} when trying to insert a null/undefined element
     */
    enqueueRear( element ) {

        if( element == null ) {
            throw Error( `Not allowed to enqueue ${element} element. Operation aborted.` )
        }

        if( this.isEmpty() ) {

            this.#head++;
            this.#tail++;
            this.#data[ this.#tail ] = element;

        } else {

            this.#tail++;
            this.#data[ this.#tail ] = element;

        }

        this.#total++;

    }

    /**
     * Return the first element inserted into the Deque and remove it from the storage.
     * Automatically set the next available element as the first element and so on.
     * It returns undefined if invoked when the Deque is empty.
     * 
     * @returns {Object}
     */
    dequeueFront() {

        let element = undefined;
        if( !this.isEmpty() ) {

            element = this.#data[ this.#head ];
            this.#data[ this.#head ] = null;
            delete this.#data[ this.#head ];
            this.#total--;

            if( this.#head < this.#tail ) {
                this.#head++;
            } else {

                this.#head = 0;
                this.#tail = 0;

            }

        }

        return element;

    }

    /**
     * Return the last element inserted into the Queue and remove it from the storage.
     * Automatically set the second last available element as the last element and so on.
     * It returns undefined if invoked when the Deque is empty.
     * 
     * @returns {Object}
     */
    dequeueRear() {

        let element = undefined;
        if( !this.isEmpty() ) {

            element = this.#data[ this.#tail ];
            this.#data[ this.#tail ] = null;
            delete this.#data[ this.#tail ];
            this.#total--;

            if( this.#tail > this.#head ) {
                this.#tail--;
            } else {
                
                // last element was removed
                this.#head = 0;
                this.#tail = 0;

            }

        }

        return element;

    }

    /**
     * Remove all elements stored by the Deque
     */
    clear() {

        this.#total = 0;
        this.#head = 0;
        this.#tail = 0;
        this.#data = {}

    }

}

module.exports = Deque;