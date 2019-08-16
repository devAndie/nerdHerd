import React from "react";

function OperatorForm({
    name,
    formSubmitting,
    validationErrors,
    formSuccess,
    formError,
    handleNameChange,
    resetFormState,
    handleSubmit
}) {
    const disabled = !name;
    return (
        <form className="ndhd-form" onSubmit ={handleSubmit}>
            {formSuccess &&(
                <p className="ndhd-alert ndhd-alert-success">
                    Form submitted successfully.
                </p>
            )}
            {formError && (
                <p className="alert alert-error">
                    Sorry, error submitting form. Please retry.
                </p>
            )}
            <div className="form-row">
                <div className="form-col">
                    <label htmlFor="name">Name</label>
                    <div className="form-input-group">
                        <input type="text" name="name"
                            className={validationErrors.name ? "has-error" : ""}
                            autoComplete="off"
                            value={name}
                            onChange={handleNameChange}
                            disabled={formSubmitting}
                        />
                        {validationErrors.name && (
                            <span className="form-input-error">
                                {validationErrors.name}
                            </span>
                        )}
                    </div>
                </div>
            </div>
            <button className="btn btn-form" type="submit"
            disabled={disabled || formSubmitting} >
                Submit
            </button>
            <button className="btn btn-form" type="reset"
            onClick={resetFormState}
            disabled={formSubmitting}>
                Reset
            </button>
        </form>
    );
}

export default OperatorForm;