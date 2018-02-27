import React from 'react';
import { reduxForm, Field } from 'redux-form';
import './DiffForm.css';

const DiffForm = ({ handleSubmit, reset }) => (
    <form className="diff-form" onSubmit={ handleSubmit }>

      <div className="diff-form__group">
        <label htmlFor="pathPartial" className="diff-form__label">Path Partial</label>
        <div className="diff-form__field">
          <Field 
            name="pathPartial" 
            component="input" 
            type="text"
            placeholder="/"
          />
        </div>
      </div>
      <div className="diff-form__group">
        <label htmlFor="basisRoot" className="diff-form__label">Basis Root</label>
        <div className="diff-form__field">
          <Field 
            name="basisRoot" 
            component="input" 
            type="text" 
            placeholder="https://www.cancer.gov"
          />
        </div>
      </div>
      <div className="diff-form__group">
        <label htmlFor="comparisonRoot" className="diff-form__label">Comparison Root</label>
        <div className="diff-form__field">
          <Field 
            name="comparisonRoot" 
            component="input" 
            type="text"
            placeholder="http://localhost:3000"
          />
        </div>
      </div>
      <div className="diff-form__group">
        <label htmlFor="widths" className="diff-form__label">Array of target widths (comma separated)</label>
        <div className="diff-form__field">
          <Field 
            name="widths" 
            component="input" 
            type="text" 
            placeholder="320, 391, Nexus 7 landscape, 391, 641, iPad landscape, 1025, 1441"
          />
        </div>
      </div>
      <div className="diff-form__group">
        <label htmlFor="tolerance" className="diff-form__label">Tolerance</label>
        <div className="diff-form__field">
          <Field 
            name="tolerance" 
            component="input" 
            type="number" 
            placeholder="10"
            min="0"
            max="99"
          />
        </div>
      </div>
      <div className="diff-form__button diff-form__reset">
        <button type="button" onClick={reset}>Reset</button>
      </div>
      <div className="diff-form__button diff-form__submit">
        <button type="submit">Submit</button>
      </div>
    </form>
)

const WrappedDiffForm = reduxForm({
    form: 'diff',
    destroyOnUnmount: false
})(DiffForm)

export default WrappedDiffForm;