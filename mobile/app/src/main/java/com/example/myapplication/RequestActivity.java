package com.example.myapplication;

import static android.hardware.biometrics.BiometricManager.Authenticators.BIOMETRIC_STRONG;
import static android.hardware.biometrics.BiometricManager.Authenticators.DEVICE_CREDENTIAL;

import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.TextView;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;

import com.android.volley.Request;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.JsonObjectRequest;
import com.android.volley.toolbox.Volley;

import androidx.biometric.BiometricManager;
import androidx.biometric.BiometricPrompt;
import androidx.core.content.ContextCompat;

import org.json.JSONException;
import org.json.JSONObject;

import java.util.concurrent.Executor;

public class RequestActivity extends AppCompatActivity {
    String value;
    private Executor executor;
    BiometricPrompt biometricPrompt;
    private BiometricPrompt.PromptInfo promptInfo;
    TextView temp;
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.view_request);
        TextView temp = findViewById(R.id.textView3);
        TextView temp2 = findViewById(R.id.websiteNameRequest);
        Button button1 = findViewById(R.id.button1);
        Button button2 = findViewById(R.id.button2);
        executor = ContextCompat.getMainExecutor(this);
        biometricPrompt=new BiometricPrompt(RequestActivity.this, executor, new BiometricPrompt.AuthenticationCallback() {
            @Override
            public void onAuthenticationError(int errorCode, @NonNull CharSequence errString) {
                super.onAuthenticationError(errorCode, errString);
                Toast.makeText(getApplicationContext(), "Login Error", Toast.LENGTH_SHORT).show();
            }

            @Override
            public void onAuthenticationSucceeded(@NonNull BiometricPrompt.AuthenticationResult result) {
                super.onAuthenticationSucceeded(result);
                Toast.makeText(getApplicationContext(), "Login Success", Toast.LENGTH_SHORT).show();
                sendRequest("y");

            }

            @Override
            public void onAuthenticationFailed() {
                super.onAuthenticationFailed();
                Toast.makeText(getApplicationContext(), "Login Failed", Toast.LENGTH_SHORT).show();

            }
        });

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
                promptInfo = new BiometricPrompt.PromptInfo.Builder()
                        .setTitle("Biometric login for my app")
                        .setSubtitle("Log in using your biometric credential")
                        .setNegativeButtonText("Use account password")
                        .build();
                biometricPrompt.authenticate(promptInfo);
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
