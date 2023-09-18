package com.example.finalProject.Models;

import jakarta.persistence.*;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Date;


@Entity // This tells Hibernate to make a table out of this class
@Table(name = "transactions")
public class Transaction implements Serializable {
//	TransactionService ts = new TransactionService();
	@Id
	@GeneratedValue(strategy= GenerationType.AUTO)
	private Integer id;
	private double amount;
	private String username;
	private String description;
	private LocalDate date;
	private boolean planned_option;
	private boolean expense_option;
	private boolean recur_option;

	public Transaction(double amount, String username,
					   String description,  LocalDate date, //ArrayList<Date> dates_applied,
					   boolean planned_option, boolean expense_option,
					   boolean recur_option) throws Exception {
		//this.id = ts.getValidId() + 1;
		this.amount = amount;
		this.username = username;
		this.description = description;
		//this.dates_applied = dates_applied;
		this.planned_option = planned_option;
		this.expense_option = expense_option;
		this.recur_option = recur_option;
	}

	public Transaction(Integer id, Double amount, String username,
					   String description, LocalDate date, //ArrayList<Date> dates_applied,
					   boolean planned_option, boolean expense_option,
					   boolean recur_option) throws Exception {
		this.id = id;
		this.amount = amount;
		this.username = username;
		this.description = description;
		//this.dates_applied = dates_applied;
		this.date = date;
		this.planned_option = planned_option;
		this.expense_option = expense_option ;
		this.recur_option = recur_option;
	}

	public Transaction() throws Exception {
	}

	public int getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public double getAmount() {
		return amount;
	}

	public void setAmount(double amount) {
		this.amount = amount;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

//	public ArrayList<Date> getDates_applied() {
//		return dates_applied;
//	}

//	public void setDates_applied(ArrayList<Date> dates_applied) {
//		this.dates_applied = dates_applied;
//	}

	public LocalDate getDate() {
		return date;
	}

	public void setDate(LocalDate date) {
		this.date = date;
	}

	public boolean isPlanned_option() {
		return planned_option;
	}

	public void setPlanned_option(boolean planned_option) {
		this.planned_option = planned_option;
	}

	public boolean isExpense_option() {
		return expense_option;
	}

	public void setExpense_option(boolean expense_option) {
		this.expense_option = expense_option;
	}

	public boolean isRecur_option() {
		return recur_option;
	}

	public void setRecur_option(boolean recur_option) {
		this.recur_option = recur_option;
	}

	@Override
	public String toString() {
		return "Transaction{" +
				"id=" + id +
				", amount=" + amount +
				", username='" + username + '\'' +
				", description='" + description + '\'' +
				", date='" + date + '\'' +
				//", dates_applied=" + dates_applied +
				", planned_option=" + planned_option +
				", expense_option=" + expense_option +
				", recur_option=" + recur_option +
				'}';
	}
}