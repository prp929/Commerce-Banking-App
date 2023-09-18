package com.example.finalProject.Service;

import com.example.finalProject.Models.Transaction;
import com.example.finalProject.Repository.Transaction_MySQL_Repository;
import org.springframework.stereotype.Service;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class TransactionServiceImpl {

    Transaction_MySQL_Repository repo;
    public TransactionServiceImpl(Transaction_MySQL_Repository repo){
        this.repo=repo;
    }

    public void createRecurringTransactions(Transaction t) throws Exception {
        LocalDate date = t.getDate();
        ArrayList<LocalDate> recurDates = getDates(date);
        Integer baseId = t.getId()*123+5;
        for(LocalDate d : recurDates){
            Transaction tr = new Transaction();
            tr.setId(++baseId);
            tr.setUsername(t.getUsername());
            tr.setAmount(t.getAmount());
            tr.setDescription(t.getDescription());
            tr.setDate(d);
            tr.setPlanned_option(t.isPlanned_option());
            tr.setRecur_option(t.isRecur_option());
            tr.setExpense_option(t.isExpense_option());
            repo.save(tr);
        }
    }

    public void createSingleTransaction(Transaction t) throws Exception {
        Transaction tr = new Transaction();
        //LocalDate date = LocalDate.parse(startDt, DateTimeFormatter.ISO_DATE_TIME);
        System.out.println("TR->" + tr.toString());
        tr.setId(t.getId());
        System.out.println("New id->"+ tr.getId());
        tr.setUsername(t.getUsername());
        tr.setAmount(t.getAmount());
        tr.setDescription(t.getDescription());
        tr.setDate(t.getDate());
        tr.setPlanned_option(t.isPlanned_option());
        tr.setRecur_option(t.isRecur_option());
        tr.setExpense_option(t.isExpense_option());
        repo.save(tr);
    }

    public void updateFromSingleTransaction(Integer id, Transaction transNew) throws Exception {
        Optional<Transaction> tryMe = repo.findById(id);
        Transaction transOld = tryMe.get();
        String un = transOld.getUsername();
        Boolean wasRecurringBefore = transOld.isRecur_option();
        Boolean isRecurringNow = transNew.isRecur_option();

         if (isRecurringNow && wasRecurringBefore){
             updateAllRecurring(un, transNew, transOld.getDescription());
         } else if (isRecurringNow && !wasRecurringBefore){
             //get rid of old transaction
             repo.deleteById(id);
             //create new recurring transaction
             createRecurringTransactions(transNew);
         } else if (!isRecurringNow && wasRecurringBefore){
             //Get rid of old transactions
             deleteAllByDesc(transOld);
             //save current, single transaction
             repo.save(transNew);
         } else if (!isRecurringNow && !wasRecurringBefore) {
             repo.deleteById(id);
             repo.save(transNew);
         }

        System.out.println("New Transaction received -> "+ transNew.toString());
        System.out.println("Old Trans received in update -> "+ transOld.toString());

    }

    public void updateAllRecurring(String oldUn, Transaction t, String desc) throws Exception {
        List<Transaction> oldList = getUsersTransactions(oldUn);
        for(Transaction tO : oldList){
            if(tO.getDescription().equals(desc) && tO.isRecur_option() ) {
                repo.deleteById(tO.getId());
            }
        }
        createRecurringTransactions(t);
    }

    public  List<Transaction> getUsersTransactions(String username) {
        List<Transaction> usersList = new ArrayList<>();
        List<Transaction> wholeList = repo.findAll();
        for(Transaction t : wholeList){
            if(t.getUsername().equals(username)){
                usersList.add(t);
            }
        }
        return usersList;
    }

    public void updateTransactionsUsername(String oldUn, String newUn){
        List<Transaction> oldList = getUsersTransactions(oldUn);
        for(Transaction tO : oldList){
            tO.setUsername(newUn);
            repo.save(tO);
        }
    }

    public void deleteAllByDesc(Transaction t){
        List<Transaction> list = getUsersTransactions(t.getUsername());
        String desc = t.getDescription();
        for(Transaction tO : list){
            if(tO.getDescription().equals(desc) && tO.isRecur_option() ) {
                repo.deleteById(tO.getId());
            }
        }
    }
    private ArrayList<LocalDate> getDates(LocalDate date){
        String ds = date.toString().substring(5,7);
        String front, back;
        front = date.toString().substring(0,5);
        back = date.toString().substring(7, 10);
        Integer mon = Integer.parseInt(ds);
        ArrayList<String> span = new ArrayList<>();
        span.add(ds);
        for(int i = 1, j=1; i<12; i++){
            if( (mon+i)<=12){
                if(mon+i<10){
                    span.add("0"+ (mon+i));
                } else{
                    span.add(mon+i+"");
                }
            }
            else{
                if(j<10){
                    span.add("0"+ (j++));
                } else{
                    span.add( j++ +"");
                }
            }

        }
        ArrayList<LocalDate> recurDates = new ArrayList<>();
        for(String m : span){
            LocalDate d = LocalDate.parse(front + m + back);
            recurDates.add(d);
            if( Integer.parseInt(m) == 12){
                front = (Integer.parseInt(front.substring(0,4)) + 1) + "-"  ;
            }
        }
        return recurDates;
    }
}
