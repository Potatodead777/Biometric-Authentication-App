package com.example.myapplication;

import androidx.appcompat.app.AppCompatActivity;
import androidx.appcompat.app.AppCompatDelegate;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import android.content.Intent;
import android.content.SharedPreferences;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.ImageView;
import android.widget.TextView;
import android.os.Bundle;
import com.android.volley.Request;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.JsonObjectRequest;
import com.android.volley.toolbox.Volley;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.ArrayList;

public class MainActivity extends AppCompatActivity {

    ArrayList<RequestModel> requestModels = new ArrayList<>();
    ArrayList<String> websiteNamesList = new ArrayList<>();
    String[] websiteNamesArray;

    public TextView data;
    String url;

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        setContentView(R.layout.activity_main);
        AppCompatDelegate.setDefaultNightMode(AppCompatDelegate.MODE_NIGHT_NO);
        SharedPreferences sharedPreferences2 = getSharedPreferences("MyPrefs", MODE_PRIVATE);
        String storedUid = sharedPreferences2.getString("UID", "");
        ArrayList<String> websiteNamesList = new ArrayList<>();
        ImageView button3 = findViewById(R.id.backButton2);
        Button button2 = findViewById(R.id.button2);
        JSONObject requestBody2 = new JSONObject();
        try {
            requestBody2.put("uid", storedUid);
        } catch (JSONException e) {
            e.printStackTrace();
        }

        button3.setOnClickListener(new View.OnClickListener() {
            public void onClick(View v) {
                Intent intent = getIntent();
                intent.addFlags(Intent.FLAG_ACTIVITY_NO_ANIMATION);
                startActivity(intent);


            }
        });

        button2.setOnClickListener(new View.OnClickListener() {
            public void onClick(View v) {
                Intent intent = new Intent(MainActivity.this, HistoryActivity.class);
                startActivity(intent);
                finish();
            }
        });

        url = "http://16.170.240.58/api/requests/uid";
        JsonObjectRequest request = new JsonObjectRequest(Request.Method.POST, url, requestBody2, new Response.Listener<JSONObject>() {
            @Override
            public void onResponse(JSONObject response) {
                try {
                    JSONArray websitesArray = response.getJSONArray("message");

                    websiteNamesArray = new String[websitesArray.length()];
                    for (int i = 0; i < websitesArray.length(); i++) {
                        websiteNamesArray[i] = websitesArray.getString(i);
                    }

                    for (int i = 0; i < websitesArray.length(); i++){
                        JSONObject jsonObject = websitesArray.getJSONObject(i);
                        Log.d("Volley", jsonObject.toString());
                    }


                    setUpRequestModels();

                    Request_RecyclerViewAdapter adapter = new Request_RecyclerViewAdapter(MainActivity.this, requestModels);
                    RecyclerView recyclerView = findViewById(R.id.myRecyclerView);

                    recyclerView.setAdapter(adapter);
                    recyclerView.setLayoutManager(new LinearLayoutManager(MainActivity.this));
                }catch (Exception e){
                    data.setText("failed");
                }
            }
        }, new Response.ErrorListener() {
            @Override
            public void onErrorResponse(VolleyError error) {

            }
        });
        Volley.newRequestQueue(this).add(request);



    }

    public void setUpRequestModels() {
        String[] requestName = getResources().getStringArray(R.array.requests_temp);

        for (int i = 0; i < websiteNamesArray.length; i++ ){
            requestModels.add(new RequestModel(websiteNamesArray[i]));
        }
    }
}