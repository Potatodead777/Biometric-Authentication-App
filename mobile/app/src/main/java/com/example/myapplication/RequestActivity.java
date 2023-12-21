package com.example.myapplication;

import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.TextView;

import androidx.appcompat.app.AppCompatActivity;

import com.android.volley.Request;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.JsonObjectRequest;
import com.android.volley.toolbox.Volley;

import org.json.JSONException;
import org.json.JSONObject;

public class RequestActivity extends AppCompatActivity {
    String value;
    TextView temp;
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.view_request);
        TextView temp = findViewById(R.id.textView3);
        TextView temp2 = findViewById(R.id.websiteNameRequest);
        Button button1 = findViewById(R.id.button1);
        Button button2 = findViewById(R.id.button2);

        Bundle extras = getIntent().getExtras();
        if (extras != null) {
            try {
                JSONObject jsonObject = new JSONObject(extras.getString("data"));

                temp.setText(extras.getString("data"));
                temp2.setText(jsonObject.getString("websiteName"));


            } catch (JSONException e) {
                throw new RuntimeException(e);
            }


            //The key argument here must match that used in the other activity
        }else {
            String value = "nothing";
            temp.setText(value);

        }

        button1.setOnClickListener(new View.OnClickListener() {
            public void onClick(View v) {
                temp2.setText("we do a little trolling");
                // test if it changes s on calling function
                sendRequest("y");
            }
        });
        button2.setOnClickListener(new View.OnClickListener() {
            public void onClick(View v) {
                temp2.setText("we don't do a little trolling");
                sendRequest("n");

            }
        });
    }

    public void sendRequest(String s){
        String url = "http://13.48.147.244/api/change"; //not real one
        Bundle extras = getIntent().getExtras();
        JSONObject requestBody = new JSONObject();
        if (extras != null) {
            try {
                JSONObject jsonObject = new JSONObject(extras.getString("data"));
                try {
                    requestBody.put("accepted", s);
                    requestBody.put("id", jsonObject.getString("id"));

                    JsonObjectRequest request2 = new JsonObjectRequest(Request.Method.POST, url, requestBody, new Response.Listener<JSONObject>() {
                        @Override
                        public void onResponse(JSONObject response) {
                            try {
                            }catch (Exception e){
                            }
                        }
                    }, new Response.ErrorListener() {
                        @Override
                        public void onErrorResponse(VolleyError error) {
                        }
                    });
                    Volley.newRequestQueue(this).add(request2);

                } catch (JSONException e) {
                    e.printStackTrace();
                }
            } catch (JSONException e) {
                throw new RuntimeException(e);
            }
        }else {
        }
    }

}
