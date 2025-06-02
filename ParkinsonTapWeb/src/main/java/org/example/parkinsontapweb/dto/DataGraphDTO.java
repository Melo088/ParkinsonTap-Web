package org.example.parkinsontapweb.dto;

public class DataGraphDTO {
    private long timestamp;
    private double accX;
    private double accY;

    public DataGraphDTO(long timestamp, double accX, double accY) {
        this.timestamp = timestamp;
        this.accX = accX;
        this.accY = accY;
    }

    public long getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(long timestamp) {
        this.timestamp = timestamp;
    }

    public double getAccX() {
        return accX;
    }

    public void setAccX(double accX) {
        this.accX = accX;
    }

    public double getAccY() {
        return accY;
    }

    public void setAccY(double accY) {
        this.accY = accY;
    }
}
