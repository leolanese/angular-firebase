/*jshint boss:true */
/*jshint es5:true */
/*jshint expr:true */
/*jshint -W053 */
var should = chai.should();
describe("namespace", function() {
    beforeEach(function () {
        this.ns = new namespace();
        this.obj = {};
        this.module = this.ns.import('Test');
        this.properties = {
            test: 'test_value',
            test2: 'another_test_value',
            test3: {
                test4: 'yet_another_test_value',
                test5: {
                    test6: {
                    }
                }
            }
        };
    });
    describe('constructor', function () {
        it('has a method for creating namespaces', function () {
            should.exist(this.ns.constructor);
            var ns = new namespace();
            should.exist(ns);
            ns.should.be.an.instanceof(namespace);
        });
        it('sets options as properties of module', function () {
            var ns = new namespace(this.properties);
            ns.test.should.equal('test_value');
            ns.test2.should.equal('another_test_value');
            ns.test3.test4.should.equal('yet_another_test_value');
            ns.test3.test5.test6.should.exist;
        });
        it('option property objects are converted into namespace objects', function () {
            var ns = new namespace(this.properties);
            ns.test3.should.be.an.instanceof(namespace);
            ns.test3.test5.should.be.an.instanceof(namespace);
            ns.test3.test5.test6.should.be.an.instanceof(namespace);
        });
    });
    describe('import', function () {
        it('creates modules that are namespaces themselves', function () {
            this.module.should.be.an.instanceof(namespace);
            this.ns.Test.should.be.an.instanceof(namespace);
        });
        it('creates modules that don\'t exist', function() {
            this.ns.should.not.have.property('Test2');
            should.exist(this.ns.import('Test2'));
            this.ns.should.have.property('Test2');
            this.ns.Test2.should.equal(this.ns.import('Test2'));
        });
        it('allows reference to modules directly as property', function () {
            this.ns.import('Test');
            should.exist(this.ns.Test);
            this.ns.Test.should.be.equal(this.ns.import('Test'));
        });
        it('passes properties to constructor', function () {
            var module = this.ns.import('Test2', this.properties);
            module.test.should.equal('test_value');
            module.test2.should.equal('another_test_value');
        });
        it('allows the import of objects', function () {
            var module = this.ns.import('Test2', this.properties);
            var test = this.ns.import('Test2.test');
            should.exist(test);
            test.should.equal('test_value');
            test = module.import('test');
            should.exist(test);
            test.should.equal('test_value');
        });
        it('returns the value present if the namespace is associated with a value instead of a module', function () {
            this.ns.register('test', 'test_value');
            this.ns.import('test').should.be.equal('test_value');
        });
    });
    describe('register', function () {
        it('rejects registration with less than two parameters', function () {
            var spy = sinon.spy(namespace.prototype, 'register');
            try { this.ns.register('Test'); }
            catch (e) { /* Expected */ }
            spy.threw('NamespaceError').should.be.true;
            spy.getCall(0).exception.message.should.equal('Two arguments are required.');
            namespace.prototype.register.restore();
        });
        it('rejects registration where the first parameter is not a string', function () {
            var spy = sinon.spy(namespace.prototype, 'register');
            try { this.ns.register(1,2); }
            catch (e) { /* Expected */ }
            spy.threw('NamespaceError').should.be.true;
            spy.getCall(0).exception.message.should.equal('Namespace should be a string.');
            namespace.prototype.register.restore();
        });
        it('has a method for registering objects in namespace', function () {
            should.exist(this.ns.register);
            this.module.should.have.property('register');
        });
        it('allows 1-arity namespaces to be defined', function() {
            this.module.should.have.property('register');
            this.module.register('Namespace', 'test');
            this.module.Namespace.should.equal('test');
        });
        it('allows 2-arity namespaces to be defined', function() {
            this.module.should.have.property('register');
            this.module.register('Name.Space', 'test');
            this.module.Name.Space.should.equal('test');
        });

        it('allows arbitrarily long namespaces to be created', function() {
            this.module.register('Very.Long.Name.Space.That.Keeps.Going.And.Going', 'test');
            this.module.Very.Long.Name.Space.That.Keeps.Going.And.Going.should.equal('test');
            this.ns.Test.Very.Long.Name.Space.That.Keeps.Going.And.Going.should.equal('test');
        });
        it('converts object register into namespace if it is a plain object', function () {
            var obj = { test2: 'test_value' };
            this.ns.register('test', obj);
            this.ns.should.have.property('test');
            namespace.__test__._isPlainObject(obj);
            this.ns.test.should.be.an.instanceof(namespace);
        });
    });
    describe('Private functions', function () {
        describe('_checkNamespace', function () {
            beforeEach(function () {
                this.spy = sinon.spy(namespace.__test__, '_checkNamespace');
            });
            afterEach(function () {
                namespace.__test__._checkNamespace.restore();
            });
            it('rejects namespaces that start with a number', function () {
                try {
                    namespace.__test__._checkNamespace('1');
                } catch (e) { /* expected */ }
                this.spy.threw('NamespaceError').should.be.true;
                this.spy.getCall(0).exception.message.should.equal('Invalid namespace \'1\' provided.');
                try {
                    namespace.__test__._checkNamespace('a.1');
                } catch (e) { /* expected */ }
                this.spy.threw('NamespaceError').should.be.true;
                this.spy.getCall(1).exception.message.should.equal('Invalid namespace \'a.1\' provided.');
            });
            it('rejects namespaces that with special characters (excluding $ and _ and . as a delimiter)', function () {
                var special_characters = [ '`', '~', '!', '@', '#', '%', '^', '&', '*', '(', ')', '-', '+', '=', '{', '}','[',']', ';', ':', '\'', '"', ',', '<', '>', '/', '?', '\\', '|'];
                for (var i = 0; i < special_characters.length; i++) {
                    try {
                        namespace.__test__._checkNamespace(special_characters[i]);
                    } catch (e) { /* expected */ }
                    this.spy.threw('NamespaceError').should.be.true;
                    this.spy.getCall(i).exception.message.should.equal('Invalid namespace \'' + special_characters[i] + '\' provided.');
                }
            });
            it('rejects namespaces that start with a period)', function () {
                try {
                    namespace.__test__._checkNamespace('.');
                } catch (e) { /* expected */ }
                this.spy.threw('NamespaceError').should.be.true;
                this.spy.getCall(0).exception.message.should.equal('Invalid namespace \'.\' provided.');
            });
            it('allows namespaces that start with $', function () {
                namespace.__test__._checkNamespace('$test').should.be.equal('$test');
                namespace.__test__._checkNamespace('$test.$test2').should.be.equal('$test.$test2');
            });
            it('allows namespaces that start with _', function () {
                namespace.__test__._checkNamespace('_test').should.be.equal('_test');
                namespace.__test__._checkNamespace('_test._test2').should.be.equal('_test._test2');
            });
            it('allows alpha-numeric namespace names', function () {
                namespace.__test__._checkNamespace('test_1234$').should.be.equal('test_1234$');
                namespace.__test__._checkNamespace('test_1234$.test_1234$').should.be.equal('test_1234$.test_1234$');
            });
            it('allows arbitrarily long namespaces', function () {
                namespace.__test__._checkNamespace('a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a.a');
            });
            it('allows all letters in both upper and lower case as well as numbers in namespace', function () {
                namespace.__test__._checkNamespace('abcdefghijklmnopqrstuvwxyz');
                namespace.__test__._checkNamespace('ABCDEFGHIJKLMNOPQRSTUVWXYZ');
                namespace.__test__._checkNamespace('_0123456789$');
            });
        });
        describe('_extend', function () {
            it('does nothing when only one object is provided', function () {
                namespace.__test__._extend(this.ns).should.be.equal(this.ns);
            });
            it('modified the first object by adding properties to it', function () {
                namespace.__test__._extend(this.ns, this.properties);
                this.ns.test.should.exist;
                this.ns.test.should.be.equal('test_value');
                this.ns.test2.should.exist;
                this.ns.test2.should.be.equal('another_test_value');
                this.ns.test3.should.exist;
                this.ns.test3.test4.should.exist;
                this.ns.test3.test4.should.be.equal('yet_another_test_value');
                this.ns.test3.test5.should.exist;
                this.ns.test3.test5.test6.should.exist;
            });
            it('combines multiple objects giving preference to properties of the later object', function () {
                var ns = new namespace({'test': 'first_test_value'});
                ns.test.should.be.equal('first_test_value');
                namespace.__test__._extend(ns, { 'test': 'second_test_value'});
                ns.test.should.be.equal('second_test_value');
                ns = new namespace({'test': 'first_test_value'});
                namespace.__test__._extend(ns, { 'test': 'second_test_value'}, { 'test': 'third_test_value'});
                ns.test.should.be.equal('third_test_value');
            });
            it('combines additional properties past obj3', function() {
                namespace.__test__._extend(this.ns, { 'test': 'second_test_value'}, { 'test': 'third_test_value'}, { 'test': 'fourth_test_value'});
                this.ns.test.should.be.equal('fourth_test_value');
            });
            it('converts properties that are objects into namespaces', function () {
                namespace.__test__._extend(this.ns, { test: { test2: 'test_value' } });
                this.ns.test.should.be.an.instanceof(namespace);
                this.ns.test.test2.should.be.equal('test_value');
            });
            it('converts nested properties that are objects into namespaces', function () {
                namespace.__test__._extend(this.ns, { test: { test2: { test3: 'test_value' } } });
                this.ns.test.should.be.an.instanceof(namespace);
                this.ns.test.test2.should.be.an.instanceof(namespace);
                this.ns.test.test2.test3.should.be.equal('test_value');
            });
        });
        describe('_getModule', function () {
            it('returns module if found in context', function () {
                var ns = new namespace({ test: {}});
                namespace.__test__._getModule.call(ns, 'test').should.be.equal(ns.test);
                ns.test.should.be.an.instanceof(namespace);
            });
            it('creates a new namespace if module not found in context', function () {
                this.ns.should.not.have.property.test;
                var module = namespace.__test__._getModule.call(this.ns, 'test');
                should.exist(module);
                module.should.be.an.instanceof(namespace);
                this.ns.test.should.be.equal(module);
            });
            it('passes options to namespace when module does not exist', function () {
                var ns = new namespace();
                ns.should.not.have.property('test');
                namespace.__test__._getModule.call(ns, 'test', { test2: 'test_value'});
                ns.should.have.property('test');
                ns.test.should.have.property('test2');
                ns.test.test2.should.be.equal('test_value');
            });
        });
        describe('_import', function () {
            // Functionality implied by tests for 'import'
        });
        describe('_isPlainObject', function () {
            it('recognizes plain objects created from prototype constructor', function () {
                namespace.__test__._isPlainObject(Object.create(Object.prototype)).should.be.true;
            });
            it('recognizes plain objects created as maps', function () {
                namespace.__test__._isPlainObject({}).should.be.true;
                namespace.__test__._isPlainObject({ test: { test2: 'test_value' } } ).should.be.true;
            });
            it('rejects strings', function () {
                namespace.__test__._isPlainObject('').should.be.false;
                namespace.__test__._isPlainObject(new String('')).should.be.false;
            });
            it('rejects numbers', function () {
                namespace.__test__._isPlainObject(1).should.be.false;
            });
            it('rejects booleans', function () {
                namespace.__test__._isPlainObject(true).should.be.false;
            });
            it('rejects arrays', function () {
                namespace.__test__._isPlainObject([]).should.be.false;
            });
            it('rejects objects with a constructor that doesn\'t belong to Object.prototype', function () {
                namespace.__test__._isPlainObject(namespace);
                function ObjectWithConstructor() { }
                namespace.__test__._isPlainObject(new ObjectWithConstructor()).should.be.false;
            });
            it('rejects functions', function () {
                namespace.__test__._isPlainObject(function() {}).should.be.false;
            });
            it('rejects itself (lack of self-esteem', function() {
                namespace.__test__._isPlainObject(namespace.__test__._isPlainObject).should.be.false;
            });
        });
        describe('_isString', function () {
            it('recognizes native strings', function () {
                namespace.__test__._isString('').should.be.true;
            });
            it('recognizes String object',function () {
                namespace.__test__._isString(new String('')).should.be.true;
            });
            it('rejects javascript objects', function () {
                namespace.__test__._isString({}).should.be.false;
            });
            it('rejects arrays', function () {
                namespace.__test__._isString([]).should.be.false;
            });
            it('rejects numbers', function () {
                namespace.__test__._isString(1).should.be.false;
                namespace.__test__._isString(1.1).should.be.false;
                namespace.__test__._isString(-1.1).should.be.false;
            });
            it('rejects booleans', function () {
                namespace.__test__._isString(true).should.be.false;
                namespace.__test__._isString(false).should.be.false;
            });
            it('rejects functions', function () {
                namespace.__test__._isString(function() {}).should.be.false;
            });
            it('rejects itself (lack of self esteem)', function () {
                namespace.__test__._isString(namespace.__test__.isString).should.be.false;
            });
        });
    });
});
