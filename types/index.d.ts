
/**
 * A Schema defines the structure that objects should be validated against.
 *
 * @example
 * const post = new Schema({
 *   title: {
 *     type: String,
 *     required: true,
 *     length: { min: 1, max: 255 }
 *   },
 *   content: {
 *     type: String,
 *     required: true
 *   },
 *   published: {
 *     type: Date,
 *     required: true
 *   },
 *   keywords: [{ type: String }]
 * })
 *
 * @example
 * const author = new Schema({
 *   name: {
 *     type: String,
 *     required: true
 *   },
 *   email: {
 *     type: String,
 *     required: true
 *   },
 *   posts: [post]
 * })
 *
 * @param {Object} [obj] - schema definition
 * @param {Object} [opts] - options
 * @param {Boolean} [opts.typecast=false] - typecast values before validation
 * @param {Boolean} [opts.strip=true] - strip properties not defined in the schema
 */
export default class Schema {
    constructor(obj: object, opts?: object);
    /**
     * Validate given `obj`.
     *
     * @example
     * const schema = new Schema({ name: { required: true }})
     * const errors = schema.validate({})
     * assert(errors.length == 1)
     * assert(errors[0].message == 'name is required')
     * assert(errors[0].path == 'name')
     *
     * @param {Object} obj - the object to validate
     * @param {Object} [opts] - options, see [Schema](#schema-1)
     * @return {Array}
     */
    validate(obj: object, opts?: object): string[];

    /**
     * Assert that given `obj` is valid.
     *
     * @example
     * const schema = new Schema({ name: String })
     * schema.assert({ name: 1 }) // Throws an error
     *
     * @param {Object} obj
     * @param {Object} [opts]
     */
    assert(obj: object, opts?: object): object | undefined;

    /**
     * Override default error messages.
     *
     * @example
     * const hex = (val) => /^0x[0-9a-f]+$/.test(val)
     * schema.path('some.path').use({ hex })
     * schema.message('hex', path => `${path} must be hexadecimal`)
     *
     * @example
     * schema.message({ hex: path => `${path} must be hexadecimal` })
     *
     * @param {String|Object} name - name of the validator or an object with name-message pairs
     * @param {String|Function} [message] - the message or message generator to use
     * @return {Schema}
     */
    message(name: string | object, message: string | Function): Schema;

    /**
     * Override default validators.
     *
     * @example
     * schema.validator('required', val => val != null)
     *
     * @example
     * schema.validator({ required: val => val != null })
     *
     * @param {String|Object} name - name of the validator or an object with name-function pairs
     * @param {Function} [fn] - the function to use
     * @return {Schema}
     */
    validator(name: string | object, fn: Function): any;

    /**
     * Override default typecasters.
     *
     * @example
     * schema.typecaster('SomeClass', val => new SomeClass(val))
     *
     * @example
     * schema.typecaster({ SomeClass: val => new SomeClass(val) })
     *
     * @param {String|Object} name - name of the validator or an object with name-function pairs
     * @param {Function} [fn] - the function to use
     * @return {Schema}
     */
    typecaster(name: string | object, fn: Function): any;
}