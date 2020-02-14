import Validator from 'fastest-validator'

const v = new Validator()

// Check https://www.npmjs.com/package/fastest-validator
// to see the usage
const Validate = (form, schema) => {
    return v.compile(schema)(form)
}

export default Validate
