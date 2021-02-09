/**
 * Deque Implementation Test Set
 *
 * @author Leonardo Otoni <leonardootoni@gmail.com>
 */
const Deque = require( '../src/Deque' );

describe( 'Deque Date Structure Tests', () => {

    const MAX_DEQUE_SIZE = 15;

    describe( 'Instance Tests', () => {

        test( 'Check DEque Instance Object', () => {

            const deque = new Deque();
            expect( deque ).toBeInstanceOf( Deque );

        } );

        test( 'Check Instance Methods', () => {

            const expectedNames = [
                'isEmpty', 'size', 'peekFront', 'peekRear', 'enqueueFront', 'enqueueRear', 'dequeueFront',
                'dequeueRear', 'clear',
            ].sort();

            const dequeMethodNames = Object.getOwnPropertyNames( Deque.prototype )
                .filter( propertyName => propertyName !== 'constructor' )
                .sort();

            expect( expectedNames ).toEqual( dequeMethodNames );

        } );

    } );

    describe( 'Specialized Tests', () => {

        test( 'Check Deque.isEmpty() on an empty object', () => {

            const deque = new Deque();
            expect( deque.isEmpty() ).toBe( true );

        } );

        test( 'Check Deque.isEmpty() on non-empty objects', () => {

            const deque1 = new Deque();
            deque1.enqueueFront( 'test1' );

            const deque2 = new Deque();
            deque2.enqueueRear( 'test2' );

            expect( deque1.isEmpty() ).toBe( false );
            expect( deque2.isEmpty() ).toBe( false );

        } );

        test( 'Check Deque.size() on a empty object', () => {

            const deque = new Deque();
            expect( deque.size() ).toBe( 0 );

        } );

        test( 'Check Deque.size() on non-empty objects', () => {

            const deque1 = new Deque();
            const deque2 = new Deque();

            // Deques will be populated randomically
            const randomSize = Math.floor( Math.random() * MAX_DEQUE_SIZE ) + 1;
            Array( randomSize ).fill( 'test' ).forEach( ( val, idx ) => deque1.enqueueFront( `${val}${( idx + 1 )}` ) );
            Array( randomSize ).fill( 'test' ).forEach( ( val, idx ) => deque2.enqueueRear( `${val}${( idx + 1 )}` ) );

            expect( deque1.size() ).toBe( randomSize );
            expect( deque2.size() ).toBe( randomSize );

        } );

        test( 'Check Deque .peekFront() .peekRear() behaviour', () => {

            const testString = 'This is an automated test';
            const deque = new Deque();
            expect( deque.peekFront() ).toBeUndefined();
            expect( deque.peekRear() ).toBeUndefined();

            deque.enqueueFront( testString );
            expect( deque.peekFront() ).toEqual( testString );
            expect( deque.peekRear() ).toEqual( testString );
            expect( deque.peekFront() ).toEqual( deque.peekRear() );

            deque.enqueueRear( `${testString}${testString}` );
            expect( deque.peekFront() ).not.toBe( deque.peekRear() );

        } );

        test( 'Check Deque.enqueueFront()', () => {

            const deque = new Deque();

            const elements = [ '1st', '2nd', '3rd', '4th' ];
            elements.forEach( value => deque.enqueueFront( value ) );

            expect( deque.peekFront() ).toBe( elements[ elements.length - 1 ] );
            expect( deque.peekRear() ).toBe( elements[ 0 ] );

        } );

        test( 'Check Deque.enqueueRear()', () => {

            const deque = new Deque();

            const elements = [ '1st', '2nd', '3rd', '4th' ];
            elements.forEach( value => deque.enqueueRear( value ) );

            expect( deque.peekFront() ).toBe( elements[ 0 ] );
            expect( deque.peekRear() ).toBe( elements[ elements.length - 1 ] );

        } );

        test( 'Check Deque.enqueueFront() & .dequeueFront()', () => {

            const deque = new Deque();

            const elements = [ '1st', '2nd', '3rd', '4th' ];
            elements.forEach( value => deque.enqueueFront( value ) );

            const dequeuedElements = [];
            while ( !deque.isEmpty() ) {

                dequeuedElements.push( deque.dequeueFront() );

            }

            expect( dequeuedElements ).toHaveLength( elements.length );
            expect( dequeuedElements ).toEqual( elements.reverse() );

        } );

        test( 'Check Deque.enqueueRear() & .dequeueRear()', () => {

            const deque = new Deque();

            const elements = [ '1st', '2nd', '3rd', '4th' ];
            elements.forEach( value => deque.enqueueRear( value ) );

            const dequeuedElements = [];
            while ( !deque.isEmpty() ) {

                dequeuedElements.push( deque.dequeueRear() );

            }

            expect( dequeuedElements ).toHaveLength( elements.length );
            expect( dequeuedElements ).toEqual( elements.reverse() );

        } );

        test( 'Check Deque.enqueueFront() & .dequeueRear()', () => {

            const deque = new Deque();

            const elements = [ '1st', '2nd', '3rd', '4th' ];
            elements.forEach( value => deque.enqueueFront( value ) );

            const dequeuedElements = [];
            while ( !deque.isEmpty() ) {

                dequeuedElements.push( deque.dequeueRear() );

            }

            expect( dequeuedElements ).toHaveLength( elements.length );
            expect( dequeuedElements ).toEqual( elements );

        } );

        test( 'Check Deque.enqueueRear() & .dequeueFront()', () => {

            const deque = new Deque();

            const elements = [ '1st', '2nd', '3rd', '4th' ];
            elements.forEach( value => deque.enqueueRear( value ) );

            const dequeuedElements = [];
            while ( !deque.isEmpty() ) {

                dequeuedElements.push( deque.dequeueFront() );

            }

            expect( dequeuedElements ).toHaveLength( elements.length );
            expect( dequeuedElements ).toEqual( elements );

        } );

        test( 'Check .dequeueFront() & .dequeueRear when Deque contains only one element', () => {

            const testedValue = 'This is a test';
            const deque1 = new Deque();
            const deque2 = new Deque();

            deque1.enqueueFront( testedValue );
            deque2.enqueueFront( testedValue );
            expect( deque1.dequeueRear() ).toStrictEqual( deque2.dequeueRear() );
            expect( deque1.size() ).toBe( deque2.size() );
            expect( deque1.isEmpty() ).toBe( deque2.isEmpty() );

            deque1.enqueueRear( testedValue );
            deque2.enqueueRear( testedValue );
            expect( deque1.dequeueFront() ).toStrictEqual( deque2.dequeueFront() );
            expect( deque1.size() ).toBe( deque2.size() );
            expect( deque1.isEmpty() ).toBe( deque2.isEmpty() );

        } );

        test( 'Check Deque.clear()', () => {

            const deque = new Deque();

            deque.enqueueFront( 'This is a new Test' );
            expect( deque.size() ).toBe( 1 );

            deque.clear();
            expect( deque.size() ).toBe( 0 );

        } );

        test( 'Check Deque Iterability', () => {

            const randomSize = Math.floor( Math.random() * MAX_DEQUE_SIZE ) + 1;

            const deque = new Deque();
            Array( randomSize ).fill( 'test' ).forEach( ( value, idx ) => {

                deque.enqueueRear( `${value}${idx + 1}` );

            } );

            const elements = [ ...deque ];
            expect( elements ).toHaveLength( randomSize );
            expect( elements[ 0 ] ).toContain( '1' );

        } );

    } );

    describe( 'Operational Tests', () => {

        test.each( [
            [ null ],
            [ undefined ],
        ] )( 'Deque.enqueueFront(%s) to throw an error', value => {

            const errorMessage = `Not allowed to enqueue ${value} element. Operation aborted.`;
            const deque = new Deque();

            expect( () => deque.enqueueFront( value ) ).toThrow( new Error( errorMessage ) );

        } );

        test.each( [
            [ null ],
            [ undefined ],
        ] )( 'Deque.enqueueRear(%s) to throw an error', value => {

            const errorMessage = `Not allowed to enqueue ${value} element. Operation aborted.`;
            const deque = new Deque();

            expect( () => deque.enqueueRear( value ) ).toThrow( new Error( errorMessage ) );

        } );

        test( 'Check Deque.dequeueFront() from empty Deque', () => {

            const deque = new Deque();
            expect( deque.dequeueFront() ).toBeUndefined( );

        } );

        test( 'Check Deque.dequeueRear() from empty Deque', () => {

            const deque = new Deque();
            expect( deque.dequeueRear() ).toBeUndefined( );

        } );

    } );

} );
