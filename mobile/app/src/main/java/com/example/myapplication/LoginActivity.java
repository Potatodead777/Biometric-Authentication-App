package com.example.myapplication;

import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;

import androidx.appcompat.app.AppCompatActivity;

import com.android.volley.Request;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.JsonObjectRequest;
import com.android.volley.toolbox.Volley;

import org.json.JSONException;
import org.json.JSONObject;

public class LoginActivity extends AppCompatActivity {

    private EditText email, password;
    private TextView test;

    @Override

    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.login_activity);
        SharedPreferences sharedPreferences = getSharedPreferences("MyPrefs", MODE_PRIVATE);

        email = findViewById(R.id.emailInput);
        password = findViewById(R.id.passwordInput);
        test = findViewById(R.id.test);
        Button loginButton = findViewById(R.id.loginButton);
        loginButton.setOnClickListener(view -> loginUser());

        SharedPreferences sharedPreferences2 = getSharedPreferences("MyPrefs", MODE_PRIVATE);
        String storedUid = sharedPreferences2.getString("UID", "");
        if (!storedUid.isEmpty()) {
            Intent intent = new Intent(LoginActivity.this, MainActivity.class);
            startActivity(intent);
            finish();
        } else {
            test.setText("No information yet");
        }
    }

    private void loginUser() {
        String email2 = email.getText().toString().trim();
        String password2 = password.getText().toString().trim();

        String url = "http://16.170.240.58/api/signin";

        JSONObject requestBody = new JSONObject();
        try {
            requestBody.put("email", email2);
            requestBody.put("password", password2);
        } catch (JSONException e) {
            e.printStackTrace();
        }

        JsonObjectRequest request2 = new JsonObjectRequest(Request.Method.POST, url, requestBody, new Response.Listener<JSONObject>() {
            @Override
            public void onResponse(JSONObject response) {
                try {
                    String uid = response.getString("data");
                    SharedPreferences sharedPreferences = getSharedPreferences("MyPrefs", MODE_PRIVATE);
                    SharedPreferences.Editor editor = sharedPreferences.edit();
                    editor.putString("UID", uid);
                    editor.apply();
                    String storedUid = sharedPreferences.getString("UID", "");
                    test.setText(storedUid);
                    Intent intent = new Intent(LoginActivity.this, MainActivity.class);
                    startActivity(intent);
                    finish();
                }catch (Exception e){
                    test.setText("failed");
                }
            }
        }, new Response.ErrorListener() {
            @Override
            public void onErrorResponse(VolleyError error) {
                test.setText("failed");
            }
        });
        Volley.newRequestQueue(this).add(request2);
    }
}
