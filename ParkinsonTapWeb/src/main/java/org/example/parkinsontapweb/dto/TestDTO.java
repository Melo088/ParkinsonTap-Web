package org.example.parkinsontapweb.dto;

public class TestDTO {
    public String name;
    public String description;
    public Boolean evalAxis;
    public String dateTime;
    public Integer evaluatedId;
    public String doctorEmail;
    public Integer testId;

    public String getDoctorEmail() {
        return doctorEmail;
    }

    public void setDoctorEmail(String doctorEmail) {
        this.doctorEmail = doctorEmail;
    }

    public Integer getTestId() {
        return testId;
    }

    public void setTestId(Integer testId) {
        this.testId = testId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Boolean getEvalAxis() {
        return evalAxis;
    }

    public void setEvalAxis(Boolean evalAxis) {
        this.evalAxis = evalAxis;
    }

    public String getDateTime() {
        return dateTime;
    }

    public void setDateTime(String dateTime) {
        this.dateTime = dateTime;
    }

    public Integer getEvaluatedId() {
        return evaluatedId;
    }

    public void setEvaluatedId(Integer evaluatedId) {
        this.evaluatedId = evaluatedId;
    }

}
