package com.example.finalProject.Controllers;

import com.example.finalProject.Models.Transaction;
import com.example.finalProject.Repository.Transaction_MySQL_Repository;
import com.example.finalProject.Service.TransactionServiceImpl;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class TransactionController {


    Transaction_MySQL_Repository transactionMySQLRepository;
    TransactionServiceImpl ts;

    public TransactionController(Transaction_MySQL_Repository transactionMySQLRepository,
                                 TransactionServiceImpl ts){
        this.transactionMySQLRepository = transactionMySQLRepository;
        this.ts = ts;
    }

    @GetMapping(path="/transactions/all")
    @CrossOrigin
    public List<Transaction> getAll(){
        return transactionMySQLRepository.findAll();
    }

    @GetMapping(path="/transactions/{username}/getTransactions")
    @CrossOrigin
    public List<Transaction> getUserTransactions(@PathVariable String username){
        return ts.getUsersTransactions(username);
    }

    @GetMapping(path = "/transactions/{id}/getTransaction")
    @CrossOrigin
    public Transaction retrieveSpecificTransaction(
            @PathVariable Integer id) throws Exception {
        return transactionMySQLRepository.findById(id).get();
    }

    @GetMapping(path = "/getNumTransactions")
    @CrossOrigin
    public Long getValidId() throws Exception {
        return transactionMySQLRepository.count();
    }

    @PutMapping(path = "/transactions/{username}/updateTransaction/{id}")
    @CrossOrigin
    public void updateTransaction( @PathVariable Integer id, @RequestBody Transaction transaction)
            throws Exception {
        ts.updateFromSingleTransaction(id, transaction);

    }

    @PutMapping(path = "/transactions/{oldName}/{newName}/updateAll")
    @CrossOrigin
    public void updateAllTransactionUsernames( @PathVariable String oldName, @PathVariable String newName)
            throws Exception {

            ts.updateTransactionsUsername(oldName, newName);

    }

    @PostMapping(path = "/transactions/createTransaction" )
    @CrossOrigin
    public void createTransaction( @RequestBody Transaction tr) throws Exception {
       Transaction attempt = (Transaction)tr;
        boolean shouldMakeMany = tr.isRecur_option();
        System.out.println("TR " + attempt.toString());
       if(shouldMakeMany){
           ts.createRecurringTransactions(tr);
       } else {
           ts.createSingleTransaction(tr);
       }
    }


    @DeleteMapping(path = "/transactions/deleteTransaction/{id}")
    @CrossOrigin
    public void deleteSpecificTransaction(@PathVariable Integer id) throws Exception {
        Transaction t = transactionMySQLRepository.findById(id).get();
        if(t.isRecur_option()){
          ts.deleteAllByDesc(t);
        }
        else {
            transactionMySQLRepository.deleteById(id);
        }
    }

}
