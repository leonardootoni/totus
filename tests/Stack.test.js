/**
 * Stack Implementation Test Set
 *
 * @author Leonardo Otoni <leonardootoni@gmail.com>
 */
const Stack = require( '../src/Stack' );

describe( 'Stack Data Structure tests', () => {

    describe( 'Instance Tests', () => {

        test( 'Check Stack Instance Object', () => {

            expect( new Stack() ).toBeInstanceOf( Stack );

        } );

        test( 'Check Stack Intance Class Method Names', () => {

            const methodsNames = [ 'peek', 'pop', 'push', 'clear', 'isEmpty', 'size' ].sort();
            const instanceMethodNames = Object.getOwnPropertyNames( Stack.prototype )
                .filter( ( methodName ) => methodName !== 'constructor' )
                .sort();

            expect( instanceMethodNames ).toEqual( methodsNames );

        } );

        test( 'Check Stack instantiation with arrays', () => {

            expect( new Stack( Array( 3 ).fill( 0 ) ) ).toBeInstanceOf( Stack );

        } );

        test( 'Check Stack Instantiation with Invalid Constructor Values', () => {

            const errorMessage = 'Invalid constructor parameter. Only Array is allowed.';

            expect( () => new Stack( 'A' ) ).toThrow( new Error( errorMessage ) );
            expect( () => new Stack( 1, 2, 3 ) ).toThrow( new Error( errorMessage ) );
            expect( () => new Stack( {} ) ).toThrow( new Error( errorMessage ) );
            expect( () => new Stack( new Date() ) ).toThrow( new Error( errorMessage ) );
            expect( () => new Stack( Symbol ) ).toThrow( new Error( errorMessage ) );

        } );

        test( 'Check Stack.size() after Class Constructor( Array[] )', () => {

            const MAX_SIZE = 15;
            const randomSize = Math.floor( Math.random() * MAX_SIZE );
            const randomData = Array( randomSize ).fill( 0 );
            const stack = new Stack( randomData );

            expect( stack.size() ).toBe( randomSize );

        } );

        test( 'Check Stack.size() after Class Constructor()', () => {

            const stack = new Stack();
            expect( stack.size() ).toBe( 0 );

        } );

        test( 'Check Stack objects must be different instances', () => {

            expect( new Stack() ).not.toBe( new Stack() );
            expect( new Stack( Array( 3 ).fill( 0 ) ) ).not.toBe( new Stack( Array( 3 ).fill( 0 ) ) );

        } );

    } );

    describe( 'Specialized Tests', () => {

        test( 'Check Stack.Size()', () => {

            const stack = new Stack();
            const initialSize = stack.size();

            const MAX_SIZE = 15;
            const randomSize = Math.floor( Math.random() * MAX_SIZE ) + 1;

            for ( let i = 0; i < randomSize; i += 1 ) {

                stack.push( 'this is a test' );

            }

            expect( initialSize ).toBe( 0 );
            expect( stack.size() ).toBe( randomSize );

        } );

        test( 'Check Stack.isEmpty()', () => {

            const stack1 = new Stack();
            const stack2 = new Stack();

            stack2.push( 'this is a test' );

            expect( stack1.isEmpty() ).toBe( true );
            expect( stack2.isEmpty() ).toBe( false );

        } );

        test( 'Check Stack.peek()', () => {

            const stack = new Stack();
            stack.push( 'test1' );
            stack.push( 'test2' );

            expect( stack.peek() ).toBe( 'test2' );
            expect( stack.size() ).toBe( 2 );

        } );

        test( 'Check Stack.push()', () => {

            const stack = new Stack();

            expect( stack.size() ).toBe( 0 );
            stack.push( 'test1' );
            expect( stack.size() ).toBe( 1 );

        } );

        test( 'Check Stack.pop()', () => {

            const stack = new Stack();
            stack.push( 'test1' );
            stack.push( 'test2' );

            expect( stack.pop() ).toBe( 'test2' );
            expect( stack.size() ).toBe( 1 );
            expect( stack.peek() ).toBe( 'test1' );

            stack.pop();
            expect( stack.pop() ).toBeUndefined();

        } );

        test( 'Check Stack.clear()', () => {

            const stack = new Stack();
            stack.push( 'test1' );
            stack.push( 'test2' );

            expect( stack.size() ).toBe( 2 );

            stack.clear();
            expect( stack.size() ).toBe( 0 );

        } );

        test( 'Check Stack Iterability', () => {

            const stack = new Stack();
            stack.push( 'test1' );
            stack.push( 'test2' );

            const data = [ ...stack ];
            expect( data ).toHaveLength( 2 );

        } );

    } );

    describe( 'Operational Tests', () => {

        test( 'Check Stack Capability to store different data types', () => {

            const stack = new Stack();

            stack.push( 'first element' );
            stack.push( { title: 'Second Element' } );
            stack.push( 1 );
            stack.push( true );
            stack.push( new Date() );
            stack.push( Symbol( 'TEST' ) );

            const dataTypesStored = [ 'string', 'object', 'number', 'boolean', 'object', 'symbol' ];
            const dataTypesExtracted = [ ...stack ].reverse().map( ( element ) => typeof element );

            expect( dataTypesExtracted ).toEqual( dataTypesStored );

        } );

    } );

} );
