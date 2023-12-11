package com.example.myapplication;

import org.json.JSONException;
import org.json.JSONObject;
public class RequestModel {
    String requestName;


    public RequestModel(String requestName) {
        this.requestName = requestName;
    }

    public String getRequestName() {


        try {
            // Convert the JSON string to a JSONObject
            JSONObject jsonObject = new JSONObject(requestName);
            return jsonObject.getString("websiteName");

        } catch (JSONException e) {
            e.printStackTrace();
            // Handle JSON parsing exception
        }

        return requestName;
    }

    public String getFullJSON(){

        return requestName;
    }


}
