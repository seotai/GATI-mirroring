package com.family.gati.repository;

import com.family.gati.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {

    User join(User user);
    User findByUserId(String userId);
    User findByUserSeq(Long userSeq);
    User modify(User user);
    User deleteByUserSeq(Long userSeq);
}