import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import formFileds from './formFields';
import * as actions from '../../actions';

const SurveyFormReview = ({ onCancel, formValues, submitSurvey, history }) => {
    const reviewFields = _.map(formFileds, ({ name, label }) => {
        return (
            <div key={name}>
                <label>{label}</label>
                <div>{formValues[name]}</div>
            </div>
        );
    });
    return (
        <div>
            <h5>Please confirm your entries</h5>
            {reviewFields}
            <button
                className="yellow darken-3 white-text btn-flat left"
                onClick={onCancel}
            >
                Cancel
            </button>
            <button
                className="green white-text btn-flat right"
                onClick={() => submitSurvey(formValues,history)}
            >
                Send survey
                <i className="material-icons right">email</i>
            </button>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        formValues: state.form.surveyForm.values,
    };
};
export default connect(mapStateToProps, actions)(withRouter(SurveyFormReview));
