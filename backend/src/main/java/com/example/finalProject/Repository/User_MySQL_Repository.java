package com.example.finalProject.Repository;

import com.example.finalProject.Models.User;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface User_MySQL_Repository extends JpaRepository<User, Integer> {
//Product findByName(String productName);
//    ArrayList<Customer> get
 User findByUsername(String username);

 @Transactional
 void deleteByUsername(String username);



}