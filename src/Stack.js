/**
 * Iterable Stack data structure.
 * It implements LIFO.
 * 
 * @license MIT
 * @author Leonardo Otoni <leonardootoni@gmail.com>
 */
class Stack {


    #data;
    #index;

    /**
     * Default Stack Constructor
     * @param {Object[]} elements 
     */
    constructor( elements = [] ) {

        this.#data = {};
        this.#index = 0;

        if( Array.isArray( elements) ) {
            elements.forEach( element => this.push( element ) );
        } else {
            throw Error( `Invalid constructor parameter. Only Array is allowed.` );
        }

        // LIFO Iterator implementation
        this[ Symbol.iterator ] = function() {
            
            let itIndex = this.#index;
            return {
                next: () => {
                    return {
                        done: ( itIndex > 0 ) ? false : true,
                        value: this.#data[ itIndex-- ],
                    };
                }
            };

        }
        
    }

    /**
     * Check if the stack is empty
     * 
     * @returns {boolean}
     */
    isEmpty() {
        return this.#index === 0;
    }

    /**
     * Return the number of elements stored in the stack
     *
     * @returns {number}
     */
    size() {
        return this.#index;
    }

    /**
     * Return the last element inserted into the stack but do not remove it from the Stack
     * 
     * @returns {Object}
     */
    peek() {
        return this.#data[ this.#index ]; 
    }

    /**
     * Add a new element on top of the Stack
     * 
     * @param {Object} element 
     */
    push( element ) {

        this.#index++;
        this.#data[ this.#index ] = element;

    }

    /**
     * Extract the last inserted element from the Stack.
     * 
     * @returns {Object}
     */
    pop() {

        const element = this.#data[ this.#index ];
        
        if( this.#index > 0 ) {

            delete this.#data[ this.#index ]
            this.#index--;

        }

        return element;

    }

    /**
     * Remove all elements stored by the Stack
     */
    clear() {

        this.#index = 0;
        this.#data = {};

    }




}

module.exports = Stack; 