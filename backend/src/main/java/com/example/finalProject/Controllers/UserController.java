package com.example.finalProject.Controllers;

import com.example.finalProject.Models.AuthRequest;
import com.example.finalProject.Models.User;
import com.example.finalProject.Repository.Transaction_MySQL_Repository;
import com.example.finalProject.Repository.User_MySQL_Repository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

@RestController
public class UserController {

        User_MySQL_Repository repo;
        Transaction_MySQL_Repository repoT;
        public UserController(User_MySQL_Repository repo, Transaction_MySQL_Repository repoT){
            this.repoT = repoT;
            this.repo= repo;
        }

    @PostMapping("/authenticate")
    @CrossOrigin
    public ResponseEntity<String> authenticate(@RequestBody AuthRequest request) throws Exception {
            User c = repo.findByUsername(request.getUsername());
            String pwd = c.getPassword();
//            System.out.printf("\npwd: %s, un: %s, attempted pwd: %s\n", pwd, request.getUsername(),
//                    request.getPassword() );
            if(pwd.compareTo(request.getPassword()) == 0){
                return new ResponseEntity<>("DUMMY AUTH ", HttpStatus.OK);
            } else{
                return new ResponseEntity<>( String.format("DUMMY AUTH: \npwd: %s, un: %s, attempted pwd: %s \n",
                        pwd, request.getUsername(), request.getPassword()), HttpStatus.FORBIDDEN);
            }
    }

        @GetMapping(path = "/users/all")
        @CrossOrigin
        public List<User> retrieveAll() throws SQLException {
        return repo.findAll();
        }
        @GetMapping(path = "/users/allNames")
        @CrossOrigin
        public ArrayList<String>  listAllUsernames(){
         ArrayList<User> c = (ArrayList)repo.findAll();
         ArrayList<String> names = new ArrayList<>();
            for (User customer : c) {
             names.add(customer.getUsername());
         }
            return names;
        }

        @GetMapping(path = "/users/{username}/getUser")
        @CrossOrigin
        public User getUser(@PathVariable String username) throws Exception {
            return repo.findByUsername(username);
        }


        @DeleteMapping(path = "/users/{username}/deleteUser")
        @CrossOrigin
        public void deleteUser(@PathVariable String username){

        repo.deleteByUsername(username);

        }

        @PutMapping(path = "/users/{username}/updateUser")
        @CrossOrigin
        public void  updateUser(@PathVariable String username,
                               @RequestBody User c) throws Exception {
            System.out.println("user received -> " + c.toString());

        User c1 = repo.findByUsername(username);
        c1.setUser_id(c1.getUser_id());
        c1.setPassword(c.getPassword());
        c1.setLast_name(c.getLast_name());
        c1.setFirst_name(c.getFirst_name());
        c1.setBalance(c.getBalance());
        c1.setPassword(c.getPassword());
        c1.setUsername(c.getUsername());
        c1.setEmail(c.getEmail());
        repo.deleteByUsername(c.getUsername());
        repo.save(c1);
        }

        @PostMapping("/users/createUser")
        @CrossOrigin
        public void createNewUser( @RequestBody User customer){
            repo.save(customer);
        }




}
