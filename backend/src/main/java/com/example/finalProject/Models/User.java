package com.example.finalProject.Models;

import jakarta.persistence.*;


@Entity
@Table(name = "users")
public class User {
    private String username;
    private Double balance;
    private String password;
    private String first_name;
    private String last_name;
    private String email;
    private boolean enabled;
    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    private Long user_id;

   // private TransactionService transactionService;

    public User(Double balance, String username, String first_name,
                String last_name, String password, String email, boolean enabled) throws Exception {

        this.balance = balance;
        this.username = username;
        this.password =password;
        this.first_name = first_name;
        this.last_name = last_name;
        this.email = email;
        this.enabled = enabled;
    }
    public User() throws Exception {}

    public String getFirst_name() {
        return first_name;
    }

    public void setFirst_name(String first_name) {
        this.first_name = first_name;
    }

    public String getLast_name() {
        return last_name;
    }

    public void setLast_name(String last_name) {
        this.last_name = last_name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Long getUser_id() {
        return user_id;
    }

    public void setUser_id(Long user_id) {
        this.user_id = user_id;
    }

    public boolean isEnabled() {
        return enabled;
    }

    public void setEnabled(boolean enabled) {
        this.enabled = enabled;
    }

    public Double getBalance() {
        return balance;
    }

    public void setBalance(Double balance) {
        this.balance = balance;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }


    @Override
    public String toString() {
        return "User{ \n" +
                "first_name='" + first_name + "',\n" +
                "last_name='" + last_name+ "',\n" +
                "email=' "+ email+ "',\n" +
                "balance='" + balance + "',\n" +
                "username='" + username + "',\n" +
                "password='" +password + "',\n" +
                "user_id='" +user_id + "',\n" +
                "enabled='" +enabled + "',\n" +
                '}';
    }


}

