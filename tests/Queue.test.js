/**
 * Queue Implementation Test Set
 *
 * @author Leonardo Otoni <leonardootoni@gmail.com>
 */
const Queue = require( '../src/Queue' );

describe( 'Queue Data Structure Tests', () => {

    const MAX_QUEUE_SIZE = 15;

    describe( 'Instance Tests', () => {

        test( 'Check Queue Instance Object', () => {

            const queue = new Queue();
            expect( queue ).toBeInstanceOf( Queue );

        } );

        test( 'Check Queue Instance Methods', () => {

            const expectedNames = [ 'isEmpty', 'size', 'enqueue', 'dequeue', 'peek', 'clear' ].sort();
            const queueMethodNames = Object.getOwnPropertyNames( Queue.prototype )
                .filter( el => el !== 'constructor' )
                .sort();

            expect( queueMethodNames ).toEqual( expectedNames );

        } );

    } );

    describe( 'Specialized Tests', () => {

        test( 'Check Queue insertion', () => {

            const randomSize = Math.floor( Math.random() * MAX_QUEUE_SIZE ) + 1;

            const queue = new Queue();
            Array( randomSize ).fill( 'test' ).forEach( ( element, index ) => queue.enqueue( element + index ) );

            expect( queue.size() ).toBe( randomSize );

        } );

        test( 'Check Queue Dequeue Order unsing FIFO strategy', () => {

            const randomSize = Math.floor( Math.random() * MAX_QUEUE_SIZE ) + 1;

            const queue = new Queue();
            const generatedElements = Array( randomSize )
                .fill( 'Element_' )
                .map( ( name, index ) => {

                    const updatedName = `${name}${index}`;
                    queue.enqueue( updatedName );
                    return updatedName;

                } );

            const extractedElements = [];
            for ( let i = queue.size(); i > 0; i -= 1 ) {

                extractedElements.push( queue.dequeue() );

            }

            expect( extractedElements ).toStrictEqual( generatedElements );

        } );

        test( 'Check Queue Iterability', () => {

            const randomSize = Math.floor( Math.random() * MAX_QUEUE_SIZE ) + 1;

            const queue = new Queue();
            const generatedElements = Array( randomSize )
                .fill( 'Element_' )
                .map( ( name, index ) => {

                    const updatedName = `${name}${index}`;
                    queue.enqueue( updatedName );
                    return updatedName;

                } );

            const extractedElements = [ ...queue ];
            expect( extractedElements ).toStrictEqual( generatedElements );

        } );

        test( 'Check Queue.isEmpty()', () => {

            const queue = new Queue();

            expect( queue.isEmpty() ).toBe( true );

            queue.enqueue( 'New Element' );

            expect( queue.isEmpty() ).toBe( false );

        } );

        test( 'Check Queue.peek()', () => {

            const queue = new Queue();

            expect( queue.peek() ).toBeUndefined();
            expect( queue.size() ).toBe( 0 );

            const elementName = 'Element1';
            queue.enqueue( elementName );

            expect( queue.peek() ).toStrictEqual( elementName );
            expect( queue.size() ).toBe( 1 );

        } );

        test( 'Check Queue.clear()', () => {

            const queue = new Queue();
            queue.enqueue( 'Element 1 ' );
            queue.enqueue( 'Element 2 ' );

            expect( queue.size() ).toBe( 2 );
            expect( queue.isEmpty() ).toBe( false );

            queue.clear();

            expect( queue.size() ).toBe( 0 );
            expect( queue.isEmpty() ).toBe( true );

        } );

    } );

    describe( 'Operational Tests', () => {

        test.each( [
            [ null ],
            [ undefined ],
        ] )( 'Queue.enqueue() must throw error when trying to enqueue %s element', value => {

            const errorMessage = `Not allowed to enqueue ${value} element. Operation aborted.`;

            const queue = new Queue();
            expect( () => queue.enqueue( value ) ).toThrow( new Error( errorMessage ) );

        } );

        test( 'Queue.dequeue() must return undefined when Queue is empty', () => {

            const queue = new Queue();

            expect( queue.dequeue() ).toBeUndefined( );

            const randomSize = Math.floor( Math.random() * MAX_QUEUE_SIZE ) + 1;

            Array( randomSize ).fill( 'Element_' ).forEach( ( name, index ) => {

                const updatedName = `${name}${index}`;
                queue.enqueue( updatedName );

            } );

            while ( !queue.isEmpty() ) {

                queue.dequeue();

            }

            expect( queue.dequeue() ).toBeUndefined( );

        } );

    } );

} );
