package com.example.myapplication;

import android.content.Context;
import android.content.Intent;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

import java.util.ArrayList;

public class Request_RecyclerViewAdapter extends RecyclerView.Adapter<Request_RecyclerViewAdapter.MyViewHolder> {
    Context context;
    ArrayList<RequestModel> requestModels;
    public Request_RecyclerViewAdapter(Context context, ArrayList<RequestModel> requestModels){
        this.context = context;
        this.requestModels = requestModels;
    }


    @NonNull
    @Override
    public Request_RecyclerViewAdapter.MyViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        LayoutInflater inflater = LayoutInflater.from(context);
        View view = inflater.inflate(R.layout.recycler_view_row, parent, false);
        return new Request_RecyclerViewAdapter.MyViewHolder(view);
    }

    @Override
    public void onBindViewHolder(@NonNull Request_RecyclerViewAdapter.MyViewHolder holder, int position) {
        holder.websiteName.setText(requestModels.get(position).getRequestName());

        holder.requestButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                holder.websiteName.setText("Test");


                Intent intent = new Intent(context, RequestActivity.class);
                intent.putExtra("data", requestModels.get(position).getFullJSON());
                context.startActivity(intent);
            }
        });
    }

    @Override
    public int getItemCount() {

        return requestModels.size();
    }

    public static class MyViewHolder extends RecyclerView.ViewHolder{

        TextView websiteName;
        Button requestButton;

        public MyViewHolder(@NonNull View itemView) {
            super(itemView);

            websiteName = itemView.findViewById(R.id.websiteName);
            requestButton = itemView.findViewById(R.id.requestButton);



        }
    }

}
