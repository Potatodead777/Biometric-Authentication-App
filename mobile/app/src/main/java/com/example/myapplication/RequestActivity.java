package com.example.myapplication;

import android.os.Bundle;
import android.widget.TextView;

import androidx.appcompat.app.AppCompatActivity;

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
    }

}
