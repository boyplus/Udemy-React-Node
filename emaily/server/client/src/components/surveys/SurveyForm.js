import _ from 'lodash';
import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { Link } from 'react-router-dom';
import SurveyField from './SurveyField';

const FIELDS = [
    { label: 'Survey Title', name: 'title' },
    { label: 'Subject Line', name: 'subject' },
    { label: 'Email body', name: 'body' },
    { label: 'Recipient List', name: 'emails' },
];
class SurveyForm extends Component {
    renderField() {
        return _.map(FIELDS, ({ label, name }) => {
            return (
                <Field
                    component={SurveyField}
                    type="text"
                    name={name}
                    label={label}
                    key={name}
                ></Field>
            );
        });
    }
    render() {
        return (
            <div>
                <form
                    onSubmit={this.props.handleSubmit((values) =>
                        console.log(values)
                    )}
                >
                    {this.renderField()}
                    <Link
                        to="/surveys"
                        className="red btn-flat left white-text"
                    >
                        Cancel
                    </Link>
                    <button
                        className="teal btn-flat right white-text"
                        type="submit"
                    >
                        Next
                        <i className="material-icons right">done</i>
                    </button>
                </form>
            </div>
        );
    }
}

function validate(values) {
    const errors = {};
    _.each(FIELDS, ({ name }) => {
        if (!values[name]) {
            errors[name] = 'You must provide a value';
        }
    });
    return errors;
}

export default reduxForm({
    validate,
    form: 'surveyForm',
})(SurveyForm);
