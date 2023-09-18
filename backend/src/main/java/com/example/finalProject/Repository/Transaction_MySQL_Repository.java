package com.example.finalProject.Repository;

import com.example.finalProject.Models.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;

public interface Transaction_MySQL_Repository extends JpaRepository<Transaction, Integer> {
}