package com.example.back.service;

import com.example.back.dto.UserDto;
import com.example.back.entity.User;
import com.example.back.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.stereotype.Service;

import java.util.Arrays;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    @Override
    public boolean signup(UserDto user) {
        String password = user.getPassword();
        String encPass = BCrypt.hashpw(password, BCrypt.gensalt());
        System.out.println("확인해보자" + user.getPassword());

        if (!validateDuplicateUser(user)) {
            return false;
        }
        else {
            User info = User.builder()
                    .userId(user.getUserId())
                    .password(encPass)
                    .nickname(user.getNickname())
                    .image(user.getImage())
                    .gender(user.getGender())
                    .age(user.getAge())
                    .build();
            userRepository.save(info);

            return true;
        }

    }

    @Override
    public void deleteUser(String userId) {
        User user = userRepository.findByUserId(userId);

        userRepository.delete(user);
    }

    public boolean validateDuplicateUser(UserDto user) {
        User findUsers = userRepository.findByUserId(user.getUserId());
        if (findUsers != null) {
            return false;
        }
        return true;
    }


    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByUserId(username);

        if (user == null) throw new UsernameNotFoundException("User: " + username + " not found");

        return new org.springframework.security.core.userdetails.User(user.getUserId(), user.getPassword(),
                Arrays.asList(new SimpleGrantedAuthority("user")));
    }
}
