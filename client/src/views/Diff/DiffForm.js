import React from 'react';
import { reduxForm, Field } from 'redux-form';

const DiffForm = ({ handleSubmit }) => (
    <form onSubmit={ handleSubmit }>
      <div>
        <label htmlFor="pathPartial">Path Partial</label>
        <Field name="pathPartial" component="input" type="text" />
      </div>
      <div>
        <label htmlFor="basisRoot">Basis Root</label>
        <Field name="basisRoot" component="input" type="text" />
      </div>
      <div>
        <label htmlFor="comparisonRoot">Comparison Root</label>
        <Field name="comparisonRoot" component="input" type="text" />
      </div>
      <button type="submit">Submit</button>
    </form>
)

const WrappedDiffForm = reduxForm({
    form: 'diff'
})(DiffForm)

export default WrappedDiffForm;